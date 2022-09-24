<?php 

  // Database Connection File
  include_once(__DIR__."/DB_con.php");
  
  // Initialize the session
  session_start();

 ?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
      <?php
        $page = basename($_SERVER['PHP_SELF']); // Get script filename without any path information
        $page = str_replace( array( '.php', '.htm', '.html' ), '', $page ); // Remove extensions
        $page = str_replace( array('-', '_'), ' ', $page); // Change underscores/hyphens to spaces
        if($page == 'student login'){
          $page = ucwords( $page ); // uppercase first letter of every word
          echo $page;
        }
        if($page == 'company log reg'){
          echo 'Company Login / Registration';
        }
      ?>
    </title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">URC</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-main" aria-controls="navbar-main" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbar-main">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="/student_log_reg.php">Student</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/company_log_reg.php">Company</a>
      </li>
    </ul>
  </div>
</nav>
