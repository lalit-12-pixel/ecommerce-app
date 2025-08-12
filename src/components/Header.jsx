// src/components/Header.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faHome, faTags, faPhone, faUser, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = ({ cartCount, onCartClick, onSidebarOpen, onSearchClick, isSearchOpen }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile: Hamburger, Logo, and Search Toggle */}
        <div className={`md:hidden flex-grow flex items-center justify-between ${isSearchOpen ? 'hidden' : 'flex'}`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarOpen}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
            <a href="#" className="text-2xl font-bold text-indigo-600">Innovative Hub</a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSearchClick}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faSearch} className="text-2xl" />
            </button>
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300">
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Section (visible when isSearchOpen is true) */}
        {isSearchOpen && (
          <div className="md:hidden flex-grow flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={onSearchClick} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex items-center w-full">
          {/* Left Section: Hamburger and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarOpen}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
            <a href="#" className="text-2xl font-bold text-indigo-600">Innovative Hub</a>
          </div>

          {/* Middle Section: Search Bar */}
          <div className="flex-grow max-w-lg relative mx-8">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Right Section: Navigation Links and Icons */}
          <div className="flex items-center space-x-6 ml-auto">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2">
                <FontAwesomeIcon icon={faHome} />
                <span className="hidden lg:inline">Home</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2">
                <FontAwesomeIcon icon={faTags} />
                <span className="hidden lg:inline">Deals</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2">
                <FontAwesomeIcon icon={faPhone} />
                <span className="hidden lg:inline">Contact</span>
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden lg:inline">Account</span>
              </a>
              <button onClick={onCartClick} className="relative text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300">
                <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;