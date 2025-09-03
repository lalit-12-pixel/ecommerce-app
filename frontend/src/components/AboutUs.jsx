import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCogs,
  faComments,
  faGraduationCap,
  faLightbulb,
  faUsers,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

// Placeholder data for the team section
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead Engineer",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image
    bio: "A lifelong tinkerer and robotics enthusiast, Alex founded Innovative Hub to create a space he wished he had when starting out.",
  },
  {
    name: "Maria Garcia",
    role: "Head of Community & Education",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image
    bio: "With a background in education, Maria is passionate about making complex topics accessible and fostering a collaborative learning environment.",
  },
  {
    name: "Sam Chen",
    role: "E-Commerce & Operations Lead",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image
    bio: "Sam ensures every component, kit, and product reaches our customers smoothly and efficiently.",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <header className="bg-indigo-700 text-white text-center py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">About Innovative Hub</h1>
          <p className="text-xl max-w-3xl mx-auto text-indigo-200">
            Empowering makers, students, and professionals to Learn, Build, Share, and Innovate.
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FontAwesomeIcon icon={faLightbulb} className="text-5xl text-indigo-500 mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Innovative Hub was born from a simple yet powerful idea: to create a single, unified platform for the creators of tomorrow. We saw passionate students, dedicated hobbyists, and brilliant professionals navigating a fragmented world of component suppliers, scattered tutorials, and disconnected communities. We envisioned a place where anyone with an idea could find not only the parts they need but also the knowledge to use them and a community to share their journey with. That vision became Innovative Hub—your one-stop destination for bringing ideas to life.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <FontAwesomeIcon icon={faBullseye} className="text-5xl text-indigo-500 mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to empower makers, students, and professionals by providing high-quality electronic components, comprehensive robotics education, and a supportive community hub. We strive to break down barriers to innovation, making it easier for everyone to learn, build, and share their creations.
            </p>
          </div>
          <div className="text-center md:text-left">
            <FontAwesomeIcon icon={faRocket} className="text-5xl text-indigo-500 mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We aim to be the world's leading platform for DIY innovation, fostering a global community where creativity flourishes. We envision a future where anyone, regardless of their background, has the tools and support needed to build the future and solve real-world problems through technology.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do - Our Pillars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">The Four Pillars of Our Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1: Learn */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Learn</h3>
              <p className="text-gray-600">Access comprehensive video courses, step-by-step tutorials, and expert guides designed to take you from beginner to expert.</p>
            </div>
            {/* Pillar 2: Build */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faCogs} className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Build</h3>
              <p className="text-gray-600">Shop our vast catalog of high-quality components and curated project kits to get everything you need for your next creation.</p>
            </div>
            {/* Pillar 3: Share */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Share</h3>
              <p className="text-gray-600">Connect with a vibrant community of innovators. Share your projects, exchange ideas, and get valuable feedback.</p>
            </div>
            {/* Pillar 4: Innovate */}
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <FontAwesomeIcon icon={faRocket} className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Innovate</h3>
              <p className="text-gray-600">Push the boundaries of what's possible. With the right tools, knowledge, and support, your imagination is the only limit.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet The Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <FontAwesomeIcon icon={faUsers} className="text-5xl text-indigo-500 mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Replace with actual team member data */}
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
                />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 max-w-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of creators building the future. Explore our products, enroll in a course, or say hello to our community.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
              onClick={() => navigate("/home")}
            >
              Explore Products
            </button>
            <button
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition"
              onClick={() => navigate("/coming-soon")} // Or your community/courses page
            >
              Join the Community
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;