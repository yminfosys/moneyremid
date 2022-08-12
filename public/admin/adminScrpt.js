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