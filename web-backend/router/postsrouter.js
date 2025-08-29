// External Modules
const express = require("express");
const multer = require("multer");
const path = require("path");

const postsRouter = express.Router();

// Local Controllers
const productController = require("../controller/productController");
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* -------------------- PRODUCT ROUTES -------------------- */
postsRouter.post("/add-products", productController.addProduct);
postsRouter.get("/products", productController.getAllProducts);
postsRouter.get("/products/:id", productController.getProduct);
postsRouter.delete("/products/:id", productController.deleteProduct);
postsRouter.patch("/products/:id", productController.updateProduct);

/* -------------------- WISHLIST ROUTES -------------------- */
postsRouter.patch("/wishlist/:productId", userController.addToWishlist);
postsRouter.delete("/wishlist/:productId", userController.removeFromWishlist);
postsRouter.get("/wishlist", userController.getWishlist);

/* -------------------- CART ROUTES -------------------- */
postsRouter.patch("/cart/:productId", userController.addToCart);
postsRouter.patch("/cart/:productId/decrease", userController.decreaseCartQuantity);
postsRouter.delete("/cart/:productId", userController.removeFromCart);
postsRouter.get("/cart", userController.getCart);

/* -------------------- ORDER ROUTES -------------------- */
postsRouter.post("/orders", orderController.placeOrder);
postsRouter.get("/orders", orderController.getMyOrders);

module.exports = postsRouter;
