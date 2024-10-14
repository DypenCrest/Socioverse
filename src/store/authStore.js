import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || {},
  isLoggedIn: !!localStorage.getItem("user"),

  login: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    set({ isLoggedIn: true, user });
  },

  logout: () => set({ isLoggedIn: false, user: {} }),

  setUser: (user) => set({ user }),
}));
