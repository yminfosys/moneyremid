$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
    if(allredyloginuserID){
        $("#loginPanel").css({"display":"none"});
    }else{
        $("#loginPanel").css({"display":"block"});
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
  
   
