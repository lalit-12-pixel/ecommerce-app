import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faHome, faTags, faPhone, faUser, faSearch, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

const Header = ({ cartCount, onCartClick, onSidebarOpen, onSearchClick, isSearchOpen, wishlistCount, onWishlistClick }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" style={{width:"100%",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",height:"5rem"}}>
      <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
        <div className={`md:hidden flex-grow flex items-center justify-between ${isSearchOpen ? 'hidden' : 'flex'}`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarOpen}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
    
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSearchClick}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faSearch} className="text-2xl" />
            </button>
            <button onClick={onWishlistClick} className="relative text-gray-600 hover:text-red-500 focus:outline-none transition-colors duration-300">
              <FontAwesomeIcon icon={faHeart} className="text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
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
        <div className="hidden md:flex items-center w-full" >
          {/* Left Section: Hamburger and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarOpen}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>


            <span style={{width: '4rem', height: '4rem',marginRight:"-1rem",}}
            onClick={() => navigate("/")}
            >
              <img src="/inologo2.png" alt="Logo" />
            </span>
            <Link
              to="/"
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-indigo-600"
              style={{textDecoration:"none"}}
            >
              Innovative Hub
            </Link>

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
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faHome} />
                <span className="hidden lg:inline">Home</span>
              </Link>

              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2"
               style={{textDecoration:"none"}}>
                <FontAwesomeIcon icon={faPhone} />
                <span className="hidden lg:inline">Contact</span>
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/account" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-2"
               style={{textDecoration:"none"}}>
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden lg:inline">Account</span>
              </Link>
              <button onClick={onWishlistClick} className="relative text-gray-600 hover:text-red-500 focus:outline-none transition-colors duration-300">
                <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
