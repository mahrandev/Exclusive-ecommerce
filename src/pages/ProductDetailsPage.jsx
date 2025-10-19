import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  Heart,
  Truck,
  RefreshCw,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import ProductDetailsSkeleton from "@/components/shared/ProductDetailsSkeleton";
import { cn } from "@/lib/utils";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useEffect } from "react";
import { addRecentlyViewed } from "@/utils/recentlyViewed";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const ProductDetailsPage = () => {
  const {
    product,
    isLoading,
    isError,
    error,
    productData,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    isWishlisted,
    handleQuantityChange,
    handleAddToCart,
    handleAddToWishlist,
    handleBuyNow,
    handleKeyDown,
    stars,
  } = useProductDetails();

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Oops! Something went wrong
          </h2>
          <p className="mb-6 text-gray-600">{error.message}</p>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!product || !productData) return null;

  const mainImage = selectedImage || productData.images[0];


  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumbs />

      <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-5">
        {/* Image Gallery - Enhanced Accessibility */}
        <div className="flex flex-col gap-4 md:flex-row-reverse lg:col-span-3">
          {/* Main Image */}
          <div className="flex-1">
            <div
              className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4 md:aspect-auto md:h-[500px] md:p-8"
              role="img"
              aria-label={`Main image of ${product.title}`}
            >
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Thumbnails - Enhanced with better focus states */}
          <div
            className="flex gap-2 overflow-x-auto md:max-h-[500px] md:flex-col md:overflow-y-auto"
            role="list"
          >
            {productData.images.map((imgUrl, index) => (
              <button
                key={index}
                role="listitem"
                className={cn(
                  "flex-shrink-0 rounded-lg border-2 bg-gray-50 p-2 transition-all hover:border-gray-400 focus:outline-none",
                  mainImage === imgUrl
                    ? "border-primary-red"
                    : "border-transparent",
                )}
                onClick={() => setSelectedImage(imgUrl)}
                aria-label={`View image ${index + 1} of ${productData.images.length}`}
                aria-pressed={mainImage === imgUrl}
              >
                <img
                  src={imgUrl}
                  alt={`${product.title} view ${index + 1}`}
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-2">
          <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            {product.title}
          </h1>

          {/* Rating & Stock */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm md:gap-4">
            <div
              className="flex gap-1"
              role="img"
              aria-label={`Rating: ${product.rating} out of 5 stars`}
            >
              {stars}
            </div>
            <span className="text-gray-800">
              ({product.reviewsCount} Reviews)
            </span>
            <span className="text-gray-800" aria-hidden="true">
              |
            </span>
            <span
              className={cn(
                "font-medium",
                product.inStock ? "text-green-600" : "text-red-600",
              )}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <p
            className="mb-4 text-2xl font-bold md:text-3xl"
            aria-label={`Price: ${product.price} dollars`}
          >
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="mb-6 border-b pb-6 leading-relaxed text-gray-900">
            {product.description}
          </p>

          {/* Colors - Enhanced Accessibility & Design */}
          {productData.colors.length > 0 && (
            <div className="flex items-center border-b py-4 md:py-6">
              <h3
                id="color-label"
                className="text-md mr-4 font-medium md:text-base"
              >
                Colours:{" "}
              </h3>
              <div
                role="radiogroup"
                aria-labelledby="color-label"
                className="flex flex-wrap gap-3"
              >
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    role="radio"
                    aria-checked={selectedColor === color.name}
                    aria-label={`Color: ${color.name}`}
                    onClick={() => setSelectedColor(color.name)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => setSelectedColor(color.name))
                    }
                    className={cn(
                      "focus:ring-primary-red relative h-8 w-8 cursor-pointer rounded-full border-2 border-white shadow-md ring-2 transition-all hover:scale-110 focus:ring-4 focus:ring-offset-2 focus:outline-none",
                      selectedColor === color.name
                        ? "ring-primary-red scale-110"
                        : "ring-gray-300",
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    tabIndex={0}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes - FULLY REDESIGNED with Better States */}
          {productData.sizes.length > 0 && (
            <div className="flex items-center border-b py-4 md:py-6">
              <h3
                id="size-label"
                className="text-md mr-4 font-medium md:text-base"
              >
                Size:{" "}
              </h3>
              <div
                role="radiogroup"
                aria-labelledby="size-label"
                className="flex flex-wrap gap-3"
              >
                {productData.sizes.map((size) => (
                  <button
                    key={size.name}
                    role="radio"
                    aria-checked={selectedSize === size.name}
                    aria-label={`Size: ${size.name}${!size.available ? " (unavailable)" : ""}`}
                    onClick={() => size.available && setSelectedSize(size.name)}
                    onKeyDown={(e) =>
                      size.available &&
                      handleKeyDown(e, () => setSelectedSize(size.name))
                    }
                    disabled={!size.available}
                    className={cn(
                      "h-10 min-w-[3rem] rounded-md border-2 px-4 text-sm font-medium transition-all focus:outline-none md:text-base",
                      selectedSize === size.name
                        ? "bg-primary-red border-primary-red scale-105 transform text-white shadow-md"
                        : size.available
                          ? "hover:border-primary-red hover:text-primary-red text-black-700 border-gray-300 bg-white hover:bg-red-50 hover:shadow-sm"
                          : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-900 line-through opacity-50",
                    )}
                    tabIndex={size.available ? 0 : -1}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions - COMPLETELY REDESIGNED */}
          <div className="flex flex-col gap-3 py-4 md:flex-row md:gap-4 md:py-6">
            {/* Custom Quantity Selector - No Default Browser Spinners */}
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
                aria-label="Decrease quantity"
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
                aria-label={`Quantity: ${quantity}`}
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
                aria-label="Increase quantity"
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
              Buy Now
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
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
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
            Add to Cart
          </button>

          {/* Delivery Info - Enhanced Design */}
          <div className="mt-4 overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm">
            <div className="flex items-start gap-4 border-b-2 border-gray-200 p-4 transition-colors hover:bg-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Truck className="flex-shrink-0 text-gray-700" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Free Delivery</h4>
                <p className="mt-1 text-xs text-gray-600 md:text-sm">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 transition-colors hover:bg-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <RefreshCw className="flex-shrink-0 text-gray-700" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Return Delivery</h4>
                <p className="mt-1 text-xs text-gray-600 md:text-sm">
                  Free 30 Days Delivery Returns.{" "}
                  <button className="hover:text-primary-red focus:ring-primary-red underline transition-colors focus:rounded focus:ring-2 focus:outline-none">
                    Details
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;