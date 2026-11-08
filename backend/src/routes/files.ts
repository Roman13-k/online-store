import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { requireRole } from "../auth";
import { query, transaction } from "../db";
import { asyncHandler, HttpError, idParam, parse } from "../http";
import { deserialize, Format, importRow, MIME, serialize, upsertImported } from "../services/exchange";
import { render, Report, REPORT_MIME, ReportFormat } from "../services/reports";
import { loadOrder } from "./shop";

export const filesRouter = Router();
const admin = requireRole("admin");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

const formatSchema = z.enum(["json", "xml", "csv"]);
const reportFormat = z.enum(["docx", "xlsx", "pdf"]);
const period = z.object({
  from: z.iso.date().default(() => new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)),
  to: z.iso.date().default(() => new Date().toISOString().slice(0, 10)),
});

function send(res: any, body: string | Buffer, mime: string, name: string) {
  res.setHeader("Content-Type", mime);
  res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(name)}`);
  res.send(body);
}

// --- экспорт и импорт ---
const exportBooksSql = `
  SELECT b.isbn, b.title,
         COALESCE((SELECT string_agg(trim(a.first_name || ' ' || a.last_name), '; ') FROM book_authors ba
                    JOIN authors a ON a.author_id = ba.author_id WHERE ba.book_id = b.book_id), '') AS authors,
         COALESCE((SELECT string_agg(g.name, '; ') FROM book_genres bg
                    JOIN genres g ON g.genre_id = bg.genre_id WHERE bg.book_id = b.book_id), '') AS genres,
         p.name AS publisher, b.publish_year AS year, b.pages, b.price, b.currency_code AS currency,
         b.stock, COALESCE(b.annotation, '') AS annotation, COALESCE(b.cover_url, '') AS cover
    FROM books b JOIN publishers p ON p.publisher_id = b.publisher_id ORDER BY b.title`;

filesRouter.get("/admin/export/books", admin, asyncHandler(async (req, res) => {
  const format = parse(formatSchema, req.query.format ?? "json");
  const rows = await query(exportBooksSql);
  send(res, serialize(rows, format), MIME[format], `books.${format}`);
}));

filesRouter.get("/admin/export/orders", admin, asyncHandler(async (req, res) => {
  const format = parse(formatSchema, req.query.format ?? "json");
  const rows = await query(
    `SELECT o.order_id, to_char(o.created_at, 'YYYY-MM-DD HH24:MI') AS created_at, u.email, o.status,
            o.subtotal, o.discount_sum, o.total, o.currency_code, o.rate_at_order
       FROM orders o JOIN users u ON u.user_id = o.user_id ORDER BY o.created_at`,
  );
  send(res, serialize(rows, format, "orders", "order"), MIME[format], `orders.${format}`);
}));

filesRouter.post("/admin/import/books", admin, upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) throw new HttpError(400, "NO_FILE", "Файл не передан");
  const ext = req.file.originalname.split(".").pop()?.toLowerCase();
  const format = parse(formatSchema, ext) as Format;
  let raw: Record<string, unknown>[];
  try {
    raw = deserialize(req.file.buffer.toString("utf8"), format);
  } catch {
    throw new HttpError(400, "BAD_FILE", "Файл не удалось разобрать");
  }
  const errors: { row: number; message: string }[] = [];
  const valid = raw.flatMap((r, i) => {
    const p = importRow.safeParse(r);
    if (!p.success) errors.push({ row: i + 1, message: `поле ${p.error.issues[0].path.join(".")}` });
    return p.success ? [p.data] : [];
  });
  const result = await transaction(async (c) => {
    let inserted = 0;
    for (const r of valid) if (await upsertImported(c, r)) inserted++;
    return { inserted, updated: valid.length - inserted };
  });
  res.json({ ...result, rejected: errors.length, errors: errors.slice(0, 50) });
}));

// --- отчёты ---
const STATUS_RU: Record<string, string> = {
  new: "новый", paid: "оплачен", packed: "собран", issued: "выдан", cancelled: "отменён",
};

async function salesReport(from: string, to: string): Promise<Report> {
  const rows = await query<any>(
    `SELECT o.order_id, o.created_at, u.last_name || ' ' || u.first_name AS buyer, o.status,
            o.subtotal, o.discount_sum, o.subtotal - o.discount_sum AS revenue
       FROM orders o JOIN users u ON u.user_id = o.user_id
      WHERE o.created_at::date BETWEEN $1 AND $2 AND o.status <> 'cancelled'
      ORDER BY o.created_at`,
    [from, to],
  );
  rows.forEach((r) => (r.status = STATUS_RU[r.status] ?? r.status));
  const sum = rows.reduce((s, r) => s + r.revenue, 0);
  return {
    title: "Продажи за период",
    subtitle: `с ${from} по ${to}`,
    columns: [
      { key: "order_id", title: "№", width: 6 }, { key: "created_at", title: "Дата", width: 12 },
      { key: "buyer", title: "Покупатель", width: 26 }, { key: "status", title: "Статус", width: 10 },
      { key: "subtotal", title: "Сумма, BYN", width: 13, money: true },
      { key: "discount_sum", title: "Скидка, BYN", width: 13, money: true },
      { key: "revenue", title: "Выручка, BYN", width: 13, money: true },
    ],
    rows,
    totals: [`Заказов: ${rows.length}`, `Выручка: ${sum.toFixed(2)} BYN`],
  };
}

async function stockReport(): Promise<Report> {
  const rows = await query<any>(
    "SELECT isbn, title, authors, stock, price_byn, round(stock * price_byn, 2) AS cost FROM v_book_cards ORDER BY stock, title",
  );
  return {
    title: "Остатки книг на складе",
    subtitle: `на ${new Date().toLocaleDateString("ru-RU")}`,
    columns: [
      { key: "isbn", title: "ISBN", width: 15 }, { key: "title", title: "Название", width: 30 },
      { key: "authors", title: "Авторы", width: 22 }, { key: "stock", title: "Остаток", width: 9 },
      { key: "price_byn", title: "Цена, BYN", width: 11, money: true }, { key: "cost", title: "Стоимость, BYN", width: 13, money: true },
    ],
    rows,
    totals: [
      `Наименований: ${rows.length}`,
      `Экземпляров: ${rows.reduce((s, r) => s + r.stock, 0)}`,
      `Стоимость остатков: ${rows.reduce((s, r) => s + r.cost, 0).toFixed(2)} BYN`,
    ],
  };
}

function invoiceReport(o: any): Report {
  return {
    title: `Накладная к заказу № ${o.order_id}`,
    subtitle: `${new Date(o.created_at).toLocaleString("ru-RU")}, покупатель ${o.last_name} ${o.first_name} (${o.email})`,
    columns: [
      { key: "title", title: "Книга", width: 40 }, { key: "quantity", title: "Кол-во", width: 10 },
      { key: "price", title: "Цена, BYN", width: 14, money: true }, { key: "sum", title: "Сумма, BYN", width: 14, money: true },
    ],
    rows: o.items,
    totals: [
      `Сумма: ${o.subtotal.toFixed(2)} BYN`,
      `Скидка: ${o.discount_sum.toFixed(2)} BYN${o.discount_name ? ` (${o.discount_name}, ${o.percent}%)` : ""}`,
      `К оплате: ${o.total.toFixed(2)} ${o.currency_code} (курс ${o.rate_at_order} BYN)`,
    ],
  };
}

filesRouter.get("/admin/reports/:kind", admin, asyncHandler(async (req, res) => {
  const format = parse(reportFormat, req.query.format ?? "pdf") as ReportFormat;
  const { from, to } = parse(period, req.query);
  const kind = req.params.kind;
  const report = kind === "sales" ? await salesReport(from, to) : kind === "stock" ? await stockReport() : null;
  if (!report) throw new HttpError(404, "NOT_FOUND", "Нет такого отчёта");
  send(res, await render(report, format), REPORT_MIME[format], `${kind}.${format}`);
}));

filesRouter.get("/orders/:id/invoice", requireRole("buyer", "admin"), asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const format = parse(reportFormat, req.query.format ?? "pdf") as ReportFormat;
  const order = await loadOrder(id, req.user!.role === "admin" ? undefined : req.user!.id);
  send(res, await render(invoiceReport(order), format), REPORT_MIME[format], `order-${id}.${format}`);
}));

// --- аналитика ---
filesRouter.get("/admin/analytics", admin, asyncHandler(async (req, res) => {
  const { from, to } = parse(period, req.query);
  const threshold = parse(z.coerce.number().int().min(0).default(5), req.query.threshold);
  const params = [from, to];
  const done = "o.status <> 'cancelled' AND o.created_at::date BETWEEN $1 AND $2";
  const [summary] = await query(
    `SELECT count(*) AS orders, COALESCE(sum(o.subtotal - o.discount_sum), 0) AS revenue,
            COALESCE(round(avg(o.subtotal - o.discount_sum), 2), 0) AS avg_check,
            count(DISTINCT o.user_id) AS buyers
       FROM orders o WHERE ${done}`, params);
  const byDay = await query(
    `SELECT to_char(d, 'YYYY-MM-DD') AS day,
            COALESCE((SELECT sum(o.subtotal - o.discount_sum) FROM orders o
                       WHERE o.created_at::date = d AND o.status <> 'cancelled'), 0) AS revenue
       FROM generate_series($1::date, $2::date, interval '1 day') AS d ORDER BY d`, params);
  const topBooks = await query(
    `SELECT b.book_id, b.title, sum(oi.quantity) AS sold, sum(oi.quantity * oi.price) AS revenue
       FROM order_items oi JOIN orders o ON o.order_id = oi.order_id JOIN books b ON b.book_id = oi.book_id
      WHERE ${done} GROUP BY b.book_id ORDER BY sold DESC, revenue DESC LIMIT 10`, params);
  const byGenre = await query(
    `SELECT g.name, sum(oi.quantity) AS sold
       FROM order_items oi JOIN orders o ON o.order_id = oi.order_id
       JOIN book_genres bg ON bg.book_id = oi.book_id JOIN genres g ON g.genre_id = bg.genre_id
      WHERE ${done} GROUP BY g.name ORDER BY sold DESC`, params);
  const lowStock = await query(
    "SELECT book_id, title, stock FROM books WHERE stock <= $1 ORDER BY stock, title", [threshold]);
  res.json({ from, to, summary, byDay, topBooks, byGenre, lowStock });
}));
