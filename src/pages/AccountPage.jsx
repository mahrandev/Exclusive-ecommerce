import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, User, Mail, MapPin, Eye, EyeOff } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import useAuthStore from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AccountPage = () => {
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

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block py-2 transition-colors duration-300 ${
            isActive && to === "/account"
              ? "font-medium text-red-500"
              : "text-gray-900 hover:text-red-500"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-16">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              {t("welcome")} {getFullName()}!
            </h2>
            <p className="mt-1 text-red-100">
              {t("managePreferences")}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumbs containerClassName="text-sm text-gray-500 mb-8" />

      <div className="flex flex-col gap-12 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col gap-6">
            <div>
              <ul className={`space-y-2 ${i18n.language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                <NavItem to="/account">{t("myProfile")}</NavItem>
                <NavItem to="#">{t("addressBook")}</NavItem>
                <NavItem to="#">{t("paymentOptions")}</NavItem>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("myOrders")}
              </h3>
              <ul className={`space-y-2 ${i18n.language === 'ar' ? 'pr-4' : 'pl-4'}`}>
                <NavItem to="/cart">{t("myOrders")}</NavItem>
                <NavItem to="#">{t("myReturns")}</NavItem>
                <NavItem to="#">{t("myCancellations")}</NavItem>
              </ul>
            </div>
            <div>
              <NavLink
                to="/wishlist"
                className="text-lg font-semibold text-gray-900 hover:text-red-500"
              >
                {t("wishlist")}
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full space-y-8 md:w-3/4">
          {/* Edit Profile Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-red-500">
              <User size={24} />
              {t("editProfile")}
            </h2>
            <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-2 flex items-center gap-2"
                  >
                    <User size={16} />
                    {t("firstName")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...registerProfile("firstName")}
                    className="h-12"
                    aria-invalid={errorsProfile.firstName ? "true" : "false"}
                  />
                  {errorsProfile.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsProfile.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-2 flex items-center gap-2"
                  >
                    <User size={16} />
                    {t("lastName")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...registerProfile("lastName")}
                    className="h-12"
                    aria-invalid={errorsProfile.lastName ? "true" : "false"}
                  />
                  {errorsProfile.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsProfile.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2"
                  >
                    <Mail size={16} />
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerProfile("email")}
                    className="h-12"
                    aria-invalid={errorsProfile.email ? "true" : "false"}
                  />
                  {errorsProfile.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsProfile.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="address"
                    className="mb-2 flex items-center gap-2"
                  >
                    <MapPin size={16} />
                    {t("address")}
                  </Label>
                  <Input
                    id="address"
                    {...registerProfile("address")}
                    placeholder="Your address"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-3"
                  onClick={() => resetProfile()}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="bg-red-500 px-8 py-3 text-white hover:bg-red-600"
                  disabled={isLoadingProfile}
                >
                  {isLoadingProfile ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    t("saveChanges")
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Password Changes
            </h2>
            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="mb-2">
                    {t("currentPassword")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...registerPassword("currentPassword")}
                      className="h-12 pr-10"
                      aria-invalid={
                        errorsPassword.currentPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errorsPassword.currentPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsPassword.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="newPassword" className="mb-2">
                    {t("newPassword")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...registerPassword("newPassword")}
                      className="h-12 pr-10"
                      aria-invalid={
                        errorsPassword.newPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errorsPassword.newPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsPassword.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmNewPassword" className="mb-2">
                    {t("confirmPassword")}{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmNewPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerPassword("confirmNewPassword")}
                      className="h-12 pr-10"
                      aria-invalid={
                        errorsPassword.confirmNewPassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errorsPassword.confirmNewPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errorsPassword.confirmNewPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-3"
                  onClick={() => resetPassword()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-500 px-8 py-3 text-white hover:bg-red-600"
                  disabled={isLoadingPassword}
                >
                  {isLoadingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
