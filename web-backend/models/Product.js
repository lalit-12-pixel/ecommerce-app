const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String, trim: true },
    image: { type: String },
    ratings: { type: Number, default: 4 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
