// src/api/products.ts
// Bùi Trương Nhật Quang 23521276
import { api } from "./client";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export async function getAllProducts() {
  const res = await api.get<Product[]>("/products");
  return res.data;
}

export async function getProductById(id: number) {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}

export async function getProductsByCategory(category: string) {
  if (category === "all") return getAllProducts();
  const res = await api.get<Product[]>(`/products/category/${category}`);
  return res.data;
}

export async function getCategories() {
  const res = await api.get<string[]>("/products/categories");
  return ["all", ...res.data];
}
