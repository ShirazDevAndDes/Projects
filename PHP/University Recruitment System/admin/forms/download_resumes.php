<?php

include_once("../../resources/DB_con.php");
session_start();

function download($url) {
    header('Content-Description: File Transfer');
    header("Content-Type: application/force-download");
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($url).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($url));
    flush(); // Flush system output buffer
    readfile($url);
    die();
}

if($_SERVER['REQUEST_METHOD'] == "GET"){

    $stu_id = $_GET['stu_resume'];

    $errors = array();
    $successes = array();
    $result = array();

        $get_stu_sql = "SELECT resume_file FROM resumes WHERE student_id='$stu_id'";
        $get_stu_result = $conn->query($get_stu_sql);

        if($get_stu_result->num_rows > 0){
            while ($get_stu_row = $get_stu_result->fetch_assoc()) {
                $file_name = $get_stu_row['resume_file'];
                $url = '../../uploads/student/files/'.$file_name;
                if(file_exists($url)){
                    download($url);
                    $successes['file'] = "your file has been downloaded";
                } else {
                    $errors['file-error'] = "Your file does not exist";
                }
                // echo '<a href="download.php">Test.pdf</a>';
                // echo '<script>
                    
                // </script>';
            }
        }

    

    $result['errors'] = $errors;
    $result['successes'] = $successes;

    echo json_encode($result);

}

?>

