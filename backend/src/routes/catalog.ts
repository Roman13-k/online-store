import { Router } from "express";
import { z } from "zod";
import { query, one } from "../db";
import { asyncHandler, HttpError, idParam, parse } from "../http";

export const catalogRouter = Router();

const searchSchema = z.object({
  q: z.string().trim().max(100).optional(),
  genre: z.coerce.number().int().positive().optional(),
  author: z.coerce.number().int().positive().optional(),
  publisher: z.coerce.number().int().positive().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  inStock: z.enum(["true", "false"]).optional(),
  sort: z.enum(["title", "price", "year", "rating", "new"]).default("title"),
  dir: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

// Имя столбца сортировки берётся только из этого словаря, а не из запроса
const SORT_COLUMNS: Record<string, string> = {
  title: "title",
  price: "price_byn",
  year: "publish_year",
  rating: "COALESCE(rating, 0)",
  new: "created_at",
};

export function buildBookFilter(f: z.infer<typeof searchSchema>) {
  const where: string[] = [];
  const params: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    params.push(value);
    where.push(sql.replace("?", `$${params.length}`));
  };
  if (f.q) {
    params.push(`%${f.q}%`, f.q.replace(/\D/g, ""));
    const n = params.length;
    where.push(`(title ILIKE $${n - 1} OR authors ILIKE $${n - 1} OR isbn = $${n})`);
  }
  if (f.genre) add("book_id IN (SELECT book_id FROM book_genres WHERE genre_id = ?)", f.genre);
  if (f.author) add("book_id IN (SELECT book_id FROM book_authors WHERE author_id = ?)", f.author);
  if (f.publisher) add("publisher_id = ?", f.publisher);
  if (f.minPrice !== undefined) add("price_byn >= ?", f.minPrice);
  if (f.maxPrice !== undefined) add("price_byn <= ?", f.maxPrice);
  if (f.inStock === "true") where.push("stock > 0");
  return { where: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

catalogRouter.get("/books", asyncHandler(async (req, res) => {
  const f = parse(searchSchema, req.query);
  const { where, params } = buildBookFilter(f);
  const order = `${SORT_COLUMNS[f.sort]} ${f.dir === "desc" ? "DESC" : "ASC"} NULLS LAST, book_id`;
  const offset = (f.page - 1) * f.limit;
  const items = await query(
    `SELECT * FROM v_book_cards ${where} ORDER BY ${order} LIMIT ${f.limit} OFFSET ${offset}`,
    params,
  );
  const total = await one<{ n: number }>(`SELECT count(*) AS n FROM v_book_cards ${where}`, params);
  res.json({ items, total: total!.n, page: f.page, limit: f.limit });
}));

catalogRouter.get("/books/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const book = await one("SELECT * FROM v_book_cards WHERE book_id = $1", [id]);
  if (!book) throw new HttpError(404, "NOT_FOUND", "Книга не найдена");
  const authors = await query(
    `SELECT a.author_id, a.last_name, a.first_name FROM book_authors ba
       JOIN authors a ON a.author_id = ba.author_id WHERE ba.book_id = $1 ORDER BY a.last_name`,
    [id],
  );
  const genres = await query(
    `SELECT g.genre_id, g.name FROM book_genres bg JOIN genres g ON g.genre_id = bg.genre_id
      WHERE bg.book_id = $1 ORDER BY g.name`,
    [id],
  );
  res.json({ ...book, authorList: authors, genreList: genres });
}));

catalogRouter.get("/genres", asyncHandler(async (_req, res) => {
  res.json(await query(
    `SELECT g.genre_id, g.name, count(bg.book_id) AS books
       FROM genres g LEFT JOIN book_genres bg ON bg.genre_id = g.genre_id
      GROUP BY g.genre_id ORDER BY g.name`,
  ));
}));

catalogRouter.get("/authors", asyncHandler(async (_req, res) => {
  res.json(await query("SELECT author_id, last_name, first_name FROM authors ORDER BY last_name, first_name"));
}));

catalogRouter.get("/publishers", asyncHandler(async (_req, res) => {
  res.json(await query("SELECT publisher_id, name, country FROM publishers ORDER BY name"));
}));

catalogRouter.get("/currencies", asyncHandler(async (_req, res) => {
  res.json(await query("SELECT currency_code, name, rate_to_byn, rate_date FROM currencies ORDER BY currency_code"));
}));
