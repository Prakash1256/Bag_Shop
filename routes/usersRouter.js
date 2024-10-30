// usersRouter.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController"); // Ensure this path is correct

router.get("/", function(req, res) {
    res.send("hey it is working");
});

router.post("/register", registerUser); // Make sure registerUser is defined
router.post("/login", loginUser);       // Make sure loginUser is defined
// router.post("/logout", logout);         // Make sure logout is defined

module.exports = router;
