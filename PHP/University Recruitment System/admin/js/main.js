$(document).ready(function() {

    // admin validation
    $('#admin-form').submit(function(e){

        // e.preventDefault();

        var email = $('#admin-email');
        var pass = $('#admin-pass');

        var email_validate = false;
        var pass_validate = false;

        // E-mail validation
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

        // Password validation
        if(pass.val().length < 6){
            pass.addClass("is-invalid");
            pass.removeClass("is-valid");
            pass.parent().find(".invalid-feedback").text("Please Enter your Password");
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

    // Admin forget form validation
    $('#admin-forget-form').submit(function(e){

        // e.preventDefault();

        var email = $('#admin-forget-email');

        var email_validate = false;

        // E-mail validation
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

    function updateImage(input) {
        console.log(input);
        var file = input.get(0).files[0];
     
            if(file){
                var reader = new FileReader();
     
                reader.onload = function(){
                    $("#admin-img").attr("src", reader.result);
                }
     
                reader.readAsDataURL(file);
    
                $(".add_img_button").removeClass("active");
                $(".remove_img_button").addClass("active");
            }
      }
    
      $("#admin-img-file").on("change", function(){
        updateImage($(this));
        $("#admin-img-file").css({"display": "none"});
      });
    
      $("#remove-profile-img").on("click", function(){
        var admin_img = $("#admin-img-link").val();
    
        $("#admin-img-file").val('');
        $(".add_img_button").addClass("active");
        $(".remove_img_button").removeClass("active");
        if(admin_img.length > 0){
          $("#admin-img").attr("src", admin_img);
        } else {
          $("#admin-img").attr("src", "/uploads/assets/image/no-image.png");
        }
        $("#admin-img-file").css({"display": "block"});
      });

    $("#admin-profile-form").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "./forms/profile_update.php",
      datatype: "json",
      async: false,
      contentType: false,
      processData:false,
      data: formData,
      success: function(response){
        // alert(response);
        var response = $.parseJSON(response);
        var result_errors = response["errors"];
        var result_successes = response["successes"];
        
        $("#result_box").removeClass("alert alert-danger");
        $("#result_box").html('');

        if(Object.keys(result_errors).length > 0){
          $("#result_box").addClass("alert alert-danger");
          $("#result_box").append('<h4 class="alert-heading">Errors:</h4><hr />');
          $.each(result_errors, function(key, value) {
            $("#result_box").append('<p>' + value + '</p>');
          });
        } else if(Object.keys(result_successes).length > 0){
          $("#result_box").addClass("alert alert-success");
          $("#result_box").append('<h4 class="alert-heading">Success:</h4><hr />');
          $("#result_box").append('<p>Your information has been updated</p>');
        }

      },
      error: function(xhr, status, error){
        console.log(xhr);
      }
    });

  });

    // Student Activate Search
    $("#form-student-activate-search").submit(function(e) {
        e.preventDefault();

        var stu_search = $("#student-activate-search");

        $.ajax({
            type: 'POST',
            url: 'forms/search_for.php',
            dataType: 'json',
            async: false,
            data: {
                "stu-search": stu_search.val(),
                "search-type": "activate",
            },
            success: function(response){
                // alert(response);

                var activate_data = response.data;

                $("#student-activate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#student-activate-list").append(value);
                });

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });
    });

    $("#form-student-deactivate-search").submit(function(e) {
        e.preventDefault();

        var stu_search = $("#student-deactivate-search");

        $.ajax({
            type: 'POST',
            url: 'forms/search_for.php',
            dataType: 'json',
            async: false,
            data: {
                "stu-search": stu_search.val(),
                "search-type": "deactivate",
            },
            success: function(response){
                // alert(response);

                var deactivate_data = response.data;

                $("#student-deactivate-list").html('');

                $.each(deactivate_data, function(key, value){
                    // alert(value);
                    $("#student-deactivate-list").append(value);
                });

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });
    });

    // Student Activate Search
    $("#form-company-activate-search").submit(function(e) {
        e.preventDefault();

        var comp_search = $("#company-activate-search");

        // alert(comp_search.val());

        $.ajax({
            type: 'POST',
            url: 'forms/search_for.php',
            dataType: 'json',
            async: false,
            data: {
                "comp-search": comp_search.val(),
                "search-type": "activate",
            },
            success: function(response){
                // alert(response);

                var activate_data = response.data;

                $("#company-activate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#company-activate-list").append(value);
                });

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });
    });

    $("#form-company-deactivate-search").submit(function(e) {
        e.preventDefault();

        var comp_search = $("#company-deactivate-search");

        $.ajax({
            type: 'POST',
            url: 'forms/search_for.php',
            dataType: 'json',
            async: false,
            data: {
                "comp-search": comp_search.val(),
                "search-type": "deactivate",
            },
            success: function(response){
                // alert(response);

                var deactivate_data = response.data;

                $("#company-deactivate-list").html('');

                $.each(deactivate_data, function(key, value){
                    // alert(value);
                    $("#company-deactivate-list").append(value);
                });

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });
    });

    $(document).on('click', '.student-item', function(){

        var stu_id = $(this).attr("data-student");
        // alert(stu_id);

        var stu_name = $("#student-name");
        var stu_email = $("#student-email");
        var stu_file = $("#student-file");

        stu_name.val('');
        stu_email.val('');
        stu_file.html('');

        // alert(stu_name.val());

        $.ajax({
            type: 'POST',
            url: './forms/get_info.php',
            dataType: 'json',
            async: false,
            data: {
                "data-id": stu_id,
                "data-type": "student",
            },
            success: function(response){
                // alert(response);
                
                // var response = $.parseJSON(response);
                var errors = response.errors;
                var successes = response.successes;
                var name = response.data.name;
                var email = response.data.email;
                var file = response.data.file;
                
                if(Object.keys("successes").length > 0){

                    $("#form-student-info").attr("data-student", stu_id);
                    stu_name.val(name);
                    stu_email.val(email);
                    
                    if(file != null){

                        var extension = file.substr( (file.lastIndexOf('.') +1) );
          
                        var download_btn_text = "";
            
                        if(extension == "pdf"){
                          download_btn_text = "View / Download Uploaded Resume";
                        } else {
                          download_btn_text = "Download Uploaded Resume";
                        }

                        stu_file.html('<a href="../../uploads/student/files/'+ file +'" class="btn btn-primary" target="_blank">'+ download_btn_text +'</a><br />');
                    } else {
                        stu_file.html('<label class="my-2" for="student-file-upload">No resume uploaded yet</label>');
                    }
                    
                }

            },
            error: function(xhr, status, error){
                console.error(xhr);
                console.error(status);
                console.error(error);
            }
        });

    });

    $(document).on('click', '.company-item', function(){

        var comp_id = $(this).attr("data-company");
        // alert(comp_id);

        
        var comp_username = $("#company-username");
        var comp_name = $("#company-name");
        var comp_email = $("#company-email");
        var comp_des = $("#company-des");
        var comp_vacancies = $("#company-vacancies");
        // var comp_file = $("#company-file");

        comp_username.val('');
        comp_name.val('');
        comp_email.val('');
        comp_des.text('');
        comp_vacancies.html('');

        $.ajax({
            type: 'POST',
            url: './forms/get_info.php',
            dataType: 'json',
            async: false,
            data: {
                "data-id": comp_id,
                "data-type": "company",
            },
            success: function(response){
                // alert(response);
                
                // var response = $.parseJSON(response);
                var errors = response.errors;
                var successes = response.successes;
                var username = response.data.username;
                var name = response.data.name;
                var email = response.data.email;
                var vacancies = response.data.vacancies;
                var description = response.data.description;

                if(Object.keys(successes).length > 0){

                    $("#form-company-info").attr("data-company", comp_id);
                    comp_username.val(username);
                    comp_name.val(name);
                    comp_email.val(email);
                    comp_des.text(description);

                    if(vacancies > 0){
                        comp_vacancies.append('<a class="btn btn-success mb-3" href="view_vacancies.php?company='+ comp_id +'" target="_blank">View Vacancies</a><br />');
                        // alert(vacancies);
                    }
                    
                }

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $(document).on('click', 'input[name=student-activate]', function(){
        if($(this).is(":checked")){
            $(this).next().text("Selected");
        } else {
            $(this).next().text("Activate");
        }
        $("#student-activate-count > span").text($('input[name=student-activate]:checkbox:checked').length);
    });

    $(document).on('click', 'input[name=student-deactivate]', function(){
        if($(this).is(":checked")){
            $(this).next().text("Selected");
        } else {
            $(this).next().text("Deactivate");
        }
        $("#student-deactivate-count > span").text($('input[name=student-deactivate]:checkbox:checked').length);
    });

    $("#student-activate").on('click', function(){

        var selected = new Array();
        $('input[name=student-activate]:checkbox:checked').each(function(){
            selected.push($(this).val());
        });
        
        var search_activate = $("#student-activate-search").val();
        var search_deactivate = $("#student-deactivate-search").val();

        $.ajax({
            type: 'POST',
            url: './forms/authenticate_student.php',
            dataType: 'json',
            async: false,
            data: {
                "stu-id": selected,
                "data-type": "activate",
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);
                
                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#student-activate-list").html('');
                $("#student-deactivate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#student-activate-list").append(value);
                });

                $.each(deactivate_data, function(key, value){
                    $("#student-deactivate-list").append(value);
                });

                $("#student-activate-count > span").text($('input[name=student-deactivate]:checkbox:checked').length);

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $("#student-deactivate").on('click', function(){

        var selected = new Array();
        $('input[name=student-deactivate]:checkbox:checked').each(function(){
            selected.push($(this).val());
        });
        
        var search_activate = $("#student-activate-search").val();
        var search_deactivate = $("#student-deactivate-search").val();
        
        $.ajax({
            type: 'POST',
            url: './forms/authenticate_student.php',
            dataType: 'json',
            async: false,
            data: {
                "stu-id": selected,
                "data-type": "deactivate",
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);

                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#student-activate-list").html('');
                $("#student-deactivate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#student-activate-list").append(value);
                });

                $.each(deactivate_data, function(key, value){
                    // alert(value);
                    $("#student-deactivate-list").append(value);
                });

                $("#student-deactivate-count > span").text($('input[name=student-deactivate]:checkbox:checked').length);

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $(document).on('click', 'input[name=company-activate]', function(){
        if($(this).is(":checked")){
            $(this).next().text("Selected");
        } else {
            $(this).next().text("Activate");
        }
        $("#company-activate-count > span").text($('input[name=company-activate]:checkbox:checked').length);
    });

    $(document).on('click', 'input[name=company-deactivate]', function(){
        if($(this).is(":checked")){
            $(this).next().text("Selected");
        } else {
            $(this).next().text("Deactivate");
        }
        $("#company-deactivate-count > span").text($('input[name=company-deactivate]:checkbox:checked').length);
    });

    $("#company-activate").on('click', function(){

        var selected = new Array();
        $('input[name=company-activate]:checkbox:checked').each(function(){
            selected.push($(this).val());
        });
        
        var search_activate = $("#company-activate-search").val();
        var search_deactivate = $("#company-deactivate-search").val();
        
        
        $.ajax({
            type: 'POST',
            url: './forms/authenticate_company.php',
            dataType: 'json',
            async: false,
            data: {
                "comp-id": selected,
                "data-type": "activate",
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);
                
                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#company-activate-list").html('');
                $("#company-deactivate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#company-activate-list").append(value);
                });

                $.each(deactivate_data, function(key, value){
                    $("#company-deactivate-list").append(value);
                });

                $("#company-activate-count > span").text($('input[name=company-deactivate]:checkbox:checked').length);

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $("#company-deactivate").on('click', function(){

        var selected = new Array();
        $('input[name=company-deactivate]:checkbox:checked').each(function(){
            selected.push($(this).val());
        });
        
        var search_activate = $("#company-activate-search").val();
        var search_deactivate = $("#company-deactivate-search").val();
        
        $.ajax({
            type: 'POST',
            url: './forms/authenticate_company.php',
            dataType: 'json',
            async: false,
            data: {
                "comp-id": selected,
                "data-type": "deactivate",
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);

                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#company-activate-list").html('');
                $("#company-deactivate-list").html('');

                $.each(activate_data, function(key, value){
                    // alert(value);
                    $("#company-activate-list").append(value);
                });

                $.each(deactivate_data, function(key, value){
                    $("#company-deactivate-list").append(value);
                });

                $("#company-deactivate-count > span").text($('input[name=company-deactivate]:checkbox:checked').length);

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $('#form-student-info').submit(function(e){
        e.preventDefault();

        var stu_id = $(this).attr("data-student");
        var stu_name = $("#student-name").val();
        var stu_email = $("#student-email").val();

        var search_activate = $("#student-activate-search").val();
        var search_deactivate = $("#student-deactivate-search").val();

        $.ajax({
            type: 'POST',
            url: './forms/update_info.php',
            dataType: 'json',
            async: false,
            data: {
                "stu-id": stu_id,
                "data-type": "student",
                "stu-name": stu_name,
                "stu-email": stu_email,
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);

                // $.parseJSON(response);
                var errors = response.errors;
                var successes = response.successes;

                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#student-info-result_box").html('');

                if(Object.keys(errors).length > 0){
                    $("#student-info-result_box").append('<div class="alert alert-danger"></div>');
                    $("#student-info-result_box .alert-danger").append('<h4 class="alert-heading">Error:</h4><hr />');
                    $.each(errors, function(key, value){
                        $("#student-info-result_box .alert-danger").append(value);
                    });
                }

                if(Object.keys(successes).length > 0){
                    $("#student-info-result_box").append('<div class="alert alert-success"></div>');
                    $("#student-info-result_box .alert-success").append('<h4 class="alert-heading">Success:</h4><hr />');
                    $.each(successes, function(key, value){
                        $("#student-info-result_box .alert-success").append(value);
                    });

                    $("#student-activate-list").html('');
                    $("#student-deactivate-list").html('');

                    $.each(activate_data, function(key, value){
                        // alert(value);
                        $("#student-activate-list").append(value);
                    });
    
                    $.each(deactivate_data, function(key, value){
                        $("#student-deactivate-list").append(value);
                    });
                }

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $('#form-company-info').submit(function(e){
        e.preventDefault();

        var comp_id = $(this).attr("data-company");
        var comp_username = $("#company-username").val();
        var comp_name = $("#company-name").val();
        var comp_email = $("#company-email").val();
        var comp_des = $("#company-des").val();

        // alert(comp_username);
        // alert(comp_des);

        var search_activate = $("#company-activate-search").val();
        var search_deactivate = $("#company-deactivate-search").val();

        $.ajax({
            type: 'POST',
            url: './forms/update_info.php',
            dataType: 'json',
            async: false,
            data: {
                "comp-id": comp_id,
                "data-type": "company",
                "comp-username": comp_username,
                "comp-name": comp_name,
                "comp-email": comp_email,
                "comp-des": comp_des,
                "search-activate": search_activate,
                "search-deactivate": search_deactivate,
            },
            success: function(response){
                // alert(response);

                // $.parseJSON(response);
                var errors = response.errors;
                var successes = response.successes;

                var activate_data = response.activate_data;
                var deactivate_data = response.deactivate_data;

                $("#company-info-result_box").html('');

                if(Object.keys(errors).length > 0){
                    $("#company-info-result_box").append('<div class="alert alert-danger"></div>');
                    $("#company-info-result_box .alert-danger").append('<h4 class="alert-heading">Error:</h4><hr />');
                    $.each(errors, function(key, value){
                        $("#company-info-result_box .alert-danger").append("<p>"+ value +"</p>");
                    });
                }

                if(Object.keys(successes).length > 0){
                    $("#company-info-result_box").append('<div class="alert alert-success"></div>');
                    $("#company-info-result_box .alert-success").append('<h4 class="alert-heading">Success:</h4><hr />');
                    $.each(successes, function(key, value){
                        $("#company-info-result_box .alert-success").append("<p>"+ value +"</p>");
                    });

                    $("#company-activate-list").html('');
                    $("#company-deactivate-list").html('');

                    $.each(activate_data, function(key, value){
                        // alert(value);
                        $("#company-activate-list").append(value);
                    });
    
                    $.each(deactivate_data, function(key, value){
                        $("#company-deactivate-list").append(value);
                    });
                    
                }

            },
            error: function(xhr, status, error){
                console.error(xhr);
            }
        });

    });

    $(document).on('click', '.vacancy-item', function(){

        $("#update-vacancy-result_box").removeClass("alert alert-danger");
        $("#update-vacancy-result_box").removeClass("alert alert-success");
        $("#update-vacancy-result_box").html('');
        
        var comp_id = $(this).attr("data-company");
        var vac_id = $(this).attr("data-vacancy-item");

        //   alert("showing");

        $.ajax({
            type: "POST",
            url: "./forms/get_vacancy.php",
            datatype: "json",
            async: false,
            data: {
                'comp-id': comp_id,
                'vac-id': vac_id
            },
            success(response){
            //   alert(response);
        
                var response = $.parseJSON(response);
        
                var heading = response.heading;
                var description = response.description;
                var file = response.file;
        
                var vac_heading = $("#vac-view-heading");
                var vac_description = $("#vac-view-des");
                var vac_file = $("#upload-view-file");
                
                vac_heading.html('');
                vac_description.html('');
                vac_file.html('');
                
        
                if(Object.keys(response).length > 0){

                vac_heading.html(heading);
                vac_description.html(description);
                if(file != null){

                    var extension = file.substr( (file.lastIndexOf('.') +1) );
          
                    var download_btn_text = "";
        
                    if(extension == "pdf"){
                      download_btn_text = "View / Download Uploaded Resume";
                    } else {
                      download_btn_text = "Download Uploaded Resume";
                    }

                    vac_file.html('<a href="../../uploads/company/files/'+ file +'" class="btn btn-primary" target="_blank">'+ download_btn_text +' <i class="bi bi-file-earmark-arrow-down"></i></a>');
                } else {
                    vac_file.html('<p for="formFile">No File Uploaded yet <i class="bi bi-file-earmark-text"></i></p>');
                }
                
                }
        
            },
            error(xhr, status, error){
                console.log(xhr);
            }
            
        });

    });

    $("#form-vacancy-search").submit(function(e){
        e.preventDefault();
    
        var vac_search_name = $("#vacancy-search");
        var comp_id = "";
        let searchParams = new URLSearchParams(window.location.search);
        if(searchParams.has('company')){
            let param = searchParams.get('company');
            comp_id = param;
        }
    
        // alert(comp_id);

        $.ajax({
          type: "POST",
          url: "./forms/search_vacancies.php",
          datatype: "json",
          async: false,
          data: {
            'comp-id': comp_id,
            'vac-name': vac_search_name.val(),
          },
          success(response){
            // alert(response);
    
            var response = $.parseJSON(response);
    
            var vacancy_items = response.vacancy_items;
    
            $("#vacancy_view").html('');
    
            $.each(vacancy_items, function(key, value){
              // alert(value);
              $("#vacancy_view").append(value);
            });
          
          },
          error(xhr, status, error){
            console.log(xhr);
          }
        });
    
      });

    $(document).on("click", '.applied-student', function(){

        var vac_id = $(this).attr("data-vacancy-item");
        
        var applied_stu = $("#form-applied-students .applied-students-list");
    
        $.ajax({
          type: "POST",
          url: "./forms/applied_students.php",
          datatype: "json",
          async: false,
          data: {'vac-id': vac_id},
          success(response){
            // alert(response);
    
            applied_stu.html('');
    
            var response = $.parseJSON(response);
    
            if(response.data == null){
              applied_stu.next().html('<p class="text-center">No students have applied yet</p>');
            } else {
              applied_stu.html(response.data);
            }
    
          },
          error(xhr, status, error){
            console.log(xhr);
          }
          
        });
    
    });
    
    $(document).on('change', '.applied-students-list input[name="applied_student"]', function(){
        $("#stu-download > span").text($(".applied-students-list input:checkbox:checked").length);
        });

        $(".modal #stu-select-all").on('click', function(){

        if($(this).hasClass("btn-primary")){
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-danger");
            $(this).text("Deselect All");
            $(".applied-students-list input:checkbox").prop('checked', true);
            
        } else {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-primary");
            $(this).text("Select All");
            $(".applied-students-list input:checkbox").prop('checked', false);
        }
        
        $("#stu-download > span").text($(".applied-students-list input:checkbox:checked").length);

    });

    $("#stu-download").on("click", function(){
        // $("#form-applied-students").submit();

        // var stu_get = new Array();

        $("#secretIFrame").html('');

        $(".applied-students-list input:checkbox:checked").each(function(){
            // alert($(this).val());
            
            $("#secretIFrame").append('<iframe src="./forms/download_resumes.php?stu_resume='+ $(this).val() +'"></iframe>');
        }).promise().done(function(){
            setTimeout(() => {
            $("#secretIFrame").html('');
            }, 2000);
        });

    });
      

});