<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $vac_id = $_POST['vac-id'];

    $result = array();

    $vac_sql = "SELECT * FROM vacancies WHERE vacancy_id='$vac_id'";
    $vac_result = $conn->query($vac_sql);

    if($vac_result->num_rows > 0){
        $row = $vac_result->fetch_assoc();

        $result['heading'] = $row['vacancy_heading'];
        $result['description'] = $row['vacancy_description'];
        $result['file'] = $row['vacancy_file'];
    }

    echo json_encode($result);

}


?>