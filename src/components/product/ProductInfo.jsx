import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const ProductInfo = ({ product, stars }) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
        {product.title}
      </h1>

      {/* Rating & Stock */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm md:gap-4">
        <div
          className="flex gap-1"
          role="img"
          aria-label={`${t("productDetails.reviews")}: ${product.rating} out of 5 stars`}
        >
          {stars}
        </div>
        <span className="text-gray-800">
          ({product.reviewsCount} {t("productDetails.reviews")})
        </span>
        <span className="text-gray-800" aria-hidden="true">
          |
        </span>
        <span
          className={cn(
            "font-medium",
            product.inStock ? "text-green-600" : "text-red-600",
          )}
        >
          {product.inStock
            ? t("productDetails.inStock")
            : t("productDetails.outOfStock")}
        </span>
      </div>

      {/* Price */}
      <p
        className="mb-4 text-2xl font-bold md:text-3xl"
        aria-label={`${t("cart.price")}: ${product.price} dollars`}
      >
        ${product.price.toFixed(2)}
      </p>

      {/* Description */}
      <p className="mb-6 border-b pb-6 leading-relaxed text-gray-900">
        {product.description}
      </p>
    </>
  );
};

export default ProductInfo;
