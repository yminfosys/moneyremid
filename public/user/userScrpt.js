$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
    if(allredyloginuserID){

        $("#UserPanel").css({"display":"block"});
        $("#UserPanel").css({"display":"block"});
        $("#dashHome").css({"display":"block"});
        $("#logout").css({"display":"block"});

        $("#loginPanel").css({"display":"none"});
        $("#login").css({"display":"none"});
        $("#regit").css({"display":"none"});

        getUserprofile(allredyloginuserID);
    }else{
        $("#loginPanel").css({"display":"block"});
        $("#login").css({"display":"block"});
        $("#regit").css({"display":"block"});

        $("#logout").css({"display":"none"});
        $("#logout").css({"display":"none"});
        $("#dashHome").css({"display":"none"});
        $("#UserPanel").css({"display":"none"});
        
        
    }

})

function loginClick(){
    $("#loginPanel").css({"display":"block"});
    $("#RegistrationPanel").css({"display":"none"});
}

function regClick(){
    $("#RegistrationPanel").css({"display":"block"});
    $("#loginPanel").css({"display":"none"});
}

var timerr
function searchdown(){
    clearTimeout(timerr);
  }
  function searchup(){
    clearTimeout(timerr);
    timerr=setTimeout(function(){
        var sponsorID=$("#sponsorID").val().trim();
        $("#SponsorName").val("")
        $("#SponsorRootID").val("")
        $.post('/user/checkSponsor',{sponsorID:sponsorID},function(data){
           if(data){
            console.log(data)
            $("#SponsorName").val(data.userName);
            $("#SponsorRootID").val(data.rootID);

           }else{
            alert("Sponsor ID not Match");
           }
        });
    },1000);
  }


  function newPetnerRegister(){
    var regEmail=$("#regEmail").val().replace(/\s/g, '');
    var regPassword=$("#regPassword").val().trim();
    var regUserName=$("#regUserName").val().trim();
    var regAddress=$("#regAddress").val().trim();
    var regMobile=$("#regMobile").val().trim();
    var SponsorRootID=$("#SponsorRootID").val();
    var regPan=$("#regPan").val().toUpperCase().replace(/\s/g, '');
    var regColumn=$("#regColumn").val();

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
         if(!SponsorRootID.length){
            alert('Sponsor Name And root Required');
            return
         }

         if(!regColumn.length){
            alert('Select Channel Column');
            return
         }

         ///////Check Exist//////////
                
                ////Create Root//////
         var channelRoot=''+SponsorRootID+''+regColumn+'';


         $.post('/user/checkuserexist',{channelRoot:channelRoot,regPan:regPan,regEmail:regEmail},function(data){
           if(!data){
            /////////Save New Partner//////
            $.post('/user/newPartner',{
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
  


  function loginProcess(){
    var loginEmail=$("#loginEmail").val().replace(/\s/g, '');
    var loginPassword=$("#loginPassword").val().trim();
   

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

      if (reg.test(loginEmail) == false) 
          {
              alert('Invalid Email Address');
              $("#loginEmail").focus();
              return 
          }
          if(loginPassword < 6){
            alert('Password Must be 6 to 18 charecter');
            $("#loginPassword").focus()
            return
        } 

        $.post('/user/loginUser',{loginPassword:loginPassword,loginEmail:loginEmail},function(user){
            if(user){
                $("#UserPanel").css({"display":"block"});
                $("#UserPanel").css({"display":"block"});
                $("#dashHome").css({"display":"block"});
                $("#logout").css({"display":"block"});

                $("#loginPanel").css({"display":"none"});
                $("#login").css({"display":"none"});
                $("#regit").css({"display":"none"});

                getUserprofile(user.userID);
            }else{
                alert("Worng Credential")
            }
        })

  }

  function logout(){
    $.post('/user/logout',{},function(data){
        if(data){
            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
        }
    })

  }

  function getUserprofile(userID){
    console.log(userID)
    profile();
  }

  function profile(){
    
                $("#UserPanel").html('<div  id="sidebar-waper">\
                <div class="togle-btn" onclick="sidebartoggle()">\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                </div>\
                <ul class="sidebar-menue">\
                <li onclick="profile()" class="Dashboard" style="border-bottom: 1px solid #FFF;">\
                    <div style="font-size: 25px; text-align: center;"><i class="fa fa-user-circle" aria-hidden="true"></i></div>\
                    <div id="userContent" class="text-center">Sukanta Sardar<br>ID: 001</div>\
                </li>\
                <li class="Recharge">\
                <a href="#RechargeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">\
                    <i class="fa fa-cubes" aria-hidden="true"></i>\
                    <span>My Network</span>\
                </a>\
                <ul class="collapse " id="RechargeSubmenu">\
                    <li ><a href="#">NetWork Flow </a></li>\
                    <li><a href="#">Break Info</a></li>\
                    </ul>\
                </li>\
                <li  class="Myrides">\
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">\
                        <i class="fa fa-money" aria-hidden="true"></i>\
                        <span>Payment</span>\
                    </a>\
                </li>\
                <li   class="Myrides">\
                    <a href="#" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">\
                        <i class="fa fa-taxi" aria-hidden="true"></i>\
                        <span>Ledger</span>\
                    </a>\
                </li>\
                <li class="freekm"><a href="#">\
                    <i class="fa fa-gift" aria-hidden="true"></i>\
                    <span>Transaction Details</span>\
                    </a>\
                </li>\
                <li class="Notification"><a href="#">\
                    <i class="fa fa-bell" aria-hidden="true"></i>\
                    <span>Notification</span>\
                    </a>\
                </li>\
                <li  class="Notification"><a href="#">\
                    <i class="fa fa-cog" aria-hidden="true"></i>\
                    <span>Support</span>\
                    </a>\
                </li>\
                <li onclick="logout()" class="Logout">\
                    <a href="#">\
                        <i class="fa fa-sign-out" aria-hidden="true"></i>\
                        <span> Logout</span>\
                        </a>\
                </li>\
                </ul>\
            </div>\
            <div id="main-content">\
                <div class="col-xs-6 col-sm-6 col-xs-offset-3 col-sm-offset-3">\
                    <div class="thumbnail">\
                        <img data-src="#" alt="">\
                        <div class="caption">\
                            <h3>Sukanta Sardar</h3>\
                            <p>\
                            My SponsorID: 001\
                            <hr>\
                            </p>\
                            <p>Mobile Number: 8509239522</p>\
                            <p>Address: Oxford Square</p>\
                            <p>PAN: CHCPS6939R</p>\
                            <p>\
                                <a href="#" class="btn btn-primary">Edit Profile</a>\
                            </p>\
                        </div>\
                    </div>\
                </div>\
            </div>')
  }
   
