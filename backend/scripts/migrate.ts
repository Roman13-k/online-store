import fs from "fs";
import path from "path";
import { pool } from "../src/db";

async function main() {
  const reset = process.argv.includes("--reset");
  if (reset) {
    await pool.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
    console.log("Схема public пересоздана");
  }
  await pool.query("CREATE TABLE IF NOT EXISTS schema_migrations (file TEXT PRIMARY KEY, applied_at TIMESTAMPTZ DEFAULT now())");
  const dir = path.resolve(__dirname, "..", "sql");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files) {
    const done = await pool.query("SELECT 1 FROM schema_migrations WHERE file = $1", [file]);
    if (done.rowCount) continue;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
      await client.query("INSERT INTO schema_migrations (file) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`применён ${file}`);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
  await pool.end();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
