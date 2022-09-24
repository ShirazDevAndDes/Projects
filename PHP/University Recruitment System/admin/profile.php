<?php 

    include_once('./resources/header.php');

    $admin_login_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://". $_SERVER['HTTP_HOST'] ."/admin";

    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] == false){
        header("Location: ". $admin_login_link);
        exit;
    }

?>

<div class="container-fluid">
    <div class="row">
    <?php include_once("./resources/sidebar.php"); ?>
        <div class="col-10 p-0">
            <?php include_once("./resources/navbar.php"); ?>
            <div class="content p-5">
                <!-- TODO: Check in all profile pages that input stu-img does also check stu-img-link in all profile pages -->
            <input type="hidden" id="admin-img-link" value="../uploads/admin/images/<?php echo $_SESSION['profile_img']; ?>">
                <form class="bg-white p-5" id="admin-profile-form" enctype="multipart/form-data">
                    <h4 class="mb-3">Profile Info</h4>

                    <?php
                    
                    $admin_sql = "SELECT * FROM urs_admin WHERE admin_id='$_SESSION[id]'";
                    $result = $conn->query($admin_sql);
                    $row = $result->fetch_assoc();

                    ?>
                    
                    <input type="hidden" id="admin-id" name="admin-id" value="<?php echo $row['admin_id']; ?>">

                    <div class="row">
                        <div class="col-2" id="profile-img" style="position: relative;">
                            <div class="upload_profile_img">
                                <div class="add_img_button active">
                                    <div class="add_img_content">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-images" viewBox="0 0 16 16">
                                        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                                        </svg>
                                        <p>Add Profile Image</p>
                                    </div>
                                </div>
                                <div class="remove_img_button" id="remove-profile-img">
                                    <div class="remove_img_content">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
                                        <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                        </svg>
                                        <p>Deleted Uploaded Image</p>
                                    </div>
                                </div>
                                <input class="form-control" type="file" id="admin-img-file" name="admin-img-file">
                            </div>
                            <?php
                                if(empty($_SESSION["profile_img"])){
                                    echo '<img class="img-fluid rounded-2" id="admin-img" src="../uploads/assets/images/no-image.png" />';
                                } else {
                                    echo '<img class="img-fluid rounded-2" id="admin-img" src="../uploads/admin/images/'. $_SESSION["profile_img"] .'"/>';
                                }
                            ?>
                        </div>
    
                        <div class="col-9">
    
                            <div class="form-floating">
                                <input type="text" class="form-control" id="admin-name" name="admin-name" value="<?php echo $row['admin_name']; ?>" placeholder="Username">
                                <label class="form-label" for="admin-name">Username</label>
                            </div>
                            <div class="form-floating">
                                <input type="email" class="form-control" id="admin-email" name="admin-email" value="<?php echo $row['admin_email']; ?>" placeholder="Email">
                                <label for="admin-email">Email</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control" id="admin-pass" name="admin-pass" placeholder="Password">
                                <label for="admin-pass">Password</label>
                            </div>
                        </div>
                    </div>


                    <div id="result_box" class="mt-4"></div>
                    <button class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>    
</div>

<?php include_once('./resources/footer.php'); ?>