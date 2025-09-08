import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'

const ContactUsPage = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <header className="bg-white text-gray-800 text-center py-20 border-b">
        <div className="container mx-auto px-4">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-5xl text-indigo-500 mb-4"
          />
          <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            We’d love to hear from you! Whether you have a question about our
            products, courses, or anything else, our team is ready to answer
            all your questions.
          </p>
        </div>
      </header>

      {/* Contact Details Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Contact Details
            </h3>
            <div className="space-y-6 text-gray-600">
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-indigo-500 mr-4 text-xl"
                />
                <span>inovativehubofficial@gmail.com</span>
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-indigo-500 mr-4 text-xl"
                />
                <span>+91 (123) 456-7890</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUsPage
