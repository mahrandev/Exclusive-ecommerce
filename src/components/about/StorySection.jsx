
const StorySection = () => {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Text Column - Corrected Order */}
        <div className="order-last lg:order-first py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-xl lg:ml-auto md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Story</h1>
            <p className="mt-6 text-gray-800 leading-relaxed">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by wide
              range of tailored marketing, data and service solutions, Exclusive has
              10,500 sallers and 300 brands and serves 3 millioons customers across
              the region.
            </p>
            <p className="mt-4 text-gray-800 leading-relaxed">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories ranging
              from consumer.
            </p>
          </div>
        </div>

        {/* Image Column - Corrected Order */}
        <div className="order-first lg:order-last h-64 lg:h-full w-full bg-[#EB7EA8]">
          {/* This div is intentionally empty, acting as a placeholder */}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
