$("#formSubmit").click(function(e){
    
    e.preventDefault();
    const data = {
        from_name: $('#name').val(),
        from_email: $('#mail').val(),
        subject: $('#subject').val(),
        message_html: $('#message').val(),
        phone: 8899234560
    };
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //Check if all the fiedls are completely filled
    if(!(data.from_email) || !(data.from_name) || !(data.message_html) || !(data.subject)){
        $("#show").text("Please fill the form completely.");
    }
    //Email-Validation
    else if(!emailReg.test(data.from_email)) {
        $('#show').text("Enter a Valid email");
    }

    else{
        $.ajax('https://emailtanya-api.herokuapp.com/email', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
        }).done(function(res) {
            if (res.status === 200) { 
                // email sent successfully
                $("#show").text('Email Sent', 'Your email was sent successfully.');
            }
            else { 
                console.log('Try again');
            }
            $("#myForm").trigger("reset");
        }).fail(function() {
            console.log('Error Occured.Check your Internet Connection or try again later.');
        })
    /*console.log(data);*/
}
});
