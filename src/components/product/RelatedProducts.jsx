
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";
import ProductCard from "@/components/shared/ProductCard";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RelatedProducts = ({ category, productId }) => {
  const { t } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", { category }],
    queryFn: () => getProducts({ category }),
    enabled: !!category,
  });

  const relatedProducts = products?.filter((p) => p.id !== productId).slice(0, 8) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !relatedProducts.length) {
    return null;
  }

  return (
    <div className="py-8 md:py-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-5 h-10 bg-primary-red rounded"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-black">
          {t("productDetails.relatedItems")}
        </h2>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-related",
            prevEl: ".swiper-button-prev-related",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-4"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev-related absolute top-1/2 -translate-y-1/2 left-0 z-10 cursor-pointer bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors">
          <ChevronLeft className="text-gray-600" />
        </div>
        <div className="swiper-button-next-related absolute top-1/2 -translate-y-1/2 right-0 z-10 cursor-pointer bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors">
          <ChevronRight className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
