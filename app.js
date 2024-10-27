// Load environment variables at the very beginning of your app
require('dotenv').config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
// const product = require("./data/product");
// Database connection
const db = require("./config/mongoose-connection");

// Routers
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session and flash setup
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}));
app.use(flash());

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Render views with optional flash messages
app.get("/", (req, res) => {
    res.render("index", { error: req.flash("error") });
});

app.get("/admin", (req, res) => {
    res.render("admin", { error: req.flash("error") });
});

app.get("/cart", (req, res) => {
    res.render("cart", { error: req.flash("error") });
});

app.get("/createproduct", (req, res) => {
    res.render("createproducts", { error: req.flash("error") });
});

app.get("/owner-login", (req, res) => {
    res.render("owner-login", { error: req.flash("error") });
});

app.get('/shop', (req, res) => {
    // Fetch or define the products array
    const products = [
        {
            name: "Bag 1",
            price: 500,
            bgcolor: "#f8f8f8",
            panelcolor: "#333",
            textcolor: "#fff",
            image: "base64EncodedImage1" // Ensure this is a base64 encoded string
        },
        // Add more products as needed
    ];

    // Pass products array to the shop.ejs view
    res.render('shop', { product: products });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
