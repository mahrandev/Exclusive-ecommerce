import { useTranslation } from "react-i18next";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

/**
 * @description Custom hook for managing the logic of the CartPage.
 * It encapsulates cart state management, quantity updates, and total calculations.
 * @returns {object} An object containing all the necessary state and handlers for the CartPage component.
 */
const useCartPage = () => {
  const { t } = useTranslation();
  const { items, removeFromCart, updateQuantity } = useCartStore(
    (state) => state,
  );

  /**
   * Calculates the subtotal for a single cart item.
   * @param {object} item - The cart item.
   * @returns {number} The calculated subtotal.
   */
  const calculateItemSubtotal = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return price * quantity;
  };

  /**
   * Handles updating the quantity of a product in the cart.
   * If the quantity is 0 or less, the item is removed.
   * @param {string|number} productId - The ID of the product.
   * @param {string|number} newQuantity - The new quantity.
   */
  const handleQuantityChange = (productId, newQuantity) => {
    let quantity = parseInt(newQuantity, 10);

    if (quantity <= 0 || isNaN(quantity)) {
      removeFromCart(productId);
      toast.warning(t("cart.itemRemoved"));
      return;
    }

    updateQuantity(productId, quantity);
  };

  /**
   * Calculates the total price of all items in the cart.
   * @returns {number} The total price.
   */
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + calculateItemSubtotal(item);
    }, 0);
  };

  return {
    t,
    items,
    removeFromCart,
    handleQuantityChange,
    calculateTotal,
    calculateItemSubtotal,
  };
};

export default useCartPage;
