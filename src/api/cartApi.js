import { supabase } from "@/lib/supabaseClient";

/**
 * Fetches the user's cart from the 'user_carts' table.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array|null>} A promise that resolves to the cart data (array of items) or null if not found.
 */
export const getUserCart = async (userId) => {
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('user_carts')
      .select('cart_data')
      .eq('user_id', userId)
      .single();

    if (error) {
      // 'PGRST116' is the code for "Not a single row was found"
      if (error.code === 'PGRST116') {
        console.log('No cart found for this user. A new one will be created.');
        return null;
      }
      throw error;
    }

    return data ? data.cart_data : null;
  } catch (err) {
    console.error('Error fetching user cart:', err.message);
    return null; // Return null on any error to ensure app stability
  }
};

/**
 * Updates or creates a user's cart in the 'user_carts' table.
 * This function performs an "upsert" operation.
 * @param {object} params - The parameters for the function.
 * @param {string} params.userId - The ID of the user.
 * @param {Array} params.cartData - The cart items array to save.
 * @returns {Promise<boolean>} A promise that resolves to true on success, false on failure.
 */
export const updateUserCart = async ({ userId, cartData }) => {
  if (!userId) return false;

  try {
    const { error } = await supabase
      .from('user_carts')
      .upsert({
        user_id: userId,
        cart_data: cartData,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id', // If a row with the user_id already exists, it will be updated.
      });

    if (error) {
      throw error;
    }

    return true;
  } catch (err) {
    console.error('Error updating user cart:', err.message);
    return false;
  }
};
