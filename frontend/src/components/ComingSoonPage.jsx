import React from 'react';
import { useNavigate } from 'react-router-dom';

// Simple, self-contained Header component to avoid context errors.
const SimpleHeader = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <span onClick={() => navigate("/")} className="cursor-pointer">
                    <img src="/inologo2.png" alt="Logo" className="w-20 h-20" />
                </span>
                <div className="text-3xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
                    Innovative Hub
                </div>
                <div>
                    <button onClick={() => navigate('/home')} className=" hover:text-indigo-600 focus:outline-none">
                        Products
                    </button>
                </div>
            </nav>
        </header>
    );
};

// Simple, self-contained Footer component.
const SimpleFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2025 Innovative Hub. All rights reserved.</p>
                <p className="text-sm text-gray-400 mt-2">
                    Bhubaneswar, Odisha, India
                </p>
            </div>
        </footer>
    );
};


const ComingSoonPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <SimpleHeader />
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-md">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-pulse">Coming Soon!</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        We're working hard to bring you this exciting new feature. For now, why not check out our extensive catalog of components?
                    </p>
                    <button
                        onClick={() => navigate('/home')}
                        className="bg-indigo-600 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                    >
                        Explore Products
                    </button>
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
};

export default ComingSoonPage;
