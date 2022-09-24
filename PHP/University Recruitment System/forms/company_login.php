<?php

    include_once("../resources/header.php");

    $company_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company_log_reg.php";

    $company_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company";

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){
        header("Location: ". $company_dashboard_link);
        exit;
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $email = test_input($_POST['comp-log-email']);
        $pass = $_POST['comp-log-pass'];

        $email_validate = false;
        $pass_validate = false;

        $errors = array();

        // Check if variables are set
        if(!isset($email) || !isset($pass)){
            header("Location: ". $company_login_link);
            exit;
        }

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

        // Password Validation
        if(strlen($pass) >= 6){
            $pass_validate = true;
        } else {
            $errors[] = "Password Field is Empty";
        }
        
        if($email_validate || $pass_validate){

            // Get user info
            $sql = "SELECT * FROM company WHERE company_email='$email'";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0){
                if($row = $result->fetch_assoc()){

                    if($row['company_approved'] == 0){

                        $errors[] = "Your account has not been approved by Admin yet.";

                    } else {

                        $hashed_pass = $row['company_pass'];

                        // Check if password matches users password
                        if(password_verify($pass, $hashed_pass)){

                            // echo "logged in";

                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $row['company_id'];
                            $_SESSION["role"] = "company";
                            $_SESSION["profile_img"] = $row['company_img'];
                            $_SESSION["username"] = $row['company_username'];
                            $_SESSION["email"] = $row['company_email'];
                            $_SESSION["email"] = $row['company_name'];

                            // Redirect user to welcome page
                            header("location: ". $company_dashboard_link);

                            $successes[] = "You have logged in";

                        }  else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
            
                            $errors[] = "Your Password is incorrect";
                        }

                    }

                }
            } else {
                $errors[] = "Your E-mail is does not exist";
            }

        }
    } else {
        header("Location: ". $company_login_link);
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
                Click to Go to your<a href="/company" class="alert-link">Dashboard</a>
            </div>
        <?php } ?>
    </div>
</div>
    
</body>
</html>