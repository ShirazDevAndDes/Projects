<?php

include_once('../../resources/DB_con.php');

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    if(!empty($_POST['comp-id']) && !empty($_POST['data-type'])){

        $comp_id = $_POST['comp-id'];
        $data_type = $_POST['data-type'];

        $activate_data = array();
        $deactivate_data = array();
        $errors = array();
        $successes = array();
        $result = array();

        // Check if activated or deactivated
        if($data_type == "activate"){

            $activate_sql = "";

            foreach ($comp_id as $key => $value) {
                $activate_sql .= "UPDATE company SET company_approved='1' WHERE company_id='$value';";
            }
            $activate_result = $conn->multi_query($activate_sql);
            

        } else if($data_type == "deactivate") {

            $deactivate_sql = "";

            foreach ($comp_id as $key => $value) {
                $deactivate_sql .= "UPDATE company SET company_approved='0' WHERE company_id='$value';";
            }

            $deactivate_result = $conn->multi_query($deactivate_sql);

        }

        while ($conn->next_result()) {}

        if(isset($_POST['search-activate'])){
            $search_activate = $_POST['search-activate'];
        } else {
            $search_activate = null;
        }

        $comp_activate_sql = "SELECT * FROM company WHERE company_approved='0' AND company_name LIKE '%$search_activate%'";
        $comp_activate_result = $conn->query($comp_activate_sql);
        if($comp_activate_result->num_rows > 0){
            $i = 0;
            while($comp_activate_row = $comp_activate_result->fetch_assoc()) {

                $activate_data[] .= '
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
        
        $comp_deactivate_sql = "SELECT * FROM company WHERE company_approved='1' AND company_name LIKE '%$search_deactivate%'";
        $comp_deactivate_result = $conn->query($comp_deactivate_sql);
        if($comp_deactivate_result->num_rows > 0){
            $i = 0;
        while($comp_deactivate_row = $comp_deactivate_result->fetch_assoc()) {

            $deactivate_data[] .= '
            
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