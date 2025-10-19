
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";


// Helper function to group products by category
const groupProductsByCategory = (products) => {
  if (!products) return {};
  return products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};

const AllProductsPage = () => {
  // Fetch all products by passing 'All'
  const { products, isLoading, error } = useProducts("All");

  const groupedProducts = groupProductsByCategory(products);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          All Products
        </h1>

        {isLoading ? (
          // Show skeletons for multiple categories
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="mb-4 h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : Object.keys(groupedProducts).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
              <section key={category}>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-gray-800">
                  {/* Capitalize the first letter of the category name */}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {productsInCategory.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No products found.
          </div>
        )}
      </main>
    </>
  );
};

export default AllProductsPage;
