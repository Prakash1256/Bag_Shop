const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken")
const userModel = require("../models/user-model");

module.exports.registerUser = async function(req, res) {
    try {
        let { email, password, fullname } = req.body;
     
       let user = await userModel.findOne({email:email})
       
       if(user) return res.status(401).send("you already have an account , please login");
       
     bcrypt.genSalt(10, function(err , salt){
        bcrypt.hash(password , salt , async function(err , hash){
            if(err){return res.send(err);
            }
            else {
                let user = await userModel.create({
                    email,
                    password : hash,
                    fullname,
                });

      let token =  generateToken(user);
            res.cookie("token" , token);
            res.send("user created succesfully");
                // res.status(201).json(user);
            };
        })
     })

        // Optionally send back the created user
    } catch (err) {
        console.log("error", err); // Log the actual error
        res.status(500).send("Internal Server Error"); // Send an error response
    }
}




// module.exports.loginUser = async function(req, res){
//     let{email , password} = req.body;

//     let user = await userModel.findOne({email:email});

//     if(!user) return res.send("Email or Password incorrect");
   
//     bcrypt.compare(password , user.password , function(err, res){
//         res.send(result);
//     })
// }






module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).send("Email or Password incorrect");

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Email or Password incorrect");

        // Passwords match, generate token and log in user
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });

        // Redirect to /shop after successful login
        const redirectTo = req.session.redirectTo || "/shop";
        delete req.session.redirectTo; // Clear redirectTo from session
        res.redirect(redirectTo);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
};