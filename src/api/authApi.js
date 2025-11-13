// src/api/authApi.js
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
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    if (error.message.includes("User already registered")) {
      throw new Error("This email is already registered. Please log in.");
    }
    throw new Error(error.message);
  }

  return data;
};

/**
 * دالة لتسجيل دخول مستخدم موجود
 * @param {object} credentials - بيانات الدخول (email, password)
 * @returns {Promise<object>} - بيانات المستخدم والـ session
 */
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }

  return data;
};

/**URL للتوجيه بعد النجاح (اختياري)
 * @param {string} redirectTo - 
 * @returns {Promise<object>} - بيانات استجابة OAuth
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/account`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * دالة للحصول على الجلسة الحالية
 * @returns {Promise<object>} - بيانات الجلسة
 */
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * دالة للحصول على المستخدم الحالي
 * @returns {Promise<object>} - بيانات المستخدم
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error.message);
    throw new Error(error.message);
  }

  return data;
};

/**
 * دالة لتسجيل الخروج
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }
};
