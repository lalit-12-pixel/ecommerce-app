import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
export const EcommContext = createContext();

export const EcommProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
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

  /* ---------- FETCH USER SESSION ---------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/`, {
          method: "GET",
          credentials: "include", 
        });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`, {
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
    if (!user) return;
    const fetchData = async () => {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          fetch(`${API_URL}/cart`, { credentials: "include" }),
          fetch(`${API_URL}/wishlist`, { credentials: "include" }),
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
  }, [user]);

  /* ---------- HELPER ---------- */
  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }
    return true;
  };

  /* ---------- CART ACTIONS ---------- */
  const addToCart = async (productId, quantity = 1) => {
    if (!requireLogin()) return;
    toast.success(" Product added to cart!");
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Add to cart failed");
      const data = await res.json();
      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!requireLogin()) return;
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Remove from cart failed");
      const data = await res.json();
      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (!requireLogin()) return;

    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Update cart quantity failed");
      const data = await res.json();
      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCartFromWishlist = async (productId) => {
    await addToCart(productId, 1);
    removeFromWishlist(productId);
  };

  /* ---------- WISHLIST ACTIONS ---------- */
  const addToWishlist = async (productId) => {
    if (!requireLogin()) return;
    toast.success(" Product added to wishlist!");
    setWishlist((prev) => [...prev, { product: { _id: productId } }]);
    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Add to wishlist failed");
      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!requireLogin()) return;
    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Remove from wishlist failed");
      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- CHECKOUT ---------- */
  const handleCheckout = async () => {
    if (!requireLogin()) return;
    try {
      await fetch(`${API_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- CART & WISHLIST COUNT/SUM ---------- */
  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 0),
    0
  );
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const wishlistCount = wishlist.length;

  /* ---------- CATEGORY FILTER ---------- */

  const handleCategorySelect = (category) => {
    setFilteredCategory(category);
    setIsSidebarOpen(false);

    if (!category || category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  /* ---------- PRODUCT VIEW ---------- */
  const handleProductClick = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  const setSearchQuery = (query) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(results);
  };

  return (
    <EcommContext.Provider
      value={{
        user,
        setUser,
        products,
        filteredProducts,
        filteredCategory,
        cart,
        wishlist,
        selectedProduct,
        isSidebarOpen,
        isCartOpen,
        isWishlistOpen,
        isCheckoutModalOpen,
        isSearchOpen,
        isScrolled,
        loading,
        error,
        requireLogin,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToCartFromWishlist,
        addToWishlist,
        removeFromWishlist,
        handleCheckout,
        cartSubtotal,
        setSearchQuery,
        cartCount,
        wishlistCount,
        handleCategorySelect,
        handleProductClick,
        setIsSidebarOpen,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutModalOpen,
        setIsSearchOpen,
        setIsScrolled,
        setSelectedProduct,
      }}
    >
      {children}
    </EcommContext.Provider>
  );
};
