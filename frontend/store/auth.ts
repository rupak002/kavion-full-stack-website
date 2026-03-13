"use client";

import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem("kavion_token", token);
    localStorage.setItem("kavion_user", JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem("kavion_token");
    localStorage.removeItem("kavion_user");
    set({ token: null, user: null });
  },
  hydrate: () => {
    const token = localStorage.getItem("kavion_token");
    const userRaw = localStorage.getItem("kavion_user");
    if (!token || !userRaw) return;
    try {
      set({ token, user: JSON.parse(userRaw) });
    } catch {
      localStorage.removeItem("kavion_token");
      localStorage.removeItem("kavion_user");
    }
  },
}));
