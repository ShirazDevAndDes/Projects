<?php

include_once("../../resources/DB_con.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $admin_id = $_POST['admin-id'];
    $admin_img = $_FILES['admin-img-file'];
    $admin_name = $_POST['admin-name'];
    $email = $_POST['admin-email'];
    $pass = $_POST['admin-pass'];

    $admin_id_validate = false;
    $admin_img_validate = false;
    $admin_name_validate = false;
    $email_validate = false;
    $pass_validate = false;

    $errors = array();
    $successes = array();
    $results = array();

    $admin_sql = "SELECT * FROM urs_admin WHERE admin_id='$admin_id'";
    $admin_result = $conn->query($admin_sql);
    $admin_row = $admin_result->fetch_assoc();

    echo is_int($admin_id);

    if(!empty($admin_id)){
        if(filter_var($admin_id, FILTER_VALIDATE_INT) == true){
            if($admin_result->num_rows > 0){
                $successes["admin_id"] = "Your id has been confirmed";
                $admin_id_validate = true;
            } else{
                $errors["admin_id"] = "You id could not be confirmed";
            }
        } else {
            $errors["admin_id"] = "You id is not an integer value";
        }
    } else {
        $errors["admin_id"] = "You id is empty";
    }
    
    if(!empty($admin_img['name'])){

        $valid_img_extensions = array('jpeg', 'jpg', 'png');

        $img_temp = $admin_img['tmp_name'];
        $img_ext = strtolower(pathinfo($admin_img['name'], PATHINFO_EXTENSION));

        if(in_array($img_ext, $valid_img_extensions)){
            $successes["admin_img"] = "Your image is valid";
            $admin_img_validate = true;
        } else {
            $errors["admin_img"] = "Your image is not valid";
        }
    }

    if(!empty($admin_name)){
        if($admin_name == $admin_row['admin_name']){
            $admin_name_validate = true;
            $successes["admin_username"] = "Your username is valid";
        } else {
            $sql_admin_name_check = "SELECT * FROM urs_admin WHERE admin_name='$admin_name'";
            $result_admin_name_check = $conn->query($sql_admin_name_check);
            if($result_admin_name_check->num_rows > 0){
                $errors["admin_username"] = "This admins name already exists";
            } else {
                $admin_name_validate = true;
                $successes["admin_username"] = "Your username is valid";
            }
        }
    } else {
        $errors["admin_username"] = "You username is empty";
    }

    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors["admin_email"] = "You email is not valid";
        } else {
            if($email == $admin_row['admin_email']){
                $email_validate = true;
                $successes["admin_email"] = "Your Email is valid";
            } else {
                $sql_email_check = "SELECT * FROM urs_admin WHERE admin_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors["admin_email"] = "This E-mail already exists";
                } else {
                    $email_validate = true;
                    $successes["admin_email"] = "Your Email is valid";
                }
            }
        }
    } else {
        $errors["admin_email"] = "You Email is empty";
    }

    if(!empty($pass)){
        if(strlen($pass) >= 6){
            $pass_validate = true;
            $successes["admin_pass"] = "Your id has been confirmed";
        } else {
            $errors["admin_pass"] = "You password is less then 6 characters";
        }
    }

    if($admin_img_validate){
        $image_name = "admin-". $admin_id ."-image.". $img_ext;
        $upload_img_path = "../../uploads/admin/images/";
        $upload_img_path = $upload_img_path.$image_name;

        if(move_uploaded_file($img_temp, $upload_img_path)){

            $sql_admin_update = "UPDATE urs_admin SET admin_img='$image_name' WHERE admin_id='$admin_id'";
            
            if($conn->query($sql_admin_update)){
                session_start();
                $_SESSION["profile_img"] = $admin_row['admin_img'];
                // echo $_SESSION["profile_img"];
                $successes["admin_img"] = "Your image has been updated";
            } else {
                $errors["admin_img"] = "Your image has not been updated";
            }

            $successes["admin_img"] = "Your image has been uploaded";
        } else {
            $errors["admin_img"] = "Your image was not uploaded";
        }
    }
    
    if($admin_id_validate && $admin_name_validate && $email_validate && $pass_validate){

        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

        $sql_admin_update = "UPDATE urs_admin SET admin_name='$admin_name', admin_email='$email', admin_pass='$hashed_pass' WHERE admin_id='$admin_id'";
        $conn->query($sql_admin_update);

        $successes["admin_update"] = "Your fields have been updated";

    } elseif ($admin_id_validate && $admin_name_validate && $email_validate) {

        $sql_admin_update = "UPDATE urs_admin SET admin_name='$admin_name', admin_email='$email' WHERE admin_id='$admin_id'";
        $conn->query($sql_admin_update);

        $successes["admin_update"] = "Your fields have been updated";

    } else {
        $errors["admin_update"] = "Error with one of your fields";
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