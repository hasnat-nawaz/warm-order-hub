import "dotenv/config";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { pool } from "../src/db.js";

const here = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(here, "../db/schema.sql");

async function main() {
  const sql = await readFile(schemaPath, "utf8");
  await pool.query(sql);
  await pool.end();
  // eslint-disable-next-line no-console
  console.log(`Applied schema: ${schemaPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
