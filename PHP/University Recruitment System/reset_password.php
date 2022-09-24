<?php

    include_once("resources/header.php");

    $student_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student/index.php";

    $company_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company/index.php";

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){
        if(isset($_GET['user'])){
            if($_GET['user'] == 'student'){
                header("Location: ". $student_dashboard_link);
                exit;
            } else if($_GET['user'] == 'company'){
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

    if(isset($_GET['user']) && isset($_GET['user_email']) && isset($_GET['token'])){
    
        if($_GET['user'] == "student"){

?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="stu-reset-form" method="post" action="/forms/student_reset_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Student Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="stu-reset-pass" name="stu-reset-pass" placeholder="Password">
                        <label for="stu-reset-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="stu-reset-confirm-pass" name="stu-reset-confirm-pass" placeholder="Confirm Password">
                        <label for="stu-reset-confirm-pass">Confirm Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your new password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                    <input type="hidden" name="stu-reset-email" value="<?php if($_GET['user'] == "student"){ echo $_GET['user_email']; } ?>" >
                    <input type="hidden" name="stu-token" value="<?php if($_GET['user'] == "student"){ echo $_GET['token']; } ?>" >
                </form>
            </div>
        </div>
    </div>
</div>

<?php
        } else if($_GET['user'] == "company"){
?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="comp-reset-form" method="post" action="/forms/company_reset_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Company Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="comp-reset-pass" name="comp-reset-pass" placeholder="Password">
                        <label for="comp-reset-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="comp-reset-confirm-pass" name="comp-reset-confirm-pass" placeholder="Confirm Password">
                        <label for="comp-reset-confirm-pass">Confirm Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your new password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                    <input type="hidden" name="comp-reset-email" value="<?php if($_GET['user'] == "company"){ echo $_GET['user_email']; } ?>" >
                    <input type="hidden" name="comp-token" value="<?php if($_GET['user'] == "company"){ echo $_GET['token']; } ?>" >
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

    $js_script[] = "/js/reset_pass_val.js";
    include_once("resources/footer.php");

?>