<div class="sidebar col-2">
    <?php
    
    if($_SESSION['profile_img'] == null){
        $profile_img = "../uploads/assets/images/no-image.png";
    } else {
        $profile_img = "../uploads/company/images/". $_SESSION['profile_img'];
    }
    
    ?>

    <div class="sidebar-img">
        <img class="img-fluid" src="<?php echo $profile_img; ?>" alt="user">
    </div>
    <ul class="list-unstyled sidebar-list">
        <li>
            <a data-bs-toggle="collapse" href="#vacancycollapse">Vacancy <i class="bi bi-caret-right-fill "></i></a>
            <div class="collapse" id="vacancycollapse">
                <ul class="list-unstyled">
                    <li><a href="./">Add/View Vacancies</a></li>
                    <li><a href="./delete_vacancies.php">Delete Vacancies</a></li>
                </ul>
            </div>
        </li>
        <!-- <li><a href="./applied_students">Applied Students</a></li> -->
    </ul>
</div>