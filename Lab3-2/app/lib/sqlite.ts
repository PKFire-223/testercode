// 23521276 Bùi Trương Nhật Quang
import * as SQLite from 'expo-sqlite';

export type Note = {
  id: number;
  title: string;
  content: string | null;
  createdAt: number;
  updatedAt: number;
};

export type Settings = {
  id: number;       
  darkMode: number; 
  fontSize: number; 
};

export const db = SQLite.openDatabaseSync('ie307_lab3_notes.db');

export async function initDb() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      darkMode INTEGER NOT NULL DEFAULT 0,
      fontSize INTEGER NOT NULL DEFAULT 16
    );
    INSERT OR IGNORE INTO settings(id, darkMode, fontSize) VALUES (1, 0, 16);
  `);
}


export async function getAllNotes(): Promise<Note[]> {
  const rows = await db.getAllAsync<Note>('SELECT * FROM notes ORDER BY updatedAt DESC');
  return rows;
}

export async function insertNote(title: string, content: string | null) {
  const now = Date.now();
  await db.runAsync(
    'INSERT INTO notes(title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
    [title, content, now, now]
  );
}

export async function updateNote(id: number, title: string, content: string | null) {
  const now = Date.now();
  await db.runAsync(
    'UPDATE notes SET title = ?, content = ?, updatedAt = ? WHERE id = ?',
    [title, content, now, id]
  );
}

export async function deleteNote(id: number) {
  await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
}

export async function getSettings(): Promise<Settings> {
  const row = await db.getFirstAsync<Settings>('SELECT * FROM settings WHERE id = 1');
  return row ?? { id: 1, darkMode: 0, fontSize: 16 };
}

export async function setDarkMode(enabled: boolean) {
  await db.runAsync('UPDATE settings SET darkMode = ? WHERE id = 1', [enabled ? 1 : 0]);
}

export async function setFontSize(size: number) {
  await db.runAsync('UPDATE settings SET fontSize = ? WHERE id = 1', [size]);
}
