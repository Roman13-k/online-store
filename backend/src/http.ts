import { NextFunction, Request, RequestHandler, Response } from "express";
import { z, ZodType } from "zod";

export class HttpError extends Error {
  constructor(public status: number, public code: string, message?: string) {
    super(message ?? code);
  }
}

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

export function parse<T extends ZodType>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const field = result.error.issues[0]?.path.join(".") || "body";
    throw new HttpError(400, "VALIDATION", `Неверное значение поля ${field}`);
  }
  return result.data;
}

export const idParam = z.coerce.number().int().positive();

// Ошибки PostgreSQL переводятся в понятные коды ответа
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.code, message: err.message });
  }
  // текст ошибки СУБД наружу не передаётся: он раскрывает имена таблиц и индексов
  if (err?.code === "23505") return res.status(409).json({ error: "DUPLICATE", message: "Запись с таким значением уже существует" });
  if (err?.code === "23503") return res.status(409).json({ error: "IN_USE", message: "Запись используется в других таблицах" });
  if (err?.code === "23514") return res.status(400).json({ error: "CONSTRAINT", message: "Значение нарушает ограничение целостности" });
  if (err?.code === "P0001") {
    const [code, ...rest] = String(err.message).split(":");
    return res.status(409).json({ error: code.trim(), message: rest.join(":").trim() || code });
  }
  console.error(err);
  return res.status(500).json({ error: "SERVER", message: "Внутренняя ошибка сервера" });
}
