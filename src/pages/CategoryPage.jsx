import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { categoryMapping } from "@/data/categoryMapping";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useTranslation } from "react-i18next";

const categoryTranslationKeys = {
  "Woman's Fashion": "categories.womansFashion",
  "Men's Fashion": "categories.mensFashion",
  Mobiles: "categories.mobiles",
  "Home & Lifestyle": "categories.homeLifestyle",
  Glasses: "categories.glasses",
  "Sports & Outdoor": "categories.sportsOutdoor",
  "Laptops & Computers": "categories.computers",
  "Groceries & Pets": "categories.groceriesPets",
  "Health & Beauty": "categories.healthBeauty",
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { t } = useTranslation();

  const decodedCategoryName = decodeURIComponent(categoryName);

  const subCategories = categoryMapping[decodedCategoryName] || [];

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(subCategories);

  const getTranslatedCategory = (category) => {
    const key = categoryTranslationKeys[category];
    return key ? t(key) : category;
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {getTranslatedCategory(decodedCategoryName)}
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
