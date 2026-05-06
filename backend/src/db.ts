import pg from "pg";

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
  // Neon requires TLS. If DATABASE_URL already includes sslmode=require, this is fine.
  ssl:
    DATABASE_URL.includes("sslmode=require") || DATABASE_URL.includes("ssl=true")
      ? { rejectUnauthorized: false }
      : undefined,
});
