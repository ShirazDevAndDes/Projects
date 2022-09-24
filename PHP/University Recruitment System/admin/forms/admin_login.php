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

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $email = test_input($_POST['admin-email']);
    $pass = $_POST['admin-pass'];

    $email_validate = false;
    $pass_validate = false;

    $errors = array();

    // Check if variables are set
    if(!isset($email) || !isset($pass)){
        header("Location: ". $admin_login_link);
        exit;
    }

    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors[] = "invalid Email";
        } else {
            $email_validate = true;
        }
    } else {
        $errors[] = "Email Field is Empty";
    }

    if(strlen($pass) >= 6){
        $pass_validate = true;
    } else {
        $errors[] = "Password Field is Empty";
    }
    
    if($email_validate || $pass_validate){

        // $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
        // $sql = "INSERT INTO urs_admin (admin_name, admin_email, admin_pass) VALUES ('ali', '$email', '$hashed_pass')";
        
        // if ($conn->query($sql) === TRUE) {
        //     echo "New record created successfully";
        //   } else {
        //     echo "Error: " . $sql . "<br>" . $conn->error;
        //   }

        // check E-mail and password
        $sql = "SELECT * FROM urs_admin WHERE admin_email='$email'";
        $result = $conn->query($sql);
        
        if($result->num_rows > 0){
            if($row = $result->fetch_assoc()){
                $hashed_pass = $row['admin_pass'];
                if(password_verify($pass, $hashed_pass)){

                    echo "logged in";

                    $_SESSION["loggedin"] = true;
                    $_SESSION["id"] = $row['admin_id'];
                    $_SESSION["role"] = "admin";
                    $_SESSION["profile_img"] = $row['admin_img'];
                    $_SESSION["username"] = $row['admin_name'];
                    $_SESSION["email"] = $row['admin_email'];
                    
                    // Redirect user to welcome page
                    header("location: ". $admin_dashboard_link);

                    $successes[] = "You have logged in";

                }  else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;
    
                    $errors[] = "Your Password is incorrect";
                }
            }
        } else {
            $errors[] = "Your E-mail is does not exist";
        }

    }
} else {
    header("Location: ". $admin_login_link);
    exit;
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
            Click to <a href="/admin" class="alert-link">Go Back</a>
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
                Click to <a href="/admin" class="alert-link">Go Back</a>
            </div>
        <?php } ?>
    </div>
</div>

<?php include_once("../resources/footer.php"); ?>