
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/productsApi";
import { toast } from "sonner";
import { Star } from "lucide-react";

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

export const useProductDetails = () => {
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

    console.log("Adding to cart:", {
      productId: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

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

    toast.loading("Redirecting to checkout...");
    console.log("Buy now:", {
      productId: product.id,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  // Handle keyboard navigation for custom controls
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return {
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
  };
};
