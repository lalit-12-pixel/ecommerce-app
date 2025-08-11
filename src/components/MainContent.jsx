// src/components/MainContent.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faTshirt, faHome, faRunning, faStar } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import SpecialOffer from './SpecialOffer';
import Testimonials from './Testimonials';

const MainContent = ({ products, addToCart, filteredCategory, setFilteredCategory }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <div className="h-40 bg-indigo-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faLaptop} className="text-4xl text-indigo-600" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-center">Electronics</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <div className="h-40 bg-pink-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faTshirt} className="text-4xl text-pink-600" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-center">Fashion</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <div className="h-40 bg-green-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faHome} className="text-4xl text-green-600" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-center">Home & Garden</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
            <div className="h-40 bg-yellow-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faRunning} className="text-4xl text-yellow-600" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-center">Sports</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex space-x-2">
            <button
              className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
              onClick={() => setFilteredCategory('all')}
            >
              All
            </button>
            <button
              className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'electronics' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
              onClick={() => setFilteredCategory('electronics')}
            >
              Electronics
            </button>
            <button
              className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'fashion' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
              onClick={() => setFilteredCategory('fashion')}
            >
              Fashion
            </button>
            <button
              className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'home' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
              onClick={() => setFilteredCategory('home')}
            >
              Home
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-8">No products found in this category.</p>
          )}
        </div>
      </section>
      <SpecialOffer />
      <Testimonials />
    </main>
  );
};

export default MainContent;