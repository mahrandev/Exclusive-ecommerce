import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { signIn, signInWithGoogle } from "@/api/authApi";
import IconGoogle from "@/assets/img/Icon-Google.svg";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

const LoginPage = () => {
  const { t } = useTranslation();
  const loginSchema = z.object({
    email: z
      .string()
      .email({ message: t("auth.invalidEmail") })
      .min(1, { message: t("auth.emailRequired") }),
    password: z
      .string()
      .min(6, { message: t("auth.passwordMinLength", { length: 6 }) }),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const data = await signIn({
        email: formData.email,
        password: formData.password,
      });
      login(data);
      toast.success(t("auth.loginSuccess"));
      navigate("/account");
    } catch (error) {
      if (error.message === "Invalid login credentials") {
        toast.error(t("auth.invalidCredentials"));
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden items-center justify-start p-10 pl-0 lg:flex">
        <img
          src={signUpImage}
          alt="Login Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mx-auto grid gap-8">
            <div className="grid gap-2 text-center sm:text-start">
              <h1 className="font-inter text-3xl font-bold tracking-tight sm:text-4xl">
                {t("auth.loginTitle")}
              </h1>
              <p className="text-muted-foreground">{t("auth.enterDetails")}</p>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className={`peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:ring-0 focus:outline-none dark:text-white ${
                      errors.email
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600 dark:focus:border-red-500"
                    }`}
                    placeholder=" "
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email")}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 ${
                      errors.email
                        ? "text-red-600"
                        : "text-gray-500 peer-focus:text-red-600 dark:text-gray-400"
                    }`}
                  >
                    {t("auth.email")}
                  </label>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:ring-0 focus:outline-none dark:text-white ${
                      errors.password
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600 dark:focus:border-red-500"
                    }`}
                    placeholder=" "
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password")}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 ${
                      errors.password
                        ? "text-red-600"
                        : "text-gray-500 peer-focus:text-red-600 dark:text-gray-400"
                    }`}
                  >
                    {t("auth.password")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 flex items-center text-gray-500 hover:text-gray-700 ${t("dir") === "rtl" ? "left-0 pl-3" : "right-0 pr-3"}`}
                    aria-label={
                      showPassword
                        ? t("auth.hidePassword")
                        : t("auth.showPassword")
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-red-500 px-12 py-6 text-base font-medium text-white hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? t("auth.loggingIn") : t("auth.login")}
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-red-500 hover:underline"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full py-6 text-base font-medium"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <img
                  src={IconGoogle}
                  alt="Google icon"
                  className="mr-4 h-6 w-6"
                />
                {t("auth.loginWithGoogle")}
              </Button>
            </div>

            <div className="text-center text-base">
              {t("auth.noAccount")}{" "}
              <Link
                to="/signup"
                className="font-medium text-gray-500 underline hover:text-gray-700"
              >
                {t("auth.signup")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
