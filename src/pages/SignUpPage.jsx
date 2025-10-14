import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signUp } from "@/api/authApi";
import IconGoogle from "@/assets/img/Icon-Google.svg";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

// 1. Zod Schema for validation
const signUpSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain a number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain a special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

// Password strength utility
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signUp({ name: data.name, email: data.email, password: data.password });
      toast.success("Account created successfully!", {
        description: "Please check your email to verify your account.",
      });
      navigate("/login");
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
          alt="Sign Up Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="mx-auto grid w-[400px] gap-6">
            <div className="grid gap-2">
              <h1 className="font-inter text-4xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-base text-stone-500">
                Enter your details below to get started
              </p>
            </div>

            <div className="grid gap-4">
              {/* Name Field */}
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
                    Name
                  </label>
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
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
                    Email
                  </label>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
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
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
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
              {password && (
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 flex-1 rounded-full ${
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
                    {
                      ["Weak", "Medium", "Medium", "Strong"][
                        passwordStrength - 1
                      ] || ""
                    }
                  </p>
                </div>
              )}

              {/* Confirm Password Field */}
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
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button
                variant="outline"
                className="w-full py-6 text-base font-medium"
              >
                <img
                  src={IconGoogle}
                  alt="Google icon"
                  className="mr-4 h-6 w-6"
                />
                Sign up with Google
              </Button>
            </div>

            <div className="text-center text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-red-500 underline hover:text-red-600"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

