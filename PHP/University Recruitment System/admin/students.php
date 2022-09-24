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

                        <div class="list-search d-flex pb-3 w-100 justify-content-between">
                                <p class="h4 my-auto">Student List</p>
                                <div>
                                    <form id="form-student-activate-search" class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" id="student-activate-search" aria-label="Search">
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>

                            <div class="d-flex mb-3">
                                <p class="d-inline h4" id="student-activate-count">Selected Students: <span>0</span></p>
                                <button class="btn btn-success ms-auto" id="student-activate">Activate Accounts</button>
                            </div>

                            <div id="student-activate-list" class="list-group pb-3">

                                <?php
                                    $stu_activate_sql = "SELECT * FROM student WHERE student_approved='0'";
                                    $stu_activate_result = $conn->query($stu_activate_sql);
                                    if($stu_activate_result->num_rows > 0){
                                        $i = 0;
                                    while($stu_activate_row = $stu_activate_result->fetch_assoc()) {
                                ?>

                                    <div class="list-group-item d-flex p-0">

                                        <div class="student-item w-75" data-student="<?php echo $stu_activate_row['student_id']; ?>" data-bs-toggle="modal" data-bs-target="#Modal-student-info">
                                            <p class="h5 mb-2"><?php echo ucfirst($stu_activate_row['student_name']); ?></p>
                                            <small><b>Email:</b> <?php echo $stu_activate_row['student_email']; ?></small>
                                        </div>

                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="student-activate" value="<?php echo $stu_activate_row['student_id']; ?>" id="btn-activate-<?php echo $i; ?>" autocomplete="off">
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

                        <div class="tab-pane card-body fade" id="nav-deactivate" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div class="list-search d-flex pb-3 w-100 justify-content-between">
                                <p class="h4 my-auto">Student List</p>
                                <div>
                                    <form id="form-student-deactivate-search" class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" id="student-deactivate-search" aria-label="Search">
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>

                            <div class="d-flex mb-3">
                                <p class="d-inline h4" id="student-deactivate-count">Selected Students: <span>0</span></p>
                                <button class="btn btn-danger ms-auto" id="student-deactivate">Deactivate Accounts</button>
                            </div>

                            <div id="student-deactivate-list" class="list-group pb-3">

                                <?php
                                    $stu_deactivate_sql = "SELECT * FROM student WHERE student_approved='1'";
                                    $stu_deactivate_result = $conn->query($stu_deactivate_sql);
                                    if($stu_deactivate_result->num_rows > 0){
                                        $i = 0;
                                    while($stu_deactivate_row = $stu_deactivate_result->fetch_assoc()) {
                                ?>

                                    <div class="list-group-item d-flex p-0">

                                        <div class="student-item w-75" data-student="<?php echo $stu_deactivate_row['student_id']; ?>" data-bs-toggle="modal" data-bs-target="#Modal-student-info">
                                            <p class="h5 mb-2"><?php echo ucfirst($stu_deactivate_row['student_name']); ?></p>
                                            <small><b>Email:</b> <?php echo $stu_deactivate_row['student_email']; ?></small>
                                        </div>

                                        <div class="list-group-check w-25">
                                            <input type="checkbox" class="btn-check" name="student-deactivate" value="<?php echo $stu_deactivate_row['student_id']; ?>" id="btn-deactivate-<?php echo $i; ?>" autocomplete="off">
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

                <div class="modal fade" id="Modal-student-info" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body p-4">
                                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                                <h2>Student Details:</h2>

                                <form id="form-student-info" method="POST" action="" data-student="">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="student-name" name="stu-name" placeholder="name" />
                                        <label for="student-name">Name</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="student-email" name="stu-email" placeholder="Email" />
                                        <label for="student-email" >Email</label>
                                    </div>
                                    <div id="student-file"></div>

                                    <button type="submit" class="btn btn-primary mt-4">Update</button>
                                </form>
                                

                                <div id="student-info-result_box"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>