<?php

// MySQLi Variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "uni_rec_sys";

$conn = new mysqli($servername, $username, $password, $dbname);

// Connection Check
if($conn->connect_error){
    die("Connection Failed: ". $conn->connect_error);
}

?>