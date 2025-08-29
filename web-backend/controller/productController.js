const Product = require("../models/Product.js");
const path = require("path");
const fs = require("fs").promises;

/* ✅ Add Product */
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, mrp, category, stock, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      mrp,
      category,
      stock,
      image, // directly use the URL
    });

 

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ✅ Get All Products */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/* ✅ Get Single Product */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

/* ✅ Update Product */
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let updateFields = { name, description, price, category, stock };

    if (req.file) {
      updateFields.imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

/* ✅ Delete Product */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete image if exists
    if (product.imageUrl) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        path.basename(product.imageUrl)
      );
      await fs.unlink(imagePath).catch(() => {});
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
