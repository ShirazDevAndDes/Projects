
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/main.js"></script>

    <?php
        if(!empty($js_script)){
            foreach ($js_script as $script) {
                echo '<script src="'. $script .'"></script>';
            }
        }
    ?>

    </body>
</html>