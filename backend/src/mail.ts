import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { config } from "./config";

const outbox = path.resolve(__dirname, "..", "mail-outbox");

const transport = config.smtp.host
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    })
  : nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });

// Без SMTP письмо сохраняется в файл .eml: его можно открыть почтовым клиентом
export async function sendMail(to: string, subject: string, html: string) {
  const info: any = await transport.sendMail({ from: config.mailFrom, to, subject, html });
  if (!config.smtp.host) {
    fs.mkdirSync(outbox, { recursive: true });
    const file = path.join(outbox, `${Date.now()}-${to.replace(/[^a-z0-9@.]/gi, "_")}.eml`);
    fs.writeFileSync(file, info.message);
    console.log(`[mail] ${subject} -> ${to} (${file})`);
  }
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function confirmEmailHtml(name: string, link: string) {
  return `<p>Здравствуйте, ${escape(name)}!</p>
<p>Для завершения регистрации в магазине «ПРОКниги» подтвердите адрес почты:</p>
<p><a href="${link}">${link}</a></p>
<p>Ссылка действует 24 часа.</p>`;
}

export function orderEmailHtml(name: string, order: any, items: any[]) {
  const rows = items
    .map((i) => `<tr><td>${escape(i.title)}</td><td>${i.quantity}</td><td>${i.price.toFixed(2)} BYN</td></tr>`)
    .join("");
  return `<p>Здравствуйте, ${escape(name)}!</p>
<p>Заказ № ${order.order_id} оформлен.</p>
<table border="1" cellpadding="4" cellspacing="0"><tr><th>Книга</th><th>Кол-во</th><th>Цена</th></tr>${rows}</table>
<p>Сумма: ${order.subtotal.toFixed(2)} BYN, скидка: ${order.discount_sum.toFixed(2)} BYN.</p>
<p><b>К оплате: ${order.total.toFixed(2)} ${order.currency_code}</b></p>`;
}
