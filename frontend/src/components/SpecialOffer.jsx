// src/components/SpecialOffer.jsx

import React from 'react';

const SpecialOffer = () => {
  return (
    <section className="mb-12 bg-indigo-100 rounded-xl p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
          <p className="text-lg mb-4">Get 20% off on all fashion items this weekend. Use code <span className="font-bold">FASHION20</span> at checkout.</p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="https://img.pikbest.com/origin/10/06/32/66EpIkbEsT5Rb.png!bw700/500x300" alt="Special Offer" className="rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;