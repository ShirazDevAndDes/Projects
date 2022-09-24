<?php

    include_once('../../resources/DB_con.php');

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $username_validate = false;
        $name_validate = false;
        $email_validate = false;
        $des_validate = false;

        $data = array();
        $activate_data = array();
        $deactivate_data = array();
        $errors = array();
        $successes = array();
        $result = array();

        if($_POST['data-type'] == "student"){

            $stu_id = test_input($_POST['stu-id']);
            $name = test_input($_POST['stu-name']);
            $email = test_input($_POST['stu-email']);

            $get_stu_info_sql = "SELECT student_name, student_email FROM student WHERE student_id='$stu_id'";
            $get_stu_info_result = $conn->query($get_stu_info_sql);
            $get_stu_info_row = $get_stu_info_result->fetch_assoc();

            // Username Validation
            if(!empty($name)){
                if($get_stu_info_row['student_name'] == $name){
                    $name_validate = true;
                } else {
                    $sql_name_check = "SELECT * FROM student WHERE student_name='$name'";
                    $result_name_check = $conn->query($sql_name_check);
                    if($result_name_check->num_rows > 0){
                        $errors[] = "This Students name already exists";
                    } else {
                        $name_validate = true;
                    }
                }
            } else {
                $errors[] = "Student Name Field is Empty";
            }

            // E-mail Validation
            if(!empty($email)){
                if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                    $errors[] = "invalid Email";
                } else {
                    if($get_stu_info_row['student_email'] == $email){
                        $email_validate = true;
                    } else {
                        $sql_email_check = "SELECT * FROM student WHERE student_email='$email'";
                        $result_email_check = $conn->query($sql_email_check);
                        if($result_email_check->num_rows > 0){
                            $errors[] = "This E-mail already exists";
                        } else {
                            $email_validate = true;
                        }
                    }
                }
            } else {
                $errors[] = "E-mail Field is Empty";
            }
            
            if($name_validate && $email_validate){

                // Register User
                $sql = "UPDATE student SET student_name='$name', student_email='$email' WHERE student_id='$stu_id'";
                
                if ($conn->query($sql) === TRUE) {

                    // echo "New record created successfully";

                    $successes[] = "Students info has been updated";
                } else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;

                    $errors[] = "Students info has not been updated";
                }

            }

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
                $activate_data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
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
                $deactivate_data[] = '<p class="h5 p-4 text-center">No Accounts Left</p>';
            }

        }

        if($_POST['data-type'] == "company"){

            $comp_id = test_input($_POST['comp-id']);
            $username = test_input($_POST['comp-username']);
            $name = test_input($_POST['comp-name']);
            $email = test_input($_POST['comp-email']);
            $description = test_input($_POST['comp-des']);
            
            $get_comp_info_sql = "SELECT company_username, company_name, company_email FROM company WHERE company_id='$comp_id'";
            $get_comp_info_result = $conn->query($get_comp_info_sql);
            $get_comp_info_row = $get_comp_info_result->fetch_assoc();

            if(!empty($username)){
                if($get_comp_info_row['company_username'] == $username){
                    $username_validate = true;
                    // $successes[] = "Your username is valid";
                } else {
                    $sql_comp_username_check = "SELECT * FROM company WHERE company_username='$username'";
                    $result_comp_username_check = $conn->query($sql_comp_username_check);
                    if($result_comp_username_check->num_rows > 0){
                        $errors[] = "This company's username already exists";
                    } else {
                        $username_validate = true;
                        // $successes[] = "Your username is valid";
                    }
                }
            } else {
                $errors[] = "You username is empty";
            }

            // name Validation
            if(!empty($name)){
                if($get_comp_info_row['company_name'] == $name){
                    $name_validate = true;
                } else {
                    $sql_name_check = "SELECT * FROM company WHERE company_name='$name'";
                    $result_name_check = $conn->query($sql_name_check);
                    if($result_name_check->num_rows > 0){
                        $errors[] = "This companies name already exists";
                    } else {
                        $name_validate = true;
                    }
                }
            } else {
                $errors[] = "company Name Field is Empty";
            }

            // E-mail Validation
            if(!empty($email)){
                if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                    $errors[] = "invalid Email";
                } else {
                    // $errors['email'] = $get_comp_info_row['company_email'];
                    // $errors['email2'] = $email;
                    if($get_comp_info_row['company_email'] == $email){
                        $email_validate = true;
                    } else {
                        $sql_email_check = "SELECT * FROM company WHERE company_email='$email'";
                        $result_email_check = $conn->query($sql_email_check);
                        if($result_email_check->num_rows > 0){
                            $errors[] = "This E-mail already exists";
                        } else {
                            $email_validate = true;
                        }
                    }
                }
            } else {
                $errors[] = "E-mail Field is Empty";
            }

            if(!empty($description)){
                $des_validate = true;
                // $successes[] = "Your description is valid";
            } else {
                $errors[] = "You description is empty";
            }
            
            if($username_validate && $name_validate && $email_validate && $des_validate){

                // Register User
                $sql = "UPDATE company SET company_username='$username', company_name='$name', company_email='$email', company_description='$description' WHERE company_id='$comp_id'";
                
                if ($conn->query($sql) === TRUE) {

                    // echo "New record created successfully";

                    $successes[] = "Companies info has been updated";
                } else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;

                    $errors[] = "Companies info has not been updated";
                }

            }

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
                $activate_data[] = '<p class="h5 p-4 text-center">No Accounts by this name</p>';
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
                $deactivate_data[] = '<p class="h5 p-4 text-center">No Accounts by this name</p>';
            }

        }

    }

    $result['errors'] = $errors;
    $result['successes'] = $successes;
    $result['activate_data'] = $activate_data;
    $result['deactivate_data'] = $deactivate_data;

    echo json_encode($result);

?>