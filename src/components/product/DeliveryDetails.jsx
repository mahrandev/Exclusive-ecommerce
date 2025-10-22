import { useTranslation } from "react-i18next";
import { Truck, RefreshCw } from "lucide-react";

const DeliveryDetails = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm">
      <div className="flex items-start gap-4 border-b-2 border-gray-200 p-4 transition-colors hover:bg-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Truck className="flex-shrink-0 text-gray-700" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
            {t("productDetails.freeDelivery")}
          </h4>
          <p className="mt-1 text-xs text-gray-600 md:text-sm">
            {t("productDetails.deliveryAvailability")}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-4 transition-colors hover:bg-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <RefreshCw className="flex-shrink-0 text-gray-700" size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
            {t("productDetails.returnDelivery")}
          </h4>
          <p className="mt-1 text-xs text-gray-600 md:text-sm">
            {t("productDetails.returnDeliveryDesc")}{" "}
            <button className="hover:text-primary-red focus:ring-primary-red underline transition-colors focus:rounded focus:ring-2 focus:outline-none">
              {t("productDetails.details")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
