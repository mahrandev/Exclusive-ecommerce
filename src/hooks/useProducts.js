import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";

export const useProducts = (category) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category], // Add category to the queryKey
    queryFn: () => getProducts({ category }),
  });

  return { products, isLoading, error };
};
