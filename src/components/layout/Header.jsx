import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/authStore";
import SearchComponent from "@/components/shared/SearchComponent";
import UserMenu from "@/components/shared/UserMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      {/* 1. Top bar - Full width */}
      <div className="bg-primary-black text-primary-white py-1">
        <div className="container mx-auto px-4 flex justify-center items-center py-2 text-xs md:text-sm">
          <p className="flex-grow text-center">
            {t('header.topBar')}{" "}
            <a
              href="#"
              className="font-bold underline hover:text-primary-red transition-colors"
            >
              {t('header.shopNow')}
            </a>
          </p>
          <button onClick={changeLanguage} className="text-sm font-medium hover:text-primary-red transition-colors px-4">
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>

      {/* 2. Main navigation */}
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold">
            <NavLink
              to="/"
              className="text-primary-red transition-colors uppercase"
            >
              {t('exclusive')}
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary-red transition-colors ${
                  isActive ? "border-b-2 border-primary-black font-medium" : ""
                }`
              }
            >
              {t('header.home')}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-primary-red transition-colors ${
                  isActive ? "border-b-2 border-primary-black font-medium" : ""
                }`
              }
            >
              {t('header.contact')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-primary-red transition-colors ${
                  isActive ? "border-b-2 border-primary-black font-medium" : ""
                }`
              }
            >
              {t('header.about')}
            </NavLink>
            {!isAuthenticated && (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-primary-red transition-colors ${
                    isActive
                      ? "border-b-2 border-primary-black font-medium"
                      : ""
                  }`
                }
              >
                {t('header.signUp')}
              </NavLink>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchComponent onResultClick={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart size={20} className="md:w-6 md:h-6" />
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart size={20} className="md:w-6 md:h-6" />
            </NavLink>

            {/* User Actions */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <NavLink
                to="/login"
                className="hidden md:inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                {t('header.login')}
              </NavLink>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchComponent onResultClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${
                    isActive ? "bg-primary-red text-white font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.home')}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${
                    isActive ? "bg-primary-red text-white font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.contact')}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${
                    isActive ? "bg-primary-red text-white font-medium" : ""
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.about')}
              </NavLink>
              {!isAuthenticated && (
                <>
                  <NavLink
                    to="/login"
                    className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('header.login')}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('header.signUp')}
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;