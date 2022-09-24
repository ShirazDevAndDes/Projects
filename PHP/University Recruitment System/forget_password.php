<?php 

    include_once("./resources/header.php");

    $student_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student/index.php";

    $company_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company/index.php";

    if(isset($_SESSION["loggedin"])){
        if(isset($_GET['forget_user'])){
            if($_GET['forget_password'] == 'student'){
                header("Location: ". $student_dashboard_link);
                exit;
            } else if($_GET['forget_password'] == 'company'){
                header("Location: ". $company_dashboard_link);
                exit;
            } else {
                header("Location: ". $student_dashboard_link);
                exit;
            }
        } else {
            header("Location: ". $student_dashboard_link);
            exit;
        }
    }
  
    if(isset($_GET['forget_password']) && $_GET['forget_password'] == 'student'){
?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="stu-forget-form" method="post" action="/forms/student_forget_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Student Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="stu-forget-email" name="stu-forget-email" placeholder="Email">
                        <label for="stu-forget-email">Email</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your E-mail address to recover your password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php

    } else if(isset($_GET['forget_password']) && $_GET['forget_password'] == 'company'){

?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="comp-forget-form" method="post" action="/forms/company_forget_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Company Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="comp-forget-email" name="comp-forget-email" placeholder="Email">
                        <label for="comp-forget-email">Email</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your E-mail address to recover your password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php 

    } else {
        header("Location: /student_log_reg.php");
        exit;
    }

    include_once("./resources/footer.php");

?>