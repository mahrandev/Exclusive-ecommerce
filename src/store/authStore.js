// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signOut } from "@/api/authApi";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // تسجيل الدخول
      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData.user,
        }),

      // تسجيل الخروج
      logout: async () => {
        try {
          // استدعاء دالة signOut من Supabase
          await signOut();

          // تحديث الحالة المحلية
          set({ isAuthenticated: false, user: null });

          // مسح localStorage
          localStorage.removeItem("auth-storage");

          return { success: true };
        } catch (error) {
          console.error("Logout error:", error);
          return { success: false, error: error.message };
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
