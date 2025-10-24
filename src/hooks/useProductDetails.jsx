
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProductById } from "@/api/productsApi";
import { addToWishlist, removeFromWishlist } from "@/api/wishlistApi";
import { toast } from "sonner";
import { Star } from "lucide-react";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useWishlistStore from "@/store/wishlistStore";
import { useTranslation } from "react-i18next";

export const useProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { wishlist, addToWishlistState, removeFromWishlistState } =
    useWishlistStore();
  const { i18n } = useTranslation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const isWishlisted = useMemo(
    () => wishlist.some((item) => item.id === product?.id),
    [wishlist, product],
  );

  const { mutate: handleAddToWishlistMutation, isPending: isAdding } =
    useMutation({
      mutationFn: () =>
        addToWishlist({ userId: user?.id, productId: product.id }),
      onSuccess: () => {
        addToWishlistState(product);
        toast.success(`${product.title} has been added to your wishlist.`);
      },
      onError: (error) => {
        toast.error(`Failed to add: ${error.message}`);
      },
    });

  const { mutate: handleRemoveFromWishlistMutation, isPending: isRemoving } =
    useMutation({
      mutationFn: () =>
        removeFromWishlist({ userId: user?.id, productId: product.id }),
      onSuccess: () => {
        removeFromWishlistState(product.id);
        toast.success(`${product.title} has been removed from your wishlist.`);
      },
      onError: (error) => {
        toast.error(`Failed to remove: ${error.message}`);
      },
    });

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }

    if (!user?.id) {
      toast.error("Could not verify user. Please log in again.");
      return;
    }

    if (isWishlisted) {
      handleRemoveFromWishlistMutation();
    } else {
      handleAddToWishlistMutation();
    }
  };

  // Mock data for sizes and colors as they are not in the new API
  const MOCK_SIZES = [
    { name: "S", available: true },
    { name: "M", available: true },
    { name: "L", available: false },
    { name: "XL", available: true },
  ];

  const MOCK_COLORS = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
  ];

  // Process data and include mock data
  const productData = useMemo(() => {
    if (!product) return null;

    return {
      images: product.images || [],
      sizes: MOCK_SIZES,
      colors: MOCK_COLORS,
    };
  }, [product]);

  // Set default values when product loads
  useEffect(() => {
    if (productData) {
      // Set default image if not already set
      if (!selectedImage && productData.images && productData.images.length > 0) {
        setSelectedImage(productData.images[0]);
      }

      // Set default color if not already set
      if (!selectedColor && productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0].name);
      }

      // Set default size to the first available one if not already set
      if (!selectedSize && productData.sizes && productData.sizes.length > 0) {
        const firstAvailableSize = productData.sizes.find(
          (size) => size.available,
        );
        if (firstAvailableSize) {
          setSelectedSize(firstAvailableSize.name);
        }
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
    const isRtl = i18n.language === "ar";

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
            className="absolute left-0 top-0 fill-yellow-500 text-yellow-500"
            size={20}
            style={{
              clipPath: isRtl ? "inset(0 0 0 50%)" : "inset(0 50% 0 0)",
            }}
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
  }, [product?.rating, i18n.language]);

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

    const productToAdd = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(productToAdd);

    toast.success("Added to cart!", {
      description: `${quantity} × ${product.title}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Missing selection", {
        description: "Please select both size and color",
      });
      return;
    }

    const productToAdd = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(productToAdd);
    navigate("/cart");
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
    isAddingToWishlist: isAdding,
    isRemovingFromWishlist: isRemoving,
  };
};
