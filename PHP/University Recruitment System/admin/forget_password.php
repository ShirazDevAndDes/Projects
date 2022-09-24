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
    
    if(isset($_SESSION["loggedin"]) && $_SESSION["role"] != "admin"){

?>

<div class="container">
    <div class="row h-100">
        <div class="m-auto col-8">
            <div class="form-container p-4 text-center">
                <p>You are already logged in as <?php echo $_SESSION['username']; ?></p>
                <p>You must logout to use this page</p>
                <a href="/admin/resources/logout.php" class="btn btn-danger">Logout</a>
            </div>
        </div>
    </div>
</div>
        
<?php

    } else {

?>

<div class="container">
    <div class="row">
        <div class="mx-auto mt-5 col-4">
            <div class="form-container p-4">
                <form id="admin-forget-form" method="post" action="/admin/forms/admin_forget_password.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="../img/user.png" alt="avatar">
                    </div>
                    <div class="pt-2 pb-4">
                        <p class="h4 text-dark text-center">Admin Forget Password</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="admin-forget-email" name="admin-forget-email" placeholder="Email">
                        <label for="admin-forget-email">Email</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <small>Enter your E-mail address to recover your password</small>
                    <br />
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </form>

                <div id="forget-result"></div>
            </div>
        </div>
    </div>
</div>

<?php 

    }

    include_once("./resources/footer.php");

?>