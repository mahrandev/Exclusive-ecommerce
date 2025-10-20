import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHomePageLogic } from "@/hooks/useHomePageLogic";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Apple,
  ArrowRight,
  ArrowLeft,
  Truck,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import jbi from "@/assets/img/jbl-outdoor-speaker.avif";
import iphone from "@/assets/img/iphone.avif";
import { useCountdown } from "@/hooks/useCountdown";

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

const Countdown = ({ targetDate }) => {
  const { t } = useTranslation();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const renderTime = (value, label) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {renderTime(days, t("homePage.days"))}
      <span className="text-2xl font-bold">:</span>
      {renderTime(hours, t("homePage.hours"))}
      <span className="text-2xl font-bold">:</span>
      {renderTime(minutes, t("homePage.minutes"))}
      <span className="text-2xl font-bold">:</span>
      {renderTime(seconds, t("homePage.seconds"))}
    </div>
  );
};

const SliderButtons = ({ slider, isRtl, prevIcon: PrevIcon, nextIcon: NextIcon }) => (
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="icon"
      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      onClick={slider.handlePrev}
      disabled={!slider.hasPrev}
    >
      {isRtl ? <NextIcon className="h-5 w-5" /> : <PrevIcon className="h-5 w-5" />}
    </Button>
    <Button
      variant="outline"
      size="icon"
      className="h-12 w-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      onClick={slider.handleNext}
      disabled={!slider.hasNext}
    >
      {isRtl ? <PrevIcon className="h-5 w-5" /> : <NextIcon className="h-5 w-5" />}
    </Button>
  </div>
);

const HomePage = () => {
  const { t, i18n } = useTranslation();
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
    categoryMapping,
    categorySlider,
    flashSalesSlider,
    exploreProductsSlider,
  } = useHomePageLogic();

  const getTranslatedCategory = (category) => {
    const key = categoryTranslationKeys[category];
    return key ? t(key) : category;
  };

  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div className="bg-white">
      {/* Hero Section with Sidebar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 py-10">
            {/* Categories Sidebar */}
            <aside className="hidden w-56 border-r pr-8 md:block">
              <nav className="space-y-3">
                {sidebarCategories.map((category) => {
                  const Icon = iconMapping[category];
                  const hasSubmenu =
                    category === "Woman's Fashion" ||
                    category === "Men's Fashion";

                  return (
                    <Link
                      key={category}
                      to={`/products/${encodeURIComponent(category)}`}
                      className="group flex w-full items-center justify-between text-right text-base text-gray-800 transition-colors hover:text-black"
                    >
                      <span>{getTranslatedCategory(category)}</span>
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

            {/* Hero Banner */}
            <div className="relative min-h-[344px] flex-1 overflow-hidden rounded bg-black">
              <div className="grid h-full grid-cols-1 items-center lg:grid-cols-2">
                {/* Left Content */}
                <div className="z-10 flex flex-col justify-center px-12 py-10 text-white lg:px-16">
                  <div className="mb-5 flex items-center gap-6">
                    <Apple className="h-10 w-10" fill="white" />
                    <span className="text-base font-normal">
                      {t("homePage.heroSubtitle")}
                    </span>
                  </div>

                  <h2
                    className="mb-6 text-4xl font-semibold leading-tight tracking-tight lg:text-5xl"
                    dangerouslySetInnerHTML={{
                      __html: t("homePage.heroTitle"),
                    }}
                  ></h2>

                  <Link
                    to="/product/116"
                    className="flex w-fit items-center gap-2 border-b border-white pb-1 text-base font-medium transition-all hover:gap-3"
                  >
                    {t("homePage.shopNow")}
                    {isRtl ? (
                      <ArrowLeft className="h-5 w-5" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </Link>
                </div>

                {/* Right Content */}
                <div className="relative flex h-full items-center justify-center p-8 lg:p-12">
                  <img
                    src={iphone}
                    alt="iPhone 14"
                    className="h-auto w-full max-w-md object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
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

            <SliderButtons slider={flashSalesSlider} isRtl={isRtl} prevIcon={ChevronLeft} nextIcon={ChevronRight} />
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

      {/* Browse By Category Section */}
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

            <SliderButtons slider={categorySlider} isRtl={isRtl} prevIcon={ChevronLeft} nextIcon={ChevronRight} />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {mainCategories
            .slice(categorySlider.currentIndex, categorySlider.currentIndex + 6)
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
                  <span className="text-base font-normal" dir="auto">
                    {getTranslatedCategory(category)}
                  </span>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Best Selling Products Section */}
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

            <Link to="/products">
              <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
                {t("homePage.viewAll")}
              </Button>
            </Link>
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
      </section>

      {/* Featured Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-between rounded bg-black p-8 text-white md:p-12">
          <div className="max-w-md">
            <span className="mb-4 inline-block text-sm font-semibold text-green-400">
              {t("homePage.categories")}
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {t("homePage.featuredTitle")}
            </h2>
            <div className="mb-6">
              <Countdown targetDate={dateTimeAfterThreeDays} />
            </div>
            <Button className="rounded bg-green-500 px-12 py-4 text-white hover:bg-green-600">
              {t("homePage.buyNow")}
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

            <SliderButtons slider={exploreProductsSlider} isRtl={isRtl} prevIcon={ChevronLeft} nextIcon={ChevronRight} />
          </div>
        </div>

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products
              .slice(
                exploreProductsSlider.currentIndex,
                exploreProductsSlider.currentIndex + 4,
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button className="rounded bg-red-500 px-12 py-4 text-white hover:bg-red-600">
              {t("homePage.viewAllProducts")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <Truck size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              {t("homePage.freeDelivery")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("homePage.freeDeliveryText")}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <Headphones size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              {t("homePage.customerService")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("homePage.customerServiceText")}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
                <ShieldCheck size={40} />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold uppercase">
              {t("homePage.moneyBack")}
            </h3>
            <p className="text-sm text-gray-600">
              {t("homePage.moneyBackText")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
