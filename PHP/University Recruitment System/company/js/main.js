$(document).ready(function() {

    $(".collapse").on('show.bs.collapse', function(){
        $(this).parent().find("a > i").addClass("open");
        // alert($(this).parent().find("a > i").html());
    });

    $(".collapse").on('hide.bs.collapse', function(){
        // alert("hiding");
        $(this).parent().find("a > i").removeClass("open");
    });
    
    function updateImage(input) {
        console.log(input);
        var file = input.get(0).files[0];
     
            if(file){
                var reader = new FileReader();
     
                reader.onload = function(){
                    $("#comp-img").attr("src", reader.result);
                }
     
                reader.readAsDataURL(file);
    
                $(".add_img_button").removeClass("active");
                $(".remove_img_button").addClass("active");
            }
      }
    
      $("#comp-img-file").on("change", function(){
        updateImage($(this));
        $("#comp-img-file").css({"display": "none"});
      });
    
      $("#remove-profile-img").on("click", function(){
        var comp_img = $("#comp-img-link").val();
    
        $("#comp-img-file").val('');
        $(".add_img_button").addClass("active");
        $(".remove_img_button").removeClass("active");
        if(comp_img.length > 0){
          $("#comp-img").attr("src", comp_img);
        } else {
          $("#comp-img").attr("src", "/uploads/assets/image/no-image.png");
        }
        $("#comp-img-file").css({"display": "block"});
      });

    $("#comp-profile-form").submit(function(e) {
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
        $("#result_box").removeClass("alert alert-success");
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

  $("#form-add-vacancy").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "./forms/add_vacancy.php",
      datatype: "json",
      async: false,
      contentType: false,
      processData: false,
      data: formData,
      success(response){
        // alert(response);

        var response = $.parseJSON(response);
        var errors = response.errors;
        var successes = response.successes;

        $("#add-vacancy-result_box").removeClass("alert alert-danger");
        $("#add-vacancy-result_box").removeClass("alert alert-success");
        $("#add-vacancy-result_box").html('');

        if(Object.keys(errors).length > 0){
          $("#add-vacancy-result_box").addClass("alert alert-danger");
          $("#add-vacancy-result_box").append('<h4 class="alert-heading">Danger:</h4><hr />');
          $.each(errors, function(key, value) {
            $("#add-vacancy-result_box").append('<p>' + value + '</p>');
          });
        } else if(Object.keys(successes).length > 0){
          $("#add-vacancy-result_box").addClass("alert alert-success");
          $("#add-vacancy-result_box").append('<h4 class="alert-heading">Success:</h4><hr />');
          $("#add-vacancy-result_box").append('<p>Your information has been updated</p>');

          $.ajax({
            type: "POST",
            url: "./forms/update_vacancy_view.php",
            datatype: "html",
            async: false,
            data: {
              'data-type': 'vacancy',
            },
            success(response){
              $("#vacancy_view").html('');
              $("#vacancy_view").append(response);
            },
            error(xhr, status, error){
              console.log(xhr);
            }
          });
        }

      },
      error(xhr, status, error){
        console.log(xhr);
      }
    });

  });

  $("#form-update-vacancy").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "./forms/update_vacancy.php",
      datatype: "json",
      async: false,
      contentType: false,
      processData: false,
      data: formData,
      success(response){
        // alert(response);

        var response = $.parseJSON(response);
        var errors = response.errors;
        var successes = response.successes;

        $("#update-vacancy-result_box").html('');

        if(Object.keys(errors).length > 0){
          $("#update-vacancy-result_box").append('<div class="alert alert-danger"></div>');
          $("#update-vacancy-result_box .alert-danger").append('<h4 class="alert-heading">Danger:</h4><hr />');
          $.each(errors, function(key, value) {
            $("#update-vacancy-result_box .alert-danger").append('<p class="mb-2">' + value + '</p>');
          });
        }
        if(Object.keys(successes).length > 0){
          $("#update-vacancy-result_box").append('<div class="alert alert-success"></div>');
          $("#update-vacancy-result_box .alert-success").append('<h4 class="alert-heading">Success:</h4><hr />');
          $.each(successes, function(key, value) {
            $("#update-vacancy-result_box .alert-success").append('<p class="mb-2">' + value + '</p>');
          });

          $.ajax({
            type: "POST",
            url: "./forms/update_vacancy_view.php",
            datatype: "html",
            async: false,
            data: {
              'data-type': 'vacancy',
            },
            success(response){
              $("#vacancy_view").html('');
              $("#vacancy_view").append(response);
            },
            error(xhr, status, error){
              console.log(xhr);
            }
          });

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

    $.ajax({
      type: "POST",
      url: "./forms/search_vacancies.php",
      datatype: "json",
      async: false,
      data: {
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

  $("#form-vacancy-delete-search").submit(function(e){
    e.preventDefault();

    var vac_search_name = $("#vacancy-delete-search");

    $.ajax({
      type: "POST",
      url: "./forms/search_vacancies.php",
      datatype: "json",
      async: false,
      data: {
        'vac-search-delete': vac_search_name.val(),
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

  $(document).on('click', '.vacancy-item', function(){

    $("#update-vacancy-result_box").removeClass("alert alert-danger");
    $("#update-vacancy-result_box").removeClass("alert alert-success");
    $("#update-vacancy-result_box").html('');
    
    var vac_id = $(this).attr("data-vacancy-item");

      // alert("showing");
      $.ajax({
        type: "POST",
        url: "./forms/get_vacancy.php",
        datatype: "json",
        async: false,
        data: {'vac-id': vac_id},
        success(response){
          // alert(response);
  
          var response = $.parseJSON(response);
  
          var heading = response.heading;
          var description = response.description;
          var file = response.file;
  
          var vac_id_input = $("#form-update-vacancy #vac-id");
          var vac_heading_input = $("#form-update-vacancy #vac-heading");
          var vac_description_input = $("#form-update-vacancy #vac-des");
          var vac_file_input = $("#form-update-vacancy #upload-file");
          
          vac_id_input.val('');
          vac_heading_input.val('');
          vac_description_input.val('');
          vac_file_input.html('');
          
  
          if(Object.keys(response).length > 0){

            vac_id_input.val(vac_id);
            vac_heading_input.val(heading);
            vac_description_input.val(description);

            if(file != null){

              var extension = file.substr( (file.lastIndexOf('.') +1) );
          
              var download_btn_text = "";
  
              if(extension == "pdf"){
                download_btn_text = "View / Download Uploaded Resume";
              } else {
                download_btn_text = "Download Uploaded Resume";
              }

              vac_file_input.html('<a href="../../uploads/company/files/'+ file +'" class="btn btn-primary" target="_blank">'+ download_btn_text +' <i class="bi bi-file-earmark-arrow-down"></i></a><br /><label for="formFile" class="form-label mt-2">Update File</label>');
            } else {
              vac_file_input.html('<p for="formFile">No File Uploaded yet <i class="bi bi-file-earmark-text"></i></p><label for="formFile" class="form-label">Upload File:</label>');
            }
            
          }
  
        },
        error(xhr, status, error){
          console.log(xhr);
        }
        
      });

  });

  $(document).on('click', '.view-vacancy-item', function(){
    
    var vac_id = $(this).attr("data-vacancy-item");

      // alert("showing");
      $.ajax({
        type: "POST",
        url: "./forms/get_vacancy.php",
        datatype: "json",
        async: false,
        data: {'vac-id': vac_id},
        success(response){
          // alert(response);
  
          var response = $.parseJSON(response);
  
          var heading = response.heading;
          var description = response.description;
          var file = response.file;
  
          
          var vac_heading_input = $("#Modal-view-vacancy #vac-heading");
          var vac_description_input = $("#Modal-view-vacancy #vac-des");
          var vac_file_input = $("#Modal-view-vacancy #upload-file");
          
          
          vac_heading_input.val('');
          vac_description_input.val('');
          vac_file_input.html('');
          
  
          if(Object.keys(response).length > 0){

            vac_heading_input.text(heading);
            vac_description_input.text(description);
            if(file != null){

              var extension = file.substr( (file.lastIndexOf('.') +1) );
          
              var download_btn_text = "";

              if(extension == "pdf"){
                download_btn_text = "View / Download Uploaded Resume";
              } else {
                download_btn_text = "Download Uploaded Resume";
              }

              vac_file_input.html('<a href="../../uploads/company/files/'+ file +'" class="btn btn-primary" target="_blank">'+ download_btn_text +' <i class="bi bi-file-earmark-arrow-down"></i></a>');
            } else {
              vac_file_input.html('<p for="formFile">No File Uploaded yet <i class="bi bi-file-earmark-text"></i></p>');
            }
            
          }
  
        },
        error(xhr, status, error){
          console.log(xhr);
        }
        
      });

  });

  $(document).on('click', '.delete-vacancy', function(){

    var vac_id = $(this).attr("data-vacancy-item");
    var delete_div = $(this).parent().parent();
    // alert(vac_id);

    $.ajax({
      type: "POST",
      url: "./forms/delete_vacancy.php",
      datatype: "json",
      async: false,
      data: {'vac-id': vac_id},
      success(response){
        // alert(response);

        var response = $.parseJSON(response);

        var errors = response.errors;
        var successes = response.successes;

        $('.toast').toast({
          autohide: false,
        });

        $('.toast-body').html('');

        if(Object.keys(errors).length > 0){
          $('.toast-error').toast("show");
          $.each(errors, function(key, value){
            $('.toast-error .toast-body').append('<p>'+ value +'</p>');
          });
        }

        if(Object.keys(successes).length > 0){
          $('.toast-success').toast("show");
          $.each(successes, function(key, value){
            $('.toast-success .toast-body').append('<p>'+ value +'</p>');
          });
          delete_div.fadeOut("slow", function(){
            $(this).remove();
          });
        }

        // $('.toast').toast("show");

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
    $("#stu-print > span").text($(".applied-students-list input:checkbox:checked").length);
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
    $("#stu-print > span").text($(".applied-students-list input:checkbox:checked").length);

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

  $("#stu-print").on("click", function(){
    // $("#form-applied-students").submit();

    var applied_stu = new Array();
    $('input[name="applied_student"]:checkbox:checked').each(function(){
      applied_stu.push($(this).val());
    });

    $.ajax({
      type: "POST",
      url: "./forms/print_student_info.php",
      datatype: "json",
      async: false,
      data: {'applied-stu': applied_stu},
      success(response){
        
        
        // applied_stu.html('');
        
        var response = $.parseJSON(response);
        // alert(response.data);

        $("#DivIdToPrint").html(response.data);
          var divToPrint=document.getElementById('DivIdToPrint');

          var newWin=window.open('','Print-Window');
        
          newWin.document.open();
        
          newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
        
          newWin.document.close();
        
          setTimeout(function(){
            newWin.close();
          },10);

        // if(response.data == null){
          // applied_stu.next().html('<p class="text-center">No students have applied yet</p>');
        // } else {
        //   applied_stu.html(response.data);
        // }

      },
      error(xhr, status, error){
        console.log(xhr);
      }
      
    });

  });

});