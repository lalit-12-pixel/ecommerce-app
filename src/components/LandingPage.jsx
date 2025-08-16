// src/components/LandingPage.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBookOpen, faCogs, faComments } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import landingVideo from '../assets/landing-video.mp4';

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
            description: 'Learn robotics from the ground up with our comprehensive video courses and step-by-step guides.',
            onClick: () => navigate("/coming-soon") // Added route
        },
        {
            icon: faCogs,
            title: 'Project Kits & Consultation',
            description: 'Get everything you need in one kit. We also offer expert consultation for your custom projects.',
            onClick: () => navigate("/coming-soon") // Added route
        },
        {
            icon: faComments,
            title: 'Ideas & Feedback Hub',
            description: 'Connect with a community of innovators. Share your projects, get feedback, and find inspiration.',
            onClick: () => navigate("/coming-soon") // Added route
        }
    ];

    return (
        <div className="bg-gray-50 font-sans">
            {/* Hero Section - Full width */}
            <div className="relative overflow-hidden">
                <div className="relative z-20 text-center py-24 px-4">
                    <h1 className="text-4xl sm-text-5xl lg-text-6xl font-extrabold text-white mb-6 leading-tight">
                        Innovative Hub
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Your all-in-one destination for electronics, robotics, and creative innovation. We provide the tools, knowledge, and community you need to bring your ideas to life.
                    </p>
                    <button
                        className="bg-indigo-600 text-white font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                        onClick={() => navigate("/home")}
                    >
                        Explore Products
                    </button>
                </div>

                <div className="absolute inset-0 z-10 bg-black opacity-50"></div>

                <video
                    autoPlay
                    loop
                    muted
                    className="absolute z-0 top-0 left-0 w-full h-full object-cover"
                >
                    <source src={landingVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Rest of the content */}
            <main className="container mx-auto px-4 py-16 text-center">
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
