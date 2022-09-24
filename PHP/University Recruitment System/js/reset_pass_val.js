$(document).ready(function(){

    $('#stu-reset-form').submit(function(e){
        // e.preventDefault();

        var stu_pass = $('#stu-reset-pass');
        var stu_confirm_pass = $('#stu-reset-confirm-pass');

        var pass_validate = false;
        var pass_confirm_validate = false;
        var pass_match_validate = false;

        // Password Validation
        if(stu_pass.val().length < 6){
            stu_pass.addClass("is-invalid");
            stu_pass.removeClass("is-valid");
            stu_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass_validate = true;
        }

        // Confirm Password Validation
        if(stu_confirm_pass.val().length < 6){
            stu_confirm_pass.addClass("is-invalid");
            stu_confirm_pass.removeClass("is-valid");
            stu_confirm_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            
            pass_confirm_validate = true;
        }

        // if both are valid proceed
        if(pass_validate && pass_confirm_validate){

            // Check if values of both password and confirm password match or not
            if(stu_pass.val() != stu_confirm_pass.val()){
                stu_pass.addClass("is-invalid");
                stu_pass.removeClass("is-valid");
                stu_pass.parent().find(".invalid-feedback").text("Your password does not match your confirm password");

                stu_confirm_pass.addClass("is-invalid");
                stu_confirm_pass.removeClass("is-valid");
                stu_confirm_pass.parent().find(".invalid-feedback").text("Your confirm password does not match your password");
            } else {
                stu_pass.addClass("is-valid");
                stu_pass.removeClass("is-invalid");
                stu_pass.parent().find(".valid-feedback").text("Looks Good!");

                stu_confirm_pass.addClass("is-valid");
                stu_confirm_pass.removeClass("is-invalid");
                stu_confirm_pass.parent().find(".valid-feedback").text("Looks Good!");

                pass_match_validate = true;
            }

        }

        if(!pass_match_validate){
            e.preventDefault();
        }

    });

    $('#comp-reset-form').submit(function(e){
        // e.preventDefault();

        var comp_pass = $('#comp-reset-pass');
        var comp_confirm_pass = $('#comp-reset-confirm-pass');

        var pass_validate = false;
        var pass_confirm_validate = false;
        var pass_match_validate = false;

        // Password Validation
        if(comp_pass.val().length < 6){
            comp_pass.addClass("is-invalid");
            comp_pass.removeClass("is-valid");
            comp_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass_validate = true;
        }

        // Confirm Password Validation
        if(comp_confirm_pass.val().length < 6){
            comp_confirm_pass.addClass("is-invalid");
            comp_confirm_pass.removeClass("is-valid");
            comp_confirm_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            
            pass_confirm_validate = true;
        }

        // if both are valid proceed
        if(pass_validate && pass_confirm_validate){

            // Check if values of both password and confirm password match or not
            if(comp_pass.val() != comp_confirm_pass.val()){
                comp_pass.addClass("is-invalid");
                comp_pass.removeClass("is-valid");
                comp_pass.parent().find(".invalid-feedback").text("Your password does not match your confirm password");

                comp_confirm_pass.addClass("is-invalid");
                comp_confirm_pass.removeClass("is-valid");
                comp_confirm_pass.parent().find(".invalid-feedback").text("Your confirm password does not match your password");
            } else {
                comp_pass.addClass("is-valid");
                comp_pass.removeClass("is-invalid");
                comp_pass.parent().find(".valid-feedback").text("Looks Good!");

                comp_confirm_pass.addClass("is-valid");
                comp_confirm_pass.removeClass("is-invalid");
                comp_confirm_pass.parent().find(".valid-feedback").text("Looks Good!");

                pass_match_validate = true;
            }
        }

        if(!pass_match_validate){
            e.preventDefault();
        }

    });

});