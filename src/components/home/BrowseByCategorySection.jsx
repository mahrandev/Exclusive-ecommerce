import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Category from "@/components/home/Category";

const BrowseByCategorySection = ({
  mainCategories,
  iconMapping,
  selectedCategory,
  handleCategorySelect,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-500">
            {t("homePage.categories")}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {t("homePage.browseByCategory")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
        {mainCategories.map((category) => {
          const Icon = iconMapping[category.slug];
          const isSelected = selectedCategory === category.slug;

          return (
            <Category
              key={category.slug}
              category={category}
              isSelected={isSelected}
              onSelectCategory={handleCategorySelect}
              Icon={Icon}
            />
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/all-categories"
          className="rounded-md bg-red-500 px-8 py-3 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {t("homePage.viewAll")}
        </Link>
      </div>
    </section>
  );
};

export default React.memo(BrowseByCategorySection);
