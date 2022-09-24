<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $stu_id = $_SESSION['id'];

    $apply_validation = false;
    $unapply_validation = false;

    $errors = array();
    $successes = array();
    $apply_list = array();
    $unapply_list = array();
    $result = array();

    $apply_msg = null;
    $applied_array = array();

    if(isset($_POST['vac-apply-name'])){

        if(isset($_POST['vac-apply-name'])){
            $vac_apply_name = $_POST['vac-apply-name'];
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
        
        
        $get_vacancy_sql = "SELECT * FROM vacancies WHERE vacancy_heading LIKE '%$vac_apply_name%'";
        $get_vacancy_result = $conn->query($get_vacancy_sql);

        if($get_vacancy_result->num_rows > 0){
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
                            <label class="btn btn-outline-success" for="btn-apply-outlined-'. $i .'">Apply</label>
                        </div>
                    </div>
                    ';
                    
                $apply_msg = null;
                $i++;
                }
            }
        } else {
            $apply_msg = '<p class="h4 text-center">No Vacancy with this name exists</p>';
        }

        $apply_list[] = $apply_msg;

    }


    if(isset($_POST['vac-unapply-name'])){

        if($_POST['vac-unapply-name']){
            $vac_unapply_name = $_POST['vac-unapply-name'];
        } else {
            $vac_unapply_name = null;
        }
    
        $check_vacancy_sql = "SELECT * FROM applied_for WHERE student_id='$stu_id'";
        $check_vacancy_result = $conn->query($check_vacancy_sql);

        if($check_vacancy_result->num_rows > 0){
            $i = 0;
            while($check_vacancy_row = $check_vacancy_result->fetch_assoc()){

                $get_vacancy_sql = "SELECT * FROM vacancies WHERE vacancy_id='$check_vacancy_row[vacancy_id]' AND vacancy_heading LIKE '%$vac_unapply_name%'";
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
                                <label class="btn btn-outline-danger" for="btn-unapply-outlined-'. $i .'">Unapply</label>
                            </div>
                        </div>
                        ';
            $i++;
                }
            }
        } else {
            $unapply_list[] = '<p class="h4 text-center">You have not applied to any vacancies yet!</p>';
        }

    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['apply_list'] = $apply_list;
    $result['unapply_list'] = $unapply_list;

    echo json_encode($result);

}


?>