<?php

include_once('../../resources/DB_con.php');

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $data_id = $_POST['data-id'];
    $data_type = $_POST['data-type'];

    $data = array();
    $errors = array();
    $successes = array();
    $result = array();

    if(!empty($data_id) && !empty($data_type)){

        if($data_type == "student"){

            $stu_sql = "SELECT * FROM student WHERE student_id='$data_id'";
            $stu_result = $conn->query($stu_sql);
            if($stu_result->num_rows > 0){

                $stu_row = $stu_result->fetch_assoc();

                $data['name'] = $stu_row['student_name'];
                $data['email'] = $stu_row['student_email'];

                $stu_resume_sql = "SELECT * FROM resumes WHERE student_id='$data_id'";
                $stu_resume_result = $conn->query($stu_resume_sql);
                
                if($stu_resume_result->num_rows > 0){

                    $stu_resume_row = $stu_resume_result->fetch_assoc();

                    $data['file'] = $stu_resume_row['resume_file'];

                    $successes['info'] = "All student info has been collected";

                }

            }

        } elseif($data_type == "company"){

            $comp_sql = "SELECT * FROM company WHERE company_id='$data_id'";
            $comp_result = $conn->query($comp_sql);
            if($comp_result->num_rows > 0){

                $comp_row = $comp_result->fetch_assoc();

                $data['username'] = $comp_row['company_username'];
                $data['name'] = $comp_row['company_name'];
                $data['email'] = $comp_row['company_email'];
                $data['description'] = $comp_row['company_description'];
                
                $vac_sql = "SELECT * FROM vacancies WHERE company_id='$comp_row[company_id]'";
                $vac_result = $conn->query($vac_sql);
                if($vac_result->num_rows > 0){
                    $data['vacancies'] = $vac_result->num_rows;
                } else {
                    $data['vacancies'] = 0;
                }

                $successes['info'] = "All company info has been collected";

            }

        } else {
            $errors['type-error'] = "Your type is incorrect";
        }

    } else {
        $errors['post-error'] = "Your type is incorrect";
    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['data'] = $data;

    echo json_encode($result);

}

?>