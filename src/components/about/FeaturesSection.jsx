import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Headset, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4 w-20 h-20 rounded-full bg-gray-200 p-1 flex items-center justify-center">
        <div className="w-full h-full border-8  border-gray-500 rounded-full bg-black flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold uppercase">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Truck size={40} />,
      title: t('homePage.freeDelivery'),
      description: t('homePage.freeDeliveryText'),
    },
    {
      icon: <Headset size={40} />,
      title: t('homePage.customerService'),
      description: t('homePage.customerServiceText'),
    },
    {
      icon: <ShieldCheck size={40} />,
      title: t('homePage.moneyBack'),
      description: t('homePage.moneyBackText'),
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
