<html>
    <head>
        <meta charset="UTF-8">
        <title>首页</title>
        <link rel="stylesheet" type="text/css" href="CSS/myTicketHome.css">
        <script type='text/javascript' src="JS/public.js"></script>
    </head>
    <body>
        <div id="mytop"></div>
        
        <div id="head">
            <div id="searchOp">
                <select id="searchsel">
                    <option value='byjmmc'>按名称找剧</option>
                    <option value='byjmjs'>按内容介绍找剧</option>
                    <option value='byzyyy'>按演员找剧</option>
                </select>
                <input id="searchtext" name="search"/>
                <a id="searchlink"  name=""><img src="pics/search.png" width="40px" height="40px" /></a>
            </div>
            <div id="d"></div>
        </div>
        
       <div id="liname">
           <HR style="BORDER-RIGHT: #00686b 1px dotted; BORDER-TOP: #00686b 1px dotted; BORDER-LEFT: #00686b 1px dotted; BORDER-BOTTOM: #00686b 1px dotted" noShade SIZE=1>
       </div>
       <div id="repertoireList">
        <?php
            include 'PHP/showHome.php';
        ?>
        </div>
       <script type="text/javascript" src="JS/onLoad/onLoadHome.js"></script>
         
    </body>
</html>
