function sendSms() {
    console.log("Bol bc");

    bootstrap_alert = function () { }           //Alert Messages
    bootstrap_alert.warning = function (message)     {
        $('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')
    }

    bootstrap_error = function () { }           //Error Messages
    bootstrap_error.error = function (message) {
        $('#alert_placeholder').html('<div class="alert alert-error"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')
    }

    function displaySuccessMessage() {
        bootstrap_alert.warning('Email Sent successfully');
    }

    var sender = document.getElementById("name").value;         //Getting form values
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var phoneNumber = document.getElementById("phone").value;
    var subject = document.getElementById("subject").value

    if (sender == "" || email == "" || message == "" || phoneNumber == "") {
        bootstrap_error.error('Please Enter Mandatory Fields');
    } else {

        var finalMessage = "Hi this is " + sender + ", My email Id is: " + email + ", Query: " + message + ", Phone Number: " + phoneNumber;
        var finalEmail = "Hi this is " + sender + ", Query: " + message + ", Phone Number: " + phoneNumber + "My email id is: "+email;

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://www.fast2sms.com/dev/bulk?authorization=8hwngsHY9F15DxftzKBZTSmMVPbrdIlC7vkNW2A3OL0jcG6Rquv2dgyb5SYTWzRGAVHhaoD6cwfJuI0m&sender_id=FSTSMS&message=" + finalMessage + "&language=english&route=p&numbers=9049696198",
            "method": "GET",
        }
        $.ajax(settings).done(function (response) {         //Ajax Call to SMS Api
            console.log(response);
            //alert("Message Sent successfully")
            bootstrap_alert.warning('Message Sent successfully');
        });

        Email.send({                                        //SMTP call to Email Api
            Host: "smtp.sendgrid.net",
            Username: "apikey",
            Password: "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",
            To: 'anylaptopfix@gmail.com',
            From: 'anylaptopfixv2@gmail.com',
            Subject: subject,
            Body: finalEmail
        }).then(
            displaySuccessMessage()
        );
    }
}
