const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bag_shop").then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log("error");
})


module.exports = mongoose.connection;