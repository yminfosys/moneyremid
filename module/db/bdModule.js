const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});

var countermodul = mongoose.model('paamotocounter', counterSchema);

const userSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    password:String,
    email:String,
    address:String,
    mobile:String,
    panNo:String,
    adharNo:String,
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date}
});
var usermodul = mongoose.model('paamotouser', userSchema);







module.exports={
    counter:countermodul,
    user:usermodul,
    
}