// src/components/AccountPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import{ useContext} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EcommContext } from "../../store/ecomprovider";
import {
  faUser,
  faBox,
  faHeart,
  faCog,
  faMapMarkerAlt,
  faSignOutAlt, 
  faSignInAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const AccountPage = ({ setIsCartOpen, setIsWishlistOpen }) => {
  const navigate = useNavigate();


    const {
    user,
     requireLogin,
    } = useContext(EcommContext);

  // In a real application, this state would come from a global state management solution (e.g., Context API, Redux)
  // or from a token stored in local storage/cookies.
  const isLoggedIn = true; // Placeholder for authentication state

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/signout", {
        method: "POST",
        credentials: "include", // send cookies/session
      });

      if (!res.ok) throw new Error("Logout failed");

      // redirect after successful logout
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const accountOptions = [
    {
      name: "My Orders",
      description:
        "View your order history, track shipments, and manage returns.",
      icon: faBox,
      onClick: () => navigate("/home/my-orders"),
    },
    {
      name: "Wishlist",
      description: "Review and manage products saved to your wishlist.",
      icon: faHeart,
      onClick: () => navigate("/home/my-wishlist"),
    },
    {
      name: "Account Settings",
      description: "Update your personal information and change your password.",
      icon: faCog,
      onClick: () => alert("Account Settings page coming soon!"),
    },
    {
      name: "Address Book",
      description:
        "Save and manage shipping and billing addresses for faster checkout.",
      icon: faMapMarkerAlt,
      onClick: () => navigate("/home/my-addresses"),
    },
  ];
  if (!requireLogin()) navigate("/login");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between font-sans">
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-200">
              <FontAwesomeIcon
                icon={faUser}
                className="text-4xl text-indigo-600 mr-4"
              />
              <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
            </div>

            {isLoggedIn ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accountOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.onClick}
                    className="bg-gray-100 p-6 rounded-lg text-left transition-transform duration-300 hover:scale-105 hover:bg-indigo-100"
                  >
                    <div className="flex items-center space-x-4 mb-2">
                      <FontAwesomeIcon
                        icon={option.icon}
                        className="text-2xl text-indigo-600"
                      />
                      <h2 className="text-xl font-semibold text-gray-800">
                        {option.name}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-100 rounded-lg">
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className="text-6xl text-gray-400 mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Sign In or Create an Account
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  You need to be logged in to manage your account features.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full max-w-sm text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In / Log In
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
