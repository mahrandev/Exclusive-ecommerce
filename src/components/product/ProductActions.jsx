import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Minus, Plus, Heart, ShoppingCart } from "lucide-react";

const ProductActions = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  selectedColor,
  isWishlisted,
  handleQuantityChange,
  handleAddToCart,
  handleAddToWishlist,
  handleBuyNow,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-3 py-4 md:flex-row md:gap-4 md:py-6">
        {/* Quantity Selector */}
        <div className="flex w-full items-stretch overflow-hidden rounded-md border-2 border-gray-300 transition-colors md:w-auto">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className={cn(
              "focus:border-primary-red focus:bg-primary-red flex h-11 w-11 items-center justify-center bg-white transition-all focus:z-10 focus:text-white focus:outline-none",
              quantity <= 1
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
            )}
            aria-label={t("productDetails.decrease")}
            type="button"
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, "")) || 1;
              setQuantity(Math.max(1, Math.min(val, product.stock)));
            }}
            className="w-16 [appearance:textfield] border-none bg-white text-center font-semibold text-gray-900 focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
            max={product.stock}
            aria-label={`${t("productDetails.quantity")}: ${quantity}`}
          />

          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className={cn(
              "focus:bg-primary-red flex h-11 w-11 items-center justify-center bg-white transition-all focus:text-white focus:outline-none",
              quantity >= product.stock
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:bg-gray-100 active:bg-gray-200",
            )}
            aria-label={t("productDetails.increase")}
            type="button"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={!product.inStock || !selectedSize || !selectedColor}
          className={cn(
            "focus:ring-primary-red h-11 flex-1 rounded-md text-base font-medium transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none md:text-lg",
            !product.inStock || !selectedSize || !selectedColor
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-primary-red text-white shadow-sm hover:bg-red-600 hover:shadow-md active:bg-red-700",
          )}
          aria-disabled={
            !product.inStock || !selectedSize || !selectedColor
          }
        >
          {t("productDetails.buyNow")}
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-md border-2 transition-all focus:outline-none",
            isWishlisted
              ? "border-primary-red text-primary-red bg-red-50 shadow-sm"
              : "hover:border-primary-red hover:text-primary-red border-gray-300 bg-white text-gray-700 hover:bg-red-50",
          )}
          aria-label={
            isWishlisted
              ? t("productDetails.removeFromWishlist")
              : t("productDetails.addToWishlist")
          }
          aria-pressed={isWishlisted}
        >
          <Heart
            className={cn(
              "transition-all",
              isWishlisted ? "scale-110 fill-current" : "",
            )}
            size={20}
          />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock || !selectedSize || !selectedColor}
        className={cn(
          "mb-4 flex h-11 w-full items-center justify-center gap-2 rounded-md border-2 font-medium transition-all focus:outline-none",
          !product.inStock || !selectedSize || !selectedColor
            ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
            : "border-primary-red text-primary-red bg-white shadow-sm hover:bg-red-50 hover:shadow active:bg-red-100",
        )}
        aria-disabled={!product.inStock || !selectedSize || !selectedColor}
      >
        <ShoppingCart size={20} />
        {t("productDetails.addToCart")}
      </button>
    </>
  );
};

export default ProductActions;
