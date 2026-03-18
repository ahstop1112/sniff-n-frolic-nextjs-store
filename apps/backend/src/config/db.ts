import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
console.log("DATABASE_URL in db.ts:", process.env.DATABASE_URL);

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL in apps/backend/.env");
}

export const pool = new Pool({
  connectionString: databaseUrl,
});