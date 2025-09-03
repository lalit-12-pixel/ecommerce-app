import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send the form data to a server here.
    // For this example, we'll just log it and show a success message.
    console.log('Form Submitted:', formData)
    setIsSubmitted(true)
  }

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

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information & Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center bg-green-100 text-green-800 p-8 rounded-lg">
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-4xl mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">
                    Thank You for Your Message!
                  </h3>
                  <p>
                    We have received your inquiry and will get back to you as
                    soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Contact Details
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-indigo-500 mr-4 text-xl"
                    />
                    <span>
                      Infocity Square, Patia,
                      <br />
                      Bhubaneswar, Odisha 751024, India
                    </span>
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-indigo-500 mr-4 text-xl"
                    />
                    <span>support@innovativehub.com</span>
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
              <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.40939529579!2d85.75080138671874!3d20.301131700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d517054f%3A0x81621577e5e33af2!2sInfocity%20Square!5e0!3m2!1sen!2sin!4v1725367735160!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Innovative Hub Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactUsPage

