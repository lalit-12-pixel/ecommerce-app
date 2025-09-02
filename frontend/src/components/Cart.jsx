import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Cart = ({
  cart,
  isCartOpen,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const handleDecrease = (productId, quantity) => {
    if (Number(quantity) > 1) {
      onUpdateQuantity(productId, Number(quantity) - 1);
    } else {
      onRemoveItem(productId);
    }
  };

  // Calculate subtotal and savings
  const subtotal = cart
    ?.filter((item) => item.product?.stock > 0)
    .reduce(
      (acc, item) => acc + Number(item.product.price || 0) * Number(item.quantity || 1),
      0
    );

  const totalMrp = cart
    ?.filter((item) => item.product?.stock > 0)
    .reduce(
      (acc, item) => acc + Number(item.product.mrp || item.product.price || 0) * Number(item.quantity || 1),
      0
    );

  const totalSavings = totalMrp - subtotal;

  const hasInStockItems = cart?.some((item) => item.product?.stock > 0);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? "" : "hidden"}`}
      style={{ userSelect: "none" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Cart panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={onClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="mt-8">
                <ul className="cart-items-container max-h-96 overflow-y-auto -my-6 divide-y divide-gray-200">
                  {cart?.length === 0 ? (
                    <li className="text-center py-8 text-gray-500">Your cart is empty</li>
                  ) : (
                    cart.map((item) => {
                      if (!item.product) return null;
                      const quantity = Number(item.quantity || 1);
                      const price = Number(item.product.price || 0);
                      const mrp = Number(item.product.mrp || price);
                      const subtotalItem = (price * quantity).toFixed(2);
                      const mrpTotal = (mrp * quantity).toFixed(2);
                      const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
                      const isOutOfStock = item.product.stock <= 0;

                      return (
                        <li
                          key={item.product._id}
                          className={`py-6 flex ${isOutOfStock ? "opacity-50" : ""}`}
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.image}
                              alt={item.product.name || "Product"}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h6>{item.product.name || "Unnamed Product"}</h6>
                                <p className="ml-4">₹{subtotalItem}</p>
                              </div>

                              {/* Show MRP and Discount */}
                              {mrp > price && (
                                <p className="mt-1 text-sm text-gray-500">
                                  <span className="line-through mr-2">₹{mrpTotal}</span>
                                  <span className="text-green-600 font-medium">
                                    Save {discountPercent}%
                                  </span>
                                </p>
                              )}

                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.category || "Uncategorized"}
                              </p>
                              <p
                                className={`mt-1 text-sm ${
                                  isOutOfStock ? "text-red-500 font-semibold" : "text-gray-500"
                                }`}
                              >
                                {isOutOfStock
                                  ? "Out of Stock"
                                  : `In Stock: ${item.product.stock}`}
                              </p>
                            </div>

                            <div className="flex flex-1 items-end justify-between text-sm mt-2">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-gray-300 rounded">
                                <button
                                  className="px-2 py-1"
                                  onClick={() => handleDecrease(item.product._id, quantity)}
                                  disabled={isOutOfStock}
                                >
                                  -
                                </button>
                                <span className="px-2">{quantity}</span>
                                <button
                                  className="px-2 py-1"
                                  onClick={() =>
                                    onUpdateQuantity(item.product._id, quantity + 1)
                                  }
                                  disabled={isOutOfStock}
                                >
                                  +
                                </button>
                              </div>

                              {/* Remove button */}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 transition"
                                onClick={() => onRemoveItem(item.product._id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              {/* Subtotal */}
              <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                <p>Total MRP</p>
                <p>₹{isNaN(totalMrp) ? "0.00" : totalMrp.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base text-green-600 mb-2">
                <p>Total Savings</p>
                <p>-₹{isNaN(totalSavings) ? "0.00" : totalSavings.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>₹{isNaN(subtotal) ? "0.00" : subtotal.toFixed(2)}</p>
              </div>

              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className={`w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !hasInStockItems ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={onCheckout}
                disabled={!hasInStockItems}
              >
                Checkout
              </button>
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{" "}
                  <button
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                    onClick={onClose}
                  >
                    Continue Shopping{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </button>
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
