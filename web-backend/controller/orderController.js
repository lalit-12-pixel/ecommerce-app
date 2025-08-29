const Order = require("../models/Order");
const User = require("../models/User");

/* ✅ Place Order */
exports.placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("cart.product");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const newOrder = new Order({
      user: user._id,
      products: user.cart.map((c) => ({
        product: c.product._id,
        quantity: c.quantity,
        price: c.product.price,
      })),
      totalAmount: user.cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0),
      status: "Pending",
      createdAt: new Date(),
    });

    await newOrder.save();

    // Clear cart
    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

/* ✅ Get My Orders */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
