import { useEffect } from "react";
import useWishlistStore from "@/store/wishlistStore";
import useAuthStore from "@/store/authStore";
import ProductCard from "@/components/shared/ProductCard";
import ProductDetailsSkeleton from "@/components/shared/ProductDetailsSkeleton"; // A loading skeleton
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { wishlist, isLoading, fetchWishlist } = useWishlistStore();

  useEffect(() => {
    // Fetch wishlist only if the user is authenticated
    // FIX: Use the correct user ID from the nested user object
    if (isAuthenticated && user?.user?.id) {
      fetchWishlist(user.user.id);
    }
  }, [isAuthenticated, user?.user?.id, fetchWishlist]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">My Wishlist ({wishlist.length})</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...Array(4)].map((_, i) => (
            <ProductDetailsSkeleton key={i} />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            to="/"
            className="bg-primary-red text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
