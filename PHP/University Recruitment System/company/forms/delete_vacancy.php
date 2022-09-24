<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $comp_id = $_SESSION['id'];
    $vac_id = $_POST['vac-id'];

    $errors = array();
    $successes = array();
    $results = array();

    $delete_vac_sql = "DELETE FROM vacancies WHERE company_id='$comp_id' AND vacancy_id='$vac_id'";
    $delete_vac_result = $conn->query($delete_vac_sql);
    
    if($delete_vac_result){

        $successes['delete-vacancy'] = "Your vacancy has been deleted";

        $check_vac_sql = "SELECT * FROM applied_for WHERE vacancy_id='$vac_id'";
        $check_vac_result = $conn->query($check_vac_sql);

        if($check_vac_result->num_rows > 0){
            $delete_applied_vac_sql = "DELETE FROM applied_for WHERE vacancy_id='$vac_id'";
            $delete_applied_vac_result = $conn->query($delete_applied_vac_sql);
            
            if($delete_applied_vac_result){
                $successes['delete-applied-vacancy'] = "Your applied students has been cleared";
            } else {
                $errors['delete-applied-vacancy'] = "Your vacancy has not been deleted";
            }
        }

    } else {
        $errors['delete-vacancy'] = "Your vacancy has not been deleted";
    }

    $results["errors"] = $errors;
    $results["successes"] = $successes;

    echo json_encode($results);
    exit;

}



?>