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
    
    if(isset($_SESSION["loggedin"])){

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
    <div class="row h-100">
        <div class="m-auto col-md-4">
            <div class="form-container p-4">
                <form id="admin-form" method="POST" action="forms/admin_login.php">
                    <div class="mx-auto w-50 pt-2 pb-4">
                        <img class="img-fluid" src="../img/user.png" alt="avatar">
                    </div>
                    <div class="form-group">
                        <p class="h4 text-dark text-center">Admin Login</p>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="admin-email" name="admin-email" placeholder="Email">
                        <label for="admin-email">Email</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="admin-pass" name="admin-pass" placeholder="Password">
                        <label for="admin-pass">Password</label>
                        <div class="valid-feedback"></div>
                        <div class="invalid-feedback"></div>
                    </div>
                    <a class="mt-2 mb-4 d-block" href="/admin/forget_password.php">Forgot my Password</a>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php 

    }

    include_once("./resources/footer.php");
    
?>