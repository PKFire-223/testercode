// src/api/users.ts
// Bùi Trương Nhật Quang 23521276
import { api } from "./client";

export interface Name {
  firstname: string;
  lastname: string;
}

export interface Address {
  number: number;
  street: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  name: Name;
  address: Address;
  phone: string;
}

export async function getUser(id: number) {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

export async function updateUser(id: number, data: Partial<User>) {
  const res = await api.put<User>(`/users/${id}`, data);
  return res.data;
}

export async function getUsers() {
  const res = await api.get<User[]>("/users");
  return res.data;
}
