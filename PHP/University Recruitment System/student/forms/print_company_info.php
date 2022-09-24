<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    $applied_vacancies = $_POST['applied-vac'];

    $data = null;

    $errors = array();
    $successes = array();
    $result = array();

    foreach($applied_vacancies as $applied_vacancy) {
        $get_vac_sql = "SELECT * FROM vacancies WHERE vacancy_id='$applied_vacancy'";
        $get_vac_result = $conn->query($get_vac_sql);
    
        if($get_vac_result->num_rows > 0){
            while ($get_vac_row = $get_vac_result->fetch_assoc()) {

                $comp_id = $get_vac_row["company_id"];

                $get_comp_sql = "SELECT * FROM company WHERE company_id='$comp_id'";
                $get_comp_result = $conn->query($get_comp_sql);
                $get_comp_row = $get_comp_result->fetch_assoc();

                $data .= '
                
                Name: '. $get_comp_row["company_name"]
                .'<br /> Email: '. $get_comp_row["company_email"]
                .'<br /> Heading: '. $get_vac_row["vacancy_heading"]
                .'<br /> Description: <br />'. $get_vac_row["vacancy_description"]
                .'<hr />'
                .'<br /><br />
                
                ';

            }
        }
    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['data'] = $data;

    echo json_encode($result);

}

?>

