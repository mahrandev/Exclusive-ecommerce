import React from 'react';
import { useTranslation } from "react-i18next";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const ServicesSection = () => {
  const { t } = useTranslation();

  const ServiceItem = ({ icon: Icon, titleKey, descriptionKey }) => { // eslint-disable-line no-unused-vars
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-gray-400 bg-black text-white">
            <Icon size={40} />
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold uppercase">
          {t(titleKey)}
        </h3>
        <p className="text-sm text-gray-600">
          {t(descriptionKey)}
        </p>
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <ServiceItem
          icon={Truck}
          titleKey="homePage.freeDelivery"
          descriptionKey="homePage.freeDeliveryText"
        />
        <ServiceItem
          icon={Headphones}
          titleKey="homePage.customerService"
          descriptionKey="homePage.customerServiceText"
        />
        <ServiceItem
          icon={ShieldCheck}
          titleKey="homePage.moneyBack"
          descriptionKey="homePage.moneyBackText"
        />
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
