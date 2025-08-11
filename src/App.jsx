import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faSearch, faChevronDown, faShoppingCart, faUser, faBars, faLaptop, faTshirt, faHome, faRunning, faStar, faStarHalfAlt, faPaperPlane, faTrash, faCheck, faArrowRight, faTimes, faCartPlus, faCheckCircle, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

// Sample product data
const PRODUCTS = [
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

const ShopEase = () => {
    // State hooks
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [filteredCategory, setFilteredCategory] = useState('all');
    const [isScrolled, setIsScrolled] = useState(false);

    // Filter products based on the selected category
    const filteredProducts = filteredCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(product => product.category === filteredCategory);

    // Calculate total items and subtotal for the cart
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handlers
    const addToCart = (productId) => {
        const product = PRODUCTS.find(p => p.id === productId);
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
        // In a real app, you would send the cart data to your backend here
        console.log('Checkout:', cart);
        setCart([]); // Clear cart after checkout
    };

    const showAddToCartAnimation = () => {
        // This is a simplified animation for demonstration. In a real React app,
        // you might use a state variable and a CSS class for the animation.
        const animationDiv = document.createElement('div');
        animationDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg fade-in';
        animationDiv.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Added to cart!`;
        document.body.appendChild(animationDiv);
        setTimeout(() => {
            animationDiv.remove();
        }, 2000);
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="bg-gray-50">
            {/* Custom CSS styles */}
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

            {/* Navigation Bar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="#" className="text-2xl font-bold text-indigo-600 flex items-center">
                            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                            ShopEase
                        </a>
                    </div>
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 mx-8">
                        <div className="relative w-full max-w-xl">
                            <input type="text" placeholder="Search for products..."
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                            <button className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-indigo-600">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
                        <div className="dropdown relative">
                            <button className="text-gray-700 hover:text-indigo-600 transition flex items-center">
                                Categories <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
                            </button>
                            <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Electronics</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Fashion</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Home & Garden</a>
                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50">Sports</a>
                            </div>
                        </div>
                        <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Deals</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
                    </div>
                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-indigo-600 transition relative" onClick={() => setIsCartOpen(true)}>
                            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                            <span className={`absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${cartCount === 0 ? 'hidden' : ''}`}>
                                {cartCount}
                            </span>
                        </button>
                        <button className="text-gray-700 hover:text-indigo-600 transition">
                            <FontAwesomeIcon icon={faUser} className="text-xl" />
                        </button>
                        <button className="md:hidden text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <FontAwesomeIcon icon={faBars} className="text-xl" />
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} bg-white py-2 px-4 shadow-md`}>
                    <div className="mb-3">
                        <input type="text" placeholder="Search for products..."
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Home</a>
                    <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Categories</a>
                    <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Deals</a>
                    <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Contact</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Sale Up To 50% Off</h1>
                        <p className="text-xl mb-6">Discover amazing deals on your favorite products. Limited time offer!</p>
                        <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                            Shop Now
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="https://via.placeholder.com/500x300" alt="Hero Image" className="rounded-lg shadow-2xl" />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Categories */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="h-40 bg-indigo-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faLaptop} className="text-4xl text-indigo-600" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-center">Electronics</h3>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="h-40 bg-pink-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faTshirt} className="text-4xl text-pink-600" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-center">Fashion</h3>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="h-40 bg-green-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faHome} className="text-4xl text-green-600" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-center">Home & Garden</h3>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="h-40 bg-yellow-100 flex items-center justify-center">
                                <FontAwesomeIcon icon={faRunning} className="text-4xl text-yellow-600" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-center">Sports</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Products</h2>
                        <div className="flex space-x-2">
                            <button
                                className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
                                onClick={() => setFilteredCategory('all')}
                            >
                                All
                            </button>
                            <button
                                className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'electronics' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
                                onClick={() => setFilteredCategory('electronics')}
                            >
                                Electronics
                            </button>
                            <button
                                className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'fashion' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
                                onClick={() => setFilteredCategory('fashion')}
                            >
                                Fashion
                            </button>
                            <button
                                className={`filter-btn px-3 py-1 rounded-full ${filteredCategory === 'home' ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-indigo-100'}`}
                                onClick={() => setFilteredCategory('home')}
                            >
                                Home
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                                    <div className="relative">
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            {product.rating} <FontAwesomeIcon icon={faStar} className="ml-1" />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                                            <button className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition" onClick={() => addToCart(product.id)}>
                                                <FontAwesomeIcon icon={faCartPlus} className="mr-1" /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-8">No products found in this category.</p>
                        )}
                    </div>
                </section>

                {/* Special Offer */}
                <section className="mb-12 bg-indigo-100 rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
                            <p className="text-lg mb-4">Get 20% off on all fashion items this weekend. Use code <span className="font-bold">FASHION20</span> at checkout.</p>
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
                                Shop Now
                            </button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <img src="https://via.placeholder.com/500x300" alt="Special Offer" className="rounded-lg shadow-md" />
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">John Doe</h4>
                                    <div className="flex text-yellow-400">
                                        {renderRatingStars(5)}
                                    </div>
                                </div>
                            </div>
                            <p>"Great products and fast delivery. I'm very satisfied with my purchase. Will definitely shop here again!"</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Jane Smith</h4>
                                    <div className="flex text-yellow-400">
                                        {renderRatingStars(4.5)}
                                    </div>
                                </div>
                            </div>
                            <p>"Excellent customer service. Had an issue with my order and it was resolved quickly. Highly recommended!"</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <FontAwesomeIcon icon={faUser} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">Robert Johnson</h4>
                                    <div className="flex text-yellow-400">
                                        {renderRatingStars(4)}
                                    </div>
                                </div>
                            </div>
                            <p>"Good quality products at reasonable prices. The website is easy to use and checkout was smooth."</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">ShopEase</h3>
                            <p className="mb-4">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faFacebookF} /></a>
                                <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTwitter} /></a>
                                <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></a>
                                <a href="#" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faPinterest} /></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white">My Account</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Order Tracking</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Wishlist</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Shipping Policy</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">Returns & Refunds</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                            <div className="flex">
                                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800" />
                                <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2023 ShopEase. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Shopping Cart Sidebar */}
            <div className={`fixed inset-0 z-50 overflow-hidden ${isCartOpen ? '' : 'hidden'}`}>
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
                <div className="absolute inset-y-0 right-0 max-w-full flex">
                    <div className="relative w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                    <button className="text-gray-400 hover:text-gray-500" onClick={() => setIsCartOpen(false)}>
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
                                                                    <button className="quantity-decrease px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                                    <span className="px-2">{item.quantity}</span>
                                                                    <button className="quantity-increase px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                                </div>
                                                                <button type="button" className="cart-item-remove font-medium text-indigo-600 hover:text-indigo-500 transition" onClick={() => removeFromCart(item.id)}>
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
                                    onClick={handleCheckout}
                                    disabled={cart.length === 0}
                                >
                                    Checkout
                                </button>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or <button className="text-indigo-600 font-medium hover:text-indigo-500" onClick={() => setIsCartOpen(false)}>Continue Shopping<FontAwesomeIcon icon={faArrowRight} className="ml-1" /></button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            <div className={`fixed inset-0 z-50 overflow-y-auto ${isCheckoutModalOpen ? '' : 'hidden'}`}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" onClick={() => setIsCheckoutModalOpen(false)}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Order Successful!</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setIsCheckoutModalOpen(false)}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                className={`fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition ${isScrolled ? '' : 'hidden'}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </button>
        </div>
    );
};

export default ShopEase;