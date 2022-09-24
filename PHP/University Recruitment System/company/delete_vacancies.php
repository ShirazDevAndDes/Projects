<?php 

    include_once('./resources/header.php');

    $company_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/company_log_reg.php";

    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] == false){
        header("Location: ". $company_login_link);
        exit;
    }

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
        <?php include_once("./resources/navbar.php"); ?>

            <div aria-live="polite" aria-atomic="true" class="position-relative">
                <!-- Position it: -->
                <!-- - `.toast-container` for spacing between toasts -->
                <!-- - `.position-absolute`, `top-0` & `end-0` to position the toasts in the upper right corner -->
                <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->
                <div class="toast-container position-absolute top-0 end-0 p-3">

                    <!-- Then put toasts within -->
                    <div class="toast toast-error bg-danger text-white" role="alert" aria-live="assertive" aria-atomic="true" >
                        <div class="toast-header">
                            <strong class="me-auto">Error</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            See? Just like this.
                        </div>
                    </div>

                    <div class="toast toast-success bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true" >
                        <div class="toast-header">
                            <strong class="me-auto">Success</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            See? Just like this.
                        </div>
                    </div>

                </div>
            </div>

            <div class="content p-5">
                
                <div class="list-search d-flex justified-content">
                    
                    <span class="h4 my-auto">Vacancy List</span>

                    <div class="ms-auto d-inline-block">
                        <form id="form-vacancy-delete-search" class="d-flex">
                            <input id="vacancy-delete-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
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

                    ?>
                    <div class="list-group-item list-group-item-action d-flex">
                        <div class="w-75 view-vacancy-item" data-vacancy-item="<?php echo $vac_row['vacancy_id'] ?>" data-bs-toggle="modal" data-bs-target="#Modal-view-vacancy">
                            <p class="h5 mb-2"><?php echo $vac_row['vacancy_heading']; ?></p>
                            <small><?php echo $vac_row['vacancy_description']; ?></small>
                        </div>
                        <div class="list-group-btn w-25">
                            <button class="btn btn-danger delete-vacancy" data-vacancy-item="<?php echo $vac_row['vacancy_id'] ?>" >
                                Delete Vacancy
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
                

                <div class="modal fade" id="Modal-view-vacancy" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <p class="h4" id="vac-heading"></p>
                                <br />
                                <p class="h5">Description:</p>
                                <p id="vac-des"></p>
                                <br />
                                <div id="upload-file"></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>