import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductViewPage = ({ product, onClose, onAddToCart, addToWishlist }) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full relative overflow-y-auto max-h-full">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Product Image */}
                    <div className="md:w-1/2 flex justify-center items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-gray-500 text-lg mb-4">{product.category}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex text-lg">{renderStars(product.rating)}</div>
                            <span className="ml-2 text-gray-600">({product.rating}.0)</span>
                        </div>

                        <p className="text-4xl font-extrabold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
                        
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        
                        <div className="flex space-x-4">
                            <button
                                onClick={() => onAddToCart(product.id)}
                                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={() => addToWishlist(product.id)}
                                className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <FontAwesomeIcon icon={faHeart} />
                                <span>Add to Wishlist</span>
                            </button>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                            <p className="text-gray-500">There are no reviews for this product yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewPage;