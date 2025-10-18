// src/pages/HomePage.jsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";
import ProductCard from "@/components/shared/ProductCard";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Loading State with Spinner
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center">
        <ClipLoader color={"#db4444"} loading={isLoading} size={150} />
        <p className="mt-4 text-lg font-medium text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-8">
          <p className="mb-2 text-lg font-semibold text-red-600">
            Oops! Something went wrong
          </p>
          <p className="text-sm text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  // Products Display
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Today's</h3>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Flash Sales
          </h2>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">
              No products available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
