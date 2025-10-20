import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/layout/Header";
import AppRoutes from "./routes";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <>
      <Header />
      <hr className="border-gray-200" />
      <main>
        <AppRoutes />
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
