import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import path from "path";

// DB_PATH env var lets you point to a mounted volume (e.g. in Docker/Render)
const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(process.cwd(), "data.db");

const sqlite = new Database(dbPath);

// Create tables if they don't exist — no external migration step required.
// This runs synchronously at startup before any routes are registered.
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    headline TEXT NOT NULL,
    summary TEXT NOT NULL,
    why_it_matters TEXT NOT NULL,
    region TEXT NOT NULL,
    topic TEXT NOT NULL,
    confidence_level TEXT NOT NULL,
    source_count INTEGER NOT NULL,
    sources TEXT NOT NULL,
    core_facts TEXT NOT NULL,
    verified_points TEXT NOT NULL,
    disputed_details TEXT NOT NULL,
    framing_differences TEXT NOT NULL,
    is_common_ground INTEGER DEFAULT 0,
    is_still_developing INTEGER DEFAULT 0,
    published_at TEXT NOT NULL,
    changed_in_last_24h TEXT
  )
`);

export const db = drizzle(sqlite, { schema });
