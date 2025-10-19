
import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { categoryMapping } from "@/data/categoryMapping"; // Import the mapping
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Decode the category name from URL (e.g., "Woman%20Fashion" -> "Woman's Fashion")
  const decodedCategoryName = decodeURIComponent(categoryName);

  // Find the array of sub-categories from the mapping
  const subCategories = categoryMapping[decodedCategoryName] || [];

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(subCategories); // Pass the array of sub-categories to the hook

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {/* Capitalize the first letter of the category name */}
          {decodedCategoryName.charAt(0).toUpperCase() +
            decodedCategoryName.slice(1)}
        </h1>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : productsError ? (
          <div className="text-red-500">Error: {productsError.message}</div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No products found in this category.
          </div>
        )}
      </main>
    </>
  );
};

export default CategoryPage;
