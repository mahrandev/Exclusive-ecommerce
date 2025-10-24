import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";

const BestSellingSection = ({
  products,
  isLoadingProducts,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-500">
            {t("homePage.thisMonth")}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {t("homePage.bestSelling")}
          </h2>
        </div>
      </div>

      {isLoadingProducts ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}

      <div className="mt-12 text-center">
        <Link to="/products">
          <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
            {t("homePage.viewAll")}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default React.memo(BestSellingSection);
