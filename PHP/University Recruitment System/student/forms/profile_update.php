<?php

include_once("../../resources/DB_con.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $stu_id = $_POST['stu-id'];
    $stu_img = $_FILES['stu-img-file'];
    $stu_name = $_POST['stu-name'];
    $email = $_POST['stu-email'];
    $pass = $_POST['stu-pass'];

    $stu_id_validate = false;
    $stu_img_validate = false;
    $stu_name_validate = false;
    $email_validate = false;
    $pass_validate = false;

    $errors = array();
    $successes = array();
    $results = array();

    $stu_sql = "SELECT * FROM student WHERE student_id='$stu_id'";
    $stu_result = $conn->query($stu_sql);
    $stu_row = $stu_result->fetch_assoc();

    echo is_int($stu_id);

    if(!empty($stu_id)){
        if(filter_var($stu_id, FILTER_VALIDATE_INT) == true){
            if($stu_result->num_rows > 0){
                $successes["stu_id"] = "Your id has been confirmed";
                $stu_id_validate = true;
            } else{
                $errors["stu_id"] = "You id could not be confirmed";
            }
        } else {
            $errors["stu_id"] = "You id is not an integer value";
        }
    } else {
        $errors["stu_id"] = "You id is empty";
    }
    
    if(!empty($stu_img['name'])){

        $valid_img_extensions = array('jpeg', 'jpg', 'png');

        $upload_img_path = "../../uploads/student/images/";
        $img_temp = $stu_img['tmp_name'];
        $img_ext = strtolower(pathinfo($stu_img['name'], PATHINFO_EXTENSION));

        if(in_array($img_ext, $valid_img_extensions)){
            $successes["stu_img"] = "Your image is valid";
            $stu_img_validate = true;
        } else {
            $errors["stu_img"] = "Your image is not valid";
        }
    }

    if(!empty($stu_name)){
        if($stu_name == $stu_row['student_name']){
            $stu_name_validate = true;
            $successes["stu_username"] = "Your username is valid";
        } else {
            $sql_stu_name_check = "SELECT * FROM student WHERE student_name='$stu_name'";
            $result_stu_name_check = $conn->query($sql_stu_name_check);
            if($result_stu_name_check->num_rows > 0){
                $errors["stu_username"] = "This Students name already exists";
            } else {
                $stu_name_validate = true;
                $successes["stu_username"] = "Your username is valid";
            }
        }
    } else {
        $errors["stu_username"] = "You username is empty";
    }

    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors["stu_email"] = "You email is not valid";
        } else {
            if($email == $stu_row['student_email']){
                $email_validate = true;
                $successes["stu_email"] = "Your Email is valid";
            } else {
                $sql_email_check = "SELECT * FROM student WHERE student_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors["stu_email"] = "This E-mail already exists";
                } else {
                    $email_validate = true;
                    $successes["stu_email"] = "Your Email is valid";
                }
            }
        }
    } else {
        $errors["stu_email"] = "You Email is empty";
    }

    if(!empty($pass)){
        if(strlen($pass) >= 6){
            $pass_validate = true;
            $successes["stu_pass"] = "Your id has been confirmed";
        } else {
            $errors["stu_pass"] = "You password is less then 6 characters";
        }
    }

    if($stu_img_validate){
        $image_name = "student-". $stu_id ."-image.". $img_ext;
        $upload_img_path = $upload_img_path.$image_name;

        if(move_uploaded_file($img_temp, $upload_img_path)){

            $sql_stu_update = "UPDATE student SET student_img='$image_name' WHERE student_id='$stu_id'";
            
            if($conn->query($sql_stu_update)){
                session_start();
                $_SESSION["profile_img"] = $stu_row['student_img'];
                // echo $_SESSION["profile_img"];
                $successes["stu_img"] = "Your image has been updated";
            } else {
                $errors["stu_img"] = "Your image has not been updated";
            }

            $successes["stu_img"] = "Your image has been uploaded";
        } else {
            $errors["stu_img"] = "Your image was not uploaded";
        }
    }
    
    if($stu_id_validate && $stu_name_validate && $email_validate && $pass_validate){

        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

        $sql_stu_update = "UPDATE student SET student_name='$stu_name', student_email='$email', student_pass='$hashed_pass' WHERE student_id='$stu_id'";
        $conn->query($sql_stu_update);

        $successes["stu_update"] = "Your fields have been updated";

    } elseif ($stu_id_validate && $stu_name_validate && $email_validate) {

        $sql_stu_update = "UPDATE student SET student_name='$stu_name', student_email='$email' WHERE student_id='$stu_id'";
        $conn->query($sql_stu_update);

        $successes["stu_update"] = "Your fields have been updated";

    } else {
        $errors["stu_update"] = "Error with one of your fields";
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