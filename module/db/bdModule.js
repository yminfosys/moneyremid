const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});

var countermodul = mongoose.model('moneycounter', counterSchema);

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
    westrenUnionUser:String,
    westrenUnionPass:String,
    BinanceUser:String,
    BinancePass:String,
    EmlID:String,
    EmlPsd:String,
    BankDelais:String,
    userType:String,
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date}
});
var usermodul = mongoose.model('moneyusers', userSchema);

const transferSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    transferAmount:Number,
    transactionID:Number,
    totaltranferAmount:Number,
    transactiondate: { type: Date, default: Date.now }
});
var transfermodul = mongoose.model('moneytransfer', transferSchema);


const userLedgerSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    incentiveAmount:Number,
    paymentAmount:Number,
    transactiondate: { type: Date, default: Date.now }
});
var userLedgermodul = mongoose.model('moneyuserledger', userLedgerSchema);








module.exports={
    counter:countermodul,
    user:usermodul,
    userLedger:userLedgermodul,
    transfer:transfermodul,
}