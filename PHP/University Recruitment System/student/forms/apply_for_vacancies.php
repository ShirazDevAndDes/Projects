<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $stu_id = $_SESSION['id'];
    $comp_id = $_POST['comp-id'];
    $vac_type = $_POST['vacancy-type'];

    $apply_validation = false;
    $unapply_validation = false;

    $errors = array();
    $successes = array();
    $apply_list = array();
    $unapply_list = array();
    $result = array();
    
    if($vac_type == "apply" && !empty($_POST['vacancy-apply'])){
        $vac_apply = $_POST['vacancy-apply'];

        $vac_apply_sql = "";

        foreach ($vac_apply as $key => $value) {
            $vac_apply_sql .= "INSERT INTO applied_for (student_id, vacancy_id) VALUES ('$stu_id', '$value');";
        }
        $vac_apply_result = $conn->multi_query($vac_apply_sql);

        if($vac_apply_result){
            $apply_validation = true;
        }

    } elseif ($vac_type == "unapply" && !empty($_POST['vacancy-unapply'])) {
        $vac_unapply = $_POST['vacancy-unapply'];
        
        $vac_unapply_sql = "";

        foreach ($vac_unapply as $key => $value) {
            $vac_unapply_sql .= "DELETE FROM applied_for WHERE student_id='$stu_id' AND vacancy_id='$value';";
        }
        $vac_unapply_result = $conn->multi_query($vac_unapply_sql);
// $errors['sql-error'] = $conn->error;
        if($vac_unapply_result){
            $unapply_validation = true;
        }

    } else {
        $errors['receive-data'] = "Something is wrong with your checkbox";
    }

    while ($conn->next_result()) {;}

    $apply_msg = null;
    $applied_array = array();

    if(isset($_POST['vacancy-search-apply'])){
        $vac_apply_name = $_POST['vacancy-search-apply'];
    } else {
        $vac_apply_name = null;
    }

    $check_applied_sql = "SELECT * FROM applied_for WHERE student_id='$stu_id'";
    $check_applied_result = $conn->query($check_applied_sql);
    
    // $errors['sql-error'] = $conn->error;
    if($check_applied_result->num_rows > 0){
        while ($check_applied_rows = $check_applied_result->fetch_assoc()) {
            $applied_array[] = $check_applied_rows['vacancy_id'];
        }
    }
    
    
    $get_vacancy_sql = "SELECT * FROM vacancies WHERE vacancy_heading LIKE '%$vac_apply_name%' AND company_id='$comp_id'";
    $get_vacancy_result = $conn->query($get_vacancy_sql);

    if($get_vacancy_result->num_rows > 0){
        if($get_vacancy_result->num_rows != $check_applied_result->num_rows){
            $i = 0;
            while ($get_vacancy_rows = $get_vacancy_result->fetch_assoc()) {
                if(!in_array($get_vacancy_rows['vacancy_id'], $applied_array)){

                    $apply_list[] = '
                    <div class="list-group-item d-flex">
                        <div class="vacancy-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-vacancy" data-vacancy-item="'. $get_vacancy_rows["vacancy_id"] .'">
                            <p class="h5 mb-2">'. $get_vacancy_rows['vacancy_heading'] .'</p>
                            <small>'. $get_vacancy_rows['vacancy_description'] .'</small>
                        </div>
                        <div class="list-group-check w-25">
                            <input type="checkbox" class="btn-check" name="vacancy-apply" value="'. $get_vacancy_rows['vacancy_id'] .'" id="btn-apply-outlined-'. $i .'" autocomplete="off">
                            <label class="btn btn-outline-success" for="btn-apply-outlined-'. $i .'">Print / Apply</label>
                        </div>
                    </div>
                    ';
                    
                $apply_msg = null;
                $i++;
                }
            }
        } else {
            $apply_msg = '<p class="h4 text-center">You have applied to every company available</p>';
        }
    } else {
        $apply_msg = '<p class="h4 text-center">There are no vacancies to apply for</p>';
    }

    $apply_list[] = $apply_msg;
    
    $check_vacancy_sql = "SELECT * FROM applied_for WHERE student_id='$stu_id'";
    $check_vacancy_result = $conn->query($check_vacancy_sql);

    if($check_vacancy_result->num_rows > 0){

        if($_POST['vacancy-search-unapply']){
            $vac_unapply_name = $_POST['vacancy-search-unapply'];
        } else {
            $vac_unapply_name = null;
        }

        $i = 0;
        while($check_vacancy_row = $check_vacancy_result->fetch_assoc()){

            $get_vacancy_sql = "SELECT * FROM vacancies WHERE vacancy_id='$check_vacancy_row[vacancy_id]' AND vacancy_heading LIKE '%$vac_unapply_name%' AND company_id='$comp_id'";
            $get_vacancy_result = $conn->query($get_vacancy_sql);

            if($get_vacancy_result->num_rows > 0){
                $get_vacancy_rows = $get_vacancy_result->fetch_assoc();
                    $unapply_list[] = '
                    <div class="list-group-item d-flex">
                        <div class="vacancy-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-vacancy" data-vacancy-item="'. $get_vacancy_rows["vacancy_id"] .'">
                            <p class="h5 mb-2">'. $get_vacancy_rows['vacancy_heading'] .'</p>
                            <small>'. $get_vacancy_rows['vacancy_description'] .'</small>
                        </div>
                        <div class="list-group-check w-25">
                            <input type="checkbox" class="btn-check" name="vacancy-unapply" value="'. $get_vacancy_rows["vacancy_id"] .'" id="btn-unapply-outlined-'. $i .'" autocomplete="off">
                            <label class="btn btn-outline-danger" for="btn-unapply-outlined-'. $i .'">Print / Unapply</label>
                        </div>
                    </div>
                    ';
        $i++;
            }
        }
    } else {
        $unapply_list[] = '<p class="h4 text-center">You have not applied to any vacancies yet!</p>';
    }


    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['apply_list'] = $apply_list;
    $result['unapply_list'] = $unapply_list;

    echo json_encode($result);

}


?>