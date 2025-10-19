import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import CategorySidebar from '@/components/home/CategorySidebar';
import ProductList from '@/components/home/ProductList';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { categories, error: categoriesError } = useCategories();
  const { products, isLoading: isLoadingProducts, error: productsError } = useProducts(selectedCategory);

  if (categoriesError) {
    console.error("Failed to load categories:", categoriesError.message);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Categories</h3>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Browse By Category
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <ProductList
            products={products}
            isLoading={isLoadingProducts}
            error={productsError}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;