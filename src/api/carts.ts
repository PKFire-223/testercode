// src/api/carts.ts
// Bùi Trương Nhật Quang 23521276
import { api } from "./client";

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

export async function getCartsByUser(userId: number) {
  const res = await api.get<Cart[]>(`/carts/user/${userId}`);
  return res.data;
}

export async function createCart(userId: number, products: CartProduct[]) {
  const res = await api.post<Cart>("/carts", {
    userId,
    date: new Date().toISOString(),
    products,
  });
  return res.data;
}

export async function updateCart(cartId: number, userId: number, products: CartProduct[]) {
  const res = await api.put<Cart>(`/carts/${cartId}`, {
    userId,
    date: new Date().toISOString(),
    products,
  });
  return res.data;
}

export async function deleteCart(cartId: number) {
  const res = await api.delete<Cart>(`/carts/${cartId}`);
  return res.data;
}
