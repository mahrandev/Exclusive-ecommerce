import { create } from "zustand";
import { getWishlist } from "@/api/wishlistApi";

const useWishlistStore = create((set) => ({
  wishlist: [],
  isLoading: true,
  error: null,

  // دالة لجلب قائمة المفضلة من قاعدة البيانات ووضعها في الـ state
  fetchWishlist: async (userId) => {
    if (!userId) {
      // إذا لم يكن المستخدم مسجلاً، نفرغ القائمة ونوقف التحميل
      set({ wishlist: [], isLoading: false });
      return;
    }
    try {
      set({ isLoading: true, error: null });
      const data = await getWishlist(userId);
      set({ wishlist: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // دالة لإضافة منتج محليًا إلى الـ state بعد نجاح الإضافة في قاعدة البيانات
  addToWishlistState: (product) => {
    set((state) => ({
      wishlist: [...state.wishlist, product],
    }));
  },

  // دالة لإزالة منتج محليًا من الـ state بعد نجاح الحذف من قاعدة البيانات
  removeFromWishlistState: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((p) => p.id !== productId),
    }));
  },
}));

export default useWishlistStore;
