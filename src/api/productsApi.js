// الموجود حاليًا في الملف
import { supabase } from "@/lib/supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
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