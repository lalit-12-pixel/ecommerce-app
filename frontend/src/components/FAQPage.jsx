import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

// FAQ data organized by category
const faqData = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What is Innovative Hub?",
        answer: "Innovative Hub is your all-in-one destination for electronics, robotics, and creative innovation. We provide high-quality components and kits through our e-shop, offer comprehensive robotics courses, and foster a community for makers to share ideas and get feedback.",
      },
      {
        question: "Who is Innovative Hub for?",
        answer: "Our platform is designed for everyone with a passion for creating—from students and hobbyists just starting out, to seasoned professionals and educators looking for reliable components and resources.",
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "How can I track my order?",
        answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find your order status and tracking information in the 'My Orders' section of your account page.",
      },
      {
        question: "What are your shipping options?",
        answer: "We offer several shipping options, including Standard (5-7 business days), Expedited (2-3 business days), and Priority (1-2 business days). Shipping costs and delivery times vary based on your location and the selected option.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we currently ship to over 50 countries. International shipping rates and times will be calculated at checkout. Please be aware that customers are responsible for any customs fees or import duties.",
      },
    ],
  },
  {
    category: "Products & Kits",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We accept returns on unopened and unused products within 30 days of delivery. If you receive a defective or incorrect item, please contact our support team immediately, and we will arrange for a replacement or a full refund. Please visit our 'Returns & Refunds' page for more details.",
      },
      {
        question: "Are the components in your store high-quality?",
        answer: "Absolutely. We source our electrical and electronic components from trusted manufacturers to ensure reliability and performance. We stand by the quality of every product we sell.",
      },
      {
        question: "Do you offer bulk discounts for educational institutions?",
        answer: "Yes, we are passionate about supporting education. We offer special pricing and bulk discounts for schools, universities, and maker spaces. Please contact our sales team through the 'Contact Us' page for a custom quote.",
      },
    ],
  },
  {
    category: "Courses & Community",
    questions: [
      {
        question: "How do I access the robotics courses?",
        answer: "Our robotics courses and tutorials are available through a subscription model on our platform. Once subscribed, you will have unlimited access to our entire library of video lessons, project guides, and learning materials.",
      },
      {
        question: "Are the courses suitable for beginners?",
        answer: "Yes! We have courses designed for all skill levels, from absolute beginners with no prior experience to advanced users looking to master complex topics. Each course description clearly outlines the required prerequisites.",
      },
    ],
  },
];

// Reusable accordion item component
const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
        onClick={onClick}
      >
        <span>{question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const navigate = useNavigate();
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const handleToggle = (qIndex) => {
    setOpenQuestionIndex(openQuestionIndex === qIndex ? null : qIndex);
  };

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <header className="bg-white text-gray-800 text-center py-20 border-b">
        <div className="container mx-auto px-4">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-5xl text-indigo-500 mb-4" />
          <h1 className="text-5xl font-extrabold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Have a question? We're here to help. Find answers to common queries below.
          </p>
        </div>
      </header>

      {/* FAQ Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-indigo-500 pl-4">
                {category.category}
              </h2>
              {category.questions.map((q, qIndex) => {
                // Create a unique index for each question across all categories
                const uniqueIndex = catIndex * 100 + qIndex;
                return (
                  <FaqItem
                    key={uniqueIndex}
                    question={q.question}
                    answer={q.answer}
                    isOpen={openQuestionIndex === uniqueIndex}
                    onClick={() => handleToggle(uniqueIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you can't find the answer you're looking for, please don't hesitate to reach out to our friendly support team.
          </p>
          <button
            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
            onClick={() => navigate("/contact")} // Navigate to your contact page
          >
            Contact Us
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;