const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});

var countermodul = mongoose.model('ftcounters', counterSchema);

const userSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    userPhoto:String,
    email:String,
    password:String,
    mobile:Number,
    rootID:String,
    city:String,
    country:String,
    state:String,
    address:String,
    postCode:String,
    status:{ type: String, default: "New" },
    regdate: { type: Date, default: Date.now },
    rating:{type:Number, default:0}
});
var usermodul = mongoose.model('ftusers', userSchema);





module.exports={
    counter:countermodul,
    user:usermodul,
    
    
}