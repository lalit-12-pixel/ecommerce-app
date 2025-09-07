import React, { useContext } from "react";
import { EcommContext } from "../../store/ecomprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faCartPlus,
  faTrash,
  faHeartCrack, // ✨ New icon for the empty state
  faArrowRight, // ✨ New icon for the "Shop Now" button
} from "@fortawesome/free-solid-svg-icons";

const MyWishlistPage = () => {
  const {
    wishlist,
    addToCartFromWishlist,
    requireLogin,
    removeFromWishlist,
    handleProductClick,
  } = useContext(EcommContext);
  const navigate = useNavigate();

   if (!requireLogin()) navigate("/login");

  return (
    // ✨ Added a container to center and constrain content width on larger screens
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          // ✨ Revamped Empty State: More visual and includes a call-to-action
          <div className="text-center bg-white p-12 rounded-2xl shadow-sm mt-16">
            <FontAwesomeIcon
              icon={faHeartCrack}
              className="text-6xl text-gray-300 mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything yet. Let's change that!
            </p>
            <button
              // ✨ This button should navigate the user to the products page
              onClick={() => navigate("/home")}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span>Explore Products</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        ) : (
          // ✨ Applied a grid layout for better spacing and alignment
          <div className="grid grid-cols-1 gap-8">
            {wishlist.map((item) => (
              <div
                key={item._id || item.id}
                // ✨ Refined card styling
                className="w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Product Image */}
                <div
                  className="cursor-pointer w-full md:w-1/3 xl:w-2/5 md:flex-shrink-0"
                  onClick={() => handleProductClick(item._id || item.id)}
                >
                  {/* ✨ Added an aspect ratio to maintain image consistency */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col justify-between w-full">
                  <div>
                    {/* ✨ Category styled as a pill/badge for better visual separation */}
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    <h2
                      onClick={() => handleProductClick(item._id || item.id)}
                      className="text-3xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600 mb-3"
                    >
                      {item.name}
                    </h2>

                    {/* ✨ Price and discount section grouped together for clarity */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <p className="text-3xl font-extrabold text-gray-900">
                        ₹{item.price.toFixed(2)}
                      </p>
                      {item.mrp && (
                        <>
                          <p className="text-lg text-gray-400 line-through">
                            ₹{item.mrp.toFixed(2)}
                          </p>
                          <p className="text-base font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                            {Math.round(
                              ((item.mrp - item.price) / item.mrp) * 100
                            )}
                            % OFF
                          </p>
                        </>
                      )}
                    </div>

                    {/* ✨ Stock status with a more distinct visual style */}
                    {item.stock !== undefined && (
                      <p
                        className={`text-sm font-bold mb-5 ${
                          item.stock > 0 ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {item.stock > 0 ? `In Stock` : "Out of Stock"}
                      </p>
                    )}

                    {/* Description as bullet points */}
                    {item.description && (
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5 mb-6">
                        {item.description
                          .split(/[.\n]/) // ✅ Split by period or newline
                          .map((point) => point.trim()) // ✅ Clean up whitespace
                          .filter((point) => point.length > 0) // ✅ Remove empty lines
                          .map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end border-t pt-5">
                    <button
                      onClick={() => {
                        addToCartFromWishlist(item._id);
                        removeFromWishlist(item._id);
                      }}
                      disabled={item.stock === 0}
                      className={`py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 text-base transition-all duration-300 w-full sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500
                        ${
                          item.stock > 0
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
                            : "bg-gray-300 text-gray-500"
                        }`}
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                      <span>Move to Cart</span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-lg flex items-center justify-center gap-2 text-base transition-all duration-300 w-full sm:w-auto transform hover:-translate-y-0.5"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlistPage;
