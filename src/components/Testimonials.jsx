// src/components/Testimonials.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

// A helper function for rendering stars
const renderRatingStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />);
    }
  }
  return stars;
};

const Testimonials = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
            </div>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <div className="flex text-yellow-400">
                {renderRatingStars(5)}
              </div>
            </div>
          </div>
          <p>"Great products and fast delivery. I'm very satisfied with my purchase. Will definitely shop here again!"</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
            </div>
            <div>
              <h4 className="font-semibold">Jane Smith</h4>
              <div className="flex text-yellow-400">
                {renderRatingStars(4.5)}
              </div>
            </div>
          </div>
          <p>"Excellent customer service. Had an issue with my order and it was resolved quickly. Highly recommended!"</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
            </div>
            <div>
              <h4 className="font-semibold">Robert Johnson</h4>
              <div className="flex text-yellow-400">
                {renderRatingStars(4)}
              </div>
            </div>
          </div>
          <p>"Good quality products at reasonable prices. The website is easy to use and checkout was smooth."</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;