<html>
    <head>
        <meta charset="UTF-8">
        <title>新闻首页</title>
        <link rel="stylesheet" type="text/css" href="CSS/myNewsHome.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
        <script type='text/javascript' src="JS/public.js"></script>
    </head>
    <body>
        <div id="mytop"></div>
        <div id="crevice">
            <div id="d"></div>
        </div>
        
        <div id="main">
            <div id="main_line1"></div>
            <div id="main_opbox">
                 <?php
                    include 'PHP/showOpbox.php';
                 ?>
            </div>
            <div id="main_line2"></div>
            <div id="main_conadv">
                <div id="main_con">
                    <div id="main_con_text">
                        
                        <?php
                        include 'PHP/showNewsList.php';
                        ?>
                                    
                    </div>
                </div>
                <div id="main_adv"></div>
            </div>
        </div>
        <script type="text/javascript" src="JS/myNewsHome/onLoad.js"></script>
         
    </body>
</html>
