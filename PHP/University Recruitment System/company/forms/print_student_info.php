<?php

include_once("../../resources/DB_con.php");
session_start();

// function download($url) {
//     header('Content-Description: File Transfer');
//     header("Content-Type: application/force-download");
//     header('Content-Type: application/octet-stream');
//     header('Content-Disposition: attachment; filename="'.basename($url).'"');
//     header('Expires: 0');
//     header('Cache-Control: must-revalidate');
//     header('Pragma: public');
//     header('Content-Length: ' . filesize($url));
//     flush(); // Flush system output buffer
//     readfile($url);
//     die();
// }

// header("Content-type: application/pdf");
// header("Content-Disposition: inline; filename=filename.pdf");

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $applied_students = $_POST['applied-stu'];

    $data = null;

    $errors = array();
    $successes = array();
    $result = array();

    foreach($applied_students as $applied_student) {
        $get_stu_sql = "SELECT * FROM student WHERE student_id='$applied_student'";
        $get_stu_result = $conn->query($get_stu_sql);
    
        if($get_stu_result->num_rows > 0){
            while ($get_stu_row = $get_stu_result->fetch_assoc()) {

                $data .= '
                
                Name: '. $get_stu_row["student_name"]
                .'<br /> Email: '. $get_stu_row["student_email"]
                .'<br /><br />
                
                ';
                // echo "Resume link: ". $get_stu_row;

                // $file_name = $get_stu_row['resume_file'];
                // $url = '../../uploads/student/files/'.$file_name;
                // if(file_exists($url)){
                //     download($url);
                //     $successes['file'] = "your file has been downloaded";
                // } else {
                //     $errors['file-error'] = "Your file does not exist";
                // }
                // echo '<a href="download.php">Test.pdf</a>';
                // echo '<script>
                    
                // </script>';
            }
        }
    }

    // echo '
    //     <script>
    //         window.print();
    //     </script>
    // ';

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['data'] = $data;

    echo json_encode($result);

}

?>

