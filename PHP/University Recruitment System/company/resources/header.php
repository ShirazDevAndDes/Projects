<?php 

  // Database Connection file
  include_once("../resources/DB_con.php");
  
  // Initialize the session
  session_start();

  $company_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company_log_reg.php";

  if(!isset($_SESSION["loggedin"]) || $_SESSION["role"] != "company"){
      header("Location: ". $company_login_link);
      exit;
  }

 ?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">
</head>
<body>

