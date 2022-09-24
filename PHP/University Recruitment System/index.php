<?php 

    echo $actual_link = "http://$_SERVER[HTTP_HOST]/student_log_reg.php";
    header('Location: '. $actual_link);

    exit();
?>