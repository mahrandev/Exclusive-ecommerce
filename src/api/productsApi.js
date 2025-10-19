import { supabase } from "@/lib/supabaseClient";

export const getProducts = async ({ category } = {}) => {
  let query = supabase.from("products").select();

  if (category && category !== "All") {
    if (Array.isArray(category)) {
      query = query.in("category", category);
    } else {
      query = query.eq("category", category);
    }
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCategories = async () => {
  const { data, error } = await supabase.from("products").select("category");

  if (error) {
    throw new Error(error.message);
  }

  const categories = [...new Set(data.map((product) => product.category))];
  return categories;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const searchProductsByName = async (name) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('title', `%${name}%`);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
