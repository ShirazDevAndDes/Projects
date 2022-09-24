<?php 

    include_once("./resources/header.php");
    
    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){

?>

<div class="container">
    <div class="row h-100">
        <div class="m-auto col-8">
            <div class="form-container text-center p-4">
                <p>You are already logged in as <?php echo $_SESSION['username'] ?></p>
                <p>You must logout to use this page</p>
                <a href="/student/resources/logout.php" class="btn btn-danger">Logout</a>
            </div>
        </div>
    </div>
</div>

<?php

    } else {

?>

<div class="container">
    <div class="row h-100">
    <div class="m-auto col-md-8">
            <div class="form-container row">
                <div class="form_slider">
                    <p class="form_slider_text register h2">I want to<br />REGISTER</p>
                    <p class="form_slider_text login h2">I want to<br />LOGIN</p>
                </div>
                <form id="stu-log-form" class="col-6 p-4" method="post" action="/forms/student_login.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="py-2">
                        <p class="h4 text-dark text-center">Student Login</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="stu-log-email" name="stu-log-email" placeholder="Email">
                        <label for="stu-log-email">Email Address</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="stu-log-password" name="stu-log-password" placeholder="Password">
                        <label for="stu-log-password">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <a class="mt-2 mb-4 d-block" href="/forget_password.php?forget_password=student">Forgot my Password</a>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                
                <form id="stu-reg-form" class="col-6 p-4" method="post" action="/forms/student_register.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="py-2">
                        <p class="h4 text-dark text-center">Student Register</p>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="stu-reg-name" name="stu-reg-name" placeholder="Student Name">
                        <label for="stu-reg-name">Student Name</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="stu-reg-email" name="stu-reg-email" placeholder="Email">
                        <label for="stu-reg-email">Email Address</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="stu-reg-pass" name="stu-reg-pass" placeholder="Password">
                        <label for="stu-reg-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php

    }

    include_once("./resources/footer.php");
    
?>