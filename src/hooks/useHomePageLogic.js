


import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useSlider } from "@/hooks/useSlider";
import {
  Heart,
  Sparkles,
  Sofa,
  ShoppingBasket,
  Home,
  CookingPot,
} from "lucide-react";

export const useHomePageLogic = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(selectedCategory);

  const sidebarCategories = [
    { name: "Woman's Fashion", slug: "womens-dresses" },
    { name: "Men's Fashion", slug: "mens-shirts" },
    { name: "Mobiles", slug: "smartphones" },
    { name: "Home & Lifestyle", slug: "home-decoration" },
    { name: "Glasses", slug: "sunglasses" },
    { name: "Sports & Outdoor", slug: "sports-accessories" },
    { name: "Laptops & Computers", slug: "laptops" },
    { name: "Groceries & Pets", slug: "groceries" },
    { name: "Health & Beauty", slug: "beauty" },
  ];

  const mainCategories = [
    { name: "Beauty", slug: "beauty" },
    { name: "Fragrances", slug: "fragrances" },
    { name: "Furniture", slug: "furniture" },
    { name: "Groceries", slug: "groceries" },
    { name: "Home Decoration", slug: "home-decoration" },
    { name: "Kitchen Accessories", slug: "kitchen-accessories" },
  ];

  const iconMapping = {
    beauty: Heart,
    fragrances: Sparkles,
    furniture: Sofa,
    groceries: ShoppingBasket,
    "home-decoration": Home,
    "kitchen-accessories": CookingPot,
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
    totalItems: products?.length || 0,
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
    isLoadingCategories: false, // Since we are not fetching categories anymore
  };
};

