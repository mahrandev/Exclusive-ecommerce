import { Link, useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useTranslation } from "react-i18next";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { t } = useTranslation();

  // The categoryName from the URL is the slug we need to fetch products.
  const decodedCategoryName = decodeURIComponent(categoryName);

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(decodedCategoryName);

  const pageTitle = t(`category.${decodedCategoryName}`);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="transition-colors hover:text-gray-900">
            {t("breadcrumbs.home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{pageTitle}</span>
        </div>
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {pageTitle}
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
            {t("categoryPage.noProductsFound")}
          </div>
        )}
      </main>
    </>
  );
};

export default CategoryPage;
