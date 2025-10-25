import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderButtons from "./SliderButtons";

const ExploreProductsSection = ({
  products,
  exploreProductsSlider,
  isRtl,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-500">
            {t("homePage.ourProducts")}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {t("homePage.exploreOurProducts")}
          </h2>

          <div className="hidden md:flex">
            <SliderButtons
              slider={exploreProductsSlider}
              isRtl={isRtl}
              prevIcon={ChevronLeft}
              nextIcon={ChevronRight}
              prevAriaLabel={t("homePage.previousProducts")}
              nextAriaLabel={t("homePage.nextProducts")}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${
                isRtl
                  ? exploreProductsSlider.currentIndex * (100 / 4)
                  : -exploreProductsSlider.currentIndex * (100 / 4)
              }%)`,
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link to="/products">
          <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
            {t("homePage.viewAllProducts")}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default React.memo(ExploreProductsSection);
