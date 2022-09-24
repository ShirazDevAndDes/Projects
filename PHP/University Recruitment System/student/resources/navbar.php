<?php

    if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true){

?>

<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><?php echo $_SESSION['username']; ?></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <?php echo $_SESSION['username']; ?>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="profile.php">Profile</a></li>
                <li><a class="dropdown-item" data-bs-toggle="modal" href="#Modal-upload-resume">Resume</a></li>
                <li><hr class="dropdown-divider mb-0"></li>
                <li><a class="dropdown-item logout-btn" href="./resources/logout.php">Logout</a></li>
            </ul>
            </li>
        </ul>
        </div>
    </div>
</nav>

<div class="modal fade" id="Modal-upload-resume" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

                <form id="form-upload-resume" class="p-4" method="post" action="#" enctype="multipart/form-data">
                    <p class="h4 mb-4">Upload Resume</p>

                    <?php
                    
                        $stu_id = $_SESSION['id'];

                        $check_resume_sql = "SELECT resume_file FROM resumes WHERE student_id='$stu_id'";
                        $check_resume_result = $conn->query($check_resume_sql);
                        
                    
                        if($check_resume_result->num_rows > 0){
                            $check_resume_row = $check_resume_result->fetch_assoc();

                            if(file_exists("../uploads/student/files/". $check_resume_row['resume_file'])){

                                $file_ext = strtolower(pathinfo($check_resume_row['resume_file'], PATHINFO_EXTENSION));
                                if($file_ext == "pdf"){
                                    $download_btn_text = "View / Download Uploaded Resume";
                                } else {
                                    $download_btn_text = "Download Uploaded Resume";
                                }

                                echo '
                                <div id="resume-uploaded-file">
                                    <p>You have Uploaded a resume: </p>
                                    <a href="../uploads/student/files/'. $check_resume_row['resume_file'] .'" class="btn btn-primary mb-3" id="resume-file" target="_blank">'. $download_btn_text .' <i class="bi bi-file-earmark-arrow-down"></i></a>
                                </div>
                                ';

                            }

                        }

                    ?>

                    <div class="mb-4">
                        <label for="formFile" class="form-label">Upload File</label>
                        <input class="form-control" type="file" id="formFile" name="resume-file">
                    </div>
                    <div class="hidden" id="upload-resume-result_box"></div>
                    <button class="btn btn-primary">Upload</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php } ?>