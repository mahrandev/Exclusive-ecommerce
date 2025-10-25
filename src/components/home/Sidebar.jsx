import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Sidebar = ({ sidebarCategories, iconMapping, isRtl }) => {
  const { t } = useTranslation();
  return (
    <aside
      className={`hidden w-56 md:block ${isRtl ? "border-l pl-8" : "border-r pr-8"}`}
    >
      <nav className="space-y-3">
        {sidebarCategories.map((category) => {
          const Icon = iconMapping[category.slug];
          const hasSubmenu =
            category.name === "category.womens-dresses" ||
            category.name === "category.mens-shirts";

          return (
            <Link
              key={category.slug}
              to={`/products/${category.slug}`}
              className="group flex w-full items-center justify-between text-right text-base text-gray-800 transition-colors hover:text-black"
              aria-label={`View products in ${t(category.name)} category`}
            >
              <span>{t(category.name)}</span>
              {hasSubmenu && (
                <>
                  {isRtl ? (
                    <ChevronLeft className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  ) : (
                    <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default React.memo(Sidebar);
