// src/components/ProductCard.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCart, onProductClick }) => {
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
      onClick={() => onProductClick(product.id)} // Add this line
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
          {renderStars(product.rating)}
          <span className="ml-2 text-sm text-gray-500">({product.rating}.0)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents the card click event from firing
              onAddToCart(product.id);
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