// Load environment variables at the very beginning of your app
require('dotenv').config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
// const products = require("./data/products");
// Database connection

const db = require("./config/mongoose-connection");

// Routers
const indexRouter = require("./routes/index");
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
    cookie: { secure: false },
}));
app.use(flash());

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/" ,indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/owners/product", productsRouter);
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
    // Assume you fetch products from a database or some data source
    // Replace this with your actual data fetching logic

    // Render the EJS view and pass the products data
   
    res.render('shop');
});




// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
