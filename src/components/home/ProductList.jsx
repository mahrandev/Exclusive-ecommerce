import React from 'react';
import ProductCard from '@/components/shared/ProductCard';
import ProductCardSkeleton from '@/components/shared/ProductCardSkeleton';

const ProductList = ({ products, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <main className="w-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductList;
