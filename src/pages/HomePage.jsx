import React from "react";
import { useTranslation } from "react-i18next";
import { useHomePageLogic } from "@/hooks/useHomePageLogic";

// Import the new components
import Sidebar from "@/components/home/Sidebar";
import HeroSection from "@/components/home/HeroSection";
import FlashSalesSection from "@/components/home/FlashSalesSection";
import BrowseByCategorySection from "@/components/home/BrowseByCategorySection";
import BestSellingSection from "@/components/home/BestSellingSection";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import ExploreProductsSection from "@/components/home/ExploreProductsSection";
import ServicesSection from "@/components/home/ServicesSection";

const HomePage = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const {
    selectedCategory,
    products,
    isLoadingProducts,
    productsError,
    iconMapping,
    sidebarCategories,
    mainCategories,
    handleCategorySelect,
    categorySlider,
    flashSalesSlider,
    exploreProductsSlider,
  } = useHomePageLogic();

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-10">
            <Sidebar
              sidebarCategories={sidebarCategories}
              iconMapping={iconMapping}
              isRtl={isRtl}
            />
            <HeroSection isRtl={isRtl} />
          </div>
        </div>
      </div>

      <FlashSalesSection
        products={products}
        isLoadingProducts={isLoadingProducts}
        productsError={productsError}
        flashSalesSlider={flashSalesSlider}
        isRtl={isRtl}
        dateTimeAfterThreeDays={dateTimeAfterThreeDays}
      />

      <BrowseByCategorySection
        mainCategories={mainCategories}
        categorySlider={categorySlider}
        iconMapping={iconMapping}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        isRtl={isRtl}
      />

      <BestSellingSection
        products={products}
        isLoadingProducts={isLoadingProducts}
      />

      <FeaturedProductSection dateTimeAfterThreeDays={dateTimeAfterThreeDays} />

      <ExploreProductsSection
        products={products}
        exploreProductsSlider={exploreProductsSlider}
        isRtl={isRtl}
      />

      <ServicesSection />
    </div>
  );
};

export default React.memo(HomePage);
