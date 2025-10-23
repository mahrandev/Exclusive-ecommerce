// Base URL for the dummyJSON API
const API_BASE_URL = "https://dummyjson.com/products";

/**
 * Fetches products, optionally filtering by category.
 * @param {{ category?: string }} options - Filtering options.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
export const getProducts = async ({ category } = {}) => {
  const url = category && category !== "All"
    ? `${API_BASE_URL}/category/${category}`
    : `${API_BASE_URL}?limit=0`; // Fetch all products by default

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products;
};

/**
 * Fetches all available product categories.
 * @returns {Promise<Array>} A promise that resolves to an array of category names.
 */
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data;
};

/**
 * Fetches a single product by its ID.
 * @param {string | number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 */
export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};

/**
 * Searches for products by a search query.
 * @param {string} name - The search query.
 * @returns {Promise<Array>} A promise that resolves to an array of matching products.
 */
export const searchProductsByName = async (name) => {
  const response = await fetch(`${API_BASE_URL}/search?q=${name}`);
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  const data = await response.json();
  return data.products;
};