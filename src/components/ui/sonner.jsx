import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-2 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-gray-50",
          description:
            "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-red-500 group-[.toast]:text-white hover:group-[.toast]:bg-red-600",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",

          // ✅ الألوان الجديدة الواضحة
          success:
            "group-[.toaster]:!bg-green-500 group-[.toaster]:!text-white group-[.toaster]:!border-green-600 dark:group-[.toaster]:!bg-green-600",
          error:
            "group-[.toaster]:!bg-red-500 group-[.toaster]:!text-white group-[.toaster]:!border-red-600 dark:group-[.toaster]:!bg-red-600",

          // للـ info والـ warning لو احتجتهم
          info: "group-[.toaster]:!bg-blue-500 group-[.toaster]:!text-white group-[.toaster]:!border-blue-600",
          warning:
            "group-[.toaster]:!bg-yellow-500 group-[.toaster]:!text-white group-[.toaster]:!border-yellow-600",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
