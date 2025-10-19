import { Link } from "react-router-dom";
import { useHomePageLogic } from "@/hooks/useHomePageLogic";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Apple,
  ArrowRight,
  Truck,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import jbi from "@/assets/img/jbl-outdoor-speaker.avif";
import iphone from "@/assets/img/iphone.avif";

const HomePage = () => {
  const {
    selectedCategory,
    products,
    isLoadingProducts,
    productsError,
    iconMapping,
    sidebarCategories,
    mainCategories,
    handleCategorySelect,
    categoryMapping,
    categorySlider,
    flashSalesSlider,
    exploreProductsSlider,
  } = useHomePageLogic();

  return (
    <div className="bg-white">
      {/* Hero Section with Sidebar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-10">
            {/* Categories Sidebar - Enhanced */}
            <aside className="hidden w-56 border-r pr-8 md:block">
              <nav className="space-y-3">
                {sidebarCategories.map((category) => {
                  const Icon = iconMapping[category];
                  const hasSubmenu =
                    category === "Woman's Fashion" ||
                    category === "Men's Fashion";

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        if (categoryMapping[category]) {
                          handleCategorySelect(categoryMapping[category]);
                        }
                      }}
                      className="group flex w-full items-center justify-between text-left text-base text-gray-800 transition-colors hover:text-black"
                    >
                      <span>{category}</span>
                      {hasSubmenu && (
                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Hero Banner - Redesigned to match the image */}
            <div className="relative min-h-[344px] flex-1 overflow-hidden rounded bg-black">
              <div className="grid h-full grid-cols-1 items-center lg:grid-cols-2">
                {/* Left Content */}
                <div className="z-10 flex flex-col justify-center px-12 py-10 text-white lg:px-16">
                  {/* iPhone Icon and Series */}
                  <div className="mb-5 flex items-center gap-6">
                    <Apple className="h-10 w-10" fill="white" />
                    <span className="text-base font-normal">
                      iPhone 14 Series
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h2 className="mb-6 text-4xl leading-tight font-semibold tracking-tight lg:text-5xl">
                    Up to 10%
                    <br />
                    off Voucher
                  </h2>

                  {/* Shop Now Link */}
                  <button className="flex w-fit items-center gap-2 border-b border-white pb-1 text-base font-medium transition-all hover:gap-3">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Right Content - iPhone Image */}
                <div className="relative flex h-full items-center justify-center p-8 lg:p-12">
                  <img
                    src={iphone}
                    alt="iPhone 14"
                    className="h-auto w-full max-w-md object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                <div className="h-3 w-3 rounded-full bg-white/40"></div>
                <div className="h-3 w-3 rounded-full bg-white/40"></div>
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-white/40"></div>
                <div className="h-3 w-3 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Today's</h3>
          </div>

          {/* Section Title with Timer */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-20">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Flash Sales
              </h2>

              {/* Countdown Timer */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-900">Days</div>
                  <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                    03
                  </div>
                </div>
                <span className="text-xl font-bold text-red-500 md:text-2xl">
                  :
                </span>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-900">Hours</div>
                  <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                    23
                  </div>
                </div>
                <span className="text-xl font-bold text-red-500 md:text-2xl">
                  :
                </span>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-900">
                    Minutes
                  </div>
                  <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                    19
                  </div>
                </div>
                <span className="text-xl font-bold text-red-500 md:text-2xl">
                  :
                </span>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-900">
                    Seconds
                  </div>
                  <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                    56
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={flashSalesSlider.handlePrev}
                disabled={!flashSalesSlider.hasPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={flashSalesSlider.handleNext}
                disabled={!flashSalesSlider.hasNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
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
                  flashSalesSlider.currentIndex + 4
                )
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link to="/products">
                <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
                  View All Products
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No products found.
          </div>
        )}
      </section>

      {/* Browse By Category Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Categories</h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Browse By Category
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={categorySlider.handlePrev}
                disabled={!categorySlider.hasPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={categorySlider.handleNext}
                disabled={!categorySlider.hasNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Slider */}
        <div className="grid grid-cols-6 gap-6">
          {mainCategories
            .slice(
              categorySlider.currentIndex,
              categorySlider.currentIndex + 6
            )
            .map((category, index) => {
              const Icon = iconMapping[category];
              const isSelected =
                JSON.stringify(selectedCategory) ===
                JSON.stringify(categoryMapping[category]);

              return (
                <Link
                  key={index}
                  to={`/products/${encodeURIComponent(category)}`}
                  className={`flex flex-col items-center justify-center rounded border-2 p-6 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white ${
                    isSelected
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  }`}
                >
                  <div className="mb-3">
                    {Icon && <Icon size={56} strokeWidth={1.5} />}
                  </div>
                  <span className="text-base font-normal">{category}</span>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">This Month</h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Best Selling Products
            </h2>

            <Link to="/products">
              <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
                View All
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
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
      </section>

      {/* Featured Banner Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-between rounded bg-black p-8 text-white md:p-12">
          <div className="max-w-md">
            <span className="mb-4 inline-block text-sm font-semibold text-green-400">
              Categories
            </span>
            <h2 className="mb-6 text-3xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Enhance Your Music Experience
            </h2>
            <div className="mb-8 flex gap-3 md:gap-4">
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-black md:h-16 md:w-16">
                <span className="text-xs font-semibold md:text-sm">23</span>
                <span className="text-[9px] md:text-[10px]">Hours</span>
              </div>
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-black md:h-16 md:w-16">
                <span className="text-xs font-semibold md:text-sm">05</span>
                <span className="text-[9px] md:text-[10px]">Days</span>
              </div>
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-black md:h-16 md:w-16">
                <span className="text-xs font-semibold md:text-sm">59</span>
                <span className="text-[9px] md:text-[10px]">Minutes</span>
              </div>
              <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-black md:h-16 md:w-16">
                <span className="text-xs font-semibold md:text-sm">35</span>
                <span className="text-[9px] md:text-[10px]">Seconds</span>
              </div>
            </div>
            <Button className="rounded bg-green-500 px-12 py-4 text-white hover:bg-green-600">
              Buy Now!
            </Button>
          </div>
          <div className="hidden lg:block">
            <img src={jbi} alt="JBL Speaker" className="max-w-md" />
          </div>
        </div>
      </section>

      {/* Explore Our Products Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10">
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">
              Our Products
            </h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Explore Our Products
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={exploreProductsSlider.handlePrev}
                disabled={!exploreProductsSlider.hasPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full disabled:opacity-50"
                onClick={exploreProductsSlider.handleNext}
                disabled={!exploreProductsSlider.hasNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products
              .slice(
                exploreProductsSlider.currentIndex,
                exploreProductsSlider.currentIndex + 4
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Free Delivery */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <Truck size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* 24/7 Customer Service */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <Headphones size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="text-sm text-gray-600">
              Friendly 24/7 customer support
            </p>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <ShieldCheck size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              MONEY BACK GUARANTEE
            </h3>
            <p className="text-sm text-gray-600">
              We return money within 30 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
