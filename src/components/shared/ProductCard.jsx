import React from "react";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// يمكنك تعويض هذا الدالة الخاصة برسم النجوم بعدد التقييم
const renderStars = (count = 5) => (
  <div className="flex items-center gap-0.5">
    {[...Array(count)].map((_, i) => (
      <svg key={i} width="16" height="16" fill="#facc15" viewBox="0 0 20 20">
        <polygon points="10,1.5 12.59,7.03 18.53,7.73 14,12.19 15.18,18.09 10,15 4.82,18.09 6,12.19 1.47,7.73 7.41,7.03" />
      </svg>
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  if (!product) return null;

  // نسب الخصم
  const discount = product.old_price
    ? Math.round(
        ((product.old_price - product.price) / product.old_price) * 100,
      )
    : 0;

  // عدد النجوم والتقييم
  const stars = Math.round(product.rating || 5);
  const ratingCount = product.rating_count || 65;

  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-300 bg-white p-3 transition-shadow duration-200 hover:shadow-xl">
      {/* علامة المنتج الجديد وزرين side buttons */}
      <div className="absolute top-4 left-4 z-10">
        {product.is_new && (
          <span className="rounded-lg bg-green-400 px-3 py-1 text-xs font-bold text-white shadow">
            NEW
          </span>
        )}
      </div>
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow hover:bg-gray-100">
          <Heart size={20} className="stroke-2 text-gray-600" />
        </button>
        <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow hover:bg-gray-100">
          <Eye size={20} className="stroke-2 text-gray-600" />
        </button>
      </div>

      {/* حاوية الصورة */}
      <div className="mb-2 flex h-44 items-center justify-center pt-3">
        <img
          src={product.image_url}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* عرض الخصم كشارة */}
      {discount > 0 && (
        <div className="absolute top-20 left-4 z-10 rounded-md bg-primary-red px-2 py-1 text-xs font-semibold text-white">
          -{discount}%
        </div>
      )}

      {/* زر السلة */}
      <div className="mb-3 w-full">
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 font-semibold text-white transition hover:bg-gray-900"
          onClick={(e) => {
            e.preventDefault();
            // TODO: أضف المنتج للسلة بواسطة zustand
          }}
        >
          <ShoppingCart size={18} />
          Add To Cart
        </Button>
      </div>

      {/* معلومات المنتج */}
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="text-md font-medium text-gray-900">{product.title}</h3>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-lg font-bold text-red-500">
            ${product.price}
          </span>
          {product.old_price && (
            <span className="text-base text-gray-400 line-through">
              ${product.old_price}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1">
          {renderStars(stars)}
          <span className="ml-1 text-sm font-semibold text-gray-500">
            ({ratingCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
