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
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-gray-50 dark:group-[.toaster]:border-gray-800",
          description:
            "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-red-500 group-[.toast]:text-white hover:group-[.toast]:bg-red-600 dark:group-[.toast]:bg-red-600 dark:hover:group-[.toast]:bg-red-700",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400",
          
          // --- ✨ هنا التعديل الأساسي ---
          success:
            "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-800 border-green-500 dark:group-[.toaster]:bg-green-950 dark:group-[.toaster]:text-green-400 dark:border-green-700",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 border-red-500 dark:group-[.toaster]:bg-red-950 dark:group-[.toaster]:text-red-400 dark:border-red-700",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };