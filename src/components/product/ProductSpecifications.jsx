import { useTranslation } from "react-i18next";

const ProductSpecifications = ({ product }) => {
  const { t } = useTranslation();

  // Build specifications array from available product data
  const specifications = [
    {
      label: t("productDetails.brand"),
      value: product.brand || "N/A",
    },
    {
      label: t("productDetails.rating"),
      value: product.rating ? `${product.rating} / 5` : "N/A",
    },
    {
      label: t("productDetails.category"),
      value: product.category || "N/A",
    },
    {
      label: t("productDetails.discount"),
      value: product.discountPercentage
        ? `${product.discountPercentage}%`
        : "N/A",
    },
    {
      label: t("productDetails.sku"),
      value: product.sku || "N/A",
    },
    {
      label: t("productDetails.weight"),
      value: product.weight ? `${product.weight} kg` : "N/A",
    },
    {
      label: t("productDetails.dimensions"),
      value: product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
        : "N/A",
    },
    {
      label: t("productDetails.warrantyInformation"),
      value: product.warrantyInformation || "N/A",
    },
    {
      label: t("productDetails.shippingInformation"),
      value: product.shippingInformation || "N/A",
    },
    {
      label: t("productDetails.availabilityStatus"),
      value: product.availabilityStatus || "N/A",
    },
    {
      label: t("productDetails.returnPolicy"),
      value: product.returnPolicy || "N/A",
    },
    {
      label: t("productDetails.minimumOrderQuantity"),
      value: product.minimumOrderQuantity || "1",
    },
  ];

  // Filter out N/A values for cleaner display
  const validSpecs = specifications.filter((spec) => spec.value !== "N/A");

  if (validSpecs.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          {t("productDetails.specifications")}
        </h2>
        <p className="text-gray-600">{t("productDetails.noSpecifications")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        {t("productDetails.specifications")}
      </h2>

      <div className="space-y-3">
        {validSpecs.map((spec, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3 last:border-b-0"
          >
            <dt className="text-sm font-medium text-gray-600">
              {spec.label}
            </dt>
            <dd className="text-sm font-semibold text-gray-900 text-right">
              {spec.value}
            </dd>
          </div>
        ))}
      </div>

      {/* Additional Meta Information */}
      {product.meta && (
        <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
          <h3 className="text-base font-semibold text-gray-900">
            {t("productDetails.additionalInfo")}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.meta.barcode && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-xs text-gray-600">
                  {t("productDetails.barcode")}:
                </span>
                <span className="font-mono text-xs font-medium text-gray-900">
                  {product.meta.barcode}
                </span>
              </div>
            )}
            {product.meta.qrCode && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-xs text-gray-600">
                  {t("productDetails.qrCode")}:
                </span>
                <img
                  src={product.meta.qrCode}
                  alt="QR Code"
                  className="h-10 w-10"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900">
            {t("productDetails.tags")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;