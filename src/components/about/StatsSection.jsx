import { Store, DollarSign, ShoppingBag, Users } from 'lucide-react';

const StatCard = ({ icon, metric, label }) => {
  // The 'group' class on the parent allows child elements to be styled on parent hover
  const cardClasses = `p-6 rounded-lg border border-gray-500 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 bg-white hover:bg-red-500 hover:text-white group`;
  
  // Use group-hover to change styling when the parent card is hovered
  const iconWrapperClasses = `mb-4 w-16 h-16 border-8  border-gray-500 rounded-full flex items-center justify-center bg-black text-white group-hover:bg-white group-hover:text-red-500 transition-colors duration-300`;

  return (
    <div className={cardClasses}>
      <div className={iconWrapperClasses}>{icon}</div>
      <h3 className="text-3xl font-bold">{metric}</h3>
      {/* The paragraph also needs to change color on hover */}
      <p className="text-gray-600 group-hover:text-gray-200">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  // Removed the 'featured: true' property
  const stats = [
    { icon: <Store size={32} />, metric: '10.5k', label: 'Sellers active on our site' },
    { icon: <DollarSign size={32} />, metric: '33k', label: 'Monthly product sale' },
    { icon: <ShoppingBag size={32} />, metric: '45.5k', label: 'Customer active on our site' },
    { icon: <Users size={32} />, metric: '25k', label: 'Annual gross sale in our site' },
  ];

  return (
    <section className="py-12 md:py-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
