import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DB_PATH lets the E2E test server point at a throwaway database instead of
// the real one (see playwright.config.ts), so running tests never touches
// anyone's actual account data.
const dbPath = process.env.DB_PATH ?? path.join(__dirname, 'trazo.db');

export const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS character_progress (
    user_id INTEGER NOT NULL REFERENCES users(id),
    character_id TEXT NOT NULL,
    best_score INTEGER NOT NULL,
    attempts INTEGER NOT NULL,
    PRIMARY KEY (user_id, character_id)
  );

  CREATE TABLE IF NOT EXISTS lesson_progress (
    user_id INTEGER NOT NULL REFERENCES users(id),
    lesson_id TEXT NOT NULL,
    stars INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT,
    PRIMARY KEY (user_id, lesson_id)
  );

  CREATE TABLE IF NOT EXISTS user_state (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_practice_date TEXT,
    total_xp INTEGER NOT NULL DEFAULT 0,
    hearts INTEGER NOT NULL DEFAULT 5
  );
`);
