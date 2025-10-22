import { useTranslation } from "react-i18next";
import useCartStore from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { X } from "lucide-react";
import EmptyCartImage from "@/assets/img/empty.svg";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const CartPage = () => {
  const { t } = useTranslation();
  const { items, totalPrice, removeFromCart, updateQuantity } = useCartStore(
    (state) => state,
  );

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    } else {
      removeFromCart(productId);
      toast.warning(t("cart.itemRemoved"));
    }
  };

  if (items.length === 0) {
    return (
      <div className="font-poppins container mx-auto flex max-w-7xl flex-col items-center px-4 py-8 text-center">
        <img src={EmptyCartImage} alt="Empty Cart" className="mb-8 h-64 w-64" />
        <p className="mb-8 text-xl text-gray-600">
          {t("cart.emptyCartMessage")}
        </p>
        <Button asChild className="bg-primary-red text-white hover:bg-red-600">
          <Link to="/">{t("cart.continueShopping")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="font-poppins container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumbs />

      {/* Desktop Table View */}
      <div className="mb-6 hidden md:block">
        {/* Table Header */}
        <div className="mb-10 grid grid-cols-4 gap-4 rounded-sm px-10 py-6 text-base font-normal shadow-sm">
          <div>{t("cart.product")}</div>
          <div>{t("cart.price")}</div>
          <div>{t("cart.quantity")}</div>
          <div>{t("cart.subtotal")}</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative grid grid-cols-4 items-center gap-4 rounded-sm px-10 py-6 shadow-sm"
            >
              {/* Cancel Button */}
              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast.error(
                    t("toast.removedFromCart", { title: item.title }),
                  );
                }}
                className="bg-primary-red absolute -top-2 -left-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white transition-colors hover:bg-red-600"
                aria-label={t("cart.removeItem")}
              >
                ×
              </button>

              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-14 w-14 object-contain"
                />
                <p className="truncate text-gray-900">{item.title}</p>
              </div>

              {/* Price */}
              <div className="text-gray-900">${item.price.toFixed(2)}</div>

              {/* Quantity Controls */}
              <div className="flex h-11 w-20 items-center rounded border-2 border-gray-400">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    handleQuantityChange(item.id, val);
                  }}
                  min="1"
                  className="w-full [appearance:textfield] border-none bg-transparent text-center focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="flex flex-col border-l-2 border-gray-400">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-0 text-xs leading-none transition-colors hover:bg-gray-100"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="border-t-2 border-gray-400 px-2 py-0 text-xs leading-none transition-colors hover:bg-gray-100"
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

      {/* Mobile Card View */}
      <div className="mb-6 space-y-4 md:hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg bg-white p-4 shadow-sm"
          >
            {/* Remove Button */}
            <button
              onClick={() => {
                removeFromCart(item.id);
                toast.error(t("toast.removedFromCart", { title: item.title }));
              }}
              className="bg-primary-red absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white transition-colors hover:bg-red-600"
              aria-label={t("cart.removeItem")}
            >
              <X size={14} />
            </button>

            {/* Product Info */}
            <div className="mb-4 flex gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="h-20 w-20 flex-shrink-0 object-contain"
              />
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 line-clamp-2 pr-6 font-medium text-gray-900">
                  {item.title}
                </h3>
                <p className="text-primary-red text-lg font-semibold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity and Subtotal */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {t("cart.quantity")}:
                </span>
                <div className="flex items-center rounded border-2 border-gray-300">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-3 py-1 transition-colors hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      handleQuantityChange(item.id, val);
                    }}
                    min="1"
                    className="w-12 [appearance:textfield] border-none bg-transparent text-center focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 transition-colors hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="mb-1 text-xs text-gray-600">
                  {t("cart.subtotal")}
                </p>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mb-10 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
        <Button
          asChild
          variant="outline"
          className="order-2 h-12 border-gray-400 px-8 text-gray-900 hover:bg-gray-50 sm:order-1"
        >
          <Link to="/">{t("cart.returnToShop")}</Link>
        </Button>
        <Button
          variant="outline"
          className="order-1 h-12 border-gray-400 px-8 text-gray-900 hover:bg-gray-50 sm:order-2"
          onClick={() => toast.info(t("cart.cartUpdated"))}
        >
          {t("cart.updateCart")}
        </Button>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Coupon Code Section */}
        <div className="order-2 flex flex-col gap-4 sm:flex-row lg:order-1">
          <input
            type="text"
            placeholder={t("cart.couponCode")}
            className="focus:ring-primary-red h-12 flex-1 rounded border-2 border-gray-900 px-4 text-sm focus:ring-2 focus:outline-none sm:px-6 sm:text-base"
          />
          <Button className="bg-primary-red h-12 px-8 whitespace-nowrap text-white hover:bg-red-600">
            {t("cart.applyCoupon")}
          </Button>
        </div>

        {/* Cart Total Section */}
        <div className="order-1 w-full rounded-md border-2 border-gray-900 p-6 lg:order-2 lg:ml-auto lg:w-[470px] lg:p-8">
          <h2 className="mb-6 text-lg font-medium sm:text-xl">
            {t("cart.cartTotal")}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 text-sm sm:text-base">
              <span>{t("cart.subtotalLabel")}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-4 text-sm sm:text-base">
              <span>{t("cart.shipping")}</span>
              <span>{t("cart.shippingFree")}</span>
            </div>
            <div className="flex justify-between text-base font-medium sm:text-lg">
              <span>{t("cart.total")}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Button
            asChild
            className="bg-primary-red mt-6 h-12 w-full text-sm hover:bg-red-600 sm:h-14 sm:text-base"
          >
            <Link to="/checkout">{t("cart.proceedToCheckout")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
