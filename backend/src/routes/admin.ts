import { Router } from "express";
import { z } from "zod";
import { requireRole } from "../auth";
import { one, query, transaction } from "../db";
import { asyncHandler, HttpError, idParam, parse } from "../http";
import { bookSchema, saveBook } from "../services/books";
import { loadOrder } from "./shop";

export const adminRouter = Router();
adminRouter.use(requireRole("admin"));

// --- книги ---
adminRouter.post("/books", asyncHandler(async (req, res) => {
  const b = parse(bookSchema, req.body);
  const id = await transaction((c) => saveBook(c, b));
  res.status(201).json({ id });
}));

adminRouter.put("/books/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const b = parse(bookSchema, req.body);
  const saved = await transaction((c) => saveBook(c, b, id));
  if (!saved) throw new HttpError(404, "NOT_FOUND", "Книга не найдена");
  res.json({ id });
}));

// Книгу из истории заказов удалить нельзя: сработает внешний ключ order_items
adminRouter.delete("/books/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const used = await one("SELECT 1 FROM order_items WHERE book_id = $1 LIMIT 1", [id]);
  if (used) throw new HttpError(409, "IN_USE", "Книга есть в заказах. Обнулите остаток вместо удаления");
  const rows = await query("DELETE FROM books WHERE book_id = $1 RETURNING book_id", [id]);
  if (!rows.length) throw new HttpError(404, "NOT_FOUND", "Книга не найдена");
  res.json({ ok: true });
}));

// --- справочники: авторы, жанры, издательства ---
const DICTS = {
  authors: { table: "authors", key: "author_id", schema: z.object({ lastName: z.string().trim().min(1).max(100), firstName: z.string().trim().max(100).default("") }), cols: ["last_name", "first_name"], map: (d: any) => [d.lastName, d.firstName] },
  genres: { table: "genres", key: "genre_id", schema: z.object({ name: z.string().trim().min(1).max(100) }), cols: ["name"], map: (d: any) => [d.name] },
  publishers: { table: "publishers", key: "publisher_id", schema: z.object({ name: z.string().trim().min(1).max(200), country: z.string().trim().max(100).optional().nullable() }), cols: ["name", "country"], map: (d: any) => [d.name, d.country ?? null] },
} as const;
type DictName = keyof typeof DICTS;

const dict = (name: string) => {
  if (!(name in DICTS)) throw new HttpError(404, "NOT_FOUND", "Нет такого справочника");
  return DICTS[name as DictName];
};

adminRouter.post("/dict/:name", asyncHandler(async (req, res) => {
  const d = dict(req.params.name);
  const values = d.map(parse(d.schema, req.body));
  const marks = values.map((_, i) => `$${i + 1}`).join(", ");
  const row = await one(`INSERT INTO ${d.table} (${d.cols.join(", ")}) VALUES (${marks}) RETURNING *`, values);
  res.status(201).json(row);
}));

adminRouter.put("/dict/:name/:id", asyncHandler(async (req, res) => {
  const d = dict(req.params.name);
  const id = parse(idParam, req.params.id);
  const values = d.map(parse(d.schema, req.body));
  const set = d.cols.map((c, i) => `${c} = $${i + 1}`).join(", ");
  const row = await one(`UPDATE ${d.table} SET ${set} WHERE ${d.key} = $${values.length + 1} RETURNING *`, [...values, id]);
  if (!row) throw new HttpError(404, "NOT_FOUND", "Запись не найдена");
  res.json(row);
}));

adminRouter.delete("/dict/:name/:id", asyncHandler(async (req, res) => {
  const d = dict(req.params.name);
  const id = parse(idParam, req.params.id);
  await query(`DELETE FROM ${d.table} WHERE ${d.key} = $1`, [id]);
  res.json({ ok: true });
}));

// --- заказы ---
const STATUSES = ["new", "paid", "packed", "issued", "cancelled"] as const;

adminRouter.get("/orders", asyncHandler(async (req, res) => {
  const status = parse(z.enum(STATUSES).optional(), req.query.status || undefined);
  res.json(await query(
    `SELECT o.order_id, o.created_at, o.status, o.subtotal, o.discount_sum, o.total, o.currency_code,
            u.email, u.first_name, u.last_name
       FROM orders o JOIN users u ON u.user_id = o.user_id
      WHERE ($1::varchar IS NULL OR o.status = $1)
      ORDER BY o.created_at DESC LIMIT 500`,
    [status ?? null],
  ));
}));

