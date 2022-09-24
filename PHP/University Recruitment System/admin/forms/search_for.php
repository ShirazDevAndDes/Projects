<?php

include_once('../../resources/DB_con.php');

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $data = array();

    if(isset($_POST['stu-search'])){

        $search_type = $_POST['search-type'];
        $stu_name = $_POST['stu-search'];


        if($search_type == "activate"){
            // Check student database for any name that matches
            $stu_activate_sql = "SELECT * FROM student WHERE student_approved='0' AND student_name LIKE '%$stu_name%'";
            $stu_activate_result = $conn->query($stu_activate_sql);

            if($stu_activate_result->num_rows > 0){
                $i = 0;
                while($stu_activate_row = $stu_activate_result->fetch_assoc()) {

                    $data[] .= '
                    <div class="list-group-item d-flex p-0">

                        <div class="student-item w-75" data-student="'. $stu_activate_row['student_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-student-info">
                            <p class="h5 mb-2">'. ucfirst($stu_activate_row['student_name']) .'</p>
                            <small><b>Email:</b> '. $stu_activate_row['student_email'] .'</small>
                        </div>

                        <div class="list-group-check w-25">
                            <input type="checkbox" class="btn-check" name="student-activate" value="'. $stu_activate_row['student_id'] .'" id="btn-activate-'. $i .'" autocomplete="off">
                            <label class="btn btn-outline-success" for="btn-activate-'. $i .'">Activate</label>
                        </div>

                    </div>
                    ';

                $i++;
                }
            } else {
                if(empty($stu_name)){
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
                } else {
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
                }
            }
            
        }

        if($search_type == "deactivate"){

            $stu_deactivate_sql = "SELECT * FROM student WHERE student_approved='1' AND student_name LIKE '%$stu_name%'";
            $stu_deactivate_result = $conn->query($stu_deactivate_sql);

            if($stu_deactivate_result->num_rows > 0){
                $i = 0;
            while($stu_deactivate_row = $stu_deactivate_result->fetch_assoc()) {

                $data[] .= '
                
                <div class="list-group-item d-flex p-0">

                    <div class="student-item w-75" data-student="'. $stu_deactivate_row['student_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-student-info">
                        <p class="h5 mb-2">'. ucfirst($stu_deactivate_row['student_name']) .'</p>
                        <small><b>Email:</b> '. $stu_deactivate_row['student_email'] .'</small>
                    </div>

                    <div class="list-group-check w-25">
                        <input type="checkbox" class="btn-check" name="student-deactivate" value="'. $stu_deactivate_row['student_id'] .'" id="btn-deactivate-'. $i .'" autocomplete="off">
                        <label class="btn btn-outline-danger" for="btn-deactivate-'. $i .'">Deactivate</label>
                    </div>

                </div>
                ';
            
                $i++;
                }
            } else {
                if(empty($stu_name)){
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
                } else {
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
                }
            }

        }

    }

    if(isset($_POST['comp-search'])){

        $search_type = $_POST['search-type'];
        $comp_name = $_POST['comp-search'];

        if($search_type == "activate"){
            
            $comp_activate_sql = "SELECT * FROM company WHERE company_approved='0' AND company_name LIKE '%$comp_name%'";
            $comp_activate_result = $conn->query($comp_activate_sql);
            if($comp_activate_result->num_rows > 0){
                $i = 0;
                while($comp_activate_row = $comp_activate_result->fetch_assoc()) {

                    $data[] .= '
                    <div class="list-group-item d-flex p-0">

                        <div class="company-item w-75" data-company="'. $comp_activate_row['company_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-company-info">
                            <p class="h5 mb-2">'. ucfirst($comp_activate_row['company_name']) .'</p>
                            <small><b>Email:</b> '. $comp_activate_row['company_email'] .'</small>
                        </div>

                        <div class="list-group-check w-25">
                            <input type="checkbox" class="btn-check" name="company-activate" value="'. $comp_activate_row['company_id'] .'" id="btn-activate-'. $i .'" autocomplete="off">
                            <label class="btn btn-outline-success" for="btn-activate-'. $i .'">Activate</label>
                        </div>

                    </div>
                    ';

                $i++;
                }
            }  else {
                if(empty($comp_name)){
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
                } else {
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
                }
            }

        }

        if($search_type == "deactivate"){

            $comp_deactivate_sql = "SELECT * FROM company WHERE company_approved='1' AND company_name LIKE '%$comp_name%'";
            $comp_deactivate_result = $conn->query($comp_deactivate_sql);
            if($comp_deactivate_result->num_rows > 0){
                $i = 0;
            while($comp_deactivate_row = $comp_deactivate_result->fetch_assoc()) {

                $data[] .= '
                
                <div class="list-group-item d-flex p-0">

                    <div class="company-item w-75" data-company="'. $comp_deactivate_row['company_id'] .'" data-bs-toggle="modal" data-bs-target="#Modal-company-info">
                        <p class="h5 mb-2">'. ucfirst($comp_deactivate_row['company_name']) .'</p>
                        <small><b>Email:</b> '. $comp_deactivate_row['company_email'] .'</small>
                    </div>

                    <div class="list-group-check w-25">
                        <input type="checkbox" class="btn-check" name="company-deactivate" value="'. $comp_deactivate_row['company_id'] .'" id="btn-deactivate-'. $i .'" autocomplete="off">
                        <label class="btn btn-outline-danger" for="btn-deactivate-'. $i .'">Deactivate</label>
                    </div>

                </div>
                ';
            
                $i++;
                }
            }  else {
                if(empty($comp_name)){
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
                } else {
                    $data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
                }
            }
            
        }
            
    }

    $result['data'] = $data;

    echo json_encode($result);

}

?>