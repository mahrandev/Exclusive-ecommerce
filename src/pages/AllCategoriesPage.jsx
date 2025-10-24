import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAllCategories } from "@/hooks/useAllCategories";
import { useHomePageLogic } from "@/hooks/useHomePageLogic";
import Category from "@/components/home/Category";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

const AllCategoriesPage = () => {
  const { t } = useTranslation();
  const { categories, isLoading, error } = useAllCategories();
  const { iconMapping } = useHomePageLogic();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {t("allCategoriesPage.title")}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-red-500">{t("allCategoriesPage.error")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        {t("allCategoriesPage.title")}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Category
            key={category.slug}
            category={category}
            isSelected={false}
            onSelectCategory={() => {}}
            Icon={iconMapping[category.slug]}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesPage;
