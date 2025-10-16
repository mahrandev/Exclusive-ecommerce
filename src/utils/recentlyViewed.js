// src/utils/recentlyViewed.js

const MAX_RECENTLY_VIEWED = 5;
const STORAGE_KEY = 'recentlyViewedProducts';

/**
 * Retrieves recently viewed products from localStorage.
 * @returns {Array} An array of product objects.
 */
export const getRecentlyViewed = () => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Failed to parse recently viewed products from localStorage", error);
    return [];
  }
};

/**
 * Adds a product to the recently viewed list in localStorage.
 * @param {object} product The product object to add.
 */
export const addRecentlyViewed = (product) => {
  if (!product || !product.id) return;

  const items = getRecentlyViewed();
  
  // Remove the product if it already exists to move it to the front
  const filteredItems = items.filter(item => item.id !== product.id);
  
  // Add the new product to the beginning of the array
  const updatedItems = [product, ...filteredItems];
  
  // Slice the array to respect the maximum number of items
  const finalItems = updatedItems.slice(0, MAX_RECENTLY_VIEWED);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(finalItems));
};
