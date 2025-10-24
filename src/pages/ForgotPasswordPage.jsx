import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import signUpImage from "@/assets/img/dl.beatsnoop 1.png";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .email({ message: t("auth.invalidEmail") })
      .min(1, { message: t("auth.emailRequired") }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (error) throw error;

      setEmailSent(true);
      toast.success(t("auth.resetEmailSent"), {
        description: t("auth.checkEmailForReset"),
      });
    } catch (error) {
      toast.error(t("auth.resetEmailFailed"), {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const BackToLoginArrow = t("dir") === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden items-center justify-start p-10 pl-0 lg:flex">
        <img
          src={signUpImage}
          alt="Forgot Password Illustration"
          className="h-full w-full max-w-2xl rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {!emailSent ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto grid gap-8">
                <div className="grid gap-2 text-center sm:text-start">
                  <h1 className="font-inter text-3xl font-bold tracking-tight sm:text-4xl">
                    {t("auth.forgotPasswordTitle")}
                  </h1>
                  <p className="text-muted-foreground ">
                    {t("auth.forgotPasswordDesc")}
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="relative">
                      <Mail
                        className="absolute top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                        style={{
                          left: t("dir") === "rtl" ? "auto" : "12px",
                          right: t("dir") === "rtl" ? "12px" : "auto",
                        }}
                      />
                      <input
                        id="email"
                        type="email"
                        className={`peer block w-full appearance-none rounded-md border-2 bg-gray-50 py-3 text-base text-gray-900 transition-colors focus:ring-0 focus:outline-none ${
                          errors.email
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-red-600"
                        } ${t("dir") === "rtl" ? "pr-10 pl-4" : "pr-4 pl-10"}`}
                        placeholder={t("auth.emailPlaceholder")}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-500 py-6 text-base font-medium text-white hover:bg-red-600"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? t("auth.sendingResetLink")
                      : t("auth.sendResetLink")}
                  </Button>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <BackToLoginArrow size={16} />
                    {t("auth.backToLogin")}
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <div className="mx-auto grid gap-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-10 w-10 text-green-600" />
              </div>

              <div className="grid gap-2">
                <h1 className="font-inter text-3xl font-bold tracking-tight">
                  {t("auth.checkYourEmail")}
                </h1>
                <p className="text-gray-600">
                  {t("auth.resetEmailSentTo")} <br />
                  <span className="font-semibold text-gray-900">
                    {getValues("email")}
                  </span>
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-gray-700">
                  {t("auth.didntReceiveEmail")}{" "}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="font-semibold text-blue-600 underline hover:text-blue-700"
                  >
                    {t("auth.resendEmail")}
                  </button>
                </p>
              </div>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                <BackToLoginArrow size={16} />
                {t("auth.backToLogin")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
