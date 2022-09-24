$(document).ready(function () {
  // $('#exampleModal').modal("show");
  // var myModal = new bootstrap.Modal($('#exampleModal'), {});
  // myModal.show();

  function updateImage(input) {
    console.log(input);
    var file = input.get(0).files[0];
 
        if(file){
            var reader = new FileReader();
 
            reader.onload = function(){
                $("#stu-img").attr("src", reader.result);
            }
 
            reader.readAsDataURL(file);

            $(".add_img_button").removeClass("active");
            $(".remove_img_button").addClass("active");
        }
  }

  $("#stu-img-file").on("change", function(){
    updateImage($(this));
    $("#stu-img-file").css({"display": "none"});
  });

  $("#remove-profile-img").on("click", function(){
    var stu_img = $("#stu-img-link").val();

    $("#stu-img-file").val('');
    $(".add_img_button").addClass("active");
    $(".remove_img_button").removeClass("active");
    if(stu_img.length > 0){
      $("#stu-img").attr("src", stu_img);
    } else {
      $("#stu-img").attr("src", "../uploads/assets/image/no-image.png");
    }
    $("#stu-img-file").css({"display": "block"});
  });

  $("#stu-profile-form").submit(function(e) {
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

  $("#form-upload-resume").submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "./forms/upload_resume.php",
      datatype: "json",
      async: false,
      contentType: false,
      processData:false,
      data: formData,
      success: function(response){
        // alert(response);

        var response = $.parseJSON(response);
        var errors = response["errors"];
        var successes = response["successes"];
        var file_name = response["file_name"];
        
        $("#upload-resume-result_box").removeClass("alert alert-danger");
        $("#upload-resume-result_box").html('');

        if(Object.keys(errors).length > 0){
          $("#upload-resume-result_box").addClass("alert alert-danger");
          $("#upload-resume-result_box").append('<h4 class="alert-heading">Errors:</h4><hr />');
          $.each(errors, function(key, value) {
            $("#upload-resume-result_box").append('<p>' + value + '</p>');
          });
        } else if(Object.keys(successes).length > 0){
          $("#upload-resume-result_box").addClass("alert alert-success");
          $("#upload-resume-result_box").append('<h4 class="alert-heading">Success:</h4><hr />');
          $.each(successes, function(key, value) {
            $("#upload-resume-result_box").append('<p>' + value + '</p>');
          });
        }

        if(Object.keys(file_name).length > 0){
          var extension = file_name.substr( (file_name.lastIndexOf('.') +1) );
          
          if(extension == "pdf"){
            $("#resume-file").text("View / Download Uploaded Resume");
          } else {
            $("#resume-file").text("Download Uploaded Resume");
          }
          $("#resume-file").attr("href", "../uploads/student/files/" + file_name);
        }

      },
      error: function(xhr, status, error){
        console.log(xhr);
      }
    });

  });

  $("#form-company-view-search").submit(function(e){
    e.preventDefault();

    var comp_name = $("#company-view-search");

    $.ajax({
      type: "POST",
      url: "./forms/search_for_companies.php",
      datatype: "json",
      async: false,
      data: {
        'comp-name': comp_name.val(),
      },
      success(response){
        // alert(response);

        var response = $.parseJSON(response);

        $("#company-view").html('');

        $.each(response['company_list'], function(key, value){
          // alert(value);
          $("#company-view").append(value);
        });

      },
      error(xhr, status, error){
        console.log(xhr);
      }
      
    });

  });

  $("#form-vacancy-apply-search").submit(function(e){
    e.preventDefault();

    var vac_name = $("#vacancy-apply-search");

    $.ajax({
      type: "POST",
      url: "./forms/search_for_vacancies.php",
      datatype: "json",
      async: false,
      data: {
        'vac-apply-name': vac_name.val(),
      },
      success(response){
        // alert(response);

        var response = $.parseJSON(response);

        $("#apply-view").html('');

        $.each(response['apply_list'], function(key, value){
          // alert(value);
          $("#apply-view").append(value);
        });

      },
      error(xhr, status, error){
        console.log(xhr);
      }
      
    });

  });

  $("#form-vacancy-unapply-search").submit(function(e){
    e.preventDefault();

    var vac_name = $("#vacancy-unapply-search");

    $.ajax({
      type: "POST",
      url: "./forms/search_for_vacancies.php",
      datatype: "json",
      async: false,
      data: {
        'vac-unapply-name': vac_name.val(),
      },
      success(response){
        // alert(response);

        var response = $.parseJSON(response);

        $("#unapply-view").html('');

        $.each(response['unapply_list'], function(key, value){
          // alert(value);
          $("#unapply-view").append(value);
        });

      },
      error(xhr, status, error){
        console.log(xhr);
      }
      
    });

  });

  $(document).on('click', '.company-item', function(){

    var comp_id = $(this).attr("data-company-item");

    // alert("showing");
    $.ajax({
      type: "POST",
      url: "./forms/get_company.php",
      datatype: "json",
      async: false,
      data: {'comp-id': comp_id},
      success(response){
        // alert(response);

        var response = $.parseJSON(response);

        var name = response.name;
        var email = response.email;
        var description = response.description;

        var comp_name = $("#view-company-name");
        var comp_email = $("#view-company-email");
        var comp_description = $("#view-company-description");
        
        comp_name.val('');
        comp_email.val('');
        comp_description.val('');
        

        if(Object.keys(response).length > 0){

          comp_name.text(name);
          comp_email.text("Email: "+ email);
          comp_description.text(description);
          
        }

      },
      error(xhr, status, error){
        console.log(xhr);
      }
      
    });

  });

  $(document).on('click', '.vacancy-item', function(){

    $("#view-vacancy-result_box").removeClass("alert alert-danger");
    $("#view-vacancy-result_box").removeClass("alert alert-success");
    $("#view-vacancy-result_box").html('');
    
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
  
          var vac_heading = $("#view-vacancy-heading");
          var vac_description = $("#view-vacancy-description");
          var vac_file = $("#view-vacancy-file");
          
          vac_heading.val('');
          vac_description.val('');
          vac_file.html('');
          
  
          if(Object.keys(response).length > 0){

            vac_heading.text(heading);
            vac_description.text(description);
            if(file != null){

              var extension = file.substr( (file.lastIndexOf('.') +1) );
          
              var download_btn_text = "";

              if(extension == "pdf"){
                download_btn_text = "View / Download Vacancy info";
              } else {
                download_btn_text = "Download Uploaded Vacancy info";
              }

              vac_file.html('<hr /><a href="../../uploads/company/files/'+ file +'" class="btn btn-primary" target="_blank">'+ download_btn_text +' <i class="bi bi-file-earmark-arrow-down"></i></a>');
            }
            
          }
  
        },
        error(xhr, status, error){
          console.log(xhr);
        }
        
      });

  });

  $(document).on("change", 'input[name="vacancy-apply"]', function(){
    if($(this).next().text() == "Print / Apply"){
      $(this).next().text("Selected");
    } else {
      $(this).next().text("Print / Apply");
    }
    // alert($('input[name="vacancy-apply"]:checkbox:checked').length);
    $("#apply-count > p > span").text("");
    $("#apply-count > p > span").text($('input[name="vacancy-apply"]:checkbox:checked').length);
  });

  $("#vacancy-apply-btn").on('click', function(e) {
    e.preventDefault();

    var comp_id = "";
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('company')){
        let param = searchParams.get('company');
        comp_id = param;
    }

    var apply_val = new Array();
    $('input[name="vacancy-apply"]:checkbox:checked').each(function(){
      apply_val.push($(this).val());
    });

    var search_apply = $("#vacancy-apply-search");
    var search_unapply = $("#vacancy-unapply-search");

    $.ajax({
      type: "POST",
      url: "./forms/apply_for_vacancies.php",
      datatype: "json",
      async: false,
      data: {
        "comp-id": comp_id,
        "vacancy-type": "apply",
        "vacancy-apply": apply_val,
        "vacancy-search-apply": search_apply.val(),
        "vacancy-search-unapply": search_unapply.val(),
      },
      success: function(response){
        // alert(response);

        var response = $.parseJSON(response);

        $("#apply-count > p > span").text("");
        $("#unapply-count > p > span").text("");
        $("#apply-view").html('');
        $("#unapply-view").html('');

        $.each(response['apply_list'], function(key, value){
          // alert(value);
          $("#apply-view").append(value);
        });

        $.each(response['unapply_list'], function(key, value){
          // alert(value);
          $("#unapply-view").append(value);
        });
        
      },
      error: function(xhr, status, error){
        console.log(xhr);
      }
    });

  });

  $(document).on("change", 'input[name="vacancy-unapply"]', function(){
    if($(this).next().text() == "Print / Unapply"){
      $(this).next().text("Selected");
    } else {
      $(this).next().text("Print / Unapply");
    }
    // alert($('input[name="vacancy-unapply"]:checkbox:checked').length);
    $("#unapply-count > p > span").text("");
    $("#unapply-count > p > span").text($('input[name="vacancy-unapply"]:checkbox:checked').length);
  });

  $("#vacancy-unapply-btn").on('click', function(e) {
    e.preventDefault();

    var comp_id = "";
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('company')){
        let param = searchParams.get('company');
        comp_id = param;
    }

    var unapply_val = new Array();
    $('input[name="vacancy-unapply"]:checkbox:checked').each(function(){
      unapply_val.push($(this).val());
    });

    var search_apply = $("#vacancy-apply-search");
    var search_unapply = $("#vacancy-unapply-search");

    $.ajax({
      type: "POST",
      url: "./forms/apply_for_vacancies.php",
      datatype: "json",
      async: false,
      data: {
        "comp-id": comp_id,
        "vacancy-type": "unapply",
        "vacancy-unapply": unapply_val,
        "vacancy-search-apply": search_apply.val(),
        "vacancy-search-unapply": search_unapply.val(),
      },
      success: function(response){
        // alert(response);

        var response = $.parseJSON(response);

        $("#apply-count > p > span").text("");
        $("#unapply-count > p > span").text("");
        $("#apply-view").html('');
        $("#unapply-view").html('');

        $.each(response['apply_list'], function(key, value){
          // alert(value);
          $("#apply-view").append(value);
        });

        $.each(response['unapply_list'], function(key, value){
          // alert(value);
          $("#unapply-view").append(value);
        });
        
        

      },
      error: function(xhr, status, error){
        console.log(xhr);
      }
    });

  });

  $("#vacancy-apply-print").on("click", function(){
    // $("#form-applied-students").submit();

    var applied_vac = new Array();
    $('input[name="vacancy-apply"]:checkbox:checked').each(function(){
      applied_vac.push($(this).val());
    });

    $.ajax({
      type: "POST",
      url: "./forms/print_company_info.php",
      datatype: "json",
      async: false,
      data: {
        'applied-vac': applied_vac
      },
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

  $("#vacancy-unapply-print").on("click", function(){
    // $("#form-applied-students").submit();

    var applied_vac = new Array();
    $('input[name="vacancy-unapply"]:checkbox:checked').each(function(){
      applied_vac.push($(this).val());
    });

    $.ajax({
      type: "POST",
      url: "./forms/print_company_info.php",
      datatype: "json",
      async: false,
      data: {
        'datatype': "unapplied",
        'applied-vac': applied_vac
      },
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
