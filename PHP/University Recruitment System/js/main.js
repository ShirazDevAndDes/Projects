$(document).ready(function() {

    var slider_toggle = false;
    $(".form_slider").on("click", function() {
        var form_container = $(".form-container").width();

        // alert(slider_toggle);

        // Toggle Slider
        if(!slider_toggle){
            $(".form_slider").animate({
                "right": form_container / 2,
            });
            $(".form_slider_text.register").fadeToggle();
            $(".form_slider_text.login").fadeToggle();
            slider_toggle = true;
        } else {
            $(".form_slider").animate({
                "right": 0,
            });
            $(".form_slider_text.register").fadeToggle();
            $(".form_slider_text.login").fadeToggle();
            slider_toggle = false;
        }
    });

    // Student Login Form Submit
    $('#stu-log-form').submit(function(e){

        // e.preventDefault();

        var email = $('#stu-log-email');
        var pass = $('#stu-log-password');

        var email_validate = false;
        var pass_validate = false;

        // E-mail Validation
        if(email.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(email.val());
            // alert(validEmail);
            if (!validEmail) {
                email.addClass("is-invalid");
                email.removeClass("is-valid");
                email.parent().find(".invalid-feedback").text("Please Enter a Valid Email Address");
            } else {
                email.addClass("is-valid");
                email.removeClass("is-invalid");
                email.parent().find(".valid-feedback").text("Looks Good!");
                email_validate = true;
            }
        } else {
            email.addClass("is-invalid");
            email.removeClass("is-valid");
            email.parent().find(".invalid-feedback").text("Please Enter your Email");
        }

        // Password Validation
        if(pass.val().length < 6){
            pass.addClass("is-invalid");
            pass.removeClass("is-valid");
            pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass.addClass("is-valid");
            pass.removeClass("is-invalid");
            pass.parent().find(".valid-feedback").text("Looks Good!");
            pass_validate = true;
        }

        if(!email_validate || !pass_validate){
            e.preventDefault();
        }

    });

    // Student Login Form Submit
    $('#comp-log-form').submit(function(e){

        // e.preventDefault();

        var email = $('#comp-log-email');
        var pass = $('#comp-log-pass');

        var email_validate = false;
        var pass_validate = false;

        // E-mail Validation
        if(email.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(email.val());
            // alert(validEmail);
            if (!validEmail) {
                email.addClass("is-invalid");
                email.removeClass("is-valid");
                email.parent().find(".invalid-feedback").text("Please Enter a Valid Email Address");
            } else {
                email.addClass("is-valid");
                email.removeClass("is-invalid");
                email.parent().find(".valid-feedback").text("Looks Good!");
                email_validate = true;
            }
        } else {
            email.addClass("is-invalid");
            email.removeClass("is-valid");
            email.parent().find(".invalid-feedback").text("Please Enter your Email");
        }

        // Password Validation
        if(pass.val().length < 6){
            pass.addClass("is-invalid");
            pass.removeClass("is-valid");
            pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass.addClass("is-valid");
            pass.removeClass("is-invalid");
            pass.parent().find(".valid-feedback").text("Looks Good!");
            pass_validate = true;
        }

        if(email_validate == false || pass_validate == false){
            e.preventDefault();
        }

    });

    // Student Registration Name Check Function
    function stu_name_reg_check(input) {
        var msg;
        var result = false;

        // Submit student name and get required data using ajax
        $.ajax({
            type: "POST",
            url: "../forms/student_val.php",
            datatype: "json",
            async: false,
            data: {
                "stu-reg-name": input.val(),
            },
            success: function(data) {
                msg = JSON.parse(data);
            },
            error: function(xhr, ststus, error) {
                console.error(xhr);
            }
        });

        // Update input fields according to result of ajax
        if(input.val().length < 1){
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text("Please Enter your Student Name");
        } else if (msg.stu_name) {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text(msg.stu_name);
        } else {
            input.addClass("is-valid");
            input.removeClass("is-invalid");
            input.parent().find(".valid-feedback").text("Looks Good!");
            result = true;
        }

        return result;
    }

    // Student Registration E-mail Check Function
    function stu_email_reg_check(input) {
        var msg;
        var result = false;

        // Submit student E-mail and get required data using ajax
        $.ajax({
            type: "POST",
            url: "../forms/student_val.php",
            datatype: "json",
            async: false,
            data: {
                "stu-reg-email": input.val(),
            },
            success: function(data) {
                msg = JSON.parse(data);
            },
            error: function(xhr, ststus, error) {
                console.error(xhr);
            }
        });
        
        // Update input fields according to result of ajax
        if(input.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(input.val());
            // alert(validEmail);
            if (!validEmail) {
                input.addClass("is-invalid");
                input.removeClass("is-valid");
                input.parent().find(".invalid-feedback").text("Please Enter a Valid E-mail Address");
            } else if(msg.email){
                input.addClass("is-invalid");
                input.removeClass("is-valid");
                input.parent().find(".invalid-feedback").text(msg.email);
            } else {
                input.addClass("is-valid");
                input.removeClass("is-invalid");
                input.parent().find(".valid-feedback").text("Looks Good!");
                result = true;
            }
        } else {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text("Please Enter your E-mail");
        }

        return result;
    }

    // Student Registration Form Submit
    $('#stu-reg-form').submit(function(e){

        // e.preventDefault();

        var stu_name = $('#stu-reg-name');
        var email = $('#stu-reg-email');
        var pass = $('#stu-reg-pass');

        var stu_name_validate = false;
        var email_validate = false;
        var pass_validate = false;

        // Name Validation
        if(stu_name_reg_check(stu_name)){
            stu_name_validate = true;
        }
        
        // E-mail Validation
        if(stu_email_reg_check(email)){
            email_validate = true;
        }

        if(pass.val().length < 6){
            pass.addClass("is-invalid");
            pass.removeClass("is-valid");
            pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass.addClass("is-valid");
            pass.removeClass("is-invalid");
            pass.parent().find(".valid-feedback").text("Looks Good!");
            pass_validate = true;
        }

        if(!stu_name_validate || !email_validate || !pass_validate){
            e.preventDefault();
        }

    });

    // Company Registration Name Check Function
    function comp_name_reg_check(input) {
        var msg;
        var result = false;

        // Submit company name and get required data using ajax
        $.ajax({
            type: "POST",
            url: "../forms/company_val.php",
            datatype: "json",
            async: false,
            data: {
                "comp-reg-name": input.val(),
            },
            success: function(data) {
                msg = JSON.parse(data);
            },
            error: function(xhr, ststus, error) {
                console.error(xhr);
            }
        });

        // Update input fields according to result of ajax
        if(input.val().length < 1){
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text("Please Enter your Company Name");
        } else if (msg.comp_name) {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text(msg.comp_name);
        } else {
            input.addClass("is-valid");
            input.removeClass("is-invalid");
            input.parent().find(".valid-feedback").text("Looks Good!");
            result = true;
        }

        return result;
    }

    // Company Registration Username Check Function
    function comp_username_reg_check(input) {
        var msg;
        var result = false;

        // Submit company username and get required data using ajax
        $.ajax({
            type: "POST",
            url: "../forms/company_val.php",
            datatype: "json",
            async: false,
            data: {
                "comp-reg-username": input.val(),
            },
            success: function(data) {
                msg = JSON.parse(data);
            },
            error: function(xhr, ststus, error) {
                console.error(xhr);
            }
        });

        // Update input fields according to result of ajax
        if(input.val().length < 1){
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text("Please Enter your username");
        } else if (msg.username) {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text(msg.username);
        } else {
            input.addClass("is-valid");
            input.removeClass("is-invalid");
            input.parent().find(".valid-feedback").text("Looks Good!");
            result = true;
        }

        return result;
        
    }

    // Company Registration E-mail Check Function
    function comp_email_reg_check(input) {
        var msg;
        var result = false;

        // Submit company E-mail and get required data using ajax
        $.ajax({
            type: "POST",
            url: "../forms/company_val.php",
            datatype: "json",
            async: false,
            data: {
                "comp-reg-email": input.val(),
            },
            success: function(data) {
                msg = JSON.parse(data);
            },
            error: function(xhr, ststus, error) {
                console.error(xhr);
            }
        });
        
        // Update input fields according to result of ajax
        if(input.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(input.val());
            // alert(validEmail);
            if (!validEmail) {
                input.addClass("is-invalid");
                input.removeClass("is-valid");
                input.parent().find(".invalid-feedback").text("Please Enter a Valid Email Address");
            } else if(msg.email){
                input.addClass("is-invalid");
                input.removeClass("is-valid");
                input.parent().find(".invalid-feedback").text(msg.email);
            } else {
                input.addClass("is-valid");
                input.removeClass("is-invalid");
                input.parent().find(".valid-feedback").text("Looks Good!");
                result = true;
            }
        } else {
            input.addClass("is-invalid");
            input.removeClass("is-valid");
            input.parent().find(".invalid-feedback").text("Please Enter your Email");
        }

        return result;
    }

    // Company Registration Form Submit
    $('#comp-reg-form').submit(function(e){

        // e.preventDefault();

        var comp_name = $('#comp-reg-name');
        var username = $('#comp-reg-username');
        var email = $('#comp-reg-email');
        var pass = $('#comp-reg-pass');

        var comp_name_validate = false;
        var username_validate = false;
        var email_validate = false;
        var pass_validate = false;

        // Name Validation
        if(comp_name_reg_check(comp_name)){
            comp_name_validate = true;
        }

        // Username Validation
        if(comp_username_reg_check(username)){
            username_validate = true;
        }
        
        // E-mail Validation
        if(comp_email_reg_check(email)){
            email_validate = true;
        }

        // Password Validation
        if(pass.val().length < 6){
            pass.addClass("is-invalid");
            pass.removeClass("is-valid");
            pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass.addClass("is-valid");
            pass.removeClass("is-invalid");
            pass.parent().find(".valid-feedback").text("Looks Good!");
            pass_validate = true;
        }

        if(!comp_name_validate || !username_validate || !email_validate || !pass_validate){
            e.preventDefault();
        }

    });

    // Student Forget Form Submit
    $('#stu-forget-form').submit(function(e){

        // e.preventDefault();

        var email = $('#stu-forget-email');

        var email_validate = false;

        // E-mail Validation
        if(email.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(email.val());
            // alert(validEmail);
            if (!validEmail) {
                email.addClass("is-invalid");
                email.removeClass("is-valid");
                email.parent().find(".invalid-feedback").text("Please Enter a Valid Email Address");
            } else {
                email.addClass("is-valid");
                email.removeClass("is-invalid");
                email.parent().find(".valid-feedback").text("Looks Good!");
                email_validate = true;
            }
        } else {
            email.addClass("is-invalid");
            email.removeClass("is-valid");
            email.parent().find(".invalid-feedback").text("Please Enter your Email");
        }

        if(!email_validate){
            e.preventDefault();
        }

    });

    // Company Forget Form Submit
    $('#comp-forget-form').submit(function(e){

        // e.preventDefault();

        var email = $('#comp-forget-email');

        var email_validate = false;

        // E-mail Validation
        if(email.val().length > 0){
            var regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var validEmail = regEx.test(email.val());
            // alert(validEmail);
            if (!validEmail) {
                email.addClass("is-invalid");
                email.removeClass("is-valid");
                email.parent().find(".invalid-feedback").text("Please Enter a Valid Email Address");
            } else {
                email.addClass("is-valid");
                email.removeClass("is-invalid");
                email.parent().find(".valid-feedback").text("Looks Good!");
                email_validate = true;
            }
        } else {
            email.addClass("is-invalid");
            email.removeClass("is-valid");
            email.parent().find(".invalid-feedback").text("Please Enter your Email");
        }

        if(!email_validate){
            e.preventDefault();
        }

    });

});