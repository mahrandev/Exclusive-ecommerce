import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { signIn } from "@/api/authApi";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

// 1. تعريف الـ Schema باستخدام Zod للتحقق
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // 2. إعداد react-hook-form مع Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 3. دالة التنفيذ عند إرسال الفورم
  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const data = await signIn({
        email: formData.email,
        password: formData.password,
      });
      login(data);
      toast.success("Login successful!");
      navigate("/account");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* --- القسم الأيسر: الصورة --- */}
      <div className="hidden items-center justify-start p-10 pl-0 lg:flex">
        <img
          src={signUpImage}
          alt="Login Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      {/* --- القسم الأيمن: الفورم --- */}
      <div className="flex items-center justify-center py-12">
        {/* 4. استخدام handleSubmit من react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto grid w-[400px] gap-8">
            {/* عنوان الفورم */}
            <div className="grid gap-2">
              <h1 className="font-inter text-4xl font-bold tracking-tight">
                Log in to Exclusive
              </h1>
              <p className="text-muted-foreground">Enter your details below</p>
            </div>

            {/* حقول الإدخال */}
            <div className="grid gap-6">
              {/* حقل الإيميل مع عرض الأخطاء */}
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
                    Email
                  </label>
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* حقل كلمة المرور مع أيقونة الإظهار/الإخفاء */}
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
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
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

              {/* الأزرار ورابط نسيان كلمة المرور */}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-red-500 px-12 py-6 text-base font-medium text-white hover:bg-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-red-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* رابط إنشاء حساب جديد */}
            <div className="text-center text-base">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-gray-500 underline hover:text-gray-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
