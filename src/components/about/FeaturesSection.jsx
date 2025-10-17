import React from 'react';
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
  const features = [
    {
      icon: <Truck size={40} />,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      icon: <Headset size={40} />,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      icon: <ShieldCheck size={40} />,
      title: 'MONEY BACK GUARANTEE',
      description: 'We reurn money within 30 days',
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
