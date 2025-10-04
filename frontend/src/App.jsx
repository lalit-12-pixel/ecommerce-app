import React, { useContext } from "react";
import { EcommProvider, EcommContext } from "../store/ecomprovider.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import Wishlist from "./components/Wishlist.jsx";
import CategorySidebar from "./components/CategorySidebar.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTopButton from "./components/BackToTopButton.jsx";
import ProductViewPage from "./components/ProductViewPage.jsx";
import Loader from "./components/loader.jsx";


function App() {
  return (
    <EcommProvider>
      <AppContent />
    </EcommProvider>
  );
}
const AppContent = () => {
  const {
    cart,
    requireLogin,
    wishlist,
    isSidebarOpen,
    isCartOpen,
    isWishlistOpen,
    isCheckoutModalOpen,
    isScrolled,
    cartSubtotal,
    setIsSidebarOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    updateCartQuantity,
    loading,
    error,
    filteredProducts,

    setSelectedProduct,

    addToCart,
    addToWishlist,
    selectedProduct,
    setIsCheckoutModalOpen,
    handleCheckout,
    removeFromCart,
    removeFromWishlist,
    addToCartFromWishlist,
    handleProductClick,
    filteredCategory,
    handleCategorySelect,
  } = useContext(EcommContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 min-h-screen">
          <Header />

          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            className="rounded-xl shadow-lg"
            toastClassName="bg-gray-800 text-white font-semibold rounded-lg shadow-md"
            bodyClassName="text-sm"
          />

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {selectedProduct && (
            <ProductViewPage
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
              addToWishlist={addToWishlist}
            />
          )}

          <CategorySidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSelectCategory={handleCategorySelect}
            filteredCategory={filteredCategory}
            
          />

          <Cart
            cart={cart}
            isCartOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={handleCheckout}
            cartSubtotal={cartSubtotal}
            onProductClick={handleProductClick}
          />

          <Wishlist
            wishlist={wishlist}
            isWishlistOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            onRemoveFromWishlist={removeFromWishlist}
            onAddToCartFromWishlist={addToCartFromWishlist}
            onProductClick={handleProductClick}
          />

          <CheckoutModal
            isCheckoutModalOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
          />

          <BackToTopButton isScrolled={isScrolled} />

          <Outlet />

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
