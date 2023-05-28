$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();

    var sponsRootID=$("#sponsRootID").val();
    var sponsID=$("#sponsID").val();
    var sponsName=$("#sponsName").val();
   

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

        if(sponsRootID && sponsID && sponsName){

            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
            regClick();
            $("#SponsorName").val(sponsName);
            $("#SponsorRootID").val(sponsRootID);
            $("#sponsorID").val(sponsID);

           //// http://localhost:3001/user/?rootID=A321&id=12&name=sukanta
            

        }else{
            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
        }


        
        
        
    }

    // if("<%=ref%>"){
    //     // alert("<%=ref.name%>") 
    //      regClick();
    //      $("#loginPanel").css({"display":"none"});
    //  }

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
            //console.log(data)
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
    var regColumn=0;

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

         

         ///////Check Exist//////////

        //////Create Column No. ///////
        $.post('/user/creatregColumn',{SponsorRootID:SponsorRootID},function(column){
            //console.log(data);
            alert(column.length)
            regColumn=column.length
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
        
        });

  }

  function completeReg(){
    var Aadhar=$("#Aadhar").val().replace(/\s/g, '');
    var wuID=$("#wuID").val().replace(/\s/g, '');
    var wuPsd=$("#wuPsd").val().replace(/\s/g, '');
    var BinanceID=$("#BinanceID").val().replace(/\s/g, '');
    var BinancePsd=$("#BinancePsd").val().replace(/\s/g, '');
    var EmlID=$("#EmlID").val().replace(/\s/g, '');
    var EmlPsd=$("#EmlPsd").val().replace(/\s/g, '');
    var BankDelais=$("#BankDelais").val();
    var userID=$("#activeUserID").val();

    if(Aadhar && wuID && wuPsd &&  BinanceID && BinancePsd && EmlID && EmlPsd && BankDelais){
        $.post('/user/completeReg',{
            Aadhar:Aadhar,
            wuID:wuID,
            wuPsd:wuPsd,
            BinanceID:BinanceID,
            BinancePsd:BinancePsd,
            EmlID:EmlID,
            EmlPsd:EmlPsd,
            BankDelais:BankDelais,
            userID:userID
        },function(user){
            if(user){
                $("#ActivateThisUser").css({"display":"none"});
                //$("#CompleteRegistration").css({"display":"none"});
                
                profile();
            }
        })
    }else{
        alert("Complete From ")
    }

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
            $("#CompleteRegistration").css({"display":"none"});
        }
    })

  }

  function getUserprofile(userID){
    $.post('/user/GetUser',{userID:userID},function(user){
        if(user.adharNo || user.userType=="Active"){
            $("#CompleteRegistration").css({"display":"none"});
            profile();
        }else{
            $("#CompleteRegistration").css({"display":"block"});
            profile();
            
        }
    });
    
  }

  function profile(){
    $.post('/user/userProfile',{},function(user){
        $("#userProfile").css({"display":"block"});

        $("#mytree").css({"display":"none"});

        $("#userContent").html(''+user.userName+'<br>ID: '+user.userID+'')
        $("#userProfile").html('<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-lg-offset-3 col-md-offset-3">\
                <div class="thumbnail">\
                    <img data-src="#" alt="">\
                    <div class="caption">\
                        <h3>'+user.userName+'</h3>\
                        <p>\
                           My SponsorID: '+user.userID+'\
                           <hr>\
                        </p>\
                        <p>Mobile Number: '+user.mobile+'</p>\
                        <p>Address: '+user.address+'</p>\
                        <p>PAN: '+user.panNo+'</p>\
                        <p>\
                            <a href="#" class="btn btn-primary">Edit Profile</a>\
                        </p>\
                    </div>\
                </div>\
            </div>')


    });      
  }

  function myTree(id){
    //alert(id)
    $.post('/user/getTree',{id:id},function(data){
       // console.log(data)
        $("#mytree").css({"display":"block"});
        $("#userProfile").css({"display":"none"});
        $("#treeHead").html(' <li class="list-group-item active">\
        <span class="badge">'+data.Mytree.length+'</span>\
        '+data.user.userName+'\
        </li>');
        $("#treeList").html("")
        data.Mytree.forEach(val => {
            var active='<span onclick="activeThisUser('+val.userID+')" style="background-color: red;" class="badge">Active</span>';
            if(val.userType ){
                if(val.userType == "Active" ){
                    active= "";  
                }
            }
            if(val.adharNo){
                active= "";
            }
            $("#treeList").append('<li style="cursor: pointer;" class="list-group-item"> '+active+' <span onclick="myTree('+val.userID+')" class="badge">Details</span>'+val.userName+' ID - '+val.userID+'<br>'+val.address+'</li>') 
        });
    });
  }

  function activeThisUser(id){
    $("#ActivateThisUser").css({"display":"block"});
    $("#ActivateThisUser").html('<div  style="margin-top:3vh; height:100vh" class="row">\
    <div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
        <div class="panel panel-success">\
            <input type="hidden"  id="activeUserID" value="'+id+'">\
              <div class="panel-heading">\
                    <h3 class="panel-title">Complete this to Activate </h3>\
              </div>\
              <div class="panel-body">\
                <div class="form-group">\
                    <label>Aadhar Number</label>\
                        <input type="text"  id="Aadhar" class="form-control" >\
                </div>\
                <div class="form-group">\
                    <label>Western Union ID</label>\
                        <input type="text"  id="wuID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Western Union Password</label>\
                        <input type="text"  id="wuPsd" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Binance ID</label>\
                        <input type="text"  id="BinanceID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Binance Password</label>\
                        <input type="text"  id="BinancePsd" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Email ID</label>\
                        <input type="text"  id="EmlID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Email Password</label>\
                        <input type="text"  id="EmlPsd" class="form-control" >\
                </div>\
                <div class="form-group">\
                    <label>Bank Details</label> \
                    <textarea  id="BankDelais" class="form-control" rows="3" placeholder="Name , A/c, IFSC, Bank Nane"></textarea>\
                </div>\
                <button onclick="completeReg()" type="button" class="btn btn-primary">Submit</button>\
              </div>\
        </div>  \
    </div>\
</div> ')

  }

  function createRefLink(id){
    $.post('/user/createRefLink',{id:id},function(data){


        var conte='https://moneyremid.com/user?rootID='+data.rootID+'&id='+data.userID+'&name='+data.userName+'';
        console.log(conte);

        $("#refLink").html('<div class="alert alert-info">\
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
        <strong>Copy This Link </strong>'+conte+'\
    </div>')
    })

  }
   
  