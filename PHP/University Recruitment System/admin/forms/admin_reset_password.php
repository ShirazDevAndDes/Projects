<?php

  // Database connection file
  include_once($_SERVER['DOCUMENT_ROOT']."/resources/DB_con.php");
  
  // Initialize the session
  session_start();

$admin_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/admin";

$admin_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/admin/dashboard.php";

if(isset($_SESSION["loggedin"]) && $_SESSION["role"] == "admin"){
    header("Location: ". $admin_dashboard_link);
    exit;
} elseif(isset($_SESSION["loggedin"])){
    header("Location: ". $admin_login_link);
    exit;
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
</head>
<body>

<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $email = $_POST['admin-reset-email'];
    $token = $_POST['admin-token'];
    $pass = $_POST['admin-reset-pass'];
    $pass_confirm = $_POST['admin-reset-confirm-pass'];

    $email_validate = false;
    $token_validate = false;
    $pass_validate = false;
    $pass_confirm_validate = false;
    $pass_match_validate = false;

    // E-mail Validation
    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors[] = "invalid Email";
        } else {
            $email_validate = true;
        }
    } else {
        $errors[] = "Email Field is Empty";
    }

    // Token Validation
    if(!empty($token) && $email_validate){

        $token_check_sql = "SELECT * FROM urs_admin WHERE admin_email='$email' AND admin_reset_token='$token'";
        $token_check_result = $conn->query($token_check_sql);

        if($token_check_result->num_rows > 0){
            $token_validate = true;
        } else {
            $errors[] = "Token or E-mail does not match";
        }
    } else {
        $errors[] = "Token or E-mail is incorrect";
    }

    // Password Validation
    if(!empty($pass)){
        $pass_validate = true;
    } else {
        $errors[] = "Your password is empty";
    }

    // Confirm Password Validation
    if(!empty($pass_confirm)){
        $pass_confirm_validate = true;
    } else {
        $errors[] = "Your confirm password is empty";
    }

    // password and confirm password match Validation
    if($pass == $pass_confirm){
        $pass_match_validate = true;
    } else {
        $errors[] = "Your password and confirm password do not match each other";
    }

    if($email_validate && $pass_match_validate && $token_validate){

        // Check database for user
        $check_sql = "SELECT * FROM urs_admin WHERE admin_email='$email' AND admin_reset_token='$token'";
        $check_result = $conn->query($check_sql);
        $check_row = $check_result->fetch_assoc();

        if($check_result->num_rows > 0){

            $user_id = $check_row['admin_id'];
    
            $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
    
            // Update password for user
            $pass_update_sql = "UPDATE urs_admin SET admin_pass='$hashed_pass', admin_reset_token=null WHERE admin_id='$user_id'";
            $pass_update_result = $conn->query($pass_update_sql);

            if($pass_update_result){
                $successes[] = "Your password has been reset";
            }

        } else {
            $errors[] = "Your password was not updated";
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
            Click to <a href="/admin/index.php" class="alert-link">Go Back</a>
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
                Click to <a href="/admin/index.php" class="alert-link">Go Back</a>
            </div>
        <?php } ?>
    </div>
</div>

<?php include_once("../resources/footer.php"); ?>