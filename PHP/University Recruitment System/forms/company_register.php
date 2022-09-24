<?php

    include_once("../resources/header.php");

    $company_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company_log_reg.php";

    $company_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company/index.php";

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $comp_name = test_input($_POST['comp-reg-name']);
        $username = test_input($_POST['comp-reg-username']);
        $email = test_input($_POST['comp-reg-email']);
        $pass = $_POST['comp-reg-pass'];

        $comp_name_validate = false;
        $username_validate = false;
        $email_validate = false;
        $pass_validate = false;

        $errors = array();

        // Check if variables are set
        if(!isset($comp_name) || !isset($username) || !isset($email) || !isset($pass)){
            header("Location: ". $company_login_link);
            exit;
        }

        // Name Validation
        if(!empty($comp_name)){
            $sql_comp_name_check = "SELECT * FROM company WHERE company_name='$comp_name'";
            $result_comp_name_check = $conn->query($sql_comp_name_check);
            if($result_comp_name_check->num_rows > 0){
                $errors[] = "This company name already exists";
            } else {
                $comp_name_validate = true;
            }
        } else {
            $errors[] = "Company Name Field is Empty";
        }

        // Username Validation
        if(!empty($username)){
            $sql_username_check = "SELECT * FROM company WHERE company_username='$username'";
            $result_username_check = $conn->query($sql_username_check);
            if($result_username_check->num_rows > 0){
                $errors[] = "This username already exists";
            } else {
                $username_validate = true;
            }
        } else {
            $errors[] = "Username Field is Empty";
        }

        // E-mail Validation
        if(!empty($email)){
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $errors[] = "invalid Email";
            } else {
                $sql_email_check = "SELECT * FROM company WHERE company_email='$email'";
                $result_email_check = $conn->query($sql_email_check);
                if($result_email_check->num_rows > 0){
                    $errors[] = "This email already exists";
                } else {
                    $email_validate = true;
                }
            }
        } else {
            $errors[] = "Email Field is Empty";
        }

        // Password Validation
        if(strlen($pass) >= 6){
            $pass_validate = true;
        } else {
            $errors[] = "Password Field is Empty";
        }
        
        if($comp_name_validate && $username_validate && $email_validate && $pass_validate){

            $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

            // Register company user
            $sql = "INSERT INTO `company` (company_name, company_username, company_email, company_pass) VALUES ('$comp_name', '$username', '$email', '$hashed_pass')";
            
            if ($conn->query($sql) === TRUE) {
                // echo "New record created successfully";

                $successes[] = "Your account has been created<br /> <b>But waiting admin approval</b>";
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
            Click to <a href="/company_log_reg.php" class="alert-link">Go Back</a>
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
                Click to <a href="/company_log_reg.php" class="alert-link">Go Back</a>
            </div>
        <?php } ?>
    </div>
</div>

    
</body>
</html>