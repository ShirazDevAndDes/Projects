<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    if($_POST['data-type'] == 'vacancy'){

        $comp_id = $_SESSION['id'];
        
        $vac_sql = "SELECT * FROM vacancies WHERE company_id='$comp_id'";
        $vac_result = $conn->query($vac_sql);
        if($vac_result->num_rows > 0){
            while ($vac_row = $vac_result->fetch_assoc()) {

                $check_applied_sql = "SELECT student_id FROM applied_for WHERE vacancy_id='$vac_row[vacancy_id]'";
                $check_applied_result = $conn->query($check_applied_sql);
                $applied_stu =  $check_applied_result->num_rows;

        echo '<div class="list-group-item list-group-item-action d-flex">
            <div class="w-75 vacancy-item" data-vacancy-item="'. $vac_row['vacancy_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-update-vacancy">
                <p class="h5 mb-2">'. $vac_row['vacancy_heading'] .'</p>
                <small>'. $vac_row['vacancy_description'] .'</small>
            </div>
            <div class="list-group-btn w-25">
                <button class="btn btn-success applied-student" data-vacancy-item="'. $vac_row['vacancy_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-applied-students">
                    Students Applied: 
                    '. $applied_stu .'
                </button>
            </div>
        </div>
        ';

            }
        } else {
            echo '<div class="card">
                <div class="card-body">no rows available</div>
            </div>';
        }

    }

}



?>