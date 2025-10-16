import { supabase } from "@/lib/supabaseClient";

/**
 * دالة لجلب قائمة المفضلة الخاصة بالمستخدم الحالي
 * @param {string} userId - معرّف المستخدم
 * @returns {Promise<Array>} قائمة المنتجات في المفضلة
 */
export const getWishlist = async (userId) => {
  if (!userId) {
    // إذا لم يكن هناك مستخدم، أرجع مصفوفة فارغة مباشرة
    return [];
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select(
      `
      id,
      product_id,
      products (*)
    `,
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching wishlist:", error.message);
    throw new Error(error.message);
  }

  // Supabase ترجع المنتجات داخل كائن products، نحن نريد فقط المنتجات نفسها
  return data.map((item) => item.products);
};

/**
 * دالة لإضافة منتج إلى قائمة المفضلة
 * @param {Object} item - الكائن الذي يحتوي على user_id و product_id
 * @returns {Promise<Object>} البيانات التي تمت إضافتها
 */
export const addToWishlist = async ({ userId, productId }) => {
  const { data, error } = await supabase
    .from("wishlist")
    .insert([{ user_id: userId, product_id: productId }])
    .select();

  if (error) {
    console.error("Error adding to wishlist:", error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * دالة لإزالة منتج من قائمة المفضلة
 * @param {Object} item - الكائن الذي يحتوي على user_id و product_id
 * @returns {Promise<Object>} البيانات التي تمت إزالتها
 */
export const removeFromWishlist = async ({ userId, productId }) => {
  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    console.error("Error removing from wishlist:", error.message);
    throw new Error(error.message);
  }

  return data;
};
