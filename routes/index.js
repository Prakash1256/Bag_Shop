// mainRouter.js (assuming this is your main router file)
const express = require("express");
const router = express.Router();

// Correct middleware path spelling
// const isLoggedin = require("../middleware/isLoggedin"); 
const isLoggedin = require("../middileware/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error, Loggedin: false });
});

router.get("/shop", isLoggedin, async function(req, res) {
    try {
        // Fetch products from the database
        let products = await productModel.find();

        // Render the shop page with products
        res.render("shop", { products }); // Pass the products array to the EJS template
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error

        // Render the shop page with an empty products array and an error message
        res.render("shop", { products: [], success: "Failed to load products." });
    }
});

// // Logout route
// router.get("/logout", isLoggedin, function(req, res) {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).send("Could not log out.");
//         }
//         res.redirect("/"); // Redirect after logout
//     });
// });


router.get("/addtocart/:id" , isLoggedin , async function(req, res) {
   let user = await  userModel.findOne({email:req.user.email});
   user.cart.push(req.param.productid);
   await user.save();
   req.flash("success" , "Added to cart");
   res.redirect("/shop");
})

router.get("/cart", isLoggedin, async function(req, res) {
    try {
        // Retrieve the user from the database
        const user = await userModel.findOne({ email: req.user.email }).populate({ path: 'cart',
            model: 'Product'});
        
        // Render the cart view and pass the user data
        res.render("cart", { user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal Server Error");
    }
});

 

module.exports = router;
