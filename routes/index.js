const express = require("express");
const router = express.Router();

// Correct middleware path spelling
const isLoggedin = require("../middleware/isLoggedin");

router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedin, function(req, res) {
    // // Define the product variable here
    // const product = [
    //     { id: 1, name: "Product 1", price: 100 },
    //     { id: 2, name: "Product 2", price: 150 }
    //     // Add more products as needed
    // ];

    // Render the shop page with products
    res.render("shop");
});

module.exports = router;
