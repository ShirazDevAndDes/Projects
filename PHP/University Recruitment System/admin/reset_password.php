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

    session_start();

    $admin_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/admin/index.php";

    if(isset($_SESSION["loggedin"])){
        header("Location: ". $admin_login_link);
        exit;
    }

    if(isset($_GET['user']) && isset($_GET['user_email']) && isset($_GET['token'])){
    
        if($_GET['user'] == "admin"){

?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="admin-reset-form" method="post" action="/admin/forms/admin_reset_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="/img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Admin Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="admin-reset-pass" name="admin-reset-pass" placeholder="Password">
                        <label for="admin-reset-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="admin-reset-confirm-pass" name="admin-reset-confirm-pass" placeholder="Confirm Password">
                        <label for="admin-reset-confirm-pass">Confirm Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your new password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                    <input type="hidden" name="admin-reset-email" value="<?php if($_GET['user'] == "admin"){ echo $_GET['user_email']; } ?>" >
                    <input type="hidden" name="admin-token" value="<?php if($_GET['user'] == "admin"){ echo $_GET['token']; } ?>" >
                </form>
            </div>
        </div>
    </div>
</div>

<?php
        }
    }
?>

<?php

    $js_script[] = "./js/reset_pass_val.js";
    include_once("resources/footer.php");

?>