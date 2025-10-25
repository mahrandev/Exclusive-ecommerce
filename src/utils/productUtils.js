// src/utils/productUtils.js

/**
 * Shuffles an array randomly using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export const shuffleArray = (array) => {
  if (!array || array.length === 0) return [];
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates a random number of reviews between min and max
 * @param {number} min - Minimum number of reviews
 * @param {number} max - Maximum number of reviews
 * @returns {number} - Random number of reviews
 */
export const getRandomReviewCount = (min = 1, max = 150) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Adds random review counts to products
 * @param {Array} products - Array of products
 * @returns {Array} - Products with random review counts
 */
export const addRandomReviewCounts = (products) => {
  if (!products || products.length === 0) return [];
  
  return products.map(product => ({
    ...product,
    randomReviewCount: product.reviews?.length || getRandomReviewCount(1, 150)
  }));
};

/**
 * Gets random products from an array
 * @param {Array} products - Array of products
 * @param {number} count - Number of products to return
 * @returns {Array} - Random selection of products
 */
export const getRandomProducts = (products, count) => {
  if (!products || products.length === 0) return [];
  
  const shuffled = shuffleArray(products);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};