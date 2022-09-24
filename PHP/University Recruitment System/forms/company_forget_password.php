<?php

    include_once("../resources/header.php");

    //Import PHPMailer classes into the global namespace

    include_once("../resources/PHPMailer.php");
    include_once("../resources/SMTP.php");
    include_once("../resources/Exception.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $email = $_POST['comp-forget-email'];

    $email_validate = false;

    // E-mail validation
    if(!empty($email)){
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors[] = "invalid Email";
        } else {
            $email_validate = true;
        }
    } else {
        $errors[] = "Email Field is Empty";
    }

    if($email_validate){

        // check database for E-mail
        $email_check_sql = "SELECT * FROM company WHERE company_email='$email'";
        $email_check_result = $conn->query($email_check_sql);
        $email_check_row = $email_check_result->fetch_assoc();
        
        if($email_check_result->num_rows > 0){

            // after match create token and update database

            $user_id = $email_check_row['company_id'];
            $user_email = $email_check_row['company_email'];

            $reset_token = md5($user_email).rand(2, 6);

            $email_check_sql = "UPDATE company SET company_reset_token='$reset_token' WHERE company_id='$user_id'";
            $email_check_result = $conn->query($email_check_sql);

            // echo $conn->error;

            if($email_check_result){

                $server_email = "bc180201515demo@gmail.com";
                $server_pass = "bc180201515-s";
                $server_host = 'smtp.gmail.com';
                $server_port = 465;

                $reset_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/reset_password.php?user=company&user_email=". $user_email ."&token=". $reset_token;

                $mail_subject = 'Password Reset Link';
                $mail_body = 'Click here to reset your password >> <a href="'. $reset_link .'">Reset Password</a>';
                $mail_alt_body = 'Click here to reset your password >> <a href="'. $reset_link .'">Reset Password</a>';
            
                //Create an instance; passing `true` enables exceptions
                $mail = new PHPMailer(true);
        
                try {
                    //Server settings
                    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                    $mail->SMTPDebug  = 0;
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host       = $server_host;                     //Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                    $mail->Username   = $server_email;                     //SMTP username
                    $mail->Password   = $server_pass;                               //SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                    $mail->Port       = $server_port;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
                    //Recipients
                    $mail->setFrom($server_email, 'University Recruitment System');
                    $mail->addAddress($user_email);     //Add a recipient
        
                    //Content
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = $mail_subject;
                    $mail->Body    = $mail_body;
                    $mail->AltBody = $mail_alt_body;
        
                    if($mail->send()){
                        $successes[] = "An E-mail has been sent to your account.
                                        Please click the link in the E-mail to reset your password.";
                    } else {
                        $errors[] = $mail->ErrorInfo;
                    }
                    // echo 'Message has been sent';
                } catch (Exception $e) {
                    $errors[] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }

            } else {
                $errors[] = "Token was not generated";
            }

        } else {
            $errors[] = 'This user does not exist';
        }

    }

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
                Click to <a href="/company_log_reg.php" class="alert-link">Go Back</a>
            </div>
        <?php } ?>
    </div>
</div>

<?php include_once("../resources/footer.php"); ?>