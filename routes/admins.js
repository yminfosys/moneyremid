var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var dotenv=require('dotenv').config();

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
  
  auto_incriment.auto_incriment("userID").then(async function(inc_val){
    await dbCon.connectDB()
    const user= await db.user({
    userName:req.body.regUserName,
    userID:inc_val,
    rootID:req.body.channelRoot,
    password:req.body.regPassword,
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
  
} catch (error) {
  console.log(error);
  return error;
}

})


module.exports = router;
