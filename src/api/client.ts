// src/api/client.ts
// Bùi Trương Nhật Quang 23521276
import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});
