// src/components/CategorySidebar.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faTshirt,
  faHome,
  faRunning,
  faTimes,
  faTags,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics Components", key: "Electronics Components" },
  { name: "Microcontroller Board", key: "Microcontroller Board" },
  { name: "Electronics Module", key: "Electronics Module" },
  { name: "Display", key: "Display" },
  { name: "Battery and Charger", key: "Battery and Charger" },
  { name: "Boards", key: "Boards" },
  { name: "IoT Wireless Boards", key: "IoT Wireless Boards" },
  { name: "Sensors", key: "Sensors" },
  { name: "Power Supply", key: "Power Supply" },
  { name: "Mic and Speaker", key: "Mic and Speaker" },
  { name: "Motor and Motor Driver", key: "Motor and Motor Driver" },
  { name: "Relay", key: "Relay" },
  { name: "Drone parts & components", key: "Drone parts & components" },
  { name: "Miscellaneous", key: "Miscellaneous" },
  { name: "Equipments", key: "Equipments" },
];

const CategorySidebar = ({
  isOpen,
  onClose,
  onSelectCategory,
  filteredCategory,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ userSelect: "none" }}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600"
          style={{ textDecoration: "none" }}
        >
          Innovative Hub
        </Link>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>
      <div className="p-4">
        {/* Main Navigation Links - visible ONLY on mobile */}
        <div className="md:hidden">
          <ul className="space-y-4 mb-8">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon icon={faHome} className="text-lg" />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/home/account"
                onClick={onClose}
                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold mb-4  pt-4">Shop by Category</h4>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                filteredCategory === "All" || !filteredCategory
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => { navigate("/home"); onSelectCategory("All"); }}
            >
              <span>All Products</span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.key}>
              <button
                className={`w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                  filteredCategory === category.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  navigate("/home"); 
                  onSelectCategory(category.key);
                }}
              >
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
