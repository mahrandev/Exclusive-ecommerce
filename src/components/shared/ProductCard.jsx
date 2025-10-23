import { Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore"; // Import cart store
import { addToWishlist, removeFromWishlist } from "@/api/wishlistApi";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuthStore((state) => state);
  const { wishlist, addToWishlistState, removeFromWishlistState } =
    useWishlistStore((state) => state);
  const { addToCart } = useCartStore((state) => state); // Get addToCart action

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const { mutate: handleAddToWishlist, isPending: isAdding } = useMutation({
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

  const { mutate: handleRemoveFromWishlist, isPending: isRemoving } =
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

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} has been added to your cart.`);
  };

  // Calculate old price if discount is available
  const oldPrice = product.discountPercentage > 0 
    ? (product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="group font-poppins w-full max-w-sm overflow-hidden rounded-lg">
        <div className="bg-secondary-gray relative h-60 w-full overflow-hidden p-4">
          <img
            className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
            src={product.thumbnail} // Changed from product.img
            alt={product.title}
          />

          {product.discountPercentage > 0 && (
            <span className="absolute top-3 left-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <Button
              onClick={handleWishlistToggle}
              disabled={isAdding || isRemoving}
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-none bg-white text-black shadow-sm transition-colors duration-300 hover:text-white"
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-300 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-black"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-none bg-white text-black shadow-sm transition-colors duration-300 hover:text-black"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-full transform transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-none bg-black text-white hover:bg-black/90"
            >
              Add To Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3
            className="mb-1 truncate text-[16px] font-medium"
            title={product.title}
          >
            {product.title}
          </h3>
          <div className="flex items-center space-x-2">
            <p className="text-md font-bold text-red-500">
              ${product.price.toFixed(2)}
            </p>
            {oldPrice && (
              <p className="text-sm font-medium text-gray-600 line-through">
                ${oldPrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs font-semibold text-gray-600">
              ({product.reviews.length})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
