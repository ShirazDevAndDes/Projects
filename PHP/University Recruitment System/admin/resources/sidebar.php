<div class="sidebar col-2">

    <?php
        if(empty($_SESSION["profile_img"])){
            $profile_img = "/uploads/admin/images/no-image.png";
        } else {
            $profile_img = "/uploads/admin/images/". $_SESSION['profile_img'];
        }
    ?>

    <div class="sidebar-img">

        <img class="img-fluid" src="/uploads/admin/images/<?php echo $_SESSION['profile_img'] ?>" alt="user">
    </div>
    <ul class="list-unstyled sidebar-list">

        <li><a href="./dashboard.php">Dashboard</a></li>
        <li><a href="./students.php">Student</a></li>
        <li><a href="./companies.php">Company</a></li>
        
    </ul>
</div>