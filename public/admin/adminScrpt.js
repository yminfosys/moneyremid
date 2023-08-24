function newChannelInit(){
    $("#newChannel").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">Register New Partner Channel</h3>\
          </div>\
          <div class="panel-body">\
                <div class="form-group">\
                    <label>Username</label>\
                        <input type="text"  id="regEmail" class="form-control" placeholder="Email ie hkdhkfhs@gmail.com">\
                </div>\
                <div class="form-group">\
                    <label>Password</label>\
                        <input type="password"  id="regPassword" class="form-control" placeholder="6 to 18 Chracter">\
                </div>\
                <div class="form-group">\
                    <label>Full Name</label>\
                        <input type="text"  id="regUserName" class="form-control" placeholder="ei: Sushanta Majumder">\
                </div>\
                <div class="form-group">\
                    <label>Address</label>\
                       <textarea id="regAddress" class="form-control" rows="3" ></textarea>\
                </div>\
                <div class="form-group">\
                    <label>Mobile Number</label>\
                        <input type="number"  id="regMobile" class="form-control" placeholder=" 10 Digit Number">\
                </div>\
                <div class="form-group">\
                                <label>Pan Number</label>\
                                    <input type="text"  id="regPan" class="form-control">\
                            </div>\
                <div class="form-group">\
                    <label>Channel</label>\
                        <select id="channelRoot" class="form-control" required="required">\
                            <option value="">Select Channel</option>\
                            <option value="A">A</option>\
                            <option value="B">B</option>\
                            <option value="C">C</option>\
                            <option value="D">D</option>\
                            <option value="E">E</option>\
                            <option value="F">F</option>\
                            <option value="G">G</option>\
                            <option value="H">H</option>\
                            <option value="I">I</option>\
                            <option value="J">J</option>\
                            <option value="K">K</option>\
                            <option value="L">L</option>\
                            <option value="M">M</option>\
                            <option value="N">N</option>\
                        </select>\
                </div>\
                <button onclick="createNewChannel()" type="button" class="btn btn-primary">Register</button>\
          </div>\
    </div>\
</div>')
}

function createNewChannel(){
    var regEmail=$("#regEmail").val().replace(/\s/g, '');
    var regPassword=$("#regPassword").val();
    var regUserName=$("#regUserName").val();
    var regAddress=$("#regAddress").val();
    var regMobile=$("#regMobile").val();
    var channelRoot=$("#channelRoot").val();
    var regPan=$("#regPan").val().toUpperCase().replace(/\s/g, '');

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

      if (reg.test(regEmail) == false) 
          {
              alert('Invalid Email Address');
              $("#regEmail").focus();
              return 
          }
          if(regPassword.length < 6){
            alert('Password Must be 6 to 18 charecter');
            $("#regPassword").focus()
            return
        } 

           if(regUserName.length < 2){
            alert('Enter Valid Name');
            $("#regUserName").focus()
            return
           }
         

         if(regMobile.length != 10){
            alert('Enter Valid Mobile Number');
            $("#regMobile").focus()
            return
         }
         if(regPan.length != 10){
            alert('Enter Valid PAN Number');
            $("#regPan").focus()
            return
         }
         if(!channelRoot.length){
            alert('Select Root Channel');
            $("#channelRoot").focus()
            return
         }

         ///////Check Exist//////////

         $.post('/admin/checkuserexist',{channelRoot:channelRoot,regPan:regPan,regEmail:regEmail},function(data){
           if(!data){
            /////////Save New Partner//////
            $.post('/admin/newPartner',{
                regEmail:regEmail,
                regPassword:regPassword,
                regUserName:regUserName,
                regAddress:regAddress,
                regMobile:regMobile,
                channelRoot:channelRoot,
                regPan:regPan
            },function(reg){
                alert("Registration  Success")
            })

           }else{
            alert("Already Register With Us")
           }
         })


}

function userDetails(){
    $.post('/admin/userDetails',{},function(user){
        if(user.length > 0){
            $("#allUser").css({"display":"block"})
            $("#allUser").html('<div  class="col-xs-12 col-sm-12">\
                <div class="panel panel-success">\
                    <div id="userListHeding" class="panel-heading">\
                    </div>\
                    <div class="panel-body">\
                        <ul id="userList" class="list-group">\
                        </ul>\
                    </div>\
                </div>\
            </div>');
            $("#userListHeding").html('<h3 class="panel-title">All User  ['+user.length+']</h3>')
            $("#userList").html("")
            user.forEach(val=> {
                $("#userList").append('<li class="list-group-item">\
                userName:'+val.userName+'<br>\
                userID:'+val.userID+'<br>\
                rootID:'+val.rootID+'<br>\
                password:'+val.password+'<br>\
                email:'+val.email+'<br>\
                address:'+val.address+'<br>\
                mobile:'+val.mobile+'<br>\
                panNo:'+val.panNo+'<br>\
                adharNo:'+val.adharNo+'<br>\
                westrenUnionUser:'+val.westrenUnionUser+'<br>\
                westrenUnionPass:'+val.westrenUnionPass+'<br>\
                BinanceUser:'+val.BinanceUser+'<br>\
                BinancePass:'+val.BinancePass+'<br>\
                EmlID:'+val.EmlID+'<br>\
                EmlPsd:'+val.EmlPsd+'<br>\
                BankDelais:'+val.BankDelais+'<br>\
                regdate: '+val.regdate+'\
            </li>');
            });
        }
    })

}