adminRouter.patch("/orders/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const { status } = parse(z.object({ status: z.enum(STATUSES) }), req.body);
  if (status === "cancelled") {
    await query("SELECT cancel_order($1)", [id]);
  } else {
    const rows = await query(
      "UPDATE orders SET status = $1 WHERE order_id = $2 AND status <> 'cancelled' RETURNING order_id",
      [status, id],
    );
    if (!rows.length) throw new HttpError(409, "ORDER_NOT_CHANGEABLE", "Отменённый заказ изменить нельзя");
  }
  res.json(await loadOrder(id));
}));

// --- пользователи ---
adminRouter.get("/users", asyncHandler(async (req, res) => {
  const q = parse(z.string().trim().max(100).optional(), req.query.q || undefined);
  res.json(await query(
    `SELECT u.user_id, u.email, u.first_name, u.last_name, u.phone, u.lang, u.registered_at,
            u.is_active, u.email_confirmed, r.name AS role,
            (SELECT count(*) FROM orders o WHERE o.user_id = u.user_id) AS orders
       FROM users u JOIN roles r ON r.role_id = u.role_id
      WHERE $1::text IS NULL OR u.email ILIKE $1 OR u.last_name ILIKE $1
      ORDER BY u.registered_at DESC`,
    [q ? `%${q}%` : null],
  ));
}));

adminRouter.patch("/users/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const { isActive } = parse(z.object({ isActive: z.boolean() }), req.body);
  if (id === req.user!.id) throw new HttpError(400, "SELF", "Нельзя заблокировать собственную учётную запись");
  await query("UPDATE users SET is_active = $1 WHERE user_id = $2", [isActive, id]);
  res.json({ ok: true });
}));

// --- скидки ---
const discountSchema = z.object({
  name: z.string().trim().min(1).max(100),
  percent: z.number().gt(0).max(100),
  startsOn: z.iso.date(),
  endsOn: z.iso.date(),
  minSum: z.number().min(0),
  isActive: z.boolean(),
});

adminRouter.get("/discounts", asyncHandler(async (_req, res) => {
  res.json(await query(
    `SELECT d.*, (SELECT count(*) FROM orders o WHERE o.discount_id = d.discount_id) AS used
       FROM discounts d ORDER BY d.starts_on DESC`,
  ));
}));

adminRouter.post("/discounts", asyncHandler(async (req, res) => {
  const d = parse(discountSchema, req.body);
  res.status(201).json(await one(
    `INSERT INTO discounts (name, percent, starts_on, ends_on, min_sum, is_active)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [d.name, d.percent, d.startsOn, d.endsOn, d.minSum, d.isActive],
  ));
}));

adminRouter.put("/discounts/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const d = parse(discountSchema, req.body);
  res.json(await one(
    `UPDATE discounts SET name=$1, percent=$2, starts_on=$3, ends_on=$4, min_sum=$5, is_active=$6
      WHERE discount_id = $7 RETURNING *`,
    [d.name, d.percent, d.startsOn, d.endsOn, d.minSum, d.isActive, id],
  ));
}));

adminRouter.delete("/discounts/:id", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  await query("DELETE FROM discounts WHERE discount_id = $1", [id]);
  res.json({ ok: true });
}));

// --- курсы валют ---
adminRouter.put("/currencies/:code", asyncHandler(async (req, res) => {
  const code = parse(z.string().regex(/^[A-Z]{3}$/), req.params.code);
  const { rate } = parse(z.object({ rate: z.number().positive().max(1e6) }), req.body);
  if (code === "BYN") throw new HttpError(400, "BASE_CURRENCY", "Курс базовой валюты всегда равен 1");
  const row = await one(
    "UPDATE currencies SET rate_to_byn = $1, rate_date = CURRENT_DATE WHERE currency_code = $2 RETURNING *",
    [rate, code],
  );
  if (!row) throw new HttpError(404, "NOT_FOUND", "Валюта не найдена");
  res.json(row);
}));

// Официальные курсы Национального банка Республики Беларусь
adminRouter.post("/currencies/refresh", asyncHandler(async (_req, res) => {
  const response = await fetch("https://api.nbrb.by/exrates/rates?periodicity=0", { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new HttpError(502, "NBRB_UNAVAILABLE", "Сервис НБРБ недоступен");
  const rates: any[] = await response.json();
  const codes = await query<{ currency_code: string }>("SELECT currency_code FROM currencies WHERE currency_code <> 'BYN'");
  for (const { currency_code } of codes) {
    const r = rates.find((x) => x.Cur_Abbreviation === currency_code);
    if (r) {
      await query("UPDATE currencies SET rate_to_byn = $1, rate_date = $2 WHERE currency_code = $3",
        [r.Cur_OfficialRate / r.Cur_Scale, String(r.Date).slice(0, 10), currency_code]);
    }
  }
  res.json(await query("SELECT * FROM currencies ORDER BY currency_code"));
}));
