// models/product-model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: Number,
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("Product", productSchema);
