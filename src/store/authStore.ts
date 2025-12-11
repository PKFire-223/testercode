// src/store/authStore.ts
// Bùi Trương Nhật Quang 23521276
import { create } from "zustand";
import type { User } from "../api/users";

const VALID_USERNAME = "IE307"; 
const VALID_PASSWORD = "123";

interface AuthState {
  token: string | null;
  userId: number | null;
  username: string | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setProfile: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  username: null,
  profile: null,
  loading: false,
  error: null,

  async login(username, password) {
    set({ loading: true, error: null });

    await new Promise((r) => setTimeout(r, 300)); 

    const ok =
      username.trim() === VALID_USERNAME &&
      password === VALID_PASSWORD;

    if (ok) {
      set({
        token: "LOCAL_DUMMY_TOKEN",
        userId: 1, 
        username: username.trim(),
        profile: null, 
        loading: false,
        error: null,
      });
      return true;
    }

    set({
      token: null,
      userId: null,
      username: null,
      profile: null,
      loading: false,
      error: "Sai tên đăng nhập hoặc mật khẩu",
    });
    return false;
  },

  logout() {
    set({
      token: null,
      userId: null,
      username: null,
      profile: null,
      loading: false,
      error: null,
    });
  },

  setProfile(user) {
    set({ profile: user });
  },
}));
