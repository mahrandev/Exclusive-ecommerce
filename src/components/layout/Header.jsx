// src/components/layout/Header.jsx

import { NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      {/* 1. Top bar - Full width */}
      <div className="bg-primary-black text-primary-white py-1">
        <div className="container mx-auto px-4 text-center py-2 text-xs md:text-sm">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
            <a href="#" className="font-bold underline hover:text-primary-red transition-colors">
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
            <NavLink to="/" className="hover:text-primary-red transition-colors">
              Exclusive
            </NavLink>
          </div>

          {/* Desktop Navigation - Hidden on mobile, 2 cols layout on md */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `hover:text-primary-red transition-colors ${isActive ? 'border-b-2 border-primary-black font-medium' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `hover:text-primary-red transition-colors ${isActive ? 'border-b-2 border-primary-black font-medium' : ''}`
              }
            >
              Contact
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `hover:text-primary-red transition-colors ${isActive ? 'border-b-2 border-primary-black font-medium' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/signup" 
              className={({ isActive }) => 
                `hover:text-primary-red transition-colors ${isActive ? 'border-b-2 border-primary-black font-medium' : ''}`
              }
            >
              Sign Up
            </NavLink>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Search - Visible on md and up */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-secondary-gray px-4 py-2 rounded-md text-sm w-48 lg:w-60 focus:outline-none focus:ring-2 focus:ring-primary-red transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>

            {/* Mobile Search Toggle - Visible only on mobile */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>

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
        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-secondary-gray px-4 py-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${isActive ? 'bg-primary-red text-white font-medium' : ''}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${isActive ? 'bg-primary-red text-white font-medium' : ''}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${isActive ? 'bg-primary-red text-white font-medium' : ''}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => 
                  `py-2 px-4 rounded-md hover:bg-gray-100 transition-colors ${isActive ? 'bg-primary-red text-white font-medium' : ''}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;