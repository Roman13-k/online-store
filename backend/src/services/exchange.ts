import { parse as parseCsv } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { PoolClient } from "pg";
import { ensureAuthor, ensureGenre, ensurePublisher } from "./books";

export type Format = "json" | "xml" | "csv";
export const FIELDS = ["isbn", "title", "authors", "genres", "publisher", "year", "pages", "price", "currency", "stock", "annotation", "cover"] as const;

export const MIME: Record<Format, string> = {
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  csv: "text/csv; charset=utf-8",
};

// Ячейки, начинающиеся с = + - @, Excel считает формулами: экранируем их апострофом
const safeCell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
};

export function serialize(rows: Record<string, unknown>[], format: Format, root = "books", item = "book") {
  if (format === "json") return JSON.stringify(rows, null, 2);
  if (format === "xml") {
    const builder = new XMLBuilder({ format: true, ignoreAttributes: true });
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + builder.build({ [root]: { [item]: rows } });
  }
  const columns = rows.length ? Object.keys(rows[0]) : [...FIELDS];
  return "\uFEFF" + stringify(rows.map((r) => columns.map((c) => safeCell(r[c]))), { header: true, columns, delimiter: ";" });
}

export function deserialize(text: string, format: Format): Record<string, unknown>[] {
  if (format === "json") {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.books ?? [];
  }
  if (format === "xml") {
    // сущности и DTD не раскрываются: защита от атак через внешние сущности XML
    const parser = new XMLParser({ ignoreAttributes: true, processEntities: false, parseTagValue: false });
    const book = parser.parse(text)?.books?.book ?? [];
    return Array.isArray(book) ? book : [book];
  }
  return parseCsv(text.replace(/^\uFEFF/, ""), { columns: true, delimiter: [";", ","], skip_empty_lines: true, trim: true });
}

const list = (v: unknown) => String(v ?? "").split(/[;|]/).map((s) => s.trim()).filter(Boolean);

export const importRow = z.object({
  isbn: z.coerce.string().trim().regex(/^\d{10}(\d{3})?$/),
  title: z.coerce.string().trim().min(1).max(255),
  authors: z.any().transform(list).pipe(z.array(z.string()).min(1)),
  genres: z.any().transform(list),
  publisher: z.coerce.string().trim().min(1).max(200),
  year: z.coerce.number().int().min(1450).max(new Date().getFullYear()).optional().or(z.literal("").transform(() => undefined)),
  pages: z.coerce.number().int().positive().optional().or(z.literal("").transform(() => undefined)),
  price: z.coerce.number().min(0),
  currency: z.coerce.string().trim().toUpperCase().regex(/^[A-Z]{3}$/).default("BYN"),
  stock: z.coerce.number().int().min(0),
  annotation: z.coerce.string().max(4000).optional(),
  cover: z.coerce.string().max(500).optional(),
});
export type ImportRow = z.infer<typeof importRow>;

// Книга с тем же ISBN обновляется, новая – добавляется
export async function upsertImported(client: PoolClient, r: ImportRow) {
  const publisherId = await ensurePublisher(client, r.publisher);
  const { rows } = await client.query(
    `INSERT INTO books (isbn, title, publisher_id, publish_year, pages, price, currency_code, stock, annotation, cover_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (isbn) DO UPDATE SET title=EXCLUDED.title, publisher_id=EXCLUDED.publisher_id,
       publish_year=EXCLUDED.publish_year, pages=EXCLUDED.pages, price=EXCLUDED.price,
       currency_code=EXCLUDED.currency_code, stock=EXCLUDED.stock, annotation=EXCLUDED.annotation,
       cover_url=EXCLUDED.cover_url
     RETURNING book_id, (xmax = 0) AS inserted`,
    [r.isbn, r.title, publisherId, r.year ?? null, r.pages ?? null, r.price, r.currency, r.stock, r.annotation || null, r.cover || null],
  );
  const bookId = rows[0].book_id;
  await client.query("DELETE FROM book_authors WHERE book_id = $1", [bookId]);
  await client.query("DELETE FROM book_genres WHERE book_id = $1", [bookId]);
  for (const a of r.authors) await client.query("INSERT INTO book_authors VALUES ($1, $2) ON CONFLICT DO NOTHING", [bookId, await ensureAuthor(client, a)]);
  for (const g of r.genres) await client.query("INSERT INTO book_genres VALUES ($1, $2) ON CONFLICT DO NOTHING", [bookId, await ensureGenre(client, g)]);
  return rows[0].inserted as boolean;
}
