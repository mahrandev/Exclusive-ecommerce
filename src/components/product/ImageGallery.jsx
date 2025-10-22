import { cn } from "@/lib/utils";

const ImageGallery = ({ product, productData, selectedImage, setSelectedImage }) => {
  const mainImage = selectedImage || productData.images[0];

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse lg:col-span-3">
      {/* Main Image */}
      <div className="flex-1">
        <div
          className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4 md:aspect-auto md:h-[500px] md:p-8"
          role="img"
          aria-label={`Main image of ${product.title}`}
        >
          <img
            src={mainImage}
            alt={product.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-2 overflow-x-auto md:max-h-[500px] md:flex-col md:overflow-y-auto"
        role="list"
      >
        {productData.images.map((imgUrl, index) => (
          <button
            key={index}
            role="listitem"
            className={cn(
              "flex-shrink-0 rounded-lg border-2 bg-gray-50 p-2 transition-all hover:border-gray-400 focus:outline-none",
              mainImage === imgUrl
                ? "border-primary-red"
                : "border-transparent",
            )}
            onClick={() => setSelectedImage(imgUrl)}
            aria-label={`View image ${index + 1} of ${productData.images.length}`}
            aria-pressed={mainImage === imgUrl}
          >
            <img
              src={imgUrl}
              alt={`${product.title} view ${index + 1}`}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
