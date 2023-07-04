var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var dotenv=require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/myadmin', { title: 'Express' });
});







router.post('/checkuserexist', async function(req, res, next) {
  try {
  await dbCon.connectDB()

  const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{panNo:req.body.regPan},{email:req.body.regEmail}]})

  await dbCon.closeDB();
  //console.log("check done")
  res.json(user)
} catch (error) {
  console.log(error);
  return error;
}

})

router.post('/newPartner', async function(req, res, next) {
  try {
  bcrypt.hash(req.body.regPassword, saltRounds, function(err, hash) {
    auto_incriment.auto_incriment("userID").then(async function(inc_val){
        await dbCon.connectDB()
        const user= await db.user({
        userName:req.body.regUserName,
        userID:inc_val,
        rootID:req.body.channelRoot,
        password:hash,
        email:req.body.regEmail,
        address:req.body.regAddress,
        mobile:req.body.regMobile,
        panNo:req.body.regPan
      })
      await user.save();
      res.json(user)
      //console.log(req.body)
      await dbCon.closeDB();
    })
});
  
} catch (error) {
  console.log(error);
  return error;
}

})




router.post('/userDetails', async function(req, res, next) {
  try {
    await dbCon.connectDB();
  const user= await db.user.find();
  await dbCon.closeDB();
  res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/SetUserID', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
  const user= await db.counter.findOneAndUpdate({fild :"userID"},{$set:{ value: req.body.id}});
  console.log(user)
  await dbCon.closeDB();
  res.send(req.body.id);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.get('/resetpassword', async function(req, res, next) {
  
  bcrypt.hash(req.query.paw, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({mobile:req.query.mobile},{$set:{password:hash}});
    await dbCon.closeDB();

    if(user){
      var dd=JSON.stringify(user)
      res.send("success"+dd)
    }else{
      res.send("error")
    }

  })
  
  
})


router.post('/oldUserDetails', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id})
  
  await dbCon.closeDB();
  res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/updateUser', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({userID:req.body.userIDReplace},{$set:{
      userName:req.body.nameReplace,
      email:req.body.emailReplace,
      address:req.body.addressReplace,
      mobile:req.body.mobileReplace,
      panNo:req.body.panReplace
    }});
  
  await dbCon.closeDB();
  res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





// const user= await db.user.findOneAndUpdate({userID:req.body.userID},{$set:{
//   adharNo:req.body.Aadhar,
//   westrenUnionUser:req.body.wuID,
//   westrenUnionPass:req.body.wuPsd,
//   BinanceUser:req.body.BinanceID,
//   BinancePass:req.body.BinancePsd,
//   EmlID:req.body.EmlID,
//   EmlPsd:req.body.EmlPsd,
//   BankDelais:req.body.BankDelais
// }});


module.exports = router;
