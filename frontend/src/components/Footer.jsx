// src/components/Footer.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-white py-12"
      style={{ textDecoration: "none", userSelect: "none" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Innovative Hub</h3>
            <p className="mb-4">
              Your gateway to top-quality electronics, robotics courses, and DIY
              learning at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/16yRNkUyZZ/"
                target="_blank" 
                className="text-gray-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://youtube.com/@inovative_hub?si=JxPTOjyIMjspwKi2"
                target="_blank" 
                className="text-gray-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>

              <a
                href="https://www.instagram.com/innovative_hubofficial?igsh=MWQzMHpxZTltaWF2Zw=="
                target="_blank" 
                className="text-gray-300 hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/home"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/home/my-orders"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/home/my-wishlist"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-white"
                  style={{ textDecoration: "none" }}
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">
              About Innovative Hub:
            </h4>
            <p className="mb-4">
              Innovative Hub is your one-stop destination for electronics,
              robotics, and DIY innovation. We provide high-quality components,
              kits, and expert tutorials to guide you from idea to execution.
              Our mission is to empower makers, students, and professionals to
              Learn, Build, Share, and Innovate.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Innovative Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
