<?php

include_once("../resources/DB_con.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    $comp_name_validate = false;
    $username_validate = false;
    $email_validate = false;

    $errors = array();

    // Name Validation
    if(isset($_POST['comp-reg-name'])){
        $comp_name = test_input($_POST['comp-reg-name']);
        if(!empty($comp_name)){
            $sql_comp_name_check = "SELECT * FROM company WHERE company_name='$comp_name'";
            $result_comp_name_check = $conn->query($sql_comp_name_check);
            if($result_comp_name_check->num_rows > 0){
                $errors['comp_name'] = "This company name already exists";
            } else {
                $comp_name_validate = true;
            }
        } else {
            $errors['comp_name'] = "Company Name Field is Empty";
        }
    }

    // Username Validation
    if(isset($_POST['comp-reg-username'])){
        $username = test_input($_POST['comp-reg-username']);
        if(!empty($username)){
            $sql_username_check = "SELECT * FROM company WHERE company_username='$username'";
            $result_username_check = $conn->query($sql_username_check);
            if($result_username_check->num_rows > 0){
                $errors['username'] = "This username already exists";
            } else {
                $username_validate = true;
            }
        } else {
            $errors['username'] = "Username Field is Empty";
        }    
    }

    // E-mail Validation
    if(isset($_POST['comp-reg-email'])){
        $email = test_input($_POST['comp-reg-email']);
        if(!empty($email)){
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $errors[] = "invalid Email";
            } else {
                $sql_email_check = "SELECT * FROM company WHERE company_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors['email'] = "This email already exists";
                } else {
                    $email_validate = true;
                }
            }
        } else {
            $errors['email'] = "Email Field is Empty";
        }    
    }

    echo json_encode($errors);
    exit;

}

?>