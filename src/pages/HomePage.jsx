import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import CategorySidebar from "@/components/home/CategorySidebar";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
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
import jbi from "@/assets/img/jbl-outdoor-speaker.avif";
import iphone from "@/assets/img/iphone.avif";
import { categoryMapping } from "@/data/categoryMapping.js";

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

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { categories, error: categoriesError } = useCategories();
  const {
    products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useProducts(selectedCategory);

  if (categoriesError) {
    console.error("Failed to load categories:", categoriesError.message);
  }

  const mainCategories = Object.keys(categoryMapping);

  return (
    <div className="bg-white">
      {/* Hero Section with Sidebar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Categories Sidebar */}
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Hero Banner */}
            <div className="flex min-h-[300px] flex-1 items-center justify-between rounded-lg bg-black p-8 text-white md:p-12">
              <div className="max-w-md">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-sm">iPhone 14 Series</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-5xl">
                  Up to 10% off Voucher
                </h2>
                <Button
                  variant="link"
                  className="h-auto p-0 text-white underline underline-offset-4"
                >
                  Shop Now →
                </Button>
              </div>
              <img
                src={iphone}
                alt="iPhone"
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Today's</h3>
          </div>

          {/* Section Title with Timer */}
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Flash Sales
              </h2>

              {/* Countdown Timer */}
              <div className="hidden items-center gap-4 md:flex">
                <div className="text-center">
                  <div className="text-xs font-medium">Days</div>
                  <div className="text-3xl font-bold">03</div>
                </div>
                <span className="text-2xl font-bold text-red-500">:</span>
                <div className="text-center">
                  <div className="text-xs font-medium">Hours</div>
                  <div className="text-3xl font-bold">23</div>
                </div>
                <span className="text-2xl font-bold text-red-500">:</span>
                <div className="text-center">
                  <div className="text-xs font-medium">Minutes</div>
                  <div className="text-3xl font-bold">19</div>
                </div>
                <span className="text-2xl font-bold text-red-500">:</span>
                <div className="text-center">
                  <div className="text-xs font-medium">Seconds</div>
                  <div className="text-3xl font-bold">56</div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : productsError ? (
          <div className="text-red-500">Error: {productsError.message}</div>
        ) : products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Button className="bg-red-500 px-12 py-6 text-white hover:bg-red-600">
                View All Products
              </Button>
            </div>
          </>
        ) : (
          <div>No products found.</div>
        )}
      </section>

      {/* Browse By Category Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">Categories</h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Browse By Category
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Icons Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mainCategories.map((category, index) => {
            const Icon = iconMapping[category];
            const isSelected =
              JSON.stringify(selectedCategory) ===
              JSON.stringify(categoryMapping[category]);

            return (
              <button
                key={index}
                onClick={() => setSelectedCategory(categoryMapping[category])}
                className={`flex flex-col items-center justify-center rounded-lg border-2 p-6 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white ${
                  isSelected
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="mb-3 text-4xl">
                  <Icon size={48} />
                </div>
                <span className="text-sm font-medium capitalize">
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">This Month</h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Best Selling Products
            </h2>

            <Button className="bg-red-500 px-12 text-white hover:bg-red-600">
              View All
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>

      {/* Featured Banner Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-between rounded-lg bg-black p-12 text-white">
          <div className="max-w-md">
            <span className="mb-4 inline-block text-sm font-semibold text-green-500">
              Categories
            </span>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              Enhance Your Music Experience
            </h2>
            <div className="mb-8 flex gap-4">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
                <span className="text-xs font-semibold">23</span>
                <span className="text-[10px]">Hours</span>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
                <span className="text-xs font-semibold">05</span>
                <span className="text-[10px]">Days</span>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
                <span className="text-xs font-semibold">59</span>
                <span className="text-[10px]">Minutes</span>
              </div>
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black">
                <span className="text-xs font-semibold">35</span>
                <span className="text-[10px]">Seconds</span>
              </div>
            </div>
            <Button className="bg-green-500 px-12 text-white hover:bg-green-600">
              Buy Now!
            </Button>
          </div>
          <div className="hidden lg:block">
            {/* Placeholder for product image */}
            <img src={jbi} alt="" />
            {/* <div className="h-64 w-64 rounded-full bg-gray-800"></div> */}
          </div>
        </div>
      </section>

      {/* Explore Our Products Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-5 rounded bg-red-500"></div>
            <h3 className="text-base font-semibold text-red-500">
              Our Products
            </h3>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Explore Our Products
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button className="bg-red-500 px-12 py-6 text-white hover:bg-red-600">
            View All Products
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Free Delivery */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border-8 border-gray-500 bg-black text-white">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold">FREE AND FAST DELIVERY</h3>
            <p className="text-sm text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* 24/7 Customer Service */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border-8 border-gray-500 bg-black text-white">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold">24/7 CUSTOMER SERVICE</h3>
            <p className="text-sm text-gray-600">
              Friendly 24/7 customer support
            </p>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border-8 border-gray-500 bg-black text-white">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold">MONEY BACK GUARANTEE</h3>
            <p className="text-sm text-gray-600">
              We return money within 30 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
