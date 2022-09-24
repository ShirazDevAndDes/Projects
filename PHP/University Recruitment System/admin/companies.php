<?php include_once('./resources/header.php'); ?>

<div class="container-fluid">
    <div class="row">
    <?php include_once('./resources/sidebar.php'); ?>
        <div class="col-10 p-0">
        <?php include_once('./resources/navbar.php'); ?>
            <div class="content p-5">

                <div class="card">
                    <nav>
                        <div class="nav nav-tabs nav-fill" role="tablist">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-activate" type="button" role="tab">Activate</button>
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-deactivate" type="button" role="tab">Deactivate</button>
                        </div>
                    </nav>
                    <div class="tab-content">
                        <div class="tab-pane card-body fade show active" id="nav-activate" role="tabpanel" aria-labelledby="nav-home-tab">

                        <div class="list-search d-flex w-100 justify-content-between">

                                <p class="h4 my-auto">Company List</p>

                                <div>
                                    <form id="form-company-activate-search" class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" id="company-activate-search" aria-label="Search">
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>

                            </div>

                            <div class="d-flex mb-3">
                                <p class="d-inline h4" id="company-activate-count">Selected Companies: <span>0</span></p>
                                <button class="btn btn-success ms-auto" id="company-activate">Activate Accounts</button>
                            </div>

                            <div id="company-activate-list" class="list-group">

                                <div id="form-company-activate">

                                <?php
                                    $comp_activate_sql = "SELECT * FROM company WHERE company_approved='0'";
                                    $comp_activate_result = $conn->query($comp_activate_sql);
                                    if($comp_activate_result->num_rows > 0){
                                        $i = 0;
                                    while($comp_activate_row = $comp_activate_result->fetch_assoc()) {
                                ?>

                                    <div class="list-group-item d-flex p-0">

                                        <div class="company-item w-75" data-company="<?php echo $comp_activate_row['company_id']; ?>" data-bs-toggle="modal" data-bs-target="#Modal-company-info">
                                            <p class="h5 mb-2"><?php echo ucfirst($comp_activate_row['company_name']); ?></p>
                                            <small><b>Email:</b> <?php echo $comp_activate_row['company_email']; ?></small>
                                        </div>

                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="company-activate" value="<?php echo $comp_activate_row['company_id']; ?>" id="btn-activate-<?php echo $i; ?>" autocomplete="off">
                                            <label class="btn btn-outline-success" for="btn-activate-<?php echo $i; ?>">Activate</label>
                                        </div>

                                    </div>

                                <?php
                                        $i++;
                                        }
                                    } else {
                                        echo '<p class="h5 p-4 text-center">No Accounts Left</p>';
                                    }
                                
                                ?>

                                </div>

                            </div>
                            
                        </div>

                        <div class="tab-pane card-body fade" id="nav-deactivate" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div class="list-search d-flex w-100 justify-content-between">
                                <p class="h4 my-auto">Company List</p>
                                <div>
                                    <form id="form-company-deactivate-search" class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" id="company-deactivate-search" aria-label="Search">
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>

                            <div class="d-flex mb-3">
                                <p class="d-inline h4" id="company-deactivate-count">Selected Companies: <span>0</span></p>
                                <button class="btn btn-danger ms-auto" id="company-deactivate">Deactivate Accounts</button>
                            </div>

                            <div id="company-deactivate-list" class="list-group">

                                <div id="form-company-deactivate">

                                <?php
                                    $comp_deactivate_sql = "SELECT * FROM company WHERE company_approved='1'";
                                    $comp_deactivate_result = $conn->query($comp_deactivate_sql);
                                    if($comp_deactivate_result->num_rows > 0){
                                        $i = 0;
                                    while($comp_deactivate_row = $comp_deactivate_result->fetch_assoc()) {
                                ?>

                                    <div class="list-group-item d-flex p-0">

                                        <div class="company-item w-75" data-company="<?php echo $comp_deactivate_row['company_id']; ?>" data-bs-toggle="modal" data-bs-target="#Modal-company-info">
                                            <p class="h5 mb-2"><?php echo ucfirst($comp_deactivate_row['company_name']); ?></p>
                                            <small><b>Email:</b> <?php echo $comp_deactivate_row['company_email']; ?></small>
                                        </div>

                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="company-deactivate" value="<?php echo $comp_deactivate_row['company_id']; ?>" id="btn-deactivate-<?php echo $i; ?>" autocomplete="off">
                                            <label class="btn btn-outline-danger" for="btn-deactivate-<?php echo $i; ?>">Deactivate</label>
                                        </div>

                                    </div>

                                <?php
                                        $i++;
                                        }
                                    } else {
                                        echo '<p class="h5 p-4 text-center">No Accounts Left</p>';
                                    }
                                
                                ?>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="Modal-company-info" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body p-4">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <h2>Company Details:</h2>

                                <form id="form-company-info" data-company="">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="company-username" name="company-username" placeholder="Company Username">
                                        <label class="form-label" for="comp-username">Company Username</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="company-name" name="comp-name" placeholder="Company Name" />
                                        <label for="company-name">Company Name</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="company-email" name="comp-email" placeholder="Email" />
                                        <label for="company-email" >Email</label>
                                    </div>
                                    <div class="form-floating">
                                        <textarea type="text" class="form-control" id="company-des" name="company-des" style="height: 100px" placeholder="Description"></textarea>
                                        <label class="form-label" for="comp-des">Description</label>
                                    </div>
                                    <div id="company-vacancies"></div>

                                    <button type="submit" class="btn btn-primary">Update</button>
                                </form>
                                

                                <div id="company-info-result_box"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>