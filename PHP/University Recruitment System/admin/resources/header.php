<?php 

  // Database connection file
  include_once($_SERVER['DOCUMENT_ROOT']."/resources/DB_con.php");
  
  // Initialize the session
  session_start();

  $admin_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/admin/index.php";

  if(!isset($_SESSION["loggedin"]) || $_SESSION["role"] != "admin"){
      header("Location: ". $admin_login_link);
      exit;
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
