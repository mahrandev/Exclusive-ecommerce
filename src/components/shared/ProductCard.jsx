import { Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  console.log(product);
  // بناءً على بنية الداتا الجديدة، نحسب نسبة الخصم إن وجدت
  // const discountPercentage = product.oldPrice
  //   ? ((product.oldPrice - product.price) / product.oldPrice) * 100
  //   : 0;

  return (
    // قمنا بإزالة الخلفية من العنصر الأب، سيتم تحديدها في الأبناء
    <div className="group font-poppins w-full max-w-sm overflow-hidden rounded-lg">
      {/* Container for Image and Hover Effects - له خلفية رمادية */}
      <div className="bg-secondary-gray relative h-60 w-full overflow-hidden p-4">
        {/* الصورة ستكون داخل padding */}
        <img
          className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={product.img} // تحديث: استخدام product.img
          alt={product.title}
        />

        {/* Discount Badge */}

        {/* Discount Badge - هذا هو الكود المسؤول عن الشارة */}
        {product.discount && (
          <span className="absolute top-3 left-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            {product.discount}
          </span>
        )}
        {/* Wishlist and Quick View Icons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary-red h-9 w-9 rounded-full border-none bg-white text-black shadow-sm transition-colors duration-300 hover:text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-primary-red h-9 w-9 rounded-full border-none bg-white text-black shadow-sm transition-colors duration-300 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button (Visible on Hover) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transform transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          <Button className="w-full rounded-none bg-black text-white hover:bg-black/90">
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Product Details - له خلفية بيضاء */}
      <div className="p-4">
        <h3
          className="mb-1 truncate text-[16px] font-medium"
          title={product.title}
        >
          {product.title}
        </h3>
        <div className="flex items-center space-x-2">
          <p className="text-md font-bold text-red-500">
            ${product.price.toFixed(2)}
          </p>
          {product.oldPrice && (
            <p className="text-sm font-medium text-gray-600 line-through">
              ${product.oldPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {/* تحديث: استخدام reviewsCount */}
          <span className="ml-2 text-xs font-semibold text-gray-600">
            ({product.reviewsCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
