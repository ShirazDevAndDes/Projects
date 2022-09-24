<?php

include_once("../../resources/DB_con.php");
session_start();

if($_SERVER['REQUEST_METHOD'] == "POST"){

    // $stu_id = $_SESSION['id'];

    // $company_validation = false;

    $errors = array();
    $successes = array();
    $company_list = array();
    $result = array();

    $apply_msg = null;

    if(isset($_POST['comp-name'])){

            $comp_name = $_POST['comp-name'];

            $get_company_sql = "SELECT * FROM company WHERE company_name LIKE '%$comp_name%' AND company_approved=1";
            $get_company_result = $conn->query($get_company_sql);

            if($get_company_result->num_rows > 0){

                    while ($get_company_rows = $get_company_result->fetch_assoc()) {

                        $get_vac_sql = "SELECT * FROM vacancies WHERE company_id='$get_company_rows[company_id]'";
                        $get_vac_result = $conn->query($get_vac_sql);
                        $vacancy_count = $get_vac_result->num_rows;

                        $company_list[] .= '
                            <div class="list-group-item d-flex">
                                <div class="company-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-company" data-company-item="'. $get_company_rows["company_id"] .'">
                                    <p class="h5 mb-2">'. $get_company_rows['company_name'] .'</p>
                                    <small>'. $get_company_rows['company_description'] .'</small>
                                </div>
                                <div class="list-group-check w-25">
                                    <a href="view_vacancies.php?company='. $get_company_rows["company_id"] .'" class="btn btn-outline-success">Vacancies: '. $vacancy_count .'</a>
                                </div>
                            </div>
                        ';
                        
                    }

            }   else {
                $apply_msg = '<p class="h4 text-center">There are no vacancies to apply for</p>';
            }

    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['company_list'] = $company_list;

    echo json_encode($result);

}


?>