import React from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Countdown from "./Countdown";
import jbi from "@/assets/img/jbl-outdoor-speaker.avif";

const FeaturedProductSection = ({
  dateTimeAfterThreeDays,
}) => {
  const { t } = useTranslation();

  return (
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
          <img src={jbi} alt={t("homePage.jblSpeakerAltText") || "JBL Speaker"} className="max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeaturedProductSection);
