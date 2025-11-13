import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/authStore";
import SearchComponent from "@/components/shared/SearchComponent";
import UserMenu from "@/components/shared/UserMenu";
import { getCurrentSession } from "@/api/authApi";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const { session } = await getCurrentSession();
        if (session && session.user) {
          if (!isAuthenticated) {
            login({ user: session.user });
          }
        } else {
          if (isAuthenticated) {
            await logout();
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuthState();
  }, [isAuthenticated, login, logout]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="bg-primary-black text-primary-white py-1">
        <div className="container mx-auto flex items-center justify-center px-4 py-2 text-xs md:text-sm">
          <p className="flex-grow text-center">
            {t("header.topBar")}{" "}
            <a
              href="#"
              className="hover:text-primary-red font-bold underline transition-colors"
            >
              {t("header.shopNow")}
            </a>
          </p>
          <button
            onClick={changeLanguage}
            className="hover:text-primary-red px-4 text-sm font-medium transition-colors"
          >
            {i18n.language === "en" ? "العربية" : "English"}
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="text-xl font-bold md:text-2xl">
            <NavLink
              to="/"
              className="text-primary-red uppercase transition-colors"
            >
              {t("exclusive")}
            </NavLink>
          </div>

          <nav className="hidden items-center space-x-1 md:flex lg:space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 transition-colors hover:bg-gray-100 ${
                  isActive ? "text-primary-red bg-red-100 font-medium" : ""
                }`
              }
            >
              {t("header.home")}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 transition-colors hover:bg-gray-100 ${
                  isActive ? "text-primary-red bg-red-100 font-medium" : ""
                }`
              }
            >
              {t("header.contact")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 transition-colors hover:bg-gray-100 ${
                  isActive ? "text-primary-red bg-red-100 font-medium" : ""
                }`
              }
            >
              {t("header.about")}
            </NavLink>
            {!isAuthenticated && (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition-colors hover:bg-gray-100 ${
                    isActive ? "text-primary-red bg-red-100 font-medium" : ""
                  }`
                }
              >
                {t("header.signUp")}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden md:block">
              <SearchComponent
                onResultClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <NavLink
              to="/wishlist"
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <Heart size={20} className="md:h-6 md:w-6" />
            </NavLink>

            <NavLink
              to="/cart"
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              <ShoppingCart size={20} className="md:h-6 md:w-6" />
            </NavLink>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <NavLink
                to="/login"
                className="hidden rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 md:inline-block"
              >
                {t("header.login")}
              </NavLink>
            )}

            <button
              className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <SearchComponent onResultClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {isMobileMenuOpen && (
          <div className="animate-in slide-in-from-top mt-2 border-t border-gray-200 pb-4 md:hidden">
            <nav className="flex flex-col space-y-2 pt-4">
              {!isAuthenticated && (
                <div className="mb-3 space-y-2 border-b border-gray-200 pb-3">
                  <NavLink
                    to="/login"
                    className="block rounded-md bg-blue-500 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("header.login")}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-primary-red block rounded-md px-4 py-3 text-center font-medium text-white transition-colors hover:bg-red-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("header.signUp")}
                  </NavLink>
                </div>
              )}

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-md px-4 py-2 transition-colors hover:bg-gray-100 ${
                    isActive ? "text-primary-red bg-gray-100 font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.home")}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `rounded-md px-4 py-2 transition-colors hover:bg-gray-100 ${
                    isActive ? "text-primary-red bg-gray-100 font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.contact")}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-md px-4 py-2 transition-colors hover:bg-gray-100 ${
                    isActive ? "text-primary-red bg-gray-100 font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.about")}
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
