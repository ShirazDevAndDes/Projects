<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $vac_id = $_POST['vac-id'];

    $data = null;

    $errors = array();
    $successes = array();
    $result = array();

    if(!empty($vac_id)){
        $applied_stu_sql = "SELECT student_id FROM applied_for WHERE vacancy_id='$vac_id'";
        $applied_stu_result = $conn->query($applied_stu_sql);
        if($applied_stu_result->num_rows > 0){
            
            $i = 5;
            while ($applied_stu_row = $applied_stu_result->fetch_assoc()) {
                $get_stu_sql = "SELECT student_id, student_name FROM student WHERE student_id='$applied_stu_row[student_id]'";
                $get_stu_result = $conn->query($get_stu_sql);
                if($get_stu_result->num_rows > 0){
                    while ($get_stu_row = $get_stu_result->fetch_assoc()) {
                        
                        $data .= '
                        <div class="applied-students-item col px-0">
                            <input type="checkbox" class="btn-check" id="btn-student-'. $i .'" name="applied_student" value='. $get_stu_row['student_id'] .'  autocomplete="off">
                            <label class="btn btn-outline-success" for="btn-student-'. $i .'">'. $get_stu_row['student_name'] .'</label>
                        </div>
                        ';
                        
                    }
                }
            $i++;
            }
        }
    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['data'] = $data;

    echo json_encode($result);

}

?>