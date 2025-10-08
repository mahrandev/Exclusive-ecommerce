// This file will handle all API calls related to products.
import { supabase } from "../lib/supabaseClient";

export const getProducts = async () => {
  // We now fetch data from Supabase instead of a fake API
  const { data, error } = await supabase
    .from("products") // select the 'products' table
    .select("*"); // select all columns

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  return data;
};

// We will add more functions here later (getProductById, createProduct, etc.)
