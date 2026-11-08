import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Не задана переменная окружения ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required("DATABASE_URL", "postgresql://postgres:123@localhost:5432/proknigi"),
  jwtSecret: required("JWT_SECRET", "dev-secret-change-me"),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
  },
  mailFrom: process.env.MAIL_FROM ?? "ПРОКниги <no-reply@proknigi.by>",
};

export const ROLE = { buyer: 1, admin: 2 } as const;
export type RoleName = keyof typeof ROLE;
