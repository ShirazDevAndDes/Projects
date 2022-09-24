<?php

include_once("../resources/DB_con.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    $stu_name_validate = false;
    $email_validate = false;

    $errors = array();

    // Name Validation
    if(isset($_POST['stu-reg-name'])){
        $stu_name = test_input($_POST['stu-reg-name']);
        if(!empty($stu_name)){
            $sql_stu_name_check = "SELECT * FROM student WHERE student_name='$stu_name'";
            $result_stu_name_check = $conn->query($sql_stu_name_check);
            if($result_stu_name_check->num_rows > 0){
                $errors['stu_name'] = "This Students name already exists";
            } else {
                $stu_name_validate = true;
            }
        } else {
            $errors['stu_name'] = "Student Name Field is Empty";
        }
    }

    // E-mail Validation
    if(isset($_POST['stu-reg-email'])){
        $email = test_input($_POST['stu-reg-email']);
        if(!empty($email)){
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $errors[] = "invalid Email";
            } else {
                $sql_email_check = "SELECT * FROM student WHERE student_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors['email'] = "This E-mail already exists";
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