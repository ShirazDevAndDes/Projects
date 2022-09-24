<?php 

    include_once('./resources/header.php');

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
            <?php include_once("./resources/navbar.php"); ?>
            <div class="content p-5">

                <div class="card">

                    <div class="card-body">
                        <div class="list-search d-flex w-100 justify-content">

                            <p class="h4 my-auto">Company List</p>

                            <div class="ms-auto d-inline-block">
                                <form id="form-company-view-search" class="d-flex">
                                    <input id="company-view-search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>

                        </div>

                        <div class="list-group" id="company-view">
                            
                        <?php

                            $get_company_sql = "SELECT * FROM company WHERE company_approved=1";
                            $get_company_result = $conn->query($get_company_sql);

                            if($get_company_result->num_rows > 0){

                                    while ($get_company_rows = $get_company_result->fetch_assoc()) {

                                        $get_vac_sql = "SELECT * FROM vacancies WHERE company_id='$get_company_rows[company_id]'";
                                        $get_vac_result = $conn->query($get_vac_sql);
                                        $vacancy_count = $get_vac_result->num_rows;
                        ?>
                            <div class="list-group-item d-flex">
                                <div class="company-item w-75" data-bs-toggle="modal" data-bs-target="#Modal-view-company" data-company-item="<?php  echo $get_company_rows["company_id"]; ?>">
                                    <p class="h5 mb-2"><?php echo $get_company_rows['company_name']; ?></p>
                                    <small><?php echo $get_company_rows['company_description']; ?></small>
                                </div>
                                <div class="list-group-check w-25">
                                    <a href="view_vacancies.php?company=<?php echo $get_company_rows["company_id"]; ?>" class="btn btn-outline-success">Vacancies: <?php echo $vacancy_count; ?></a>
                                </div>
                            </div>
                        <?php
                        
                                    }

                            }   else {
                                $apply_msg = '<p class="h4 text-center">There are no vacancies to apply for</p>';
                            }

                        ?>

                        </div>

                    </div>

                </div>
                
                <div class="modal fade" id="Modal-view-company" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <p class="h4" id="view-company-name"></p>
                                <p class="h5" id="view-company-email"></p>
                                <p class="h5">Description:</p>
                                <p id="view-company-description"></p>

                                <div id="view-company-result_box"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>