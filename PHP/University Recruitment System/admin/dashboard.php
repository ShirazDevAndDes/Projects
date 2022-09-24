<?php 

    include_once('./resources/header.php');

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once('./resources/sidebar.php'); ?>
        <div class="col-10 p-0">
        <?php include_once('./resources/navbar.php'); ?>
            <div class="content p-5">
                <div class="row">
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="h2 card-title text-center mb-4">Students</div>
                                <div class="h4 card-text text-center">
                                    <?php
                                        $get_approved_stu_sql = "SELECT * FROM student WHERE student_approved=1";
                                        $get_approved_stu_result = $conn->query($get_approved_stu_sql);
                                        $approved_stu_count = $get_approved_stu_result->num_rows;

                                        $get_unapproved_stu_sql = "SELECT * FROM student WHERE student_approved=0";
                                        $get_unapproved_stu_result = $conn->query($get_unapproved_stu_sql);
                                        $unapproved_stu_count = $get_unapproved_stu_result->num_rows;
                                    ?>
                                    <div class="row">
                                        <div class="col-6">
                                            <p>Approved</p>
                                            <p><?php echo $approved_stu_count; ?></p>
                                        </div>
                                        <div class="col-6">
                                            <p>Unapproved</p>
                                            <p><?php echo $unapproved_stu_count; ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="h2 card-title text-center mb-4">Company</div>
                                <div class="h4 card-text text-center">
                                    <?php
                                        $get_approved_comp_sql = "SELECT * FROM company WHERE company_approved=1";
                                        $get_approved_comp_result = $conn->query($get_approved_comp_sql);
                                        $approved_comp_count = $get_approved_comp_result->num_rows;

                                        $get_unapproved_comp_sql = "SELECT * FROM company WHERE company_approved=0";
                                        $get_unapproved_comp_result = $conn->query($get_unapproved_comp_sql);
                                        $unapproved_comp_count = $get_unapproved_comp_result->num_rows;
                                    ?>
                                    <div class="row">
                                        <div class="col-6">
                                            <p>Approved</p>
                                            <p><?php echo $approved_comp_count; ?></p>
                                        </div>
                                        <div class="col-6">
                                            <p>Unapproved</p>
                                            <p><?php echo $unapproved_comp_count; ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>