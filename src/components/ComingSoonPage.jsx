// src/components/ComingSoonPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ComingSoonPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-md">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-pulse">Coming Soon!</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        We're working hard to bring you this feature. For now, why not check out our extensive catalog of components?
                    </p>
                    <button
                        onClick={() => navigate('/home')}
                        className="bg-indigo-600 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                    >
                        Explore Products
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ComingSoonPage;
