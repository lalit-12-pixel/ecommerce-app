import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({
  product,
  onAddToCart,
  onProductClick,
  onAddToWishlist,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl product-card cursor-pointer"
      onClick={() => onProductClick(product._id)}
    >
      <div className="relative h-48 flex items-center justify-center bg-gray-50 overflow-hidden"> {/* Parent div now handles the background and fixed height */}
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110 p-4" // Removed w-full h-48, added p-4, adjusted scale
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {renderStars(product.ratings)}
          <span className="ml-2 text-sm text-gray-500">({product.ratings}.0)</span>
        </div>

        {/* Stock */}
        <div className="text-sm text-gray-500 mb-1">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </div>

        {/* Price and MRP */}
        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-indigo-600 mr-2">
            ₹{product.price.toFixed(2)}
          </span>
          {product.mrp && (
            <span className="text-sm text-gray-400 line-through">₹{product.mrp.toFixed(2)}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product._id);
            }}
            className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
            aria-label="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product._id);
            }}
            className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition-colors"
            aria-label="Add to cart"
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
