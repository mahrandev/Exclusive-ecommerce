import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";

const useAccountPageLogic = () => {
  const { t, i18n } = useTranslation();
  const { user, login } = useAuthStore((state) => state);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile Schema
  const profileSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: t("auth.nameMinLength", { length: 2 }) }),
    lastName: z
      .string()
      .min(2, { message: t("auth.nameMinLength", { length: 2 }) }),
    email: z.string().email({ message: t("auth.invalidEmail") }),
    address: z.string().optional(),
  });

  // Password Schema
  const passwordSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: "Current password is required" }),
      newPassword: z
        .string()
        .min(8, { message: t("auth.passwordMinLength", { length: 8 }) })
        .regex(/[a-z]/, { message: t("auth.passwordLowercase") })
        .regex(/[A-Z]/, { message: t("auth.passwordUppercase") })
        .regex(/[0-9]/, { message: t("auth.passwordNumber") })
        .regex(/[^a-zA-Z0-9]/, { message: t("auth.passwordSpecial") }),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("auth.passwordsNotMatch"),
      path: ["confirmNewPassword"],
    });

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset: resetProfile,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      resetProfile({
        firstName:
          metadata.firstName || metadata.full_name?.split(" ")[0] || "",
        lastName: metadata.lastName || metadata.full_name?.split(" ")[1] || "",
        email: user.email || "",
        address: metadata.address || "",
      });
    }
  }, [user, resetProfile]);

  // Get user full name for welcome message
  const getFullName = () => {
    if (!user) return "User";
    const metadata = user.user_metadata || {};
    const firstName =
      metadata.firstName || metadata.full_name?.split(" ")[0] || "";
    const lastName =
      metadata.lastName || metadata.full_name?.split(" ")[1] || "";
    return (
      `${firstName} ${lastName}`.trim() || user.email?.split("@")[0] || "User"
    );
  };

  // Update Profile Handler
  const onSubmitProfile = async (formData) => {
    setIsLoadingProfile(true);
    try {
      // Update user metadata
      const { data, error } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
        },
      });

      if (error) throw error;

      // Update local store
      login({ user: data.user });

      toast.success("Profile updated successfully!", {
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile", {
        description: error.message,
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Update Password Handler
  const onSubmitPassword = async (formData) => {
    setIsLoadingPassword(true);
    try {
      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (updateError) throw updateError;

      toast.success("Password changed successfully!", {
        description: "Your password has been updated.",
      });

      // Reset password form
      resetPassword();
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Failed to change password", {
        description: error.message,
      });
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return {
    t,
    i18n,
    user,
    isLoadingProfile,
    isLoadingPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    registerProfile,
    handleSubmitProfile,
    errorsProfile,
    resetProfile,
    onSubmitProfile,
    registerPassword,
    handleSubmitPassword,
    errorsPassword,
    resetPassword,
    onSubmitPassword,
    getFullName,
  };
};

export default useAccountPageLogic;
