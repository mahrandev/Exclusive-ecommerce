import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { signUp, signInWithGoogle, getCurrentSession } from "@/api/authApi";
import useAuthStore from "@/store/authStore";

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
};

const useSignUp = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  const signUpSchema = z
    .object({
      name: z
        .string()
        .min(3, { message: t("auth.nameMinLength", { length: 3 }) }),
      email: z.string().email({ message: t("auth.invalidEmail") }),
      password: z
        .string()
        .min(8, { message: t("auth.passwordMinLength", { length: 8 }) })
        .regex(/[a-z]/, { message: t("auth.passwordLowercase") })
        .regex(/[A-Z]/, { message: t("auth.passwordUppercase") })
        .regex(/[0-9]/, { message: t("auth.passwordNumber") })
        .regex(/[^a-zA-Z0-9]/, {
          message: t("auth.passwordSpecial"),
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.passwordsNotMatch"),
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const password = watch("password", "");
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session } = await getCurrentSession();
        if (session && session.user) {
          login({ user: session.user });
          toast.success(t("auth.signupSuccess"));
          navigate("/account");
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };
    checkSession();
  }, [login, navigate, t]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success(t("auth.signupSuccess"), {
        description: t("auth.checkEmail"),
      });
      navigate("/login");
    } catch (error) {
      if (
        error.message === "This email is already registered. Please log in."
      ) {
        toast.error(t("auth.emailAlreadyRegistered"));
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(t("auth.signupFailed"), {
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  return {
    t,
    isLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    errors,
    password,
    passwordStrength,
    onSubmit,
    handleGoogleSignUp,
  };
};

export default useSignUp;
