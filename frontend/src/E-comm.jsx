import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import CategorySidebar from "./components/CategorySidebar";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import ProductViewPage from "./components/ProductViewPage";
import CheckoutModal from "./components/CheckoutModal";
import BackToTopButton from "./components/BackToTopButton";
import Wishlist from "./components/Wishlist";

const Ecomm = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/products", {
          credentials: "include",
        });
        const data = await res.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* ---------- FETCH CART + WISHLIST ---------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          fetch("http://localhost:3001/cart", { credentials: "include" }),
          fetch("http://localhost:3001/wishlist", { credentials: "include" }),
        ]);

        const cartData = await cartRes.json();
        const wishlistData = await wishlistRes.json();

        setCart(cartData.cart || []);
        setWishlist(wishlistData.wishlist || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* ---------- CART ACTIONS ---------- */
  const addToCartFromWishlist = async (productId) => {
    try {
      // send quantity = 1 when adding from wishlist
      await addToCart(productId, 1);
      removeFromWishlist(productId);
    } catch (err) {
      console.error(err);
    }
  };

  // Update addToCart function to accept quantity
  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Add to cart failed");

      const data = await res.json();
      setCart(data.cart || []); // ✅ use backend response
    } catch (err) {
      console.error(err);
    }
  };

  // Update quantity
  const onUpdateQuantity = async (productId, newQuantity) => {
    try {
      const res = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) throw new Error("Update quantity failed");

      const data = await res.json();
      setCart(data.cart || []); // ✅ always take from backend
    } catch (err) {
      console.error(err);
    }
  };

  // Remove item
  const onRemoveItem = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Remove item failed");

      const data = await res.json();
      setCart(data.cart || []); // ✅ always take from backend
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- WISHLIST ACTIONS ---------- */
  const addToWishlist = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3001/wishlist/${productId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Add to wishlist failed:",
          errorData.error || res.statusText
        );
        return;
      }

      const data = await res.json();
      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("Add to wishlist error:", err);
      setWishlist([]);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3001/wishlist/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Remove from wishlist failed:",
          errorData.error || res.statusText
        );
        return;
      }

      const data = await res.json();
      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      setWishlist([]);
    }
  };

  /* ---------- CHECKOUT ---------- */
  const handleCheckout = async () => {
    try {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      setCart([]);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  const cartSubtotal = (cart || []).reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  const cartCount = (cart || []).reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const wishlistCount = (wishlist || []).length;

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleCategorySelect = (category) => {
    setFilteredCategory(category);
    if (!category) setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === category));
  };

  const handleProductClick = (productID) => {
    const product = products.find((p) => p._id === productID);
    setSelectedProduct(product);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSidebarOpen={() => setIsSidebarOpen(true)}
        onSearchClick={toggleSearch}
        isSearchOpen={isSearchOpen}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <CategorySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectCategory={handleCategorySelect}
        filteredCategory={filteredCategory}
      />

      <HeroSection />

      <MainContent
        products={filteredProducts}
        addToCart={addToCart}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
        onProductClick={handleProductClick}
        addToWishlist={addToWishlist}
      />

      <Footer />

      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={onRemoveItem} // ✅ fixed function name
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={handleCheckout}
        cartSubtotal={cartSubtotal}
        onProductClick={handleProductClick}
      />

      <CheckoutModal
        isCheckoutModalOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      <BackToTopButton isScrolled={isScrolled} />

      <Wishlist
        wishlist={wishlist}
        isWishlistOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCartFromWishlist={addToCartFromWishlist}
        onProductClick={handleProductClick}
      />

      {selectedProduct && (
        <ProductViewPage
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      )}
    </div>
  );
};

export default Ecomm;
