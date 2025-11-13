import { create } from "zustand";
import { persist } from "zustand/middleware";
import { debounce } from "lodash";

import useAuthStore from "./authStore";
import { getUserCart, updateUserCart } from "@/api/cartApi";

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalPrice = items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );
  return { totalItems, totalPrice };
};

// Debounced function to update the cart in Supabase
// This prevents excessive API calls, e.g., when rapidly changing quantity
const debouncedUpdate = debounce(async (userId, items) => {
  await updateUserCart({ userId, cartData: items });
}, 1000); // 1-second debounce delay

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Action to completely replace the cart (e.g., after fetching from DB)
      setCart: (items) => {
        const { totalItems, totalPrice } = calculateTotals(items);
        set({ items, totalItems, totalPrice });
      },

      // Action to sync local (guest) cart with remote (Supabase) cart on login
      syncAndMergeCart: async (userId) => {
        const localCart = get().items;
        const remoteCart = await getUserCart(userId);

        if (remoteCart && Array.isArray(remoteCart)) {
          // If a remote cart exists, it's the source of truth.
          // A more complex merge logic could be implemented here if needed.
          // For now, we prioritize the remote cart.
          get().setCart(remoteCart);
        } else if (localCart.length > 0) {
          // If no remote cart but a local cart exists, upload the local cart.
          await updateUserCart({ userId, cartData: localCart });
        }
      },

      // Wrapped action to add a product to the cart
      addToCart: (productToAdd) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === productToAdd.id &&
              item.size === productToAdd.size &&
              item.color === productToAdd.color,
          );

          let newItems;
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === productToAdd.id &&
              item.size === productToAdd.size &&
              item.color === productToAdd.color
                ? { ...item, quantity: item.quantity + productToAdd.quantity }
                : item,
            );
          } else {
            newItems = [...state.items, { ...productToAdd }];
          }
          
          const { totalItems, totalPrice } = calculateTotals(newItems);
          
          // Sync with Supabase if user is logged in
          const { user } = useAuthStore.getState();
          if (user) {
            debouncedUpdate(user.id, newItems);
          }

          return { items: newItems, totalItems, totalPrice };
        });
      },

      // Wrapped action to remove a product from the cart
      removeFromCart: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const { totalItems, totalPrice } = calculateTotals(newItems);

          const { user } = useAuthStore.getState();
          if (user) {
            debouncedUpdate(user.id, newItems);
          }

          return { items: newItems, totalItems, totalPrice };
        });
      },

      // Wrapped action to update the quantity of a specific product
      updateQuantity: (productId, newQuantity) => {
        set((state) => {
          let newItems;
          if (newQuantity < 1) {
            newItems = state.items.filter((item) => item.id !== productId);
          } else {
            newItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item,
            );
          }
          const { totalItems, totalPrice } = calculateTotals(newItems);

          const { user } = useAuthStore.getState();
          if (user) {
            debouncedUpdate(user.id, newItems);
          }

          return { items: newItems, totalItems, totalPrice };
        });
      },

      // Wrapped action to clear the entire cart
      clearCart: () => {
        const { user } = useAuthStore.getState();
        if (user) {
          // For logged-in users, sync the empty cart to the backend
          debouncedUpdate.cancel(); // Cancel any pending updates
          updateUserCart({ userId: user.id, cartData: [] });
        }
        // Clear the state for both guests and logged-in users
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage", // Key for localStorage (used for guest cart)
    },
  ),
);

export default useCartStore;

