// src/App.jsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import BackToTopButton from './components/BackToTopButton';

// Sample product data - This will be replaced by a backend call
// I've moved this to a separate variable for now for clarity
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "electronics",
    image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    rating: 4,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "electronics",
    image: "https://via.placeholder.com/300x200?text=Smart+Watch",
    rating: 5,
    description: "Track your fitness, receive notifications, and more with this stylish smartwatch."
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "fashion",
    image: "https://via.placeholder.com/300x200?text=Cotton+T-Shirt",
    rating: 4,
    description: "Comfortable 100% cotton t-shirt available in multiple colors."
  },
  {
    id: 4,
    name: "Denim Jeans",
    price: 59.99,
    category: "fashion",
    image: "https://via.placeholder.com/300x200?text=Denim+Jeans",
    rating: 4,
    description: "Classic fit denim jeans with stretch for all-day comfort."
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 89.99,
    category: "home",
    image: "https://via.placeholder.com/300x200?text=Coffee+Maker",
    rating: 5,
    description: "Programmable coffee maker with 12-cup capacity and auto shut-off."
  },
  {
    id: 6,
    name: "Air Fryer",
    price: 129.99,
    category: "home",
    image: "https://via.placeholder.com/300x200?text=Air+Fryer",
    rating: 4,
    description: "Healthy cooking with little to no oil. 5.8-quart capacity."
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 79.99,
    category: "electronics",
    image: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
    rating: 4,
    description: "Portable waterproof speaker with 20-hour battery life."
  },
  {
    id: 8,
    name: "Running Shoes",
    price: 89.99,
    category: "fashion",
    image: "https://via.placeholder.com/300x200?text=Running+Shoes",
    rating: 5,
    description: "Lightweight running shoes with cushioned soles for maximum comfort."
  }
];

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect to fetch products from backend
  useEffect(() => {
    // This is where you would fetch data from your backend API
    // Example using a placeholder function
    const fetchProducts = async () => {
      try {
        // const response = await fetch('/api/products'); // Replace with your actual API endpoint
        // const data = await response.json();
        // setProducts(data);

        // For now, we'll use the sample data
        setProducts(SAMPLE_PRODUCTS);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the selected category
  const filteredProducts = filteredCategory === 'all'
    ? products
    : products.filter(product => product.category === filteredCategory);

  // Calculate total items and subtotal for the cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Handle scroll event for the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers for cart functionality
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showAddToCartAnimation();
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    console.log('Checkout:', cart);
    // In a real app, you would send the cart data to your backend here
    setCart([]); // Clear cart after checkout
  };

  const showAddToCartAnimation = () => {
    // This is a simplified animation for demonstration.
    // A more robust implementation would use a state variable.
    const animationDiv = document.createElement('div');
    animationDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg fade-in';
    animationDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Added to cart!`;
    document.body.appendChild(animationDiv);
    setTimeout(() => {
      animationDiv.remove();
    }, 2000);
  };

  return (
    <div className="bg-gray-50">
      <style jsx="true">{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .cart-item-remove:hover {
          color: #ef4444;
          transform: scale(1.1);
        }
        .dropdown-menu {
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        .cart-items-container::-webkit-scrollbar {
          width: 6px;
        }
        .cart-items-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .cart-items-container::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .cart-items-container::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <HeroSection />
      <MainContent
        products={filteredProducts}
        addToCart={addToCart}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
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
      />
      <CheckoutModal
        isCheckoutModalOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
      <BackToTopButton isScrolled={isScrolled} />
    </div>
  );
};

export default App;