<?php

    include_once("../resources/header.php");
    include_once("../resources/send_email.php");

    $student_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student_log_reg.php";

    $student_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student/index.php";

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $stu_name = test_input($_POST['stu-reg-name']);
        $email = test_input($_POST['stu-reg-email']);
        $pass = $_POST['stu-reg-pass'];

        $stu_name_validate = false;
        $email_validate = false;
        $pass_validate = false;

        $errors = array();

        // Username Validation
        if(!empty($stu_name)){
            $sql_stu_name_check = "SELECT * FROM student WHERE student_name='$stu_name'";
            $result_stu_name_check = $conn->query($sql_stu_name_check);
            if($result_stu_name_check->num_rows > 0){
                $errors[] = "This Students name already exists";
            } else {
                $stu_name_validate = true;
            }
        } else {
            $errors[] = "Student Name Field is Empty";
        }

        // E-mail Validation
        if(!empty($email)){
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $errors[] = "invalid Email";
            } else {
                $sql_email_check = "SELECT * FROM student WHERE student_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors[] = "This E-mail already exists";
                } else {
                    $email_validate = true;
                }
            }
        } else {
            $errors[] = "E-mail Field is Empty";
        }

        // Password Validation
        if(strlen($pass) >= 6){
            $pass_validate = true;
        } else {
            $errors[] = "Password Field is Empty";
        }
        
        if($stu_name_validate && $email_validate && $pass_validate){

            // Register User
            $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
            $sql = "INSERT INTO `student` (student_name, student_email, student_pass) VALUES ('$stu_name', '$email', '$hashed_pass')";
            
            if ($conn->query($sql) === TRUE) {
                // echo "New record created successfully";

                // sendEmail();

                $successes[] = "Your account has been created <br> <b>But waiting admin approval</b>";
            } else {
                // echo "Error: " . $sql . "<br>" . $conn->error;

                $errors[] = "Your account was not created";
            }

        }

    }

?>

<div class="container">
    <div class="row h-100">
        <?php if(!empty($errors)){ ?>
        <div class="alert alert-danger my-auto px-5" role="alert">
            <h4 class="alert-heading">Following Errors were Detected</h4>
            <?php
                foreach ($errors as $error) {
                    echo $error."<br />";
                }
            ?>
            <hr />
            Click to <a href="/student_log_reg.php" class="alert-link">Go Back</a>
        </div>
        <?php } else if(!empty($successes)) { ?>
            <div class="alert alert-success my-auto px-5" role="alert">
                <h4 class="alert-heading">Success:</h4>
                <?php
                    foreach ($successes as $success) {
                        echo $success."<br />";
                    }
                ?>
                <hr />
                Click to <a href="/student_log_reg.php" class="alert-link">Go Back</a>
            </div>
        <?php } ?>
    </div>
</div>

    
</body>
</html>