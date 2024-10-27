const mongoose = require("mongoose");

const db = require("debug")("development:mongoose");
const config = require("config");


mongoose.connect(`${config.get("MONGODB_URI")}/bag_shop`).then(function(){
    db("connected");
})
.catch(function(err){
    db("error");
})


module.exports = mongoose.connection;