function setStartUserid(){
    var id=window.prompt();
    if(id){
         $.post('/admin/SetUserID',{id:id},function(data){
                if(data){
                    alert("Set Start User ID UserID to"+ data);
                }
            })
    }
   
    
}
function forgetpasswordInit(){
    $("#forgetpassword").css({"display":"block"});
    $("#forgetpassword").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-danger">\
        <div class="panel-heading">\
                <h3 class="panel-title">Forget Password List</h3>\
        </div>\
        <div class="panel-body">\
              <ul class="list-group" id="forgetList">\
              </ul>\
        </div>\
    </div>')
    $.post('/admin/forgetpasswordlist',{},function(fgpwlist){
        if(fgpwlist.length >0 ){
            fgpwlist.forEach(val => {
                $("#forgetList").append('\
            <li class="list-group-item">\
            <span onclick="setNewPassword(\'' +val.userID + '\',\'' + val.newPassword + '\')" class="badge">Resolve</span>\
            <span onclick="setNewPasswordCancel(\'' +val.userID + '\',\'' + val.newPassword + '\')" class="badge">Cancel</span>\
            <p>Name: '+val.userName+' <br>Mobile: '+val.mobile+' \
            <br>User-ID :'+val.userID+' Root-ID:'+val.rootID+' <br>Email : '+val.email+'</p>\
            </li>')  
            });
          
        }
    })

}

function setNewPassword(userID,newPassword){
$.post('/admin/setNewPassword',{userID:userID,newPassword:newPassword},function(data){
    forgetpasswordInit();
})
}

function setNewPasswordCancel(userID,newPassword){
    $.post('/admin/setNewPasswordCalcel',{userID:userID},function(data){
        forgetpasswordInit();
    })
}


function paymentInit(){
    $("#allUser").css({"display":"block"});
    $("#allUser").html('');
    $("#allUser").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-danger">\
        <div class="panel-heading">\
                <h3 class="panel-title">Candidate Payment</h3>\
        </div>\
        <div class="panel-body">\
            <div class="form-group" id="searchCandidate">\
                <div class="col-xs-2">\
                   <span style="float: right;">MR-</span> \
                </div>\
                <div class="col-xs-6">\
                   <input  style="float: left;" type="text" class="form-control" id="canUserID">\
                </div>\
                <div class="col-xs-4">\
                    <button onclick="searchID()" class="btn btn-primary">Search</button>\
                </div>\
            </div>\
    </div>\
</div>')
}

function searchID(){
    var userID=$("#canUserID").val().replace(/\s/g, '');
    $("#searchCandidate").html('');
    $.post('/admin/paymentSearchID',{userID:userID},function(res){
        console.log(res);
        $("#searchCandidate").html('<h3 class="panel-title">Candidate Details</h3>\
        <p>Name: '+res.user.userName+'<br>ID: '+res.user.userID+'<br>RootID: '+res.user.rootID+'</p>\
        <p>Bank Name: '+res.user.bankName+' <br>Account no: '+res.user.bankAccount+' <br>IFSC Code: '+res.user.bankIfsc+'<br>Branch:'+res.user.bnakBranch+'</p>\
        <h3 class="panel-title"> Root Level Payment ['+res.lavel.length+']</h3>\
        <ul style="overflow-y: auto; height: 50vh; margin-top: 10px;" class="list-group" id="rootLavelList">\
        </ul>');
        if(res.lavel.length > 0){
            res.lavel.forEach(val => {
                var cstClass="list-group-item-success";
                if(val.paidEarninyStatus=="Due"){
                    cstClass= "list-group-item-info";
                }
              $("#rootLavelList").append('<li class="list-group-item '+cstClass+'">\
              <span id="'+val.rootID+'show" onclick="showpaymentDetails(\''+val.rootID+'\',\''+val.lavelrootID+'\',\''+val.lavel+'\')" id="payBtn'+val.rootID+'" class="badge" style="color: red; padding: 10px; font-size: medium;">Details</span>\
              RootID: '+val.rootID+'  [ L-'+val.lavel+' ]\
              <p>Rs. '+val.lavelEarning+'</p>\
              <div id="payment-detals-'+val.rootID+'">\
              </div>\
              </li>'); 
            });
        }

    })
}

