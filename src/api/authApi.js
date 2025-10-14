// 1. نستورد supabase client الذي قمنا بإعداده سابقًا

import { supabase } from "@/lib/supabaseClient";

/**
 * @typedef {object} SignUpData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */

/**
 * دالة لإنشاء حساب مستخدم جديد في Supabase
 * @param {SignUpData} credentials - بيانات المستخدم الجديد
 * @returns {Promise<object>} - بيانات المستخدم والـ session
 */
export const signUp = async ({ name, email, password }) => {
  // 2. نستخدم دالة supabase الجاهزة لإنشاء حساب جديد
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // 3. هنا نمرر البيانات الإضافية مثل اسم المستخدم
      // هذه البيانات ستُخزن في حقل 'raw_user_meta_data' في Supabase
      data: {
        full_name: name,
      },
    },
  });

  // 4. معالجة الأخطاء: إذا حدث خطأ، قم بإيقاف التنفيذ وإظهاره
  if (error) {
    console.error("Error signing up:", error.message);
    // ✨ التحقق من خطأ المستخدم المسجل مسبقًا
    if (error.message.includes("User already registered")) {
      throw new Error("هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.");
    }
    // رمي الأخطاء الأخرى كما هي
    throw new Error(error.message);
  }

  // 5. في حال النجاح، قم بإرجاع بيانات المستخدم
  return data;
};

/**
 * دالة لتسجيل دخول مستخدم موجود
 * @param {object} credentials - بيانات الدخول (email, password)
 * @returns {Promise<object>} - بيانات المستخدم والـ session
 */
export const signIn = async ({ email, password }) => {
  // نستخدم دالة supabase الجاهزة لتسجيل الدخول
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // معالجة الأخطاء: إذا كانت البيانات خاطئة، أوقف التنفيذ وأظهر الخطأ
  if (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }

  // في حال النجاح، قم بإرجاع بيانات المستخدم
  return data;
};
