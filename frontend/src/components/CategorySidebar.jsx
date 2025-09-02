// src/components/CategorySidebar.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faTshirt, faHome, faRunning, faTimes, faTags, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

const categories = [
    { name: 'Electronics', icon: faLaptop, key: 'electronics' },
    { name: 'Fashion', icon: faTshirt, key: 'fashion' },
    { name: 'Home & Garden', icon: faHome, key: 'home' },
    { name: 'Sports', icon: faRunning, key: 'sports' }
];

const CategorySidebar = ({ isOpen, onClose, onSelectCategory, filteredCategory }) => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(path);
      onClose(); // Close the sidebar after navigating
    };
    
    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ userSelect: "none" }}
        >
            <div className="p-4 border-b flex justify-between items-center">
               <Link
                    to="/" 
                    className="text-xl font-bold text-indigo-600"
                     style={{textDecoration:"none"}}
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
                            <a 
                                href="#" 
                                onClick={() => handleNavigate("/")} 
                                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faHome} className="text-lg" />
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                                 style={{textDecoration:"none"}}
                            >
                                <FontAwesomeIcon icon={faTags} className="text-lg" />
                                <span>Deals</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#  "
                                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                                 style={{textDecoration:"none"}}
                            >
                                <FontAwesomeIcon icon={faPhone} className="text-lg" />
                                <span>Contact</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => handleNavigate("/")}
                                className="w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 hover:bg-gray-100"
                                 style={{textDecoration:"none"}}
                            >
                                <FontAwesomeIcon icon={faUser} className="text-lg" />
                                <span>Account</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <h4 className="text-lg font-semibold mb-4 border-t pt-4">Shop by Category</h4>
                <ul className="space-y-4">
                    {categories.map(category => (
                        <li key={category.key}>
                            <button
                                className={`w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${filteredCategory === category.key ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => onSelectCategory(category.key)}
                            >
                                <FontAwesomeIcon icon={category.icon} className="text-lg" />
                                <span>{category.name}</span>
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className={`w-full text-left p-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${filteredCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                            onClick={() => onSelectCategory('all')}
                        >
                            <span>All Products</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CategorySidebar;
