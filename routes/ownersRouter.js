const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("hey it is working");
});

// Check for the environment and handle the route accordingly
if (process.env.MY_CUSTOM_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      // Check if any owners exist
      let owners = await ownerModel.find();

      if (owners.length > 0) {
        return res
          .status(403) // Changed to 403 Forbidden for clarity
          .send("You don't have permission to create a new owner");
      }

      // Destructure request body
      let { fullname, email, password } = req.body;

      // Create a new owner
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      // Respond with the created owner
      res.status(201).send(createdOwner); 
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error("Error creating owner:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = router;
