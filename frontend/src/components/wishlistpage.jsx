import React, { useContext } from "react";
import { EcommContext } from "../../store/ecomprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const MyWishlistPage = () => {
  const {
    wishlist,
    addToCartFromWishlist,
    removeFromWishlist,
    handleProductClick,
  } = useContext(EcommContext);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 space-y-2">
          <p className="text-xl">Your wishlist is empty.</p>
          <p className="text-gray-400">Start adding products you love!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {wishlist.map((item) => (
            <div
              key={item._id || item.id}
              className="w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Product Image */}
              <div
                className="cursor-pointer w-full md:w-2/5 h-80 md:h-[420px] overflow-hidden"
                onClick={() => handleProductClick(item._id || item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-between w-full md:w-3/5">
                <div>
                  <h2
                    onClick={() => handleProductClick(item._id || item.id)}
                    className="text-3xl font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 hover:underline mb-4"
                  >
                    {item.name}
                  </h2>
                 <p className="text-indigo-600 font-bold text-2xl mb-2">
  ₹{item.price.toFixed(2)}{" "}
  {item.mrp && (
    <>
      <span className="text-gray-400 line-through text-lg ml-2">
        ₹{item.mrp.toFixed(2)}
      </span>
      <span className="text-green-600 text-lg font-semibold ml-2">
        {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
      </span>
    </>
  )}
</p>
                  <p className="text-gray-500 text-base mb-2">{item.category}</p>
                  {item.stock !== undefined && (
                    <p
                      className={`text-base font-medium mb-3 ${
                        item.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.stock > 0
                        ? `In Stock: ${item.stock}`
                        : "Out of Stock"}
                    </p>
                  )}

                  {/* Description as bullet points */}
                  {item.description && (
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
                      {item.description
                        .split(".")
                        .map((point, index) =>
                          point.trim() ? (
                            <li key={index}>{point.trim()}</li>
                          ) : null
                        )}
                    </ul>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => addToCartFromWishlist(item._id)}
                    disabled={item.stock === 0}
                    className={`py-3 px-6 rounded-lg text-white flex items-center justify-center gap-2 text-base transition-all duration-300 w-full sm:w-auto ${
                      item.stock > 0
                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCartPlus} className="text-base" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="py-3 px-6 rounded-lg text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base transition-all duration-300 w-full sm:w-auto"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-base" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlistPage;
