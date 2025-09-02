import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  faTimes,
  faCartPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Wishlist = ({
  wishlist = [],
  isWishlistOpen,
  onClose,
  onRemoveFromWishlist,
  onAddToCartFromWishlist,
  onProductClick,
}) => {
  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ userSelect: "none" }}>
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Wishlist
              </h2>
              <button
                className="text-gray-400 hover:text-gray-700 transition-colors"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto py-6 px-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="3x"
                    className="mb-4 text-red-400"
                  />
                  <p className="text-lg">Your wishlist is empty</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {wishlist.map((item) => (
                    <li
                      key={item._id || item.id}
                      className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Product Image */}
                      <div
                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={() => onProductClick(item._id || item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="ml-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <h3
                              onClick={() =>
                                onProductClick(item._id || item.id)
                              }
                              className="text-gray-900 font-medium text-lg cursor-pointer hover:underline"
                            >
                              {item.name}
                            </h3>
                            <p className="text-indigo-600 font-semibold">
                              ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">
                            {item.category}
                          </p>
                          {item.stock !== undefined && (
                            <p
                              className={`text-sm mt-1 ${
                                item.stock > 0
                                  ? "text-green-600"
                                  : "text-red-600 font-semibold"
                              }`}
                            >
                              {item.stock > 0
                                ? `In Stock: ${item.stock}`
                                : "Out of Stock"}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex mt-2 space-x-2">
                          <button
                            type="button"
                            className="flex-1 bg-indigo-600 text-white py-1.5 px-2.5 rounded-md shadow hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1 text-sm"
                            onClick={() => onAddToCartFromWishlist(item._id)}
                            disabled={item.stock === 0}
                          >
                            <FontAwesomeIcon
                              icon={faCartPlus}
                              className="text-sm"
                            />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            type="button"
                            className="flex-1 bg-red-600 text-white py-1.5 px-2.5 rounded-md shadow hover:bg-red-700 transition-colors flex items-center justify-center space-x-1 text-sm"
                            onClick={() => onRemoveFromWishlist(item._id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-sm"
                            />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
