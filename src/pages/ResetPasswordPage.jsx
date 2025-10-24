import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: t("auth.passwordMinLength", { length: 8 }) })
        .regex(/[a-z]/, { message: t("auth.passwordLowercase") })
        .regex(/[A-Z]/, { message: t("auth.passwordUppercase") })
        .regex(/[0-9]/, { message: t("auth.passwordNumber") })
        .regex(/[^a-zA-Z0-9]/, { message: t("auth.passwordSpecial") }),
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
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password", "");
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  };
  const passwordStrength = getPasswordStrength(password);

  // Check if user came from password reset email
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.error(t("auth.invalidResetLink"));
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate, t]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) throw error;

      toast.success(t("auth.passwordResetSuccess"));
      navigate("/login");
    } catch (error) {
      toast.error(t("auth.passwordResetFailed"), {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden items-center justify-start p-10 pl-0 lg:flex">
        <img
          src={signUpImage}
          alt="Reset Password Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mx-auto grid gap-8">
            <div className="grid gap-2 text-center sm:text-start">
              <h1 className="font-inter text-3xl font-bold tracking-tight sm:text-4xl">
                {t("auth.resetPasswordTitle")}
              </h1>
              <p className="text-muted-foreground ">
                {t("auth.resetPasswordDesc")}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                    style={{
                      left: t("dir") === "rtl" ? "auto" : "12px",
                      right: t("dir") === "rtl" ? "12px" : "auto",
                    }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`peer block w-full appearance-none rounded-md border-2 bg-gray-50 py-3 text-base text-gray-900 transition-colors focus:ring-0 focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600"
                    } ${t("dir") === "rtl" ? "pr-10 pl-10" : "pr-10 pl-10"}`}
                    placeholder={t("auth.newPassword")}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${
                      t("dir") === "rtl" ? "left-3" : "right-3"
                    }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {password && passwordStrength > 0 && (
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 flex-1 rounded-full transition-all ${
                      passwordStrength < 2
                        ? "bg-red-500"
                        : passwordStrength < 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  ></div>
                  <p
                    className={`text-sm ${
                      passwordStrength < 2
                        ? "text-red-500"
                        : passwordStrength < 4
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {t(
                      `auth.passwordStrength.${["weak", "medium", "medium", "strong"][passwordStrength - 1]}`,
                    )}
                  </p>
                </div>
              )}

              <div className="grid gap-1">
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                    style={{
                      left: t("dir") === "rtl" ? "auto" : "12px",
                      right: t("dir") === "rtl" ? "12px" : "auto",
                    }}
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`peer block w-full appearance-none rounded-md border-2 bg-gray-50 py-3 text-base text-gray-900 transition-colors focus:ring-0 focus:outline-none ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600"
                    } ${t("dir") === "rtl" ? "pr-10 pl-10" : "pr-10 pl-10"}`}
                    placeholder={t("auth.confirmNewPassword")}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${
                      t("dir") === "rtl" ? "left-3" : "right-3"
                    }`}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 py-6 text-base font-medium text-white hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading
                ? t("auth.resettingPassword")
                : t("auth.resetPassword")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
