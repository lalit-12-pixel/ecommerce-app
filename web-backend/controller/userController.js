const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");

/* ✅ Wishlist */
exports.addToWishlist = async (req, res) => {
  console.log(req.session);
  try {
    const { productId } = req.params;
    const user = await User.findById(req.session.user._id).populate("wishlist");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if already in wishlist
    if (!user.wishlist.some((p) => p._id.toString() === productId)) {
      user.wishlist.push(productId); // push as ObjectId
      await user.save();
      await user.populate("wishlist"); // populate newly added item
    }

    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.session.user._id).populate("wishlist");
    if (!user) return res.status(404).json({ error: "User not found" });

    user.wishlist = user.wishlist.filter((p) => p._id.toString() !== productId);
    await user.save();
    await user.populate("wishlist"); // ensure populated objects
    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.session.user._id).populate("wishlist");
  res.json({ wishlist: user.wishlist }); 
};


// cart

exports.addToCart = async (req, res) => {
  try {
    const userId = req.session?.user?._id;
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart || [];
    const item = user.cart.find((c) => c.product.toString() === productId);

    if (item) {
      item.quantity = typeof quantity === "number" ? quantity : item.quantity + 1;
    } else {
      user.cart.push({ product: product._id, quantity: quantity || 1 });
    }

    await user.save();
    await user.populate("cart.product"); // ✅ populate before sending

    res.json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.decreaseCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.session.user._id);

    const item = user.cart.find((c) => c.product.toString() === productId);
    if (item) {
      item.quantity = Math.max(item.quantity - 1, 0);
      if (item.quantity === 0) {
        user.cart = user.cart.filter((c) => c.product.toString() !== productId);
      }
    }

    await user.save();
    await user.populate("cart.product"); // ✅ populate here too
    res.json({ message: "Quantity updated", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.session.user._id);

    user.cart = user.cart.filter((c) => c.product.toString() !== productId);

    await user.save();
    await user.populate("cart.product"); // ✅ populate before sending
    res.json({ message: "Removed from cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCart = async (req, res) => {
    console.log(req.session);
  try {
    const user = await User.findById(req.session.user._id).populate("cart.product");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
