// src/hooks/useHomePageLogic.js - Updated version

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/hooks/useProducts";
import { useSlider } from "@/hooks/useSlider";
import { shuffleArray, addRandomReviewCounts } from "@/utils/productUtils";
import {
  Heart,
  Sparkles,
  Sofa,
  ShoppingBasket,
  Home,
  CookingPot,
  Shirt,
  Smartphone,
  Glasses,
  Dumbbell,
  Laptop,
} from "lucide-react";

export const useHomePageLogic = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    products: rawProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(selectedCategory);

  // Shuffle products and add random review counts
  const products = useMemo(() => {
    if (!rawProducts || rawProducts.length === 0) return [];

    // Shuffle the products array
    const shuffled = shuffleArray(rawProducts);

    // Add random review counts to each product
    return addRandomReviewCounts(shuffled);
  }, [rawProducts]);

  const sidebarCategories = [
    { name: "category.womens-dresses", slug: "womens-dresses" },
    { name: "category.mens-shirts", slug: "mens-shirts" },
    { name: "category.smartphones", slug: "smartphones" },
    { name: "category.home-decoration", slug: "home-decoration" },
    { name: "category.sunglasses", slug: "sunglasses" },
    { name: "category.sports-accessories", slug: "sports-accessories" },
    { name: "category.laptops", slug: "laptops" },
    { name: "category.groceries", slug: "groceries" },
    { name: "category.beauty", slug: "beauty" },
    { name: "category.mobile-accessories", slug: "mobile-accessories" },
    { name: "category.tablets", slug: "tablets" },
  ];

  const mainCategories = [
    { name: "category.beauty", slug: "beauty" },
    { name: "category.fragrances", slug: "fragrances" },
    { name: "category.furniture", slug: "furniture" },
    { name: "category.groceries", slug: "groceries" },
    { name: "category.home-decoration", slug: "home-decoration" },
    { name: "category.kitchen-accessories", slug: "kitchen-accessories" },
  ];

  const iconMapping = {
    "womens-dresses": Shirt,
    "mens-shirts": Shirt,
    smartphones: Smartphone,
    "home-decoration": Home,
    sunglasses: Glasses,
    "sports-accessories": Dumbbell,
    laptops: Laptop,
    groceries: ShoppingBasket,
    beauty: Heart,
    fragrances: Sparkles,
    furniture: Sofa,
    "kitchen-accessories": CookingPot,
    "mobile-accessories": Smartphone,
    "tablets": Laptop,
  };

  const categorySlider = useSlider({
    totalItems: mainCategories.length,
    visibleItems: 6,
  });
  const flashSalesSlider = useSlider({
    totalItems: products?.length || 0,
    visibleItems: 4,
  });
  const exploreProductsSlider = useSlider({
    totalItems: 8, // The slice is from 4 to 12, which is 8 items
    visibleItems: 4,
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    products,
    isLoadingProducts,
    productsError,
    iconMapping,
    sidebarCategories,
    mainCategories,
    handleCategorySelect,
    categorySlider,
    flashSalesSlider,
    exploreProductsSlider,
    isLoadingCategories: false,
  };
};
