// src/components/LandingPage.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBookOpen, faCogs, faComments } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LandingPage = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: faBolt,
            title: 'E-Shop for Components',
            description: 'Explore a vast catalog of high-quality electrical and electronic components for your projects.',
            onClick: () => navigate("/home")
        },
        {
            icon: faBookOpen,
            title: 'Robotics Courses & Tutorials',
            description: 'Learn robotics from the ground up with our comprehensive video courses and step-by-step guides.'
        },
        {
            icon: faCogs,
            title: 'Project Kits & Consultation',
            description: 'Get everything you need in one kit. We also offer expert consultation for your custom projects.'
        },
        {
            icon: faComments,
            title: 'Ideas & Feedback Hub',
            description: 'Connect with a community of innovators. Share your projects, get feedback, and find inspiration.'
        }
    ];

    return (
        <div className="bg-gray-50 font-sans">
            <main className="container mx-auto px-4 py-16 text-center">
                {/* Hero Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Innovative Hub
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your all-in-one destination for electronics, robotics, and creative innovation. We provide the tools, knowledge, and community you need to bring your ideas to life.
                    </p>
                    <button
                        className="bg-indigo-600 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                        onClick={() => navigate("/home")}
                    >
                        Explore Products
                    </button>
                </div>

                {/* Features Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Core Offerings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                                onClick={feature.onClick}
                            >
                                <div className="text-indigo-600 mb-4">
                                    <FontAwesomeIcon icon={feature.icon} className="text-4xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-indigo-600 text-white rounded-xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Next Project?</h2>
                    <p className="text-lg mb-8">Join thousands of creators and innovators building the future with us.</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
                            onClick={() => navigate("/home")}
                        >
                            Explore Products
                        </button>
                        <button
                            className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition"
                            onClick={() => navigate("/signin")}
                        >
                            Sign Up Now
                        </button>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default LandingPage;
