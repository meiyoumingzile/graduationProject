<html>
    <head>
        <meta charset="UTF-8">
        <title>管理员</title>
        <link rel="stylesheet" type="text/css" href="CSS/myTicketAdmin.css">
        <script type='text/javascript' src="JS/public.js"></script>
    </head>
    <body>
       <div id="top">
            <div id="top_left"><a href="myTicketHome.php">回到主页</a></div>
            <div id="top_right"><a></a></div>
        </div>
        <div id="box">
            <div class="box_op"><a>剧目</a></div>
            <div class="box_op"><a>剧场</a></div>
            <div class="box_op"><a>演出安排</a></div>
            <div class="box_op"><a>财务</a></div>
        </div>
        <div id="main">
        <?php
            include 'PHP/showAdmin.php';
        ?>
        </div>
        <div id="d"></div>
        <script type="text/javascript" src="JS/onLoad/onLoadAdmin.js"></script>
         
    </body>
</html>
