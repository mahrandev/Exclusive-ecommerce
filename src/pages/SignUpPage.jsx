import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import useSignUp from "@/hooks/useSignUp"; // ✅ استيراد الهوك المخصص
import { Button } from "@/components/ui/button";
import IconGoogle from "@/assets/img/Icon-Google.svg";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

const SignUpPage = () => {
  // ✅ استخدام الهوك للحصول على كل المنطق والحالة
  const {
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
  } = useSignUp();

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden items-center justify-start p-10 pl-0 lg:flex">
        <img
          src={signUpImage}
          alt="Sign Up Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mx-auto grid w-full gap-6">
            <div className="grid gap-2 text-center sm:text-start">
              <h1 className="font-inter text-3xl font-bold tracking-tight sm:text-4xl">
                {t("auth.signupTitle")}
              </h1>
              <p className="text-base text-stone-500">
                {t("auth.enterDetails")}
              </p>
            </div>

            <div className="grid gap-4">
              {/* Name Input */}
              <div className="grid gap-1">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className={`peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:ring-0 focus:outline-none dark:text-white ${
                      errors.name
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600 dark:focus:border-red-500"
                    }`}
                    placeholder=" "
                    {...register("name")}
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                  >
                    {t("auth.name")}
                  </label>
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="grid gap-1">
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
                    {...register("email")}
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                  >
                    {t("auth.email")}
                  </label>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="grid gap-1">
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
                    {...register("password")}
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                  >
                    {t("auth.password")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 flex items-center text-gray-500 ${t("dir") === "rtl" ? "left-0 pl-3" : "right-0 pr-3"}`}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Password Strength Indicator */}
              {password && passwordStrength > 0 && (
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 flex-1 rounded-full"
                    style={{
                      width: `${(passwordStrength / 4) * 100}%`,
                      backgroundColor:
                        passwordStrength < 2
                          ? "#ef4444" // red-500
                          : passwordStrength < 4
                            ? "#f59e0b" // yellow-500
                            : "#22c55e", // green-500
                    }}
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

              {/* Confirm Password Input */}
              <div className="grid gap-1">
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:ring-0 focus:outline-none dark:text-white ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-600"
                        : "border-gray-300 focus:border-red-600 dark:focus:border-red-500"
                    }`}
                    placeholder=" "
                    {...register("confirmPassword")}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                  >
                    {t("auth.confirmPassword")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute inset-y-0 flex items-center text-gray-500 ${t("dir") === "rtl" ? "left-0 pl-3" : "right-0 pr-3"}`}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <Button
                type="submit"
                className="w-full bg-red-500 py-6 text-base font-medium text-white hover:bg-red-600"
                disabled={isLoading}
              >
                {isLoading
                  ? t("auth.creatingAccount")
                  : t("auth.createAccount")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full py-6 text-base font-medium"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <img
                  src={IconGoogle}
                  alt="Google icon"
                  className="mr-4 h-6 w-6"
                />
                {t("auth.signupWithGoogle")}
              </Button>
            </div>

            <div className="text-center text-base">
              {t("auth.haveAccount")}{" "}
              <Link
                to="/login"
                className="font-medium text-red-500 underline hover:text-red-600"
              >
                {t("auth.login")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
