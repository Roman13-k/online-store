import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { pool } from "../src/db";
import { books, coverUrl, currencies, genres, publishers } from "./seed-data";

function flatten(obj: any, prefix = "", out: [string, string][] = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") flatten(v, key, out);
    else out.push([key, String(v)]);
  }
  return out;
}

async function seedUiStrings() {
  const dir = path.resolve(__dirname, "..", "..", "frontend", "messages");
  await pool.query("DELETE FROM ui_strings");
  for (const lang of ["ru", "be", "en"]) {
    const file = path.join(dir, `${lang}.json`);
    if (!fs.existsSync(file)) continue;
    const pairs = flatten(JSON.parse(fs.readFileSync(file, "utf8")));
    await pool.query(
      "INSERT INTO ui_strings (key, lang, text) SELECT k, $1, t FROM unnest($2::text[], $3::text[]) AS x(k, t)",
      [lang, pairs.map((p) => p[0]), pairs.map((p) => p[1])],
    );
    console.log(`строки интерфейса ${lang}: ${pairs.length}`);
  }
}

async function main() {
  const onlyUi = process.argv.includes("--ui");
  if (onlyUi) {
    await seedUiStrings();
    return pool.end();
  }
  await pool.query("INSERT INTO roles VALUES (1, 'buyer'), (2, 'admin') ON CONFLICT DO NOTHING");
  for (const [code, name, rate] of currencies) {
    await pool.query("INSERT INTO currencies VALUES ($1, $2, $3, CURRENT_DATE) ON CONFLICT DO NOTHING", [code, name, rate]);
  }
  for (const [name, country] of publishers) {
    await pool.query("INSERT INTO publishers (name, country) VALUES ($1, $2) ON CONFLICT DO NOTHING", [name, country]);
  }
  for (const g of genres) await pool.query("INSERT INTO genres (name) VALUES ($1) ON CONFLICT DO NOTHING", [g]);

  for (const [isbn, title, authors, gs, pub, year, pages, price, stock, annotation] of books) {
    const { rows } = await pool.query(
      `INSERT INTO books (isbn, title, publisher_id, publish_year, pages, price, stock, annotation, cover_url, created_at)
       SELECT $1, $2, publisher_id, $4, $5, $6, $7, $8, $9, now() - random() * interval '90 days'
         FROM publishers WHERE name = $3
       ON CONFLICT (isbn) DO UPDATE SET title = EXCLUDED.title RETURNING book_id`,
      [isbn, title, pub, year, pages, price, stock, annotation, coverUrl(isbn)],
    );
    const bookId = rows[0].book_id;
    for (const full of authors) {
      const parts = full.split(" ");
      const last = parts.pop()!;
      const a = await pool.query(
        `INSERT INTO authors (last_name, first_name) VALUES ($1, $2)
         ON CONFLICT (last_name, first_name) DO UPDATE SET last_name = EXCLUDED.last_name RETURNING author_id`,
        [last, parts.join(" ")],
      );
      await pool.query("INSERT INTO book_authors VALUES ($1, $2) ON CONFLICT DO NOTHING", [bookId, a.rows[0].author_id]);
    }
    for (const g of gs) {
      await pool.query(
        "INSERT INTO book_genres SELECT $1, genre_id FROM genres WHERE name = $2 ON CONFLICT DO NOTHING",
        [bookId, g],
      );
    }
  }

  await pool.query(
    `INSERT INTO discounts (name, percent, starts_on, ends_on, min_sum, is_active) VALUES
       ('Книжная осень', 10, date_trunc('month', CURRENT_DATE), date_trunc('month', CURRENT_DATE) + interval '2 months', 60, TRUE),
       ('Крупный заказ', 15, CURRENT_DATE - 30, CURRENT_DATE + 365, 200, TRUE),
       ('Летняя распродажа', 20, CURRENT_DATE - 160, CURRENT_DATE - 100, 0, FALSE)`,
  );

  const users = [
    [2, "admin@proknigi.by", "Admin12345", "Роман", "Кучук"],
    [1, "buyer@proknigi.by", "Buyer12345", "Анна", "Ковалёва"],
    [1, "ivan@proknigi.by", "Buyer12345", "Иван", "Петров"],
    [1, "olga@proknigi.by", "Buyer12345", "Ольга", "Сидорович"],
  ] as const;
  for (const [role, email, pass, first, last] of users) {
    await pool.query(
      `INSERT INTO users (role_id, email, password_hash, first_name, last_name, email_confirmed)
       VALUES ($1, $2, $3, $4, $5, TRUE) ON CONFLICT DO NOTHING`,
      [role, email, await bcrypt.hash(pass, 10), first, last],
    );
  }

  // История заказов за последний месяц для отчётов и аналитики
  const buyers = (await pool.query("SELECT user_id FROM users WHERE role_id = 1")).rows.map((r) => r.user_id);
  const bookIds = (await pool.query("SELECT book_id FROM books WHERE stock > 3")).rows.map((r) => r.book_id);
  const statuses = ["issued", "issued", "issued", "packed", "paid", "new", "cancelled"];
  for (let i = 0; i < 28; i++) {
    const user = buyers[i % buyers.length];
    const cart = (await pool.query("SELECT cart_id FROM carts WHERE user_id = $1", [user])).rows[0].cart_id;
    const n = 1 + (i % 3);
    for (let k = 0; k < n; k++) {
      await pool.query(
        "INSERT INTO cart_items VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [cart, bookIds[(i * 5 + k * 7) % bookIds.length], 1 + ((i + k) % 2)],
      );
    }
    const currency = ["BYN", "BYN", "USD", "EUR", "RUB"][i % 5];
    const id = (await pool.query("SELECT place_order($1, $2) AS id", [user, currency])).rows[0].id;
    const status = statuses[i % statuses.length];
    if (status === "cancelled") await pool.query("SELECT cancel_order($1)", [id]);
    else await pool.query("UPDATE orders SET status = $1 WHERE order_id = $2", [status, id]);
    await pool.query("UPDATE orders SET created_at = now() - ($1 || ' days')::interval - interval '3 hours' WHERE order_id = $2", [28 - i, id]);
  }

  const reviews = [
    ["buyer@proknigi.by", "9780141180144", 5, "Перечитываю каждый год, издание аккуратное."],
    ["ivan@proknigi.by", "9780141180144", 4, "Отличная книга, бумага могла бы быть плотнее."],
    ["olga@proknigi.by", "9780451524935", 5, "Страшно актуально."],
    ["buyer@proknigi.by", "9780547928227", 5, "Купила ребёнку, читали вместе."],
    ["ivan@proknigi.by", "9780132350884", 4, "Полезно для любого разработчика."],
  ] as const;
  for (const [email, isbn, rating, body] of reviews) {
    await pool.query(
      `INSERT INTO reviews (user_id, book_id, rating, body)
       SELECT u.user_id, b.book_id, $3, $4 FROM users u, books b WHERE u.email = $1 AND b.isbn = $2
       ON CONFLICT DO NOTHING`,
      [email, isbn, rating, body],
    );
  }
  await seedUiStrings();
  console.log("Тестовые данные загружены");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
