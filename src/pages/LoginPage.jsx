import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signIn } from "@/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// الصورة الجانبية (نفس الصورة للحفاظ على التناسق)
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✨ 3. دالة لتحديث الـ state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // ✨ 4. دالة التنفيذ عند الضغط على زر تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const credentials = {
        email: formData.email.trim(),
        password: formData.password,
      };
      await signIn(credentials);
      toast.success("Login successful!");
      navigate("/"); // ✨ توجيه المستخدم للصفحة الرئيسية بعد النجاح
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
        <form onSubmit={handleSubmit}>
          <div className="mx-auto grid w-[400px] gap-8">
            {/* عنوان الفورم */}
            <div className="grid gap-2">
              <h1 className="font-inter text-4xl font-bold tracking-tight">
                Log in to Exclusive
              </h1>
              <p className="text-muted-foreground">Enter your details below</p>
            </div>

            {/* حقول الإدخال */}
            <div className="grid gap-8">
              {/* حقل الإيميل */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:border-red-600 focus:ring-0 focus:outline-none dark:text-white dark:focus:border-red-500"
                  placeholder=" " // مهم جداً لوجود مسافة فارغة
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                >
                  Email
                </label>
              </div>

              {/* حقل كلمة المرور */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-base text-gray-900 focus:border-red-600 focus:ring-0 focus:outline-none dark:text-white dark:focus:border-red-500"
                  placeholder=" "
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600 dark:text-gray-400"
                >
                  Password
                </label>
              </div>

              {/* الأزرار ورابط نسيان كلمة المرور */}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-red-500 px-12 py-6 text-base font-medium text-white hover:bg-red-600"
                  disabled={isLoading}
                >
                  Log In
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
