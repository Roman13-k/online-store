import { PoolClient } from "pg";
import { z } from "zod";

export const bookSchema = z.object({
  isbn: z.string().trim().regex(/^\d{10}(\d{3})?$/, "ISBN: 10 или 13 цифр"),
  title: z.string().trim().min(1).max(255),
  publisherId: z.number().int().positive(),
  publishYear: z.number().int().min(1450).max(new Date().getFullYear()).nullable().optional(),
  pages: z.number().int().positive().max(32767).nullable().optional(),
  price: z.number().min(0).max(99999999),
  currencyCode: z.string().regex(/^[A-Z]{3}$/).default("BYN"),
  stock: z.number().int().min(0),
  annotation: z.string().max(4000).nullable().optional(),
  coverUrl: z.string().url().max(500).nullable().optional().or(z.literal("")),
  authorIds: z.array(z.number().int().positive()).min(1).max(20),
  genreIds: z.array(z.number().int().positive()).max(20).default([]),
});
export type BookInput = z.infer<typeof bookSchema>;

// Книга и её связи «Авторство» и «КнигаЖанр» записываются в одной транзакции
export async function saveBook(client: PoolClient, b: BookInput, bookId?: number) {
  const values = [b.isbn, b.title, b.publisherId, b.publishYear ?? null, b.pages ?? null,
    b.price, b.currencyCode, b.stock, b.annotation || null, b.coverUrl || null];
  const sql = bookId
    ? `UPDATE books SET isbn=$1, title=$2, publisher_id=$3, publish_year=$4, pages=$5, price=$6,
              currency_code=$7, stock=$8, annotation=$9, cover_url=$10 WHERE book_id=$11 RETURNING book_id`
    : `INSERT INTO books (isbn, title, publisher_id, publish_year, pages, price, currency_code, stock,
              annotation, cover_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING book_id`;
  const { rows } = await client.query(sql, bookId ? [...values, bookId] : values);
  if (!rows[0]) return null;
  const id = rows[0].book_id as number;
  await client.query("DELETE FROM book_authors WHERE book_id = $1", [id]);
  await client.query("DELETE FROM book_genres WHERE book_id = $1", [id]);
  await client.query("INSERT INTO book_authors SELECT $1, unnest($2::int[])", [id, b.authorIds]);
  await client.query("INSERT INTO book_genres SELECT $1, unnest($2::int[])", [id, b.genreIds]);
  return id;
}

// Справочники при импорте ищутся по имени, а недостающие записи создаются
export async function ensurePublisher(client: PoolClient, name: string) {
  const { rows } = await client.query(
    `INSERT INTO publishers (name) VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING publisher_id`,
    [name.trim()],
  );
  return rows[0].publisher_id as number;
}

export async function ensureAuthor(client: PoolClient, fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const last = parts.pop() ?? fullName;
  const first = parts.join(" ");
  const { rows } = await client.query(
    `INSERT INTO authors (last_name, first_name) VALUES ($1, $2)
     ON CONFLICT (last_name, first_name) DO UPDATE SET last_name = EXCLUDED.last_name RETURNING author_id`,
    [last, first],
  );
  return rows[0].author_id as number;
}

export async function ensureGenre(client: PoolClient, name: string) {
  const { rows } = await client.query(
    `INSERT INTO genres (name) VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING genre_id`,
    [name.trim()],
  );
  return rows[0].genre_id as number;
}
