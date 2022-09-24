<?php

include_once("../../resources/DB_con.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $comp_id = $_POST['comp-id'];
    $comp_img = $_FILES['comp-img-file'];
    $comp_name = $_POST['comp-name'];
    $comp_username = $_POST['comp-username'];
    $email = $_POST['comp-email'];
    $comp_description = $_POST['comp-des'];
    $pass = $_POST['comp-pass'];

    $comp_id_validate = false;
    $comp_img_validate = false;
    $comp_name_validate = false;
    $comp_username_validate = false;
    $email_validate = false;
    $comp_description_validate = false;
    $pass_validate = false;

    $errors = array();
    $successes = array();
    $results = array();

    $comp_sql = "SELECT * FROM company WHERE company_id='$comp_id'";
    $comp_result = $conn->query($comp_sql);
    $comp_row = $comp_result->fetch_assoc();

    echo is_int($comp_id);

    if(!empty($comp_id)){
        if(filter_var($comp_id, FILTER_VALIDATE_INT) == true){
            if($comp_result->num_rows > 0){
                $successes["comp_id"] = "Your id has been confirmed";
                $comp_id_validate = true;
            } else{
                $errors["comp_id"] = "You id could not be confirmed";
            }
        } else {
            $errors["comp_id"] = "You id is not an integer value";
        }
    } else {
        $errors["comp_id"] = "You id is empty";
    }
    
    if(!empty($comp_img['name'])){

        $valid_img_extensions = array('jpeg', 'jpg', 'png');
        $img_ext = strtolower(pathinfo($comp_img['name'], PATHINFO_EXTENSION));

        if(in_array($img_ext, $valid_img_extensions)){
            $successes["comp_img"] = "Your image is valid";
            $comp_img_validate = true;
        } else {
            $errors["comp_img"] = "Your image is not valid";
        }
    }

    if(!empty($comp_name)){
        if($comp_name == $comp_row['company_name']){
            $comp_name_validate = true;
            $successes["comp_username"] = "Your username is valid";
        } else {
            $sql_comp_name_check = "SELECT * FROM company WHERE company_name='$comp_name'";
            $result_comp_name_check = $conn->query($sql_comp_name_check);
            if($result_comp_name_check->num_rows > 0){
                $errors["comp_name"] = "This company's name already exists";
            } else {
                $comp_name_validate = true;
                $successes["comp_name"] = "Your company name is valid";
            }
        }
    } else {
        $errors["comp_username"] = "You company name is empty";
    }

    if(!empty($comp_username)){
        if($comp_username == $comp_row['company_username']){
            $comp_username_validate = true;
            $successes["comp_username"] = "Your username is valid";
        } else {
            $sql_comp_username_check = "SELECT * FROM company WHERE company_username='$comp_username'";
            $result_comp_username_check = $conn->query($sql_comp_username_check);
            if($result_comp_username_check->num_rows > 0){
                $errors["comp_username"] = "This company's username already exists";
            } else {
                $comp_username_validate = true;
                $successes["comp_username"] = "Your username is valid";
            }
        }
    } else {
        $errors["comp_username"] = "You username is empty";
    }

    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors["comp_email"] = "You email is not valid";
        } else {
            if($email == $comp_row['company_email']){
                $email_validate = true;
                $successes["comp_email"] = "Your Email is valid";
            } else {
                $sql_email_check = "SELECT * FROM company WHERE company_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors["comp_email"] = "This E-mail already exists";
                } else {
                    $email_validate = true;
                    $successes["comp_email"] = "Your Email is valid";
                }
            }
        }
    } else {
        $errors["comp_email"] = "You Email is empty";
    }

    if(!empty($comp_description)){
        $comp_description_validate = true;
        $successes["comp_description"] = "Your description is valid";
    } else {
        $errors["comp_description"] = "You description is empty";
    }

    if(!empty($pass)){
        if(strlen($pass) >= 6){
            $pass_validate = true;
            $successes["comp_pass"] = "Your password is ok";
        } else {
            $errors["comp_pass"] = "You password is less then 6 characters";
        }
    }

    if($comp_img_validate){

        $upload_img_path = "../../uploads/company/images/";
        $img_temp = $comp_img['tmp_name'];

        $image_name = "company-". $comp_id ."-image.". $img_ext;
        $upload_img_path = $upload_img_path.$image_name;

        if(move_uploaded_file($img_temp, $upload_img_path)){

            $sql_comp_update = "UPDATE company SET company_img='$image_name' WHERE company_id='$comp_id'";
            
            if($conn->query($sql_comp_update)){
                session_start();
                $_SESSION["profile_img"] = $comp_row['company_img'];
                // echo $_SESSION["profile_img"];
                $successes["comp_img"] = "Your image has been updated";
            } else {
                $errors["comp_img"] = "Your image has not been updated";
            }

            $successes["comp_img"] = "Your image has been uploaded";
        } else {
            $errors["comp_img"] = "Your image was not uploaded";
        }
    }
    
    if($comp_id_validate && $comp_username_validate && $comp_name_validate && $email_validate && $comp_description_validate && $pass_validate){

        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

        $sql_comp_update = "UPDATE company SET company_username='$comp_username', company_name='$comp_name', company_email='$email', company_description='$comp_description', company_pass='$hashed_pass' WHERE company_id='$comp_id'";
        $conn->query($sql_comp_update);

        $successes["comp_update"] = "Your fields have been updated";

    } elseif ($comp_id_validate && $comp_username_validate && $comp_name_validate && $email_validate &&$comp_description_validate) {

        $sql_comp_update = "UPDATE company SET company_username='$comp_username', company_name='$comp_name', company_email='$email', company_description='$comp_description' WHERE company_id='$comp_id'";
        $conn->query($sql_comp_update);

        $successes["comp_update"] = "Your fields have been updated";

    } else {
        $errors["comp_update"] = "Error with one of your fields";
    }

    $results["errors"] = $errors;
    $results["successes"] = $successes;

    // array_push($results, $errors, $successes);

    // print_r($results);
    // $result["data"] = "data";
    // $result["data1"] = "data1";
    echo json_encode($results);
    exit;

}



?>