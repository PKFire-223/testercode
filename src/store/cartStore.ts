// src/store/cartStore.ts
// Bùi Trương Nhật Quang 23521276
import { create } from "zustand";
import { Product } from "../api/products";

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  rate: number;
  countRating: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  modalProductId: number | null;
  addItem: (product: Product) => boolean;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  removeItem: (productId: number) => void;
  setModalProductId: (productId: number | null) => void;
}

const calcTotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0);

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  modalProductId: null,

  addItem(product) {
    const items = get().items;
    const existing = items.find((it) => it.productId === product.id);
    if (existing) {
      return false;
    }
    const newItems: CartItem[] = [
      ...items,
      {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rate: product.rating.rate,
        countRating: product.rating.count,
        quantity: 1,
      },
    ];
    set({ items: newItems, total: calcTotal(newItems) });
    return true;
  },

  increase(productId) {
    const items = get().items.map((it) =>
      it.productId === productId ? { ...it, quantity: it.quantity + 1 } : it
    );
    set({ items, total: calcTotal(items) });
  },

  decrease(productId) {
    const current = get().items.find((it) => it.productId === productId);
    if (!current) return;
    if (current.quantity <= 1) {
      set({ modalProductId: productId });
      return;
    }
    const items = get().items.map((it) =>
      it.productId === productId ? { ...it, quantity: it.quantity - 1 } : it
    );
    set({ items, total: calcTotal(items) });
  },

  removeItem(productId) {
    const items = get().items.filter((it) => it.productId !== productId);
    set({ items, total: calcTotal(items), modalProductId: null });
  },

  setModalProductId(productId) {
    set({ modalProductId: productId });
  },
}));
