import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config, ROLE, RoleName } from "./config";
import { one } from "./db";
import { HttpError } from "./http";

export interface SessionUser {
  id: number;
  role: RoleName;
  email: string;
  firstName: string;
  lastName: string;
  lang: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

export const COOKIE = "session";
const MAX_AGE_MS = 7 * 24 * 3600 * 1000;

export function setSession(res: Response, userId: number, role: RoleName) {
  const token = jwt.sign({ uid: userId, role }, config.jwtSecret, { expiresIn: "7d" });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.cookieSecure,
    maxAge: MAX_AGE_MS,
    path: "/",
  });
}

export function clearSession(res: Response) {
  res.clearCookie(COOKIE, { path: "/" });
}

// Токен проверяется подписью, а роль и активность – по базе при каждом запросе
export async function loadUser(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE];
  if (!token) return next();
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { uid: number };
    const row = await one<any>(
      `SELECT u.user_id, r.name AS role, u.email, u.first_name, u.last_name, u.lang
         FROM users u JOIN roles r ON r.role_id = u.role_id
        WHERE u.user_id = $1 AND u.is_active`,
      [payload.uid],
    );
    if (row) {
      req.user = {
        id: row.user_id, role: row.role, email: row.email,
        firstName: row.first_name, lastName: row.last_name, lang: row.lang,
      };
    }
  } catch {
    // просроченный или подделанный токен равнозначен его отсутствию
  }
  next();
}

export const requireRole =
  (...roles: RoleName[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new HttpError(401, "UNAUTHORIZED", "Требуется вход"));
    if (!roles.includes(req.user.role)) return next(new HttpError(403, "FORBIDDEN", "Недостаточно прав"));
    next();
  };

export const roleId = (role: RoleName) => ROLE[role];
