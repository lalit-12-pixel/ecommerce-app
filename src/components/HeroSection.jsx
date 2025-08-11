// src/components/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Sale Up To 50% Off</h1>
          <p className="text-xl mb-6">Discover amazing deals on your favorite products. Limited time offer!</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="https://via.placeholder.com/500x300" alt="Hero Image" className="rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;