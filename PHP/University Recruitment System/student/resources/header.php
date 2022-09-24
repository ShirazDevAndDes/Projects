<?php 

  include_once("../resources/DB_con.php");

  // Initialize the session
  session_start();

  $student_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/student_log_reg.php";

  if(!isset($_SESSION["loggedin"]) || $_SESSION["role"] != "student"){
      header("Location: ". $student_login_link);
      exit;
  }

 ?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <!-- <link href="/css/materialize.min.css" rel="stylesheet"> -->
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
    <?php 
    
    if(isset($stylesheets)){
      foreach ($stylesheets as $key => $value) {
        if(!empty($value)){
          echo '<link href="'. $value .'" rel="stylesheet">';
        }
      }
    }
    
    ?>
</head>
<body>