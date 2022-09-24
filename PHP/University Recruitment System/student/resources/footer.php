
    <script src="/js/jquery.min.js"></script>
    <!-- <script src="/js/materialize.min.js"></script> -->
    <script src="/js/bootstrap.min.js"></script>
    <script src="./js/main.js"></script>

    <?php
    
    if(isset($scripts)){
        foreach ($scripts as $key => $value) {
            if(!empty($value)){
                echo '<script src="'. $value .'"></script>';       
            }   
        }
    }

    ?>

    </body>
</html>