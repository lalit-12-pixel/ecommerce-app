import React, { useContext } from "react";
import { EcommContext } from "../store/ecomprovider";
import MainContent from "./components/MainContent";
import ProductViewPage from "./components/ProductViewPage";
import Loader from "./components/loader";

const Ecomm = () => {
  const context = useContext(EcommContext);
  if (!context) return <p>Loading...</p>;
  const {
    loading,
    error,
    filteredProducts,
    filteredCategory,
    handleCategorySelect,
    handleProductClick,
    addToCart,
    addToWishlist,
  } = context;

  if (loading) return <p className="text-center mt-10"><Loader /></p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50">
    
      <MainContent
        products={filteredProducts}
        addToCart={addToCart}
        filteredCategory={filteredCategory}
        setFilteredCategory={handleCategorySelect}
        onProductClick={handleProductClick}
        addToWishlist={addToWishlist}
      />



    
    </div>
  );
};

export default Ecomm;
