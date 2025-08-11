// src/components/ProductCard.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
          {product.rating} <FontAwesomeIcon icon={faStar} className="ml-1" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition" onClick={() => onAddToCart(product.id)}>
            <FontAwesomeIcon icon={faCartPlus} className="mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;