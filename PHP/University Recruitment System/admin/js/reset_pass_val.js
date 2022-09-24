$(document).ready(function(){

    // Admin reset form validation
    $('#admin-reset-form').submit(function(e){
        // e.preventDefault();

        var admin_pass = $('#admin-reset-pass');
        var admin_confirm_pass = $('#admin-reset-confirm-pass');

        var pass_validate = false;
        var pass_confirm_validate = false;
        var pass_match_validate = false;

        // Password validation
        if(admin_pass.val().length < 6){
            admin_pass.addClass("is-invalid");
            admin_pass.removeClass("is-valid");
            admin_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            pass_validate = true;
        }

        // confirm password validation
        if(admin_confirm_pass.val().length < 6){
            admin_confirm_pass.addClass("is-invalid");
            admin_confirm_pass.removeClass("is-valid");
            admin_confirm_pass.parent().find(".invalid-feedback").text("Your password must be 6 characters long");
        } else {
            
            pass_confirm_validate = true;
        }

        // if both password and confirm password both valid then check values 
        if(pass_validate && pass_confirm_validate){

            // if both password and confirm password match
            if(admin_pass.val() != admin_confirm_pass.val()){
                admin_pass.addClass("is-invalid");
                admin_pass.removeClass("is-valid");
                admin_pass.parent().find(".invalid-feedback").text("Your password does not match your confirm password");

                admin_confirm_pass.addClass("is-invalid");
                admin_confirm_pass.removeClass("is-valid");
                admin_confirm_pass.parent().find(".invalid-feedback").text("Your confirm password does not match your password");
            } else {
                admin_pass.addClass("is-valid");
                admin_pass.removeClass("is-invalid");
                admin_pass.parent().find(".valid-feedback").text("Looks Good!");

                admin_confirm_pass.addClass("is-valid");
                admin_confirm_pass.removeClass("is-invalid");
                admin_confirm_pass.parent().find(".valid-feedback").text("Looks Good!");

                pass_match_validate = true;
            }
            
        }

        if(!pass_match_validate){
            e.preventDefault();
        }

    });

});