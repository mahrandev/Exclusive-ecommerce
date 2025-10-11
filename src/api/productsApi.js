// الموجود حاليًا في الملف
import { supabase } from "@/lib/supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// ========== أضف هذا الكود الجديد بالأسفل ==========

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