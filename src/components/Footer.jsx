// src/components/Footer.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Innovative Hub</h3>
            <p className="mb-4">Your gateway to top-quality electronics, robotics courses, and DIY learning at unbeatable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faPinterest} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">My Account</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Order Tracking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Wishlist</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Returns & Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800" />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 Innovative Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;