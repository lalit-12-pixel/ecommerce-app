import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Wishlist = ({ wishlist, isWishlistOpen, onClose, onRemoveFromWishlist, onAddToCartFromWishlist, onProductClick }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isWishlistOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Your Wishlist</h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={onClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {wishlist.length === 0 ? (
                      <li className="text-center py-8 text-gray-500">
                        Your wishlist is empty
                      </li>
                    ) : (
                      wishlist.map(item => (
                        <li key={item.id} className="py-6 flex">
                          <div
                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                            onClick={() => onProductClick(item.id)}
                          >
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 onClick={() => onProductClick(item.id)} className="cursor-pointer hover:underline">{item.name}</h3>
                                <p className="ml-4">${item.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition"
                                onClick={() => onAddToCartFromWishlist(item.id)}
                              >
                                <FontAwesomeIcon icon={faCartPlus} className="mr-1" />
                                Add to cart
                              </button>
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500 transition"
                                onClick={() => onRemoveFromWishlist(item.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;