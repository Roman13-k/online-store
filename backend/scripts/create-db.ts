import { Client } from "pg";
import { config } from "../src/config";

// Создаёт базу из DATABASE_URL, подключаясь к служебной базе postgres
async function main() {
  const url = new URL(config.databaseUrl);
  const name = url.pathname.slice(1);
  if (!/^[a-z_][a-z0-9_]*$/.test(name)) throw new Error(`Недопустимое имя базы: ${name}`);
  url.pathname = "/postgres";
  const client = new Client({ connectionString: url.toString() });
  await client.connect();
  const exists = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [name]);
  if (exists.rowCount) {
    console.log(`База ${name} уже существует`);
  } else {
    await client.query(`CREATE DATABASE ${name} ENCODING 'UTF8' TEMPLATE template0`);
    console.log(`База ${name} создана`);
  }
  await client.end();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
