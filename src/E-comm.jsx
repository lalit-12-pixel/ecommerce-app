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
    
  const SAMPLE_PRODUCTS = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "electronics",
      image: "https://via.placeholder.com/600x400?text=Wireless+Headphones",
      rating: 4,
      description:
        "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "electronics",
      image: "https://via.placeholder.com/600x400?text=Smart+Watch",
      rating: 5,
      description:
        "Track your fitness, receive notifications, and more with this stylish smartwatch.",
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 24.99,
      category: "fashion",
      image: "https://via.placeholder.com/600x400?text=Cotton+T-Shirt",
      rating: 4,
      description: "Comfortable 100% cotton t-shirt available in multiple colors.",
    },
    {
      id: 4,
      name: "Denim Jeans",
      price: 59.99,
      category: "fashion",
      image: "https://via.placeholder.com/600x400?text=Denim+Jeans",
      rating: 4,
      description: "Classic fit denim jeans with stretch for all-day comfort.",
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 89.99,
      category: "home",
      image: "https://via.placeholder.com/600x400?text=Coffee+Maker",
      rating: 5,
      description:
        "Programmable coffee maker with 12-cup capacity and auto shut-off.",
    },
    {
      id: 6,
      name: "Air Fryer",
      price: 129.99,
      category: "home",
      image: "https://via.placeholder.com/600x400?text=Air+Fryer",
      rating: 4,
      description: "Healthy cooking with little to no oil. 5.8-quart capacity.",
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 79.99,
      category: "electronics",
      image: "https://via.placeholder.com/600x400?text=Bluetooth+Speaker",
      rating: 4,
      description:
        "Portable waterproof speaker with 20-hour battery life.",
    },
    {
      id: 8,
      name: "Running Shoes",
      price: 89.99,
      category: "fashion",
      image: "https://via.placeholder.com/600x400?text=Running+Shoes",
      rating: 5,
      description:
        "Lightweight running shoes with cushioned soles for maximum comfort.",
    },
  ];

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(SAMPLE_PRODUCTS);
  }, []);

  const filteredProducts =
    filteredCategory === "all"
      ? products
      : products.filter((product) => product.category === filteredCategory);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategorySelect = (category) => {
    setFilteredCategory(category);
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleProductClick = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  };

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showAddToCartAnimation();
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    console.log("Checkout:", cart);
    setCart([]);
  };

  const showAddToCartAnimation = () => {
    const animationDiv = document.createElement("div");
    animationDiv.className =
      "fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg fade-in";
    animationDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Added to cart!`;
    document.body.appendChild(animationDiv);
    setTimeout(() => {
      animationDiv.remove();
    }, 2000);
  };

  const addToWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === productId)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  };

  const addToCartFromWishlist = (productId) => {
    addToCart(productId);
    removeFromWishlist(productId);
  };

  return (
    <div className="bg-gray-50">
      <style jsx="true">{`
        .fade-in {
          animation: fadeIn 0.5s, fadeOut 0.5s 1.5s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>

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
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
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
