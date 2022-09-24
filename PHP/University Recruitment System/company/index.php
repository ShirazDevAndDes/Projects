<?php 

    include_once('./resources/header.php');

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
        <?php include_once("./resources/navbar.php"); ?>
            <div class="content p-5">
                
                <div class="list-search d-flex justified-content">
                    
                    <span class="h4 my-auto">Vacancy List</span>

                    <button class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#Modal-add-vacancy">Add Vacancy <i class="bi bi-plus ms-1"></i></button>
                    <div class="modal fade" id="Modal-add-vacancy" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                
                                    <form id="form-add-vacancy" class="p-4" method="post" action="#" enctype="multipart/form-data">
                                        <p class="h4 mb-4">Add Vacancy</p>
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="vac-heading" name="vac-heading" placeholder="Heading">
                                            <label for="vac-heading">Heading</label>
                                        </div>
                                        <div class="form-floating">
                                            <textarea class="form-control" id="vac-des" name="vac-des" placeholder="Description" style="height: 100px;"></textarea>
                                            <label for="vac-des">Description</label>
                                        </div>
                                        <div class="mb-4">
                                            <label for="formFile" class="form-label">Upload File</label>
                                            <input class="form-control" type="file" id="formFile" name="vac-file">
                                        </div>
                                        <div class="hidden" id="add-vacancy-result_box"></div>
                                        <button class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ms-auto d-inline-block">
                        <form id="form-vacancy-search" class="d-flex">
                            <input id="vacancy-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                
                <div class="list-group list-group-flush" id="vacancy_view">
                    <?php

                    $comp_id = $_SESSION['id'];
                    
                    $vac_sql = "SELECT * FROM vacancies WHERE company_id='$comp_id'";
                    $vac_result = $conn->query($vac_sql);
                    if($vac_result->num_rows > 0){
                        while ($vac_row = $vac_result->fetch_assoc()) {

                            $check_applied_sql = "SELECT student_id FROM applied_for WHERE vacancy_id='$vac_row[vacancy_id]'";
                            $check_applied_result = $conn->query($check_applied_sql);
                            $applied_stu =  $check_applied_result->num_rows;

                    ?>
                    <div class="list-group-item list-group-item-action d-flex">
                        <div class="w-75 vacancy-item" data-vacancy-item="<?php echo $vac_row['vacancy_id'] ?>" data-bs-toggle="modal" data-bs-target="#Modal-update-vacancy">
                            <p class="h5 mb-2"><?php echo $vac_row['vacancy_heading']; ?></p>
                            <small><?php echo $vac_row['vacancy_description']; ?></small>
                        </div>
                        <div class="list-group-btn w-25">
                            <button class="btn btn-success applied-student" data-vacancy-item="<?php echo $vac_row['vacancy_id'] ?>" data-bs-toggle="modal" data-bs-target="#Modal-applied-students">
                                Students Applied: 
                                <?php echo $applied_stu; ?>
                            </button>
                        </div>
                    </div>
                    
                    <?php
                        }
                    } else {
                        echo '<div class="card">
                            <div class="card-body">No Vacancies Available</div>
                        </div>';
                    }

                    ?>
                </div>
                

                <div class="modal fade" id="Modal-update-vacancy" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-body">
                        <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <form id="form-update-vacancy" class="p-4" method="post" action="#" enctype="multipart/form-data">
                                    <input type="hidden" name="vac-id" id="vac-id" value="">
                                    <p class="h4 mb-4">Vacancy Info: </p>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="vac-heading" name="vac-heading" placeholder="Heading" value="">
                                        <label for="vac-heading">Heading</label>
                                    </div>
                                    <div class="form-floating">
                                        <textarea class="form-control" id="vac-des" name="vac-des" placeholder="Description" style="height: 100px;"></textarea>
                                        <label for="vac-des">Description</label>
                                    </div>
                                    <div class="" id="upload-file">                                           
                                    </div>
                                    <input class="form-control mb-4" type="file" id="formFile" name="vac-file">
                                    <div class="hidden" id="update-vacancy-result_box"></div>
                                    <button class="btn btn-primary">Save Changes</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="Modal-applied-students" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                            <div class="btn-group d-flex" role="group" aria-label="Basic example">
                                <button type="button" class="w-25 btn btn-primary" id="stu-select-all">Select All</button>
                                <button type="button" class="w-25 btn btn-success" id="stu-print">Print: <span>0</span></button>
                                <button type="button" class="w-25 btn btn-success" id="stu-download">Download: <span>0</span></button>
                            </div>

                            <form id="form-applied-students" class="p-4" method="post" action="#">
                            
                                <div class="row applied-students-list row-cols-4"></div>

                                <div id="applied-students-result_box"></div>

                            </form>

                            <din id="DivIdToPrint" style="display: none;"></din>
                            <div id="secretIFrame" style="display:none; visibility:hidden;"></div>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>