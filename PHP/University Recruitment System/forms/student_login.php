<?php

    include_once("../resources/header.php");

    $student_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student_log_reg.php";

    $student_dashboard_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student";

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){
        header("Location: ". $student_dashboard_link);
        exit;
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $email = test_input($_POST['stu-log-email']);
        $pass = $_POST['stu-log-password'];

        $email_validate = false;
        $pass_validate = false;

        $errors = array();

        // Check if variables are set
        if(!isset($email) || !isset($pass)){
            header("Location: ". $student_login_link);
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
            
            // Check for user
            $sql = "SELECT * FROM student WHERE student_email='$email'";
            $result = $conn->query($sql);
            
            if($result->num_rows > 0){
                if($row = $result->fetch_assoc()){

                    if($row['student_approved'] == 0){

                        $errors[] = "Your account has not been approved by Admin yet.";
                
                    } else {

                        // Check user password match, if so log him in
                        $hashed_pass = $row['student_pass'];
                        if(password_verify($pass, $hashed_pass)){

                            // echo "logged in";

                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $row['student_id'];
                            $_SESSION["role"] = "student";
                            $_SESSION["profile_img"] = $row['student_img'];
                            $_SESSION["username"] = $row['student_name'];
                            $_SESSION["email"] = $row['student_email'];
                            
                            // Redirect user to welcome page
                            header("location: ". $student_dashboard_link);

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
        header("Location: ". $student_login_link);
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
            Click to <a href="/student_log_reg.php" class="alert-link">Go Back</a>
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
                Click to Go to your<a href="/student" class="alert-link">Dashboard</a>
            </div>
        <?php } ?>
    </div>
</div>

<?php include_once("../resources/footer.php"); ?>