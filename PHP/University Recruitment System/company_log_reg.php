<?php 

    include_once("./resources/header.php");

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){

?>

<div class="container">
    <div class="row h-100">
        <div class="m-auto col-8">
            <div class="form-container text-center">
                <p>You are already logged in as <?php echo $_SESSION['username'] ?></p>
                <p>You must logout to use this page</p>
                <a href="/company/resources/logout.php" class="btn btn-danger">Logout</a>
            </div>
        </div>
    </div>
</div>

<?php

    } else {

?>

<div class="container">
    <div class="row h-100">
        <div class="m-auto mt-4 col-md-8">
            <div class="form-container row">
                <div class="form_slider">
                    <p class="form_slider_text register h2">I want to<br />REGISTER</p>
                    <p class="form_slider_text login h2">I want to<br />LOGIN</p>
                </div>
                <form id="comp-log-form" class="col-6 p-4" method="post" action="/forms/company_login.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="./img/user.png" alt="avatar">
                    </div>
                    <div class="py-2">
                        <p class="h4 text-dark text-center">Company Login</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="comp-log-email" name="comp-log-email" placeholder="Email">
                        <label for="comp-log-email">Email address</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="comp-log-pass" name="comp-log-pass" placeholder="Password">
                        <label for="comp-log-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <a class="mt-2 mb-4 d-block" href="/forget_password.php?forget_password=company">Forgot my Password</a>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                
                <form id="comp-reg-form" class="col-6 p-4" method="post" action="/forms/company_register.php">
                    <div class="py-4">
                        <p class="h4 text-dark text-center">Company Register</p>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="comp-reg-name" name="comp-reg-name" placeholder="Company Name">
                        <label for="comp-reg-name">Company Name</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="comp-reg-username" name="comp-reg-username" placeholder="Username">
                        <label for="comp-reg-username">Username</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="comp-reg-email" name="comp-reg-email" placeholder="Email">
                        <label for="comp-reg-email">Email</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="comp-reg-pass" name="comp-reg-pass" placeholder="Password">
                        <label for="comp-reg-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php

    }

    include_once("./resources/footer.php"); 

?>