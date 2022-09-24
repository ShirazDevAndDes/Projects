<?php include_once('./resources/header.php'); ?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
        <?php include_once("./resources/navbar.php"); ?>
            <div class="content p-5">
                
                <div class="list-search d-flex justified-content">
                    
                    <span class="h4 my-auto">Vacancy List</span>

                    <div class="ms-auto d-inline-block">
                        <form id="form-vacancy-search" class="d-flex">
                            <input class="form-control me-2" id="vacancy-search" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>

                </div>
                
                <div class="list-group list-group-flush" id="vacancy_view">
                    <?php
                    
                    $vac_sql = "SELECT * FROM vacancies WHERE company_id='$_GET[company]'";
                    $vac_result = $conn->query($vac_sql);
                    if($vac_result->num_rows > 0){
                        while ($vac_row = $vac_result->fetch_assoc()) {
                    ?>
                    <div class="list-group-item list-group-item-action d-flex">
                        <div class="w-75 vacancy-item" data-company="<?php echo $_GET['company']; ?>" data-vacancy-item="<?php echo $vac_row['vacancy_id'] ?>" data-bs-toggle="modal" data-bs-target="#Modal-update-vacancy">
                            <p class="h5 mb-2"><?php echo $vac_row['vacancy_heading']; ?></p>
                            <small><?php echo $vac_row['vacancy_description']; ?></small>
                        </div>
                        <div class="list-group-btn w-25">
                        <?php 
                                
                            $check_applied_sql = "SELECT student_id FROM applied_for WHERE vacancy_id='$vac_row[vacancy_id]'";
                            $check_applied_result = $conn->query($check_applied_sql);
                            $applied_stu =  $check_applied_result->num_rows;

                        ?>
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
                            <div class="card-body">no rows available</div>
                        </div>';
                    }

                    ?>
                </div>
                

                <div class="modal fade" id="Modal-update-vacancy" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <p class="h4 mb-4">Heading: <span id="vac-view-heading"></span></p>
                                <p class="h5">Description:</p>
                                <p class="mb-4" id="vac-view-des"></p>
                                <div id="upload-view-file"></div>

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
                                <button type="button" class="w-50 btn btn-primary" id="stu-select-all">Select All</button>
                                <button type="button" class="w-50 btn btn-success" id="stu-download">Download: <span></span></button>
                            </div>

                            <form id="form-applied-students" class="p-4" method="post" action="#">
                            
                                <div class="row applied-students-list row-cols-4"></div>

                                <div id="applied-students-result_box"></div>

                            </form>

                            <iframe id="secretIFrame" src="" style="display:none; visibility:hidden;"></iframe>
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>