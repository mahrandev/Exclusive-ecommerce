import React from "react";
import { Link } from "react-router-dom";
import playstation from "@/assets/img/playstation-device.avif";
import speakers from "@/assets/img/stereo-speakers.avif";
import perfume from "@/assets/img/gucci-perfume.avif";
import { useTranslation } from "react-i18next";

const NewArrivalSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <div className="h-10 w-5 rounded bg-red-500"></div>
          <h2 className="ml-4 font-semibold text-red-500">{t("Featured")}</h2>
        </div>
        <h3 className="mb-8 text-4xl font-semibold">{t("New Arrival")}</h3>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="relative flex min-h-[300px] flex-col justify-end rounded-md bg-black p-8 text-white md:min-h-[600px] lg:row-span-2">
            <img
              src={playstation}
              alt="PlayStation 5"
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
            <div className="relative z-10">
              <h4 className="text-2xl font-semibold">PlayStation 5</h4>
              <p className="my-2">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link to="#" className="underline">
                {t("Shop Now")}
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-rows-1 gap-8 md:grid-rows-2">
            {/* Top Right */}
            <div className="relative flex min-h-[284px] flex-col justify-end rounded-md bg-black p-8 text-white">
              <div className="relative z-10">
                <h4 className="text-2xl font-semibold">
                  {t("Women's Collections")}
                </h4>
                <p className="my-2">
                  {t("Featured woman collections that give you another vibe.")}
                </p>
                <Link to="#" className="underline">
                  {t("Shop Now")}
                </Link>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="relative flex min-h-[284px] flex-col justify-end rounded-md bg-black p-8 text-white">
                <img
                  src={speakers}
                  alt="Speakers"
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
                <div className="relative z-10">
                  <h4 className="text-2xl font-semibold">{t("Speakers")}</h4>
                  <p className="my-2">{t("Amazon wireless speakers")}</p>
                  <Link to="#" className="underline">
                    {t("Shop Now")}
                  </Link>
                </div>
              </div>
              <div className="relative flex min-h-[284px] flex-col justify-end rounded-md bg-black p-8 text-white">
                <img
                  src={perfume}
                  alt="Perfume"
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
                <div className="relative z-10">
                  <h4 className="text-2xl font-semibold">{t("Perfume")}</h4>
                  <p className="my-2">{t("GUCCI INTENSE OUD EDP")}</p>
                  <Link to="#" className="underline">
                    {t("Shop Now")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalSection;
