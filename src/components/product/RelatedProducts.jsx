
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
  const { t, i18n } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", { category }],
    queryFn: () => getProducts({ category }),
    enabled: !!category,
  });

  const relatedProducts =
    products?.filter((p) => p.id !== productId).slice(0, 8) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !relatedProducts.length) {
    return null;
  }

  const isRtl = i18n.dir() === "rtl";

  return (
    <div className="py-8 md:py-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="h-10 w-5 rounded bg-primary-red"></div>
        <h2 className="text-2xl font-bold text-primary-black md:text-3xl">
          {t("productDetails.relatedItems")}
        </h2>
      </div>
      <div className="relative">
        <Swiper
          dir={i18n.dir()}
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
        <div className="swiper-button-prev-related absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 md:flex">
          {isRtl ? (
            <ChevronRight className="text-gray-600" />
          ) : (
            <ChevronLeft className="text-gray-600" />
          )}
        </div>
        <div className="swiper-button-next-related absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 md:flex">
          {isRtl ? (
            <ChevronLeft className="text-gray-600" />
          ) : (
            <ChevronRight className="text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
