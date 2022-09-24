<?php

include_once('../../resources/DB_con.php');

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    if(!empty($_POST['stu-id']) && !empty($_POST['data-type'])){

        $stu_id = $_POST['stu-id'];
        $data_type = $_POST['data-type'];

        $activate_data = array();
        $deactivate_data = array();
        $errors = array();
        $successes = array();
        $result = array();

        // Check if activated or deactivated
        if($data_type == "activate"){

            $activate_sql = "";

            foreach ($stu_id as $key => $value) {
                $activate_sql .= "UPDATE student SET student_approved='1' WHERE student_id='$value';";
            }
            $activate_result = $conn->multi_query($activate_sql);
            

        } else if($data_type == "deactivate") {

            $deactivate_sql = "";

            foreach ($stu_id as $key => $value) {
                $deactivate_sql .= "UPDATE student SET student_approved='0' WHERE student_id='$value';";
            }

            $deactivate_result = $conn->multi_query($deactivate_sql);

        }

        while ($conn->next_result()) {}

        if(isset($_POST['search-activate'])){
            $search_activate = $_POST['search-activate'];
        } else {
            $search_activate = null;
        }

        $stu_activate_sql = "SELECT * FROM student WHERE student_approved='0' AND student_name LIKE '%$search_activate%'";
        $stu_activate_result = $conn->query($stu_activate_sql);
        if($stu_activate_result->num_rows > 0){
            $i = 0;
            while($stu_activate_row = $stu_activate_result->fetch_assoc()) {

                $activate_data[] .= '
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
        }  else {
            if(!empty($search_activate)){
                $activate_data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
            } else {
                $activate_data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
            }
        }

        if(isset($_POST['search-deactivate'])){
            $search_deactivate = $_POST['search-deactivate'];
        } else {
            $search_deactivate = null;
        }
        
        $stu_deactivate_sql = "SELECT * FROM student WHERE student_approved='1' AND student_name LIKE '%$search_deactivate%'";
        $stu_deactivate_result = $conn->query($stu_deactivate_sql);
        if($stu_deactivate_result->num_rows > 0){
            $i = 0;
        while($stu_deactivate_row = $stu_deactivate_result->fetch_assoc()) {

            $deactivate_data[] .= '
            
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
        }  else {
            if(!empty($search_deactivate)){
                $deactivate_data[] = '<p class="h5 p-4 text-center">No Accounts Match This Name</p>';
            } else {
                $deactivate_data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
            }
        }

        $result['errors'] = $errors;
        $result['successes'] = $successes;
        $result['activate_data'] = $activate_data;
        $result['deactivate_data'] = $deactivate_data;
        // $result['data'] = $data;
    
        echo json_encode($result);

    }

}

?>