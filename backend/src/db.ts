import { Pool, PoolClient, QueryResultRow, types } from "pg";
import { config } from "./config";

// NUMERIC и BIGINT приходят строками; деньги и количества переводим в числа
types.setTypeParser(types.builtins.NUMERIC, (v) => Number(v));
types.setTypeParser(types.builtins.INT8, (v) => Number(v));

export const pool = new Pool({ connectionString: config.databaseUrl, max: 10 });

export async function query<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
  const result = await pool.query<T>(sql, params);
  return result.rows;
}

export async function one<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function transaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
