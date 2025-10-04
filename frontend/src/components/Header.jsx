import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faHome,
  faPhone,
  faUser,
  faSearch,
  faTimes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { EcommContext } from "../../store/ecomprovider";

const Header = () => {
  const navigate = useNavigate();
  const {
    user,
    isSidebarOpen,
    isSearchOpen,
    cartCount,
    wishlistCount,
    cartSubtotal,
    setIsSidebarOpen,
    setIsCartOpen,
    setIsSearchOpen,
    setIsScrolled,
    setSearchQuery
  } = useContext(EcommContext);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setIsScrolled]);

  return (
    <header
      className="bg-white shadow-md sticky top-0 z-50 w-full"
      style={{ userSelect: "none" }}
    >
      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Top Bar */}
      <div className="container mx-auto px-4 py-2.5 flex justify-between items-center md:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-600 hover:text-indigo-600"
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>

        <span onClick={() => navigate("/")} className="font-bold text-xl  text-indigo-600">
          Innovative Hub
        </span>

        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </button>

          <button
            onClick={() => navigate(user ? "/home/my-wishlist" : "/login")}
            className="relative text-gray-600 hover:text-red-500"
          >
            <FontAwesomeIcon icon={faHeart} className="text-2xl" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => user?setIsCartOpen(true):navigate("/login")}
            className="relative text-gray-600 hover:text-indigo-600"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input Mobile */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-grow pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={() => setIsSearchOpen(false)}>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-2xl text-gray-600"
              />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex container mx-auto px-4 py-2.5 items-center justify-between">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-indigo-600"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>

          <span onClick={() => navigate("/")} className="cursor-pointer">
            <img src="/inologo2.png" alt="Logo" className="w-16 h-16" />
          </span>

          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
            style={{ userSelect: "none", textDecoration: "none" }}
          >
            Innovative Hub
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-grow max-w-lg relative mx-8">
          <input
            type="text"
             onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Right: Links + Icons */}
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
              to="/home"
              className="text-gray-600 hover:text-indigo-600 flex items-center space-x-2"
              style={{ userSelect: "none", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/home/account"
                className="text-gray-600 hover:text-indigo-600 flex items-center space-x-2"
                style={{ userSelect: "none", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden lg:inline">Account</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-red-600 hover:text-indigo-600 flex items-center space-x-2"
                style={{ userSelect: "none", textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="hidden lg:inline">Login</span>
              </Link>
            )}

            {user ? (
              <>
              
                <button
                  onClick={() => navigate("/home/my-wishlist")}
                  className="relative text-gray-600 hover:text-red-500"
                  style={{ userSelect: "none", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

               
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-600 hover:text-indigo-600"
                  style={{ userSelect: "none", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
               
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-red-500"
                  style={{ userSelect: "none", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                </Link>

                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                  style={{ userSelect: "none", textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