function showpaymentDetails(rootID,lavelrootID,lavel){
$.post('/admin/paymentrootIDdetails',{rootID:rootID},function(user){
console.log(user)
    $("#payment-detals-"+rootID+"").html('<p>Payment Details</p>\
    <p>Name: '+user.userName+'<br>ID: '+user.userID+'<br>Mobile:'+user.mobile+'\
    <p>Bank Name: '+user.bankName+' <br>Account no: '+user.bankAccount+' <br>IFSC Code: '+user.bankIfsc+'<br>Branch: '+user.bnakBranch+'</p>\
    <button id="'+rootID+'" onclick="markaspaid(\''+rootID+'\',\''+lavelrootID+'\',\''+lavel+'\')" type="button" class="btn btn-sm btn-primary">Mark As Paid</button>')
})
}

function markaspaid(rootID,lavelrootID,lavel){
    
    //
    $.post('/admin/markaspaid',{rootID:rootID, lavelrootID:lavelrootID,lavel:lavel},function(user){
        alert("Payment Status Updated Successfully") 
        $("#"+rootID+"").attr("disabled", true);
    })

}


{/* <h3 class="panel-title">Candidate Details</h3>\
            <p>Name: Sukanta Sardar<br>ID: MR-5234<br>RootID: A-1-4-5-6-1-2-7</p>\
            <p>Bank Name: <br>Account no: <br>IFSC Code: <br>Branch:</p>\
            <h3 class="panel-title"> Root Level Payment [5]</h3>\
            <ul style="overflow-y: auto; height: 50vh; margin-top: 10px;" class="list-group">\
                <li class="list-group-item">\
                    <span onclick="showpaymentDetails(5121)" id="payBtnid5121" class="badge" style="color: red; padding: 10px; font-size: medium;">Pay</span>\
                    Name: Sukanta Sardar  [ L1 ]<br>ID: <br>Mobile:\
                    <p>Rs. 800.00</p>\
                    <div id="payment-detals-5212">\
                        <p>Payment Details</p>\
                        <p>Bank Name: <br>Account no: <br>IFSC Code: <br>Branch:</p>\
                        <button onclick="markaspaid(5121)" type="button" class="btn btn-sm btn-primary">Mark As Paid</button>\
                    </div>\
                </li>\
            </ul>\
        </div>\ */}

// function replaseidInit(){
//     $("#replaceID").css({"display":"block"})
    
// }

// function getoldIDDetails(){
//     var oldID=$("#oldID").val().replace(/\s/g, '');
    
//     $.post('/admin/oldUserDetails',{id:oldID},function(user){
//         console.log(user)
//         if(user){
//             $("#replaceID").html('<label for="inputOLD ID" class="col-sm-2 control-label">Name:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="nameReplace" class="form-control" value="'+user.userName+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">email:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="emailReplace" class="form-control" value="'+user.email+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Mobile:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="mobileReplace" class="form-control" value="'+user.mobile+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Pan No:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="panReplace" class="form-control" value="'+user.panNo+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Address:</label>\
//             <div class="col-sm-10">\
//                 <textarea  id="addressReplace" class="form-control" rows="3">'+user.address+'</textarea>\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">User ID:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="userIDReplace" class="form-control" value="'+user.userID+'">\
//             </div>\
//             <div class="col-sm-10 col-sm-offset-2" style="margin-top: 5px;">\
//                 <button onclick="oldtonewReplace()" type="button" class="btn btn-primary form-control">Replace</button>\
//             </div>')

//         }else{

//         }

//     });
   

// }

// function oldtonewReplace(){
//     var emailReplace=$("#emailReplace").val().replace(/\s/g, '');
//     var nameReplace=$("#nameReplace").val();
//     var addressReplace=$("#addressReplace").val();
//     var mobileReplace=$("#mobileReplace").val().replace(/\s/g, '');
//     var userIDReplace=$("#userIDReplace").val().replace(/\s/g, '');
//     var panReplace=$("#panReplace").val().toUpperCase().replace(/\s/g, '');

//     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

//       if (reg.test(emailReplace) == false) 
//           {
//               alert('Invalid Email Address');
//               $("#emailReplace").focus();
//               return 
//           }
          

//            if(nameReplace.length < 2){
//             alert('Enter Valid Name');
//             $("#nameReplace").focus()
//             return
//            }
         

//          if(mobileReplace.length != 10){
//             alert('Enter Valid Mobile Number');
//             $("#mobileReplace").focus()
//             return
//          }
//          if(panReplace.length != 10){
//             alert('Enter Valid PAN Number');
//             $("#panReplace").focus()
//             return
//          }
         

//          $.post('/admin/updateUser',{
//             emailReplace:emailReplace,
//             nameReplace:nameReplace,
//             addressReplace:addressReplace,
//             mobileReplace:mobileReplace,
//             userIDReplace:userIDReplace,
//             panReplace:panReplace
//          },function(user){
//             console.log(user)
//             if(user){
//                 alert("update Success")
//             }else{
//                 alert("error")
//             }

//          })


// }