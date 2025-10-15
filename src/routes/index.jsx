import CartPage from "@/pages/CartPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import SignUpPage from "@/pages/SignUpPage";
import AccountPage from "@/pages/AccountPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
