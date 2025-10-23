import { Star, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg sm:p-5">
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:h-12 sm:w-12">
          <User size={20} className="text-gray-500 sm:size={24}" />
        </div>
        <div>
          <p className="text-base font-bold text-gray-900 sm:text-lg">
            {review.reviewerName}
          </p>
          <p className="text-xs text-gray-500 sm:text-sm">
            {review.reviewerEmail}
          </p>
        </div>
      </div>
      <div className="mt-2 text-left sm:mt-0 sm:text-right">
        <StarRating rating={review.rating} />
        <p className="mt-1 text-xs text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>
    <p className="mt-3 text-sm text-gray-700 leading-relaxed sm:text-base">
      {review.comment}
    </p>
  </div>
);

const ProductReviews = ({ reviews }) => {
  const { t } = useTranslation();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
          {t("productDetails.reviews")}
        </h2>
        <p className="text-sm text-gray-600 sm:text-base">
          {t("productDetails.noReviews")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {t("productDetails.reviews")}
        </h2>
        <span className="font-semibold text-gray-700">
          {reviews.length} {t("productDetails.reviews")}
        </span>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {reviews.map((review) => (
          <ReviewCard key={review.date} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
