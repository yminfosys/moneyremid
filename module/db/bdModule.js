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
    bankName:String,
    bankAccount:String,
    bankIfsc:String,
    bnakBranch:String,
    userType:String,
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date}
});



var usermodul = mongoose.model('moneyusers', userSchema);

const adminSchema = new mongoose.Schema({ 
    userID:Number,
    password:String,
    address:String,
    mobile:String,
    type:String,
    status:String,
});

var adminmodul = mongoose.model('moneyadmins', adminSchema);

const forgetPasswordSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    email:String,
    mobile:String,
    newPassword:String,
    status:String,
    daterequest: { type: Date, default: Date.now }
});
var forgetPasswordmodul = mongoose.model('moneyforgetpasswords', forgetPasswordSchema);



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


const userLavelLedgerSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    lavelrootID:String,
    address:String,
    lavel:String,
    lavelEarning:String,
    paidEarninyStatus:String,
    paymentScrnSort:String,
    paydate: { type: Date }
});
var userLavelLedgermodul = mongoose.model('moneyuserlavelledger', userLavelLedgerSchema);


const selfTradeSchema = new mongoose.Schema({ 
    tradeAmount:String,
    usdtbuy:String,
    saletradeamount:String,
    profitAmount:String,
    rootID:String,
    userID:Number,
    userName:String,
    tradeStatus:String,

    transactiondate: { type: Date, default: Date.now }
});
var selfTrademodul = mongoose.model('moneyselftrade', selfTradeSchema);


const totayUSDTSchema = new mongoose.Schema({ 
    todayusdt:String
});
var totayUSDTmodul = mongoose.model('moneytotayusdt', totayUSDTSchema);



module.exports={
    counter:countermodul,
    user:usermodul,
    lavelLedger:userLavelLedgermodul,
    transfer:transfermodul,
    selfTrade:selfTrademodul,
    forgetPasswor:forgetPasswordmodul,
    admin:adminmodul
}