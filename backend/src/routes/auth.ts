import crypto from "crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { clearSession, requireRole, roleId, setSession } from "../auth";
import { config, RoleName } from "../config";
import { one, query } from "../db";
import { asyncHandler, HttpError, parse } from "../http";
import { confirmEmailHtml, sendMail } from "../mail";

export const authRouter = Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

const registerSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(8).max(72),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(20).optional(),
  lang: z.enum(["ru", "be", "en"]).default("ru"),
});

const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

authRouter.post("/register", limiter, asyncHandler(async (req, res) => {
  const data = parse(registerSchema, req.body);
  const hash = await bcrypt.hash(data.password, 10);
  const token = crypto.randomBytes(32).toString("hex");
  const user = await one<{ user_id: number }>(
    `INSERT INTO users (role_id, email, password_hash, first_name, last_name, phone, lang,
                        confirm_token_hash, confirm_expires)
     VALUES ($1, lower($2), $3, $4, $5, $6, $7, $8, now() + interval '24 hours')
     RETURNING user_id`,
    [roleId("buyer"), data.email, hash, data.firstName, data.lastName, data.phone || null, data.lang, sha256(token)],
  );
  const link = `${config.frontendUrl}/${data.lang}/confirm?token=${token}`;
  await sendMail(data.email, "Подтверждение регистрации", confirmEmailHtml(data.firstName, link));
  res.status(201).json({ id: user!.user_id });
}));

authRouter.post("/confirm", asyncHandler(async (req, res) => {
  const { token } = parse(z.object({ token: z.string().regex(/^[a-f0-9]{64}$/) }), req.body);
  const user = await one<{ user_id: number }>(
    `UPDATE users SET email_confirmed = TRUE, confirm_token_hash = NULL, confirm_expires = NULL
      WHERE confirm_token_hash = $1 AND confirm_expires > now()
      RETURNING user_id`,
    [sha256(token)],
  );
  if (!user) throw new HttpError(400, "TOKEN_INVALID", "Ссылка недействительна или устарела");
  res.json({ confirmed: true });
}));

const loginSchema = z.object({ email: z.email(), password: z.string().min(1).max(72) });
// сравнение с фиктивным хешем выравнивает время ответа для несуществующей почты
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 10);

async function login(email: string, password: string, role: RoleName) {
  const user = await one<any>(
    `SELECT u.user_id, u.password_hash, u.email_confirmed, r.name AS role
       FROM users u JOIN roles r ON r.role_id = u.role_id
      WHERE lower(u.email) = lower($1) AND u.is_active`,
    [email],
  );
  const valid = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH);
  const ok = user && valid && user.role === role;
  if (!ok) throw new HttpError(401, "BAD_CREDENTIALS", "Неверная почта или пароль");
  if (role === "buyer" && !user.email_confirmed) {
    throw new HttpError(403, "EMAIL_NOT_CONFIRMED", "Подтвердите почту по ссылке из письма");
  }
  return user.user_id as number;
}

authRouter.post("/login", limiter, asyncHandler(async (req, res) => {
  const { email, password } = parse(loginSchema, req.body);
  setSession(res, await login(email, password, "buyer"), "buyer");
  res.json({ ok: true });
}));

authRouter.post("/admin/login", limiter, asyncHandler(async (req, res) => {
  const { email, password } = parse(loginSchema, req.body);
  setSession(res, await login(email, password, "admin"), "admin");
  res.json({ ok: true });
}));

authRouter.post("/logout", (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

authRouter.get("/me", asyncHandler(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  const extra = await one<any>("SELECT phone, registered_at FROM users WHERE user_id = $1", [req.user.id]);
  res.json({ user: { ...req.user, phone: extra?.phone ?? null, registeredAt: extra?.registered_at } });
}));

const profileSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().trim().max(20).optional().nullable(),
  lang: z.enum(["ru", "be", "en"]),
});

authRouter.put("/me", requireRole("buyer", "admin"), asyncHandler(async (req, res) => {
  const p = parse(profileSchema, req.body);
  await query(
    "UPDATE users SET first_name = $1, last_name = $2, phone = $3, lang = $4 WHERE user_id = $5",
    [p.firstName, p.lastName, p.phone || null, p.lang, req.user!.id],
  );
  res.json({ ok: true });
}));
