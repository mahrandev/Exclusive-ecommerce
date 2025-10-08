import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi';

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log data to see if it comes from Supabase
  console.log('Products from Supabase:', data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome to Exclusive</h1>
      {/* We will map over the data to display products in the next step */}
    </div>
  );
};

export default HomePage;