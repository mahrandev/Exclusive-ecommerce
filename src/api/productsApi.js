// الموجود حاليًا في الملف
import { supabase } from "@/lib/supabaseClient";

export const getProducts = async ({ category } = {}) => {
  let query = supabase.from("products").select();

  // If a category is provided and it's not "All", filter by it
  if (category && category !== "All") {
    query = query.eq("category", category);
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

  // Use a Set to get unique category values
  const categories = [...new Set(data.map((product) => product.category))];
  return categories;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single(); // .single() لجلب نتيجة واحدة فقط

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
