<?php 

    include_once('./resources/header.php');

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
            <?php include_once("./resources/navbar.php"); ?>
            <div class="content p-5">

                <div id="DivIdToPrint" style="display: none;"></div>

                <div class="card">

                    <nav>
                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-unapplied-tab" data-bs-toggle="tab" data-bs-target="#nav-unapplied" type="button" role="tab" aria-controls="nav-unapplied" aria-selected="true">Apply</button>
                            <button class="nav-link" id="nav-applied-tab" data-bs-toggle="tab" data-bs-target="#nav-applied" type="button" role="tab" aria-controls="nav-applied" aria-selected="false">Unapply</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-unapplied" role="tabpanel" aria-labelledby="nav-unapplied-tab">
                            <div class="card-body">
                                <div class="list-search d-flex w-100 justify-content">

                                    <p class="h4 my-auto">Vacancy List</p>

                                    <div class="ms-auto d-inline-block">
                                        <form id="form-vacancy-apply-search" class="d-flex">
                                            <input id="vacancy-apply-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                        </form>
                                    </div>

                                </div>
                                    
                                <div class="d-flex mb-4" id="apply-count">
                                    <p class="h5 ps-4">Vacancies Selected: <span>0</span></p>
                                    <button id="vacancy-apply-print" class="btn btn-primary ms-auto">Print</button>
                                    <button id="vacancy-apply-btn" class="btn btn-success ms-1">Apply</button>
                                </div>

                                <div class="list-group" id="apply-view">
                                    
                                <?php

                                    $apply_msg = null;
                                    $applied_array = array();

                                    $check_applied_sql = "SELECT * FROM applied_for WHERE student_id='$stu_id'";
                                    $check_applied_result = $conn->query($check_applied_sql);
                                    if($check_applied_result->num_rows > 0){
                                        while ($check_applied_rows = $check_applied_result->fetch_assoc()) {
                                            $applied_array[] = $check_applied_rows['vacancy_id'];
                                        }
                                    }

                                    $comp_id = $_GET['company'];

                                    $get_vacancy_sql = "SELECT * FROM vacancies WHERE company_id='$comp_id'";
                                    $get_vacancy_result = $conn->query($get_vacancy_sql);

                                    if($get_vacancy_result->num_rows > 0){
                                        if($get_vacancy_result->num_rows != $check_applied_result->num_rows){

                                            $i = 0;
                                            while ($get_vacancy_rows = $get_vacancy_result->fetch_assoc()) {
                                                if(!in_array($get_vacancy_rows['vacancy_id'], $applied_array)){
                                ?>
                                    <div class="list-group-item d-flex">
                                        <div class="vacancy-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-vacancy" data-vacancy-item="<?php  echo $get_vacancy_rows["vacancy_id"]; ?>">
                                            <p class="h5 mb-2"><?php echo $get_vacancy_rows['vacancy_heading']; ?></p>
                                            <small><?php echo $get_vacancy_rows['vacancy_description']; ?></small>
                                        </div>
                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="vacancy-apply" value="<?php echo $get_vacancy_rows['vacancy_id']; ?>" id="btn-apply-<?php echo $i; ?>" autocomplete="off">
                                            <label class="btn btn-outline-success" for="btn-apply-<?php echo $i; ?>">Print / Apply</label>
                                        </div>
                                    </div>
                                <?php
                                
                                                $apply_msg = null;
                                                $i++;
                                                }
                                            }

                                        } else {
                                            $apply_msg = '<p class="h4 text-center">You have applied to every company available</p>';
                                        }

                                    }   else {
                                        $apply_msg = '<p class="h4 text-center">There are no vacancies to apply for</p>';
                                    }

                                    echo $apply_msg;

                                ?>

                                </div>

                            </div>
                        </div>

                        <div class="tab-pane fade" id="nav-applied" role="tabpanel" aria-labelledby="nav-applied-tab">
                            <div class="card-body">
                                <div class="list-search d-flex w-100 justify-content">

                                    <p class="h4 my-auto">Vacancy List</p>

                                    <div class="ms-auto d-inline-block">
                                        <form id="form-vacancy-unapply-search" class="d-flex">
                                            <input id="vacancy-unapply-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                        </form>
                                    </div>

                                </div>
                                
                                <div class="d-flex mb-4" id="unapply-count">
                                    <p class="h5 ps-4">Vacancies Selected: <span>0</span></p>
                                    <button id="vacancy-unapply-print" class="btn btn-primary ms-auto">Print</button>
                                    <button id="vacancy-unapply-btn" class="btn btn-danger btn-block ms-1">Unapply</button>
                                </div>

                                <div class="list-group" id="unapply-view">
                                    <?php

                                    $stu_id = $_SESSION['id'];
                                    $check_vacancy_sql = "SELECT * FROM applied_for WHERE student_id='$stu_id'";
                                    $check_vacancy_result = $conn->query($check_vacancy_sql);

                                    if($check_vacancy_result->num_rows > 0){
                                        $i = 0;
                                        while($check_vacancy_row = $check_vacancy_result->fetch_assoc()){

                                            $get_vacancy_sql = "SELECT * FROM vacancies WHERE company_id='$comp_id' AND vacancy_id='$check_vacancy_row[vacancy_id]'";
                                            $get_vacancy_result = $conn->query($get_vacancy_sql);
    
                                            if($get_vacancy_result->num_rows > 0){
                                                $get_vacancy_rows = $get_vacancy_result->fetch_assoc();
                                    ?>
                                    <div class="list-group-item d-flex">
                                        <div class="vacancy-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-vacancy" data-vacancy-item="<?php  echo $get_vacancy_rows["vacancy_id"]; ?>">
                                            <p class="h5 mb-2"><?php echo $get_vacancy_rows['vacancy_heading']; ?></p>
                                            <small><?php echo $get_vacancy_rows['vacancy_description']; ?></small>
                                        </div>
                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="vacancy-unapply" value="<?php echo $get_vacancy_rows['vacancy_id']; ?>" id="btn-unapply-<?php  echo $i; ?>" autocomplete="off">
                                            <label class="btn btn-outline-danger" for="btn-unapply-<?php  echo $i; ?>">Print / Unapply</label>
                                        </div>
                                    </div>
                                    <?php
                                        $i++;
                                            }
                                        }
                                    } else {
                                        echo '<p class="h4 text-center">You have not applied to any vacancies yet!</p>';
                                    }
                                    ?>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="modal fade" id="Modal-view-vacancy" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <p class="h4" id="view-vacancy-heading"></p>
                                <p id="view-vacancy-description"></p>
                                <div id="view-vacancy-file"></div>

                                <div id="view-vacancy-result_box"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>