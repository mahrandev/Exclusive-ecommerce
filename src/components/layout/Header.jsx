import { NavLink, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import SearchComponent from "@/components/shared/SearchComponent"; // Import the new component

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const userName = user?.user_metadata?.full_name || user?.email;

  return (
    <header className="bg-white border-b border-gray-200">
      {/* 1. Top bar - Full width */}
      <div className="bg-primary-black text-primary-white py-1">
        <div className="container mx-auto px-4 text-center py-2 text-xs md:text-sm">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <a
              href="#"
              className="font-bold underline hover:text-primary-red transition-colors"
            >
              ShopNow
            </a>
          </p>
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
              Exclusive
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
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-primary-red transition-colors ${
                  isActive ? "border-b-2 border-primary-black font-medium" : ""
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-primary-red transition-colors ${
                  isActive ? "border-b-2 border-primary-black font-medium" : ""
                }`
              }
            >
              About
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
                Sign Up
              </NavLink>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchComponent onResultClick={() => setIsMobileMenuOpen(false)} />
            </div>

            {/* Mobile Search Toggle - This is now handled inside SearchComponent */}

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
              <div className="flex items-center gap-2">
                <NavLink
                  to="/account"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User size={20} className="md:w-6 md:h-6" />
                  <span className="hidden lg:inline text-sm font-medium">
                    {userName}
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="hidden md:inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Login
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
                Home
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
                Contact
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
                About
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/account"
                    className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Account
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
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