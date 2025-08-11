// src/components/Cart.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, isCartOpen, onClose, onRemoveItem, onUpdateQuantity, onCheckout, cartSubtotal }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={onClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="cart-items-container max-h-96 overflow-y-auto -my-6 divide-y divide-gray-200">
                    {cart.length === 0 ? (
                      <li className="text-center py-8 text-gray-500">
                        Your cart is empty
                      </li>
                    ) : (
                      cart.map(item => (
                        <li key={item.id} className="py-6 flex">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border border-gray-300 rounded">
                                <button className="quantity-decrease px-2 py-1" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span className="px-2">{item.quantity}</span>
                                <button className="quantity-increase px-2 py-1" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                              <button type="button" className="cart-item-remove font-medium text-indigo-600 hover:text-indigo-500 transition" onClick={() => onRemoveItem(item.id)}>
                                <FontAwesomeIcon icon={faTrash} />
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
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${cartSubtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              <button
                className={`w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onCheckout}
                disabled={cart.length === 0}
              >
                Checkout
              </button>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or <button className="text-indigo-600 font-medium hover:text-indigo-500" onClick={onClose}>Continue Shopping<FontAwesomeIcon icon={faArrowRight} className="ml-1" /></button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;