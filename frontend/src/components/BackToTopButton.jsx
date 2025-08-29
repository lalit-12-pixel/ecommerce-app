// src/components/BackToTopButton.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTopButton = ({ isScrolled }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition ${isScrolled ? '' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default BackToTopButton;