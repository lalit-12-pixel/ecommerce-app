import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { EcommContext } from "../../store/ecomprovider"; // Adjust the path to your EcommProvider file

const MainContent = () => {
  const {
    products,
    filteredProducts,
    filteredCategory,
    handleCategorySelect,
    addToCart,
    handleProductClick,
    addToWishlist,
  } = useContext(EcommContext);

  // Dynamically create a list of unique categories from your products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <main
      className="container mx-auto px-4 py-8"
      style={{ userSelect: "none" }}
    >
      <section className="mb-12">
        <div
          className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 "
          style={{ alignItems: "center" }}
        >
          <h3
            className="text-3xl font-bold tracking-tight text-gray-800 whitespace-nowrap"
            style={{
              userSelect: "none",
              marginRight: "10px",
              marginTop: "-10px",
            }}
          >
            Our Products
          </h3>

          <div className="flex w-full overflow-x-auto space-x-3 pb-2 no-scrollbar touch-pan-x">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  filteredCategory === category
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
                onAddToWishlist={addToWishlist}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-16 text-xl">
              No products found in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
