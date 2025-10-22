import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const ProductOptions = ({
  productData,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  handleKeyDown,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Colors */}
      {productData.colors.length > 0 && (
        <div className="flex items-center gap-4 border-b py-4 md:py-6">
          <h3
            id="color-label"
            className="text-md mr-4 font-medium md:text-base"
          >
            {t("productDetails.colours")}{" "}
          </h3>
          <div
            role="radiogroup"
            aria-labelledby="color-label"
            className="flex flex-wrap gap-3"
          >
            {productData.colors.map((color) => (
              <button
                key={color.name}
                role="radio"
                aria-checked={selectedColor === color.name}
                aria-label={`${t("productDetails.color")} ${color.name}`}
                onClick={() => setSelectedColor(color.name)}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => setSelectedColor(color.name))
                }
                className={cn(
                  "focus:ring-primary-red relative h-8 w-8 cursor-pointer rounded-full border-2 border-white shadow-md ring-2 transition-all hover:scale-110 focus:ring-4 focus:ring-offset-2 focus:outline-none",
                  selectedColor === color.name
                    ? "ring-primary-red scale-110"
                    : "ring-gray-300",
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
                tabIndex={0}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {productData.sizes.length > 0 && (
        <div className="flex items-center gap-4 border-b py-4 md:py-6">
          <h3
            id="size-label"
            className="text-md mr-4 font-medium md:text-base"
          >
            {t("productDetails.size")}{" "}
          </h3>
          <div
            role="radiogroup"
            aria-labelledby="size-label"
            className="flex flex-wrap gap-3"
          >
            {productData.sizes.map((size) => (
              <button
                key={size.name}
                role="radio"
                aria-checked={selectedSize === size.name}
                aria-label={`${t("productDetails.size")} ${size.name}${!size.available ? ` (${t("productDetails.unavailable")})` : ""}`}
                onClick={() => size.available && setSelectedSize(size.name)}
                onKeyDown={(e) =>
                  size.available &&
                  handleKeyDown(e, () => setSelectedSize(size.name))
                }
                disabled={!size.available}
                className={cn(
                  "h-10 min-w-[3rem] rounded-md border-2 px-4 text-sm font-medium transition-all focus:outline-none md:text-base",
                  selectedSize === size.name
                    ? "bg-primary-red border-primary-red scale-105 transform text-white shadow-md"
                    : size.available
                      ? "hover:border-primary-red hover:text-primary-red text-black-700 border-gray-300 bg-white hover:bg-red-50 hover:shadow-sm"
                      : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-900 line-through opacity-50",
                )}
                tabIndex={size.available ? 0 : -1}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductOptions;
