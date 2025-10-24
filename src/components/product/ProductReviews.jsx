import { Star, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
    <div className="mb-2 flex items-start gap-2">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500">
        <User size={14} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-gray-900">
          {review.reviewerName}
        </p>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-[10px] text-gray-500">
        {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
    </div>
    <p className="line-clamp-3 text-xs leading-relaxed text-gray-700">
      {review.comment}
    </p>
  </div>
);

const ProductReviews = ({ reviews }) => {
  const { t } = useTranslation();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-gray-900">
          {t("productDetails.reviews")}
        </h2>
        <p className="text-xs text-gray-600">
          {t("productDetails.noReviews")}
        </p>
      </div>
    );
  }

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-bold text-gray-900">
          {t("productDetails.reviews")}
        </h2>
        <div className="flex items-center gap-1.5">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-gray-900">{avgRating}</span>
          <span className="text-xs text-gray-600">({reviews.length})</span>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.date}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;