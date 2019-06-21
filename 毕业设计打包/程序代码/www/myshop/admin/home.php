<head>
  <meta charset="utf-8">
  <title>管理员首页</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link rel="stylesheet" href="css/home.css">
  <!---jQuery Files-->
  <script src="js/jquery-1.7.1.min.js"></script>
  <script src="js/jquery-ui-1.8.17.min.js"></script>
  <script src="js/styler.js"></script>
  <script src="js/jquery.tipTip.js"></script>
  <script src="js/colorpicker.js"></script>
  <script src="../JS/public.js"></script>
</head>
<body>
    <?php
    include '../PHP/public.php';
    judgeAdmin();
    echo readFileHTML("adminHeader.html");
    
    ?>
<div id="main">
</div>

</body>
</html>