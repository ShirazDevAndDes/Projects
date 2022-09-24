<div class="sidebar col-2">
    <?php
    
    if(empty($_SESSION["profile_img"])){
        $profile_img = "../uploads/assets/images/no-image.png";
    } else {
        $profile_img = "../uploads/student/images/". $_SESSION['profile_img'];
    }
    
    ?>
    <div class="sidebar-img">
        <img class="img-fluid" src="<?php echo $profile_img; ?>" alt="user">
    </div>
    <ul class="list-unstyled sidebar-list">
        <li><a href="/student">Vacancy List</a></li>
        <!-- <li><a href="resume.php">Resume</a></li> -->
    </ul>
</div>