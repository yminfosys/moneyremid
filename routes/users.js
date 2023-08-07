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
    if(req.query.refrootID && req.query.refname && req.query.refid){
     var sponsRootID =req.query.refrootID;
     var sponsID= req.query.refid
     var sponsName =req.query.refname
     //console.log("Fro Ref-Register",sponsRootID)
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
    ///console.log(user);
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


var payment = async function(inp){
  let day
  
    switch (inp) {
    
      case 1:
        day = 800;
        break;
      case 2:
        day = 400;
        break;
      case 3:
        day = 250;
        break;
      case 4:
        day = 150;
        break;
      case 5:
        day = 100;
        break;
      case 6:
        day = 75;
        break;
      case 7:
        day = 50;
        break;
      case 8:
        day = 30;
        break;
      case 9:
        day = 25;
        break;
      case 10:
        day = 20;
        break;
      case 11:
        day = 1;

        break;
      case 12:
        day = 1;

        break;
      case 13:
        day = 1;


        break;
      case 14:
        day = 1;

        break;
      case 15:
        day = 1;

        break;
      case 16:
        day = 0.5;

        break;
      case 17:
        day = 0.5;

        break;
      case 18:
        day = 0.5;


        break;
      case 19:
        day = 0.5;

        break;
      case 20:
        day = 0.5;
        
        
    }
    return day;
  
  
}




router.post('/newPartner', async function(req, res, next) {
  try{
  await  auto_incriment.auto_incriment("userID").then(async function(inc_val){

var loop=req.body.channelRoot; //// B-5-1-1


var counter=loop.length;
var L=0;
for(i=0; i < counter -1;) {
  L++;
    i=i+2;
    var newRoot=counter-i;
//console.log(i);
//console.log(loop.substring(0,newRoot));
//console.log("L",L);
const payme= await payment(L);
//console.log(payme );

/////// Lavel input//////   
await dbCon.connectDB();
///const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{panNo:req.body.regPan},{email:req.body.regEmail}]});
const Lavel= await db.lavelLedger.findOne({rootID:loop.substring(0,newRoot),lavelrootID:loop,lavel:L});
if(!Lavel){
  const newlavel= await db.lavelLedger({
            userName:req.body.regUserName,
            userID:inc_val,
            rootID:loop.substring(0,newRoot),
            lavelrootID:loop,
            address:req.body.regAddress,
            lavel:L,
            lavelEarning:payme,
            paidEarninyStatus:"Due",
          })
          await newlavel.save();
        }
await dbCon.closeDB();
};

/////// add new user///////
  bcrypt.hash(req.body.regPassword, saltRounds, async function(err, hash) {
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
      
})


  })

  } catch (error) {
    console.log(error);
    return error;
  }
//   try {
//   bcrypt.hash(req.body.regPassword, saltRounds, function(err, hash) {
//     auto_incriment.auto_incriment("userID").then(async function(inc_val){
//         await dbCon.connectDB()
//         const user= await db.user({
//         userName:req.body.regUserName,
//         userID:inc_val,
//         rootID:req.body.channelRoot,
//         password:hash,
//         email:req.body.regEmail,
//         address:req.body.regAddress,
//         mobile:req.body.regMobile,
//         panNo:req.body.regPan
//       })
//       await user.save();
//       await dbCon.closeDB();
//       res.json(user)
//       //console.log(req.body)
      

//       })
// })
  
// } catch (error) {
//   console.log(error);
//   return error;
// }

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

////////Update Bank/////////////
router.post('/editBank', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({userID:req.body.id},{$set:{
      bankName:req.body.bankName,
      bankAccount:req.body.bankAccount,
      bankIfsc:req.body.bankIfsc,
      bnakBranch:req.body.bankbranch,
    }});
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
})


////////ADD Member/////////

router.post('/addMember', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
})


////////Get Tree info/////////////
router.post('/getTree', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    // const Mytree=await db.user.find({rootID: { $regex: '.*' + user.rootID + '.*' , $options: 'i' } } );
    const Mytree=await db.lavelLedger.find({rootID:user.rootID,lavel:req.body.lavel } );
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
});



//////// Get Trade Request/////////////
router.post('/getTradeRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const trade= await db.selfTrade .find({userID:req.body.id,tradeStatus:"Request"});
   
    await dbCon.closeDB();
    
   // console.log("My Tree",Mytree)
    res.send(trade)
  }catch (error) {
    console.log(error);
    return error;
  }
})

//////// New Trade Request/////////////
router.post('/tradeRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    const selfTrade= await db.selfTrade({
      tradeAmount:req.body.inr,
      usdtbuy:req.body.usdt,
      rootID:user.rootID,
      userID:user.userID,
      userName:user.userName,
      tradeStatus:"Request",
    })
    await selfTrade.save();
    await dbCon.closeDB();
    
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
})





module.exports = router;
