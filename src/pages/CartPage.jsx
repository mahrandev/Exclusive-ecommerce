import useCartStore from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import EmptyCartImage from "@/assets/img/empty.svg"; // Import the image

const CartPage = () => {
  const {
    items,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useCartStore((state) => state);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      // Optional: show a confirmation before removing
      removeFromCart(productId);
      toast.warning("Item removed from cart.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 font-poppins text-center flex flex-col items-center">
        <img
          src={EmptyCartImage}
          alt="Empty Cart"
          className="w-64 h-64 mb-8"
        />
        <p className="text-xl text-gray-600 mb-8"> Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="bg-primary-red text-white hover:bg-red-600">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 font-poppins">
      <h1 className="text-2xl font-medium mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 font-medium text-gray-500 border-b pb-2">
            <div className="col-span-2">Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 items-center gap-4 border-b py-4"
            >
              {/* Product Info */}
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded-md bg-secondary-gray p-1"
                />
                <div>
                  <p className="font-medium truncate">{item.title}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 h-auto p-0 mt-1"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.error(`${item.title} removed from cart.`);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="font-medium">${item.price.toFixed(2)}</div>

              {/* Quantity Controls */}
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-3 font-medium">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Subtotal */}
              <div className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-medium mb-6">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span>Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button
              asChild
              className="w-full mt-6 bg-primary-red hover:bg-red-600"
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;