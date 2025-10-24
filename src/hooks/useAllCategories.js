import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useAllCategories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simulate API call
        const fetchedCategories = [
          { name: "category.womens-dresses", slug: "womens-dresses" },
          { name: "category.mens-shirts", slug: "mens-shirts" },
          { name: "category.smartphones", slug: "smartphones" },
          { name: "category.home-decoration", slug: "home-decoration" },
          { name: "category.sunglasses", slug: "sunglasses" },
          { name: "category.sports-accessories", slug: "sports-accessories" },
          { name: "category.laptops", slug: "laptops" },
          { name: "category.groceries", slug: "groceries" },
          { name: "category.beauty", slug: "beauty" },
          { name: "category.fragrances", slug: "fragrances" },
          { name: "category.furniture", slug: "furniture" },
          { name: "category.kitchen-accessories", slug: "kitchen-accessories" },
        ];
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

  return { categories, isLoading, error };
};
