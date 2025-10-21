import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return { totalItems, totalPrice };
};

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Action to add a product to the cart
      addToCart: (productToAdd) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === productToAdd.id &&
              item.size === productToAdd.size &&
              item.color === productToAdd.color,
          );

          let newItems;
          if (existingItem) {
            // If item with same id, size, and color exists, update its quantity
            newItems = state.items.map((item) =>
              item.id === productToAdd.id &&
              item.size === productToAdd.size &&
              item.color === productToAdd.color
                ? { ...item, quantity: item.quantity + productToAdd.quantity }
                : item,
            );
          } else {
            // If item is new, add it to the cart
            newItems = [...state.items, { ...productToAdd }];
          }
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        }),

      // Action to remove a product from the cart
      removeFromCart: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        }),

      // Action to update the quantity of a specific product
      updateQuantity: (productId, newQuantity) =>
        set((state) => {
          let newItems;
          if (newQuantity < 1) {
            // If new quantity is less than 1, remove the item
            newItems = state.items.filter((item) => item.id !== productId);
          } else {
            newItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item,
            );
          }
          const { totalItems, totalPrice } = calculateTotals(newItems);
          return { items: newItems, totalItems, totalPrice };
        }),

      // Action to clear the entire cart
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: "cart-storage", // Unique name for localStorage key
    },
  ),
);

export default useCartStore;
