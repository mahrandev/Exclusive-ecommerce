import React from "react";
import { Link } from "react-router-dom";
import playstation from "@/assets/img/playstation-device.avif";
import speakers from "@/assets/img/stereo-speakers.avif";
import perfume from "@/assets/img/gucci-perfume.avif";
import { useTranslation } from "react-i18next";

const NewArrivalSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header Section */}
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h3 className="text-base font-semibold text-red-500">
            {t("Featured")}
          </h3>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          {t("New Arrival")}
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left Column - PlayStation 5 */}
        <div className="relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-lg bg-black p-6 text-white lg:row-span-2 lg:min-h-[600px] lg:p-8">
          <img
            src={playstation}
            alt="PlayStation 5"
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="relative z-10 max-w-md">
            <h4 className="mb-3 text-2xl font-semibold md:text-3xl">
              PlayStation 5
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-gray-300 md:text-base">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              to="#"
              className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-300 md:text-base"
            >
              {t("Shop Now")}
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-1 gap-6 lg:gap-8">
          {/* Top Right - Women's Collections */}
          <div className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-lg bg-black p-6 text-white md:min-h-[284px] lg:p-8">
            <div className="relative z-10 max-w-md">
              <h4 className="mb-3 text-xl font-semibold md:text-2xl">
                {t("Women's Collections")}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-gray-300 md:text-base">
                {t("Featured woman collections that give you another vibe.")}
              </p>
              <Link
                to="/products/womens-dresses"
                className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-300 md:text-base"
              >
                {t("Shop Now")}
              </Link>
            </div>
          </div>

          {/* Bottom Right - Speakers & Perfume */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {/* Speakers */}
            <div className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-lg bg-black p-6 text-white md:min-h-[284px]">
              <img
                src={speakers}
                alt="Speakers"
                className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="relative z-10">
                <h4 className="mb-2 text-xl font-semibold md:text-2xl">
                  {t("Speakers")}
                </h4>
                <p className="mb-3 text-sm text-gray-300">
                  {t("Amazon wireless speakers")}
                </p>
                <Link
                  to="/product/99"
                  className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-300"
                >
                  {t("Shop Now")}
                </Link>
              </div>
            </div>

            {/* Perfume */}
            <div className="relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-lg bg-black p-6 text-white md:min-h-[284px]">
              <img
                src={perfume}
                alt="Perfume"
                className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="relative z-10">
                <h4 className="mb-2 text-xl font-semibold md:text-2xl">
                  {t("Perfume")}
                </h4>
                <p className="mb-3 text-sm text-gray-300">
                  {t("GUCCI INTENSE OUD EDP")}
                </p>
                <Link
                  to="/product/10"
                  className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-gray-300"
                >
                  {t("Shop Now")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalSection;
