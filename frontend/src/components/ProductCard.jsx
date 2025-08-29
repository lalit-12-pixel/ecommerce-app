import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCart, onProductClick, onAddToWishlist }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
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
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {renderStars(product.ratings)}
          <span className="ml-2 text-sm text-gray-500">({product.ratings}.0)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">₹{product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
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
    </div>
  );
};

export default ProductCard;