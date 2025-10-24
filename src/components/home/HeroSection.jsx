import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Apple, ArrowRight, ArrowLeft } from "lucide-react";
import iphone from "@/assets/img/iphone.avif";

const HeroSection = ({ isRtl }) => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-10">
          {/* Categories Sidebar - This will be replaced by the actual Sidebar component */}
          {/* <aside className="hidden w-56 border-r pr-8 md:block">
            <nav className="space-y-3">
              {sidebarCategories.map((category) => {
                const Icon = iconMapping[category.slug];
                const hasSubmenu =
                  category.name === "Woman's Fashion" ||
                  category.name === "Men's Fashion";

                return (
                  <Link
                    key={category.slug}
                    to={`/products/${category.slug}`}
                    className="group flex w-full items-center justify-between text-right text-base text-gray-800 transition-colors hover:text-black"
                  >
                    <span>{category.name}</span>
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
          </aside> */}

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
                  to="/product/123"
                  className="flex w-fit items-center gap-2 border-b border-white pb-1 text-base font-medium transition-all hover:gap-3"
                  aria-label={t("homePage.shopNow")}
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
                  alt={t("homePage.iphone14AltText") || "iPhone 14"}
                  className="h-auto w-full max-w-md object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HeroSection);
