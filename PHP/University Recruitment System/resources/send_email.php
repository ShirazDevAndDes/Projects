<?php

function sendEmail($mail_body, $user_name, $user_email){
    
    $server_email = "bc180201515demo@gmail.com";
    $server_pass = "bc180201515-s";
    $server_host = 'smtp.gmail.com';
    $server_port = 465;

    $link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/reset_password.php?user=student&user_email=". $user_email ."&token=". $reset_token;

    $mail_subject = 'Password Reset Link';
    $mail_body = 'Click here to reset your password >> <a href="'. $link .'">Reset Password</a>';
    $mail_alt_body = 'Click here to reset your password >> <a href="'. $link .'">Reset Password</a>';

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
        // $mail->Subject = $mail_subject;
        $mail->Body    = $mail_body;
        // $mail->AltBody = $mail_alt_body;

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

}

?>