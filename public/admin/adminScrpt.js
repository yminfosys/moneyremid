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

function replaseidInit(){
    $("#replaceID").css({"display":"block"})
    
}

function getoldIDDetails(){
    var oldID=$("#oldID").val().replace(/\s/g, '');
    
    $.post('/admin/oldUserDetails',{id:oldID},function(user){
        console.log(user)
        if(user){
            $("#replaceID").html('<label for="inputOLD ID" class="col-sm-2 control-label">Name:</label>\
            <div class="col-sm-10">\
                <input type="text" id="nameReplace" class="form-control" value="'+user.userName+'">\
            </div>\
            <label for="inputOLD ID" class="col-sm-2 control-label">email:</label>\
            <div class="col-sm-10">\
                <input type="text" id="emailReplace" class="form-control" value="'+user.email+'">\
            </div>\
            <label for="inputOLD ID" class="col-sm-2 control-label">Mobile:</label>\
            <div class="col-sm-10">\
                <input type="text" id="mobileReplace" class="form-control" value="'+user.mobile+'">\
            </div>\
            <label for="inputOLD ID" class="col-sm-2 control-label">Pan No:</label>\
            <div class="col-sm-10">\
                <input type="text" id="panReplace" class="form-control" value="'+user.panNo+'">\
            </div>\
            <label for="inputOLD ID" class="col-sm-2 control-label">Address:</label>\
            <div class="col-sm-10">\
                <textarea  id="addressReplace" class="form-control" rows="3">'+user.address+'</textarea>\
            </div>\
            <label for="inputOLD ID" class="col-sm-2 control-label">User ID:</label>\
            <div class="col-sm-10">\
                <input type="text" id="userIDReplace" class="form-control" value="'+user.userID+'">\
            </div>\
            <div class="col-sm-10 col-sm-offset-2" style="margin-top: 5px;">\
                <button onclick="oldtonewReplace()" type="button" class="btn btn-primary form-control">Replace</button>\
            </div>')

        }else{

        }

    });
   

}

function oldtonewReplace(){
    var emailReplace=$("#emailReplace").val().replace(/\s/g, '');
    var nameReplace=$("#nameReplace").val();
    var addressReplace=$("#addressReplace").val();
    var mobileReplace=$("#mobileReplace").val().replace(/\s/g, '');
    var userIDReplace=$("#userIDReplace").val().replace(/\s/g, '');
    var panReplace=$("#panReplace").val().toUpperCase().replace(/\s/g, '');

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

      if (reg.test(emailReplace) == false) 
          {
              alert('Invalid Email Address');
              $("#emailReplace").focus();
              return 
          }
          

           if(nameReplace.length < 2){
            alert('Enter Valid Name');
            $("#nameReplace").focus()
            return
           }
         

         if(mobileReplace.length != 10){
            alert('Enter Valid Mobile Number');
            $("#mobileReplace").focus()
            return
         }
         if(panReplace.length != 10){
            alert('Enter Valid PAN Number');
            $("#panReplace").focus()
            return
         }
         

         $.post('/admin/updateUser',{
            emailReplace:emailReplace,
            nameReplace:nameReplace,
            addressReplace:addressReplace,
            mobileReplace:mobileReplace,
            userIDReplace:userIDReplace,
            panReplace:panReplace
         },function(user){
            console.log(user)
            if(user){
                alert("update Success")
            }else{
                alert("error")
            }

         })


}