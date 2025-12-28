// Bùi Trương Nhật Quang 23521276
import * as SQLite from "expo-sqlite";
import type { PlaceRow } from "../models/Place";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

const getDb = () => {
  if (!dbPromise) dbPromise = SQLite.openDatabaseAsync("places.db");
  return dbPromise;
};

export const initDb = async () => {
  const db = await getDb();
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL, address TEXT);"
  );
};

export const insertPlace = async (
  title: string,
  imageUri: string,
  lat: number,
  lng: number,
  address: string | null
) => {
  const db = await getDb();
  const result = await db.runAsync(
    "INSERT INTO places (title, imageUri, lat, lng, address) VALUES (?, ?, ?, ?, ?);",
    title,
    imageUri,
    lat,
    lng,
    address
  );
  return Number(result.lastInsertRowId);
};

export const fetchPlaces = async () => {
  const db = await getDb();
  return db.getAllAsync<PlaceRow>("SELECT * FROM places ORDER BY id DESC;");
};

export const fetchPlaceById = async (id: number) => {
  const db = await getDb();
  const row = await db.getFirstAsync<PlaceRow>(
    "SELECT * FROM places WHERE id = ? LIMIT 1;",
    id
  );
  return row ?? null;
};
