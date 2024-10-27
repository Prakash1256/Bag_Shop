const express = require("express");
 // Keep this declaration
const router = express.Router(); // Keep this line
const { registerUser, loginUser } = require("../controllers/authController");

router.get("/", function(req, res) {
    res.send("hey it is working");
});

router.post("/register", registerUser );

router.post("/login" , loginUser);

module.exports = router;
