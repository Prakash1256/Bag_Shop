// routes/productsRouter.js
const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

// Route to create a product
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).send({ error: "Image file is required." });
    }

    // Create the product
    const newProduct = await productModel.create({
      image: req.file.buffer, // Store image buffer
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    // Flash success message and redirect to the shop page
    req.flash("success", `Product ${newProduct.name} created successfully.`);
    res.redirect("/shop");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ error: "An error occurred while creating the product." });
  }
});

// Route to render the shop page
router.get('/shop', async (req, res) => {
  try {
      const products = await productModel.find(); // Fetch products from the database
      const success = req.query.success || ""; // Get success message from query params
      res.render('shop', { products, success }); // Pass products and success to the view
  } catch (error) {
      console.error("Error fetching products:", error);
      res.render('shop', { products: [], success: "Failed to load products." }); // Handle error
  }
});


module.exports = router;
