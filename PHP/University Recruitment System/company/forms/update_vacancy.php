<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){
    
    $comp_id = $_SESSION['id'];
    $vac_id = $_POST['vac-id'];
    $heading = $_POST['vac-heading'];
    $description = $_POST['vac-des'];
    $file = $_FILES['vac-file'];


    $vac_heading_validate = false;
    $vac_description_validate = false;
    $vac_file_validate = false;

    $errors = array();
    $successes = array();
    $results = array();

    if(!empty($heading)){
        $vac_heading_validate = true;
    } else {
        $errors['vac-heading'] = "Your heading field is empty";
    }

    if(!empty($description)){
        $vac_description_validate = true;
    } else {
        $errors['vac-description'] = "Your description field is empty";
    }

    if(!empty($file['name'])){

        $file_name = $file['name'];
        $file_temp = $file['tmp_name'];
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        $valid_file_extensions = array('doc', 'docx', 'pdf');

        $upload_file_path = "../../uploads/company/files/";
        $new_file_name = date("d-m-y")."-".rand(1,100)."-".$file_name;
        $upload_full_file_path = $upload_file_path.$new_file_name;

        if(in_array($file_ext, $valid_file_extensions)){

            $file_check_sql = "SELECT vacancy_file FROM vacancies WHERE vacancy_id='$vac_id'";
            $file_check_result = $conn->query($file_check_sql);
            $file_check_row = $file_check_result->fetch_assoc();

            $delete_file = $upload_file_path.$file_check_row['vacancy_file'];

            if(file_exists($delete_file)){
                unlink($delete_file);
            }

            if(move_uploaded_file($file_temp, $upload_full_file_path)){
                $vac_file_validate = true;
            } else {
                $errors['vac-file'] = "Your file was not uploaded";
            }

        } else {
            $errors['vac-file'] = "Your file type is not valid";
        }
    }

    if($vac_heading_validate && $vac_description_validate && $vac_file_validate){

        $add_vacancy_sql = "UPDATE vacancies SET vacancy_heading='$heading', vacancy_description='$description', vacancy_file='$new_file_name' WHERE company_id='$comp_id' AND vacancy_id='$vac_id'";
        $add_vacancy_result = $conn->query($add_vacancy_sql);

        if(!$add_vacancy_result){
            $errors['vac-submit'] = "Something went wrong while submitting the data";
        } else {
            $successes['vac-submit'] = "Your data has been submitted";
            $successes['vac-heading'] = "Your heading has been updated";
            $successes['vac-description'] = "Your description has been updated";
            $successes['vac-file'] = "Your file has been updated";
        }

    } else if($vac_heading_validate && $vac_description_validate){

        $add_vacancy_sql = "UPDATE vacancies SET vacancy_heading='$heading', vacancy_description='$description' WHERE company_id='$comp_id' AND vacancy_id='$vac_id'";
        $add_vacancy_result = $conn->query($add_vacancy_sql);

        if(!$add_vacancy_result){
            $errors['vac-submit'] = "Something went wrong while submitting the data";
        } else {
            $successes['vac-submit'] = "Your data has been submitted";
            $successes['vac-heading'] = "Your heading has been updated";
            $successes['vac-description'] = "Your description has been updated";
        }

    } else {
        $errors['vac-submit'] = "Something is wrong with one of your fields";
    }

    // $errors['submit-error'] = $conn->error;
    $results['errors'] = $errors;
    $results['successes'] = $successes;

    echo json_encode($results);

}

?>