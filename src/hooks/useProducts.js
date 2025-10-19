import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/productsApi";

export const useProducts = (category) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", JSON.stringify(category)], // Use JSON.stringify for array stability
    queryFn: () => getProducts({ category }),
  });

  return { products, isLoading, error };
};
