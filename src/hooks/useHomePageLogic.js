
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { categoryMapping } from "@/data/categoryMapping.js";
import { useSlider } from "@/hooks/useSlider"; // Import the generic slider hook
import {
  Shirt,
  User,
  Smartphone,
  Home,
  Glasses,
  Bike,
  Laptop,
  ShoppingBasket,
  Heart,
  Gamepad2,
} from "lucide-react";

export const useHomePageLogic = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(selectedCategory);

  const mainCategories = Object.keys(categoryMapping);

  // Reusable slider logic for all sections
  const categorySlider = useSlider({ totalItems: mainCategories.length, visibleItems: 6 });
  const flashSalesSlider = useSlider({ totalItems: products?.length || 0, visibleItems: 4 });
  const exploreProductsSlider = useSlider({ totalItems: products?.length || 0, visibleItems: 4 });

  const iconMapping = {
    "Woman's Fashion": Shirt,
    "Men's Fashion": User,
    Mobiles: Smartphone,
    "Home & Lifestyle": Home,
    Glasses: Glasses,
    "Sports & Outdoor": Bike,
    "Laptops & Computers": Laptop,
    "Groceries & Pets": ShoppingBasket,
    "Health & Beauty": Heart,
    Gaming: Gamepad2,
  };

  const sidebarCategories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Mobiles",
    "Home & Lifestyle",
    "Glasses",
    "Sports & Outdoor",
    "Laptops & Computers",
    "Groceries & Pets",
    "Health & Beauty",
  ];

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
    categoryMapping,
    categorySlider,
    flashSalesSlider,
    exploreProductsSlider,
  };
};
