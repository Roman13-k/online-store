import { Router } from "express";
import { z } from "zod";
import { query } from "../db";
import { asyncHandler, parse } from "../http";

export const i18nRouter = Router();

// Ключи вида "header.cart" собираются в вложенный объект, который ожидает next-intl
export function nest(rows: { key: string; text: string }[]) {
  const root: Record<string, any> = {};
  for (const { key, text } of rows) {
    const parts = key.split(".");
    let node = root;
    parts.slice(0, -1).forEach((p) => (node = node[p] ??= {}));
    node[parts[parts.length - 1]] = text;
  }
  return root;
}

i18nRouter.get("/i18n/:lang", asyncHandler(async (req, res) => {
  const lang = parse(z.enum(["ru", "be", "en"]), req.params.lang);
  const rows = await query<{ key: string; text: string }>(
    `SELECT s.key, COALESCE(l.text, s.text) AS text
       FROM ui_strings s LEFT JOIN ui_strings l ON l.key = s.key AND l.lang = $1
      WHERE s.lang = 'ru'`,
    [lang],
  );
  res.setHeader("Cache-Control", "public, max-age=60");
  res.json(nest(rows));
}));
