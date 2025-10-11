import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/productsApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, Heart, Truck, RefreshCw, ShoppingCart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProductDetailsSkeleton from "@/components/shared/ProductDetailsSkeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // ✅ استخدام Sonner بدلاً من useToast

// Helper function لمعالجة JSON بشكل آمن
const safeJsonParse = (data, fallback = []) => {
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data || JSON.stringify(fallback));
  } catch (error) {
    console.error("JSON Parse Error:", error);
    return fallback;
  }
};

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // معالجة البيانات بشكل آمن
  const productData = useMemo(() => {
    if (!product) return null;

    return {
      images: safeJsonParse(product.images),
      sizes: safeJsonParse(product.sizes),
      colors: safeJsonParse(product.colors),
    };
  }, [product]);

  // تعيين القيم الافتراضية عند تحميل المنتج
  useEffect(() => {
    if (productData) {
      if (!selectedImage && productData.images[0]) {
        setSelectedImage(productData.images[0]);
      }
      if (!selectedColor && productData.colors[0]) {
        setSelectedColor(productData.colors[0].name);
      }
      if (!selectedSize && productData.sizes[0]?.available) {
        setSelectedSize(productData.sizes[0].name);
      }
    }
  }, [productData, selectedImage, selectedColor, selectedSize]);

  // Memoize stars rendering
  const stars = useMemo(() => {
    if (!product?.rating) return null;

    const rating = product.rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const elements = [];

    for (let i = 0; i < fullStars; i++) {
      elements.push(
        <Star
          key={`full-${i}`}
          className="fill-yellow-500 text-yellow-500"
          size={20}
        />,
      );
    }

    if (hasHalfStar) {
      elements.push(
        <div key="half" className="relative">
          <Star className="text-gray-300" size={20} />
          <Star
            className="absolute top-0 left-0 fill-yellow-500 text-yellow-500"
            size={20}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      elements.push(
        <Star key={`empty-${i}`} className="text-gray-300" size={20} />,
      );
    }

    return elements;
  }, [product?.rating]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (product?.stock && newQty > product.stock) return product.stock;
      return newQty;
    });
  };

  const handleAddToCart = () => {
    // ✅ التحقق من اختيار المقاس واللون
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "You need to select a size before adding to cart",
        duration: 3000,
      });
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color", {
        description: "You need to select a color before adding to cart",
        duration: 3000,
      });
      return;
    }

    // Add to cart logic here
    console.log("Adding to cart:", {
      productId: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

    // ✅ رسالة نجاح مع تفاصيل
    toast.success("Added to cart!", {
      description: `${quantity} × ${product.title}`,
      action: {
        label: "View Cart",
        onClick: () => console.log("Navigate to cart"),
      },
    });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);

    // ✅ رسالة حسب الحالة
    if (!isWishlisted) {
      toast.success("Added to wishlist", {
        description: product.title,
        icon: "❤️",
      });
    } else {
      toast.info("Removed from wishlist", {
        description: product.title,
      });
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Missing selection", {
        description: "Please select both size and color",
      });
      return;
    }

    // Navigate to checkout
    toast.loading("Redirecting to checkout...");
    console.log("Buy now:", {
      productId: product.id,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

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
      {/* Breadcrumbs */}
      <nav className="mb-4 md:mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-gray-900 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              to={`/category/${product.category}`}
              className="capitalize hover:text-gray-900 hover:underline"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-gray-900" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-5">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 md:flex-row-reverse lg:col-span-3">
          {/* Main Image */}
          <div className="flex-1">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4 md:aspect-auto md:h-[500px] md:p-8">
              <img
                src={mainImage}
                alt={product.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto md:max-h-[500px] md:flex-col md:overflow-y-auto">
            {productData.images.map((imgUrl, index) => (
              <button
                key={index}
                className={cn(
                  "flex-shrink-0 rounded-lg border-2 bg-gray-50 p-2 transition-all hover:border-gray-400",
                  mainImage === imgUrl
                    ? "border-red-500 ring-2 ring-red-500 ring-offset-2"
                    : "border-transparent",
                )}
                onClick={() => setSelectedImage(imgUrl)}
                aria-label={`View image ${index + 1}`}
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
              aria-label={`Rating: ${product.rating} out of 5 stars`}
            >
              {stars}
            </div>
            <span className="text-gray-500">
              ({product.reviewsCount} Reviews)
            </span>
            <span className="text-gray-300" aria-hidden="true">
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
          <p className="mb-4 text-2xl font-bold md:text-3xl">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="mb-6 border-b pb-6 leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* Colors */}
          {productData.colors.length > 0 && (
            <div className="border-b py-4 md:py-6">
              <h3 className="mb-3 text-sm font-medium md:text-base">
                Colours:{" "}
                <span className="font-normal text-gray-600">
                  {selectedColor || "Select a color"}
                </span>
              </h3>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {productData.colors.map((color) => (
                  <Label
                    key={color.name}
                    htmlFor={color.name}
                    className={cn(
                      "relative h-8 w-8 cursor-pointer rounded-full border-2 border-white shadow-md ring-2 transition-all hover:scale-110",
                      selectedColor === color.name
                        ? "scale-110 ring-red-500"
                        : "ring-gray-300",
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    <RadioGroupItem
                      value={color.name}
                      id={color.name}
                      className="sr-only"
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Sizes */}
          {productData.sizes.length > 0 && (
            <div className="border-b py-4 md:py-6">
              <h3 className="mb-4 text-sm font-medium md:text-base">Size:</h3>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={
                      selectedSize === size.name ? "destructive" : "outline"
                    }
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={cn(
                      "h-10 min-w-[3rem] px-4 text-sm md:text-base",
                      !size.available && "cursor-not-allowed opacity-40",
                    )}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="flex flex-col gap-3 py-4 md:flex-row md:gap-4 md:py-6">
            {/* Quantity */}
            <div className="flex w-full items-center rounded-md border md:w-auto">
              <Button
                variant="ghost"
                onClick={() => handleQuantityChange(-1)}
                className="h-11 px-3 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, val));
                }}
                className="w-16 border-x text-center focus:ring-2 focus:ring-red-500 focus:outline-none"
                min="1"
                aria-label="Quantity"
              />
              <Button
                variant="ghost"
                onClick={() => handleQuantityChange(1)}
                className="h-11 px-3 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>

            {/* Buy Now */}
            <Button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="h-11 flex-1 bg-red-500 text-base hover:bg-red-600 md:text-lg"
            >
              Buy Now
            </Button>

            {/* Wishlist */}
            <Button
              variant="outline"
              onClick={handleAddToWishlist}
              className={cn(
                "h-11 px-3",
                isWishlisted && "border-red-500 bg-red-50 text-red-500",
              )}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart className={isWishlisted ? "fill-current" : ""} />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            variant="outline"
            className="mb-4 h-11 w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {/* Delivery Info */}
          <div className="mt-4 overflow-hidden rounded-lg border">
            <div className="flex items-start gap-4 border-b p-4">
              <Truck className="mt-1 flex-shrink-0 text-gray-700" size={24} />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <RefreshCw
                className="mt-1 flex-shrink-0 text-gray-700"
                size={24}
              />
              <div>
                <h4 className="font-medium">Return Delivery</h4>
                <p className="mt-1 text-xs text-gray-500 md:text-sm">
                  Free 30 Days Delivery Returns.{" "}
                  <button className="underline hover:text-gray-700">
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
