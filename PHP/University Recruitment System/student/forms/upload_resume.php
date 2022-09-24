<?php


include_once("../../resources/DB_con.php");
session_start();

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $stu_id = $_SESSION['id'];
    $file = $_FILES['resume-file'];
    $file_name = $file['name'];

    $new_file_name = "";

    $res_file_validate = false;

    $errors = array();
    $successes = array();
    $results = array();

    if(!empty($file_name)){

        $file_temp = $file['tmp_name'];
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        $valid_file_extensions = array('doc', 'docx', 'pdf');

        $upload_file_path = "../../uploads/student/files/";
        $new_file_name = date("d-m-y")."-".rand(1,100)."-".$file_name;
        $upload_full_file_path = $upload_file_path.$new_file_name;

        if(in_array($file_ext, $valid_file_extensions)){

            if(move_uploaded_file($file_temp, $upload_full_file_path)){
                $res_file_validate = true;
            } else {
                $errors['resume-file'] = "Your file was not uploaded";
            }

        } else {
            $errors['resume-file'] = "Your file type is not valid";
        }
    } else {
        $errors['resume-file'] = "Your have not added a file yet";
    }

    if($res_file_validate){

        $check_resume_sql = "SELECT resume_file FROM resumes WHERE student_id='$stu_id'";
        $check_resume_result = $conn->query($check_resume_sql);
    
        if($check_resume_result->num_rows > 0){

            $check_resume_row = $check_resume_result->fetch_assoc();

            $delete_resume = $upload_file_path.$check_resume_row['resume_file'];

            if(file_exists($delete_resume)){
               unlink($delete_resume); 
            }
    
            $update_resume_sql = "UPDATE resumes SET resume_file='$new_file_name' WHERE student_id='$stu_id'";
    
            if($conn->query($update_resume_sql)){
                $successes['resume-update'] = "Your resume has been updated";
            } else {
                $errors['resume-update'] = "Your resume has not been updated";
            }
    
        } else {
    
            $upload_resume_sql = "INSERT INTO resumes (student_id, resume_file) VALUES ('$stu_id', '$new_file_name')";
    
            if($conn->query($upload_resume_sql)){
                $successes['resume-upload'] = "Your resume has been uploaded";
            } else {
                $errors['resume-upload'] = "Your resume has not been uploaded";
            }
    
        }

    }

    $results['errors'] = $errors;
    $results['successes'] = $successes;
    $results['file_name'] = $new_file_name;

    echo json_encode($results);

}


?>