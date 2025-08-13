import React from 'react';
import ProductCard from './ProductCard';
import SpecialOffer from './SpecialOffer';
import Testimonials from './Testimonials';

const MainContent = ({ products, addToCart, filteredCategory, setFilteredCategory, onProductClick, addToWishlist }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          
          <div className="hidden md:flex space-x-2">
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
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onProductClick={onProductClick}
                onAddToWishlist={addToWishlist}
              />
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