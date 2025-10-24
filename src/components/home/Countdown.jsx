import React from 'react';
import { useTranslation } from "react-i18next";
import { useCountdown } from "@/hooks/useCountdown";

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
    <div className="flex items-center gap-4" aria-label="Countdown timer">
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

export default React.memo(Countdown);
