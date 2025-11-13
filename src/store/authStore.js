import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signOut } from "@/api/authApi";
import useCartStore from "./cartStore";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userData) => {
        set({
          isAuthenticated: true,
          user: userData.user,
        });
        // Trigger cart sync after a new login
        useCartStore.getState().syncAndMergeCart(userData.user.id);
      },

      logout: async () => {
        try {
          await signOut();
          
          // Clear auth state first
          set({ isAuthenticated: false, user: null });

          // Then, clear the cart to reset to guest state
          useCartStore.getState().clearCart();
          
          // Manually clear auth storage to be certain
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
      // ✅ **BUG FIX**: Add onRehydrateStorage to sync cart on app load for logged-in users.
      onRehydrateStorage: () => (state) => {
        // This function runs after the state has been restored from localStorage.
        if (state && state.isAuthenticated) {
          // If the rehydrated state shows an authenticated user, sync their cart.
          useCartStore.getState().syncAndMergeCart(state.user.id);
        }
      },
    },
  ),
);

export default useAuthStore;

