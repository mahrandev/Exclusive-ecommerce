import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Countdown from "./Countdown";
import SliderButtons from "./SliderButtons";

const FlashSalesSection = ({
  products,
  isLoadingProducts,
  productsError,
  flashSalesSlider,
  isRtl,
  dateTimeAfterThreeDays,
}) => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-500">
            {t("homePage.todays")}
          </h3>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {t("homePage.flashSales")}
            </h2>
            <Countdown targetDate={dateTimeAfterThreeDays} />
          </div>

          <div className="hidden md:flex">
            <SliderButtons
              slider={flashSalesSlider}
              isRtl={isRtl}
              prevIcon={ChevronLeft}
              nextIcon={ChevronRight}
              prevAriaLabel={t("homePage.previousFlashSales")}
              nextAriaLabel={t("homePage.nextFlashSales")}
            />
          </div>
        </div>
      </div>

      {isLoadingProducts ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : productsError ? (
        <div className="text-red-500">Error: {productsError.message}</div>
      ) : products && products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products
              .slice(
                flashSalesSlider.currentIndex,
                flashSalesSlider.currentIndex + 4,
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/products">
              <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
                {t("homePage.viewAllProducts")}
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">
          {t("homePage.noProductsFound")}
        </div>
      )}
    </section>
  );
};

export default React.memo(FlashSalesSection);
