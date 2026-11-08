import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import { loadUser } from "./auth";
import { errorHandler } from "./http";
import { authRouter } from "./routes/auth";
import { catalogRouter } from "./routes/catalog";
import { shopRouter } from "./routes/shop";
import { adminRouter } from "./routes/admin";
import { filesRouter } from "./routes/files";
import { i18nRouter } from "./routes/i18n";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.frontendUrl, credentials: true }));
  app.use(express.json({ limit: "200kb" }));
  app.use(cookieParser());
  app.use(loadUser);

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRouter);
  app.use("/api", catalogRouter);
  app.use("/api", shopRouter);
  app.use("/api", filesRouter);
  app.use("/api", i18nRouter);
  app.use("/api/admin", adminRouter);

  app.use((_req, res) => res.status(404).json({ error: "NOT_FOUND", message: "Маршрут не найден" }));
  app.use(errorHandler);
  return app;
}
