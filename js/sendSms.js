function sendSms() {

    bootstrap_alert = function () { }
    bootstrap_alert.warning = function (message) {
      $('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>'+ message +'</span></div>')
    }
  
    $('#clickme').on('click', function () {
     
    });
  
    var sender = document.getElementById("name").value;
    // var senderNumber = document.getElementById("senderNumber").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var phoneNumber = document.getElementById("phone").value;
    var subject = document.getElementById("subject").value;
  
    if (phoneNumber == null) {
      phoneNumber = "Not available";
    }
  
    var finalMessage = "Hi this is " + sender + ", My email Id is: " + email + ", Query: " + message + ", Phone Number: " + phoneNumber;
    var finalEmail = "Hi this is " + sender + ", Query: " + message + ", Phone Number: " + phoneNumber;
  
    function displaySuccessMessage(){
      // alert("Email sent successfully");
      bootstrap_alert.warning('Email Sent successfully');
    }
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.fast2sms.com/dev/bulk?authorization=Ql4F9ruTKWmcPONnEY1CVqsDfpIvk7XMRUAG2i6otZyzjaH05BkRvUPgVcWmpsAM097FCB2LytGr1lNI&sender_id=FSTSMS&message=" + finalMessage + "&language=english&route=p&numbers=9049696198,8421878407",
      "method": "GET",
    }
    $.ajax(settings).done(function (response) {
      console.log(response);
      //alert("Message Sent successfully")
      bootstrap_alert.warning('Message Sent successfully');
    });
  
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "sunigkale@gmail.com",
      Password: "916da204-a59c-477b-b6e9-93927d6680b2",
      To: email,
      From: "sunigkale@gmail.com",
      Subject: subject,
      Body: finalEmail
    }).then(
      displaySuccessMessage()
    );
  }