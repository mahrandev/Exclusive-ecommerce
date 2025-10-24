import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import SignUpPage from "@/pages/SignUpPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import AccountPage from "@/pages/AccountPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import WishlistPage from "@/pages/WishlistPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import CheckoutPage from "@/pages/Checkout";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CategoryPage from "@/pages/CategoryPage";
import AllProductsPage from "@/pages/AllProductsPage";
import HomePage from "@/pages/HomePage";
import AllCategoriesPage from "@/pages/AllCategoriesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all-categories" element={<AllCategoriesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/products" element={<AllProductsPage />} />
      <Route path="/products/:categoryName" element={<CategoryPage />} />
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