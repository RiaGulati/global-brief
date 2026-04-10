import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import path from "path";

// DB_PATH env var lets you point to a mounted volume (e.g. in Docker/Render)
const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(process.cwd(), "data.db");

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
