// src/api/auth.ts
// Bùi Trương Nhật Quang 23521276
import { api } from "./client";

export interface LoginResponse {
  token: string;
}

export interface DecodedToken {
  sub?: number;        
  id?: number;
  userId?: number;
  username?: string;
  iat?: number;
}

export async function loginApi(username: string, password: string) {
  const res = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return res.data; 
}
