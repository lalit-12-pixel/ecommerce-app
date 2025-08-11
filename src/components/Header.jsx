// src/components/Header.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faSearch, faChevronDown, faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ cartCount, onCartClick, isMobileMenuOpen, onMobileMenuClick }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-indigo-600 flex items-center">
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
            Innovative Hub
          </a>
        </div>
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-xl">
            <input type="text" placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <button className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-indigo-600">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
          <div className="dropdown relative">
            <button className="text-gray-700 hover:text-indigo-600 transition flex items-center">
              Categories <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
            </button>
            <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Electronics</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Fashion</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Home & Garden</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Sports</a>
            </div>
          </div>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Deals</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
        </div>
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-indigo-600 transition relative" onClick={onCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <span className={`absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${cartCount === 0 ? 'hidden' : ''}`}>
              {cartCount}
            </span>
          </button>
          <button className="text-gray-700 hover:text-indigo-600 transition">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </button>
          <button className="md:hidden text-gray-700 hover:text-indigo-600 transition" onClick={onMobileMenuClick}>
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} bg-white py-2 px-4 shadow-md`}>
        <div className="mb-3">
          <input type="text" placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>
        <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Home</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Categories</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Deals</a>
        <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Contact</a>
      </div>
    </nav>
  );
};

export default Header;