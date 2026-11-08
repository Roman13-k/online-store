import { Router } from "express";
import { z } from "zod";
import { requireRole } from "../auth";
import { one, query } from "../db";
import { asyncHandler, HttpError, idParam, parse } from "../http";
import { orderEmailHtml, sendMail } from "../mail";

export const shopRouter = Router();
const buyer = requireRole("buyer");

const cartSql = `
  SELECT ci.book_id, ci.quantity, v.title, v.authors, v.cover_url, v.stock, v.price_byn,
         round(v.price_byn * ci.quantity, 2) AS sum_byn
    FROM carts c
    JOIN cart_items ci ON ci.cart_id = c.cart_id
    JOIN v_book_cards v ON v.book_id = ci.book_id
   WHERE c.user_id = $1
   ORDER BY v.title`;

shopRouter.get("/cart", buyer, asyncHandler(async (req, res) => {
  res.json(await query(cartSql, [req.user!.id]));
}));

shopRouter.put("/cart/items/:bookId", buyer, asyncHandler(async (req, res) => {
  const bookId = parse(idParam, req.params.bookId);
  const { quantity } = parse(z.object({ quantity: z.number().int().min(0).max(99) }), req.body);
  if (quantity === 0) {
    await query(
      "DELETE FROM cart_items WHERE book_id = $1 AND cart_id = (SELECT cart_id FROM carts WHERE user_id = $2)",
      [bookId, req.user!.id],
    );
  } else {
    await query(
      `INSERT INTO cart_items (cart_id, book_id, quantity)
       SELECT cart_id, $1, $2 FROM carts WHERE user_id = $3
       ON CONFLICT (cart_id, book_id) DO UPDATE SET quantity = EXCLUDED.quantity`,
      [bookId, quantity, req.user!.id],
    );
  }
  res.json(await query(cartSql, [req.user!.id]));
}));

shopRouter.delete("/cart", buyer, asyncHandler(async (req, res) => {
  await query("DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM carts WHERE user_id = $1)", [req.user!.id]);
  res.json([]);
}));

const currencySchema = z.string().regex(/^[A-Z]{3}$/).default("BYN");

// Предварительный расчёт повторяет правила функции place_order, но ничего не записывает
shopRouter.get("/orders/preview", buyer, asyncHandler(async (req, res) => {
  const currency = parse(currencySchema, req.query.currency);
  const row = await one<any>(
    `WITH s AS (
       SELECT COALESCE(round(sum(v.price_byn * ci.quantity), 2), 0) AS subtotal
         FROM carts c JOIN cart_items ci ON ci.cart_id = c.cart_id
         JOIN v_book_cards v ON v.book_id = ci.book_id WHERE c.user_id = $1),
     d AS (
       SELECT d.discount_id, d.name, d.percent FROM discounts d, s
        WHERE d.is_active AND CURRENT_DATE BETWEEN d.starts_on AND d.ends_on AND d.min_sum <= s.subtotal
        ORDER BY d.percent DESC LIMIT 1)
     SELECT s.subtotal, d.name AS discount_name, COALESCE(d.percent, 0) AS percent,
            round(s.subtotal * COALESCE(d.percent, 0) / 100, 2) AS discount_sum, c.rate_to_byn
       FROM s LEFT JOIN d ON TRUE JOIN currencies c ON c.currency_code = $2`,
    [req.user!.id, currency],
  );
  if (!row) throw new HttpError(400, "CURRENCY_UNKNOWN", "Неизвестная валюта");
  const total = Math.round(((row.subtotal - row.discount_sum) / row.rate_to_byn) * 100) / 100;
  res.json({ ...row, currency, total });
}));

shopRouter.post("/orders", buyer, asyncHandler(async (req, res) => {
  const { currency } = parse(z.object({ currency: currencySchema }), req.body);
  const created = await one<{ id: number }>("SELECT place_order($1, $2) AS id", [req.user!.id, currency]);
  const order = await loadOrder(created!.id, req.user!.id);
  sendMail(req.user!.email, `Заказ № ${order.order_id} оформлен`, orderEmailHtml(req.user!.firstName, order, order.items))
    .catch((e) => console.error("[mail]", e));
  res.status(201).json(order);
}));

export async function loadOrder(orderId: number, userId?: number) {
  const order = await one<any>(
    `SELECT o.*, d.name AS discount_name, d.percent, u.email, u.first_name, u.last_name
       FROM orders o JOIN users u ON u.user_id = o.user_id
       LEFT JOIN discounts d ON d.discount_id = o.discount_id
      WHERE o.order_id = $1 AND ($2::int IS NULL OR o.user_id = $2)`,
    [orderId, userId ?? null],
  );
  if (!order) throw new HttpError(404, "NOT_FOUND", "Заказ не найден");
  order.items = await query(
    `SELECT oi.book_id, b.title, oi.quantity, oi.price, round(oi.price * oi.quantity, 2) AS sum
       FROM order_items oi JOIN books b ON b.book_id = oi.book_id
      WHERE oi.order_id = $1 ORDER BY b.title`,
    [orderId],
  );
  return order;
}

shopRouter.get("/orders", buyer, asyncHandler(async (req, res) => {
  res.json(await query(
    `SELECT o.order_id, o.created_at, o.status, o.total, o.currency_code,
            (SELECT sum(quantity) FROM order_items WHERE order_id = o.order_id) AS items
       FROM orders o WHERE o.user_id = $1 ORDER BY o.created_at DESC`,
    [req.user!.id],
  ));
}));

shopRouter.get("/orders/:id", requireRole("buyer", "admin"), asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  res.json(await loadOrder(id, req.user!.role === "admin" ? undefined : req.user!.id));
}));

shopRouter.post("/orders/:id/cancel", buyer, asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const order = await one<any>("SELECT status FROM orders WHERE order_id = $1 AND user_id = $2", [id, req.user!.id]);
  if (!order) throw new HttpError(404, "NOT_FOUND", "Заказ не найден");
  if (order.status !== "new") throw new HttpError(409, "ORDER_NOT_CANCELLABLE", "Отменить можно только новый заказ");
  await query("SELECT cancel_order($1)", [id]);
  res.json(await loadOrder(id, req.user!.id));
}));

// --- отзывы ---
shopRouter.get("/books/:id/reviews", asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  res.json(await query(
    `SELECT r.review_id, r.user_id, r.rating, r.body, r.created_at, u.first_name, u.last_name
       FROM reviews r JOIN users u ON u.user_id = r.user_id
      WHERE r.book_id = $1 ORDER BY r.created_at DESC`,
    [id],
  ));
}));

const reviewSchema = z.object({ rating: z.number().int().min(1).max(5), body: z.string().trim().max(2000) });

shopRouter.put("/books/:id/reviews", buyer, asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  const r = parse(reviewSchema, req.body);
  await query(
    `INSERT INTO reviews (user_id, book_id, rating, body) VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, book_id) DO UPDATE SET rating = EXCLUDED.rating, body = EXCLUDED.body, created_at = now()`,
    [req.user!.id, id, r.rating, r.body],
  );
  res.json({ ok: true });
}));

shopRouter.delete("/books/:id/reviews", buyer, asyncHandler(async (req, res) => {
  const id = parse(idParam, req.params.id);
  await query("DELETE FROM reviews WHERE user_id = $1 AND book_id = $2", [req.user!.id, id]);
  res.json({ ok: true });
}));
