import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ProductDetailsSkeleton from "@/components/shared/ProductDetailsSkeleton";
import { useProductDetails } from "@/hooks/useProductDetails";
import { useEffect } from "react";
import { addRecentlyViewed } from "@/utils/recentlyViewed";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductOptions from "@/components/product/ProductOptions";
import ProductActions from "@/components/product/ProductActions";
import DeliveryDetails from "@/components/product/DeliveryDetails";

const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const {
    product,
    isLoading,
    isError,
    error,
    productData,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    isWishlisted,
    handleQuantityChange,
    handleAddToCart,
    handleAddToWishlist,
    handleBuyNow,
    handleKeyDown,
    stars,
  } = useProductDetails();

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            {t("notFound.title")}
          </h2>
          <p className="mb-6 text-gray-600">{error.message}</p>
          <Button asChild>
            <Link to="/">{t("notFound.backToHome")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!product || !productData) return null;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      <Breadcrumbs />

      <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-5">
        <ImageGallery
          product={product}
          productData={productData}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <div className="lg:col-span-2">
          <ProductInfo product={product} stars={stars} />
          <ProductOptions
            productData={productData}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            handleKeyDown={handleKeyDown}
          />
          <ProductActions
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            isWishlisted={isWishlisted}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            handleAddToWishlist={handleAddToWishlist}
            handleBuyNow={handleBuyNow}
          />
          <DeliveryDetails />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;