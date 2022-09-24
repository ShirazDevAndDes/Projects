<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $comp_id = $_POST['comp-id'];

    $result = array();

    $vac_sql = "SELECT * FROM company WHERE company_id='$comp_id' AND company_approved=1";
    $vac_result = $conn->query($vac_sql);

    if($vac_result->num_rows > 0){
        $row = $vac_result->fetch_assoc();

        $result['name'] = $row['company_name'];
        $result['email'] = $row['company_email'];
        $result['description'] = $row['company_description'];
    }

    echo json_encode($result);

}


?>