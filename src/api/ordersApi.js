// src/api/ordersApi.js
import { supabase } from "@/lib/supabaseClient";

/**
 * Creates a new order in the database.
 * @param {object} orderData - The data for the new order.
 * @param {string} orderData.userId - The ID of the user placing the order.
 * @param {object} orderData.shippingAddress - The shipping address object.
 * @param {number} orderData.totalPrice - The total price of the order.
 * @param {Array<object>} orderData.cartItems - The items in the cart.
 * @returns {object} The newly created order details.
 */
export const createOrder = async ({ userId, shippingAddress, cartItems, paymentMethod }) => {
  // ✅ **Security Improvement**: Calculate total price on the server-side to prevent manipulation.
  const calculatedTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  // Step 1: Insert the main order details into the 'orders' table
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_price: calculatedTotal, // Use the securely calculated total
      shipping_address: shippingAddress,
      payment_method: paymentMethod, // Store the selected payment method
      status: 'pending',
    })
    .select()
    .single(); // .single() is crucial to get the inserted row back

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw new Error(orderError.message);
  }

  if (!orderData) {
    throw new Error("Failed to create order: No data returned.");
  }

  const orderId = orderData.id;

  // Step 2: Prepare the items for the 'order_items' table
  const itemsToInsert = cartItems.map(item => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  // Step 3: Bulk insert all items into the 'order_items' table
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsToInsert);

  if (itemsError) {
    console.error("Error adding order items:", itemsError);
    // Optional: Attempt to delete the order that was just created to maintain data integrity
    await supabase.from('orders').delete().eq('id', orderId);
    throw new Error(`Failed to add items to order: ${itemsError.message}`);
  }

  // Step 4: Return the created order data
  return orderData;
};
