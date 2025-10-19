import useCartStore from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EmptyCartImage from "@/assets/img/empty.svg";

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
        <p className="text-xl text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="bg-primary-red text-white hover:bg-red-600">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 font-poppins">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Cart</span>
      </nav>

      {/* Cart Table */}
      <div className="mb-6">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 py-6 px-10 shadow-sm rounded-sm mb-10 text-base font-normal">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-4 items-center py-6 px-10 shadow-sm rounded-sm"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 relative">
                {/* Cancel Button */}
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.error(`${item.title} removed from cart.`);
                  }}
                  className="absolute -top-2 -left-2 bg-primary-red text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                  aria-label="Remove item"
                >
                  ×
                </button>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
                <p className="text-gray-900 truncate">{item.title}</p>
              </div>

              {/* Price */}
              <div className="text-gray-900">${item.price.toFixed(2)}</div>

              {/* Quantity Controls */}
              <div className="flex items-center border-2 border-gray-400 rounded w-20 h-11">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    handleQuantityChange(item.id, val);
                  }}
                  min="1"
                  className="w-full text-center border-none bg-transparent focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="flex flex-col border-l-2 border-gray-400">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-0 hover:bg-gray-100 transition-colors text-xs leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-0 hover:bg-gray-100 transition-colors text-xs leading-none border-t-2 border-gray-400"
                  >
                    ▼
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-20">
        <Button
          asChild
          variant="outline"
          className="border-gray-400 text-gray-900 hover:bg-gray-50 px-12 h-14"
        >
          <Link to="/">Return To Shop</Link>
        </Button>
        <Button
          variant="outline"
          className="border-gray-400 text-gray-900 hover:bg-gray-50 px-12 h-14"
          onClick={() => toast.info("Cart updated!")}
        >
          Update Cart
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Coupon Code Section */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="flex-1 h-14 px-6 border-2 border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-primary-red"
          />
          <Button className="bg-primary-red hover:bg-red-600 text-white px-12 h-14">
            Apply Coupon
          </Button>
        </div>

        {/* Cart Total Section */}
        <div className="border-2 border-gray-900 rounded-md p-8 ml-auto w-full lg:w-[470px]">
          <h2 className="text-xl font-medium mb-6">Cart Total</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button
            asChild
            className="w-full mt-6 bg-primary-red hover:bg-red-600 h-14"
          >
            <Link to="/checkout">Procees to checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;