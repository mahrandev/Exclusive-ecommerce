import CartPage from "@/pages/CartPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from "@/pages/ProductDetailsPage"; // <--- أضف هذا السطر

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* صفحة تفاصيل المنتج سنضيفها لاحقاً لأنها ديناميكية */}
      <Route path="/product/:id" element={<ProductDetailsPage />} />

      {/* هذا المسار يظهر إذا لم يتطابق أي من المسارات أعلاه */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
