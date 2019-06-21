<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="http://localhost/NEWS/CSS/myNews.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
        <script type='text/javascript' src="http://localhost/NEWS/JS/public.js"></script>
    </head>
    <body>
    <ul>
    <?php 
        include 'public.php';
        function drawJS($press,$maxNewsCount){
            $page=isset($_GET['page'])?$_GET['page']:0;
            echo "<script language='javascript'>";
            echo "
                function success(str){
                    res=str==1?\"删除成功\":\"删除失败\";
                    alert(res);
                };
            ";
            foreach($press as $arr){
                echo "
                    document.getElementById(\"update$arr[0]\").onclick=function(){
                        window.location.href=\"addNews.php?id=$arr[0]\";
                    };
                    
                    document.getElementById(\"delete$arr[0]\").onclick=function(){
                        data=\"{\\\"pid\\\":\\\"$arr[0]\\\"}\";
                        httpCon(\"delNews.php\",data,\"post\",success);
                        window.location.href=\"myNews.php\";
                    };
                ";
            }
            
            $previous=$page==0?0:($page-1);
            $next=count($press)<$maxNewsCount?$page:($page+1);
            echo "
                document.getElementById(\"previous\").onclick=function(){
                    window.location.href=\"myNews.php?page=$previous\";
                };
                document.getElementById(\"next\").onclick=function(){
                    window.location.href=\"myNews.php?page=$next\";
                };
                ";
            echo "</script>";
        }
        addHtml_a("http://localhost/NEWS/myNewsHome_html.php", "返回首页", "return");
        echo "<br>你所发的新闻列表:<br>";
        $uname=$_COOKIE['logonState'];
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxNewsCount=10;
        $down=$maxNewsCount*$page;
        $conn=consql();
        if($conn){
            $sql="select pid,ptitle,review from press where uname='$uname' order by pdate desc limit $down,$maxNewsCount;";
            $press=array();
            if($res=mysqli_query($conn,$sql)){
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $press[]=$row;
                }
                echo "<table border='0'>";
                foreach($press as $arr){
                    echo "<tr>";
                    $st=$arr[2]==0?"未通过":"通过";
                    echo "<th><a>(审核状态：$st) </a></th>";
                    echo "<th>";
                    addHTML_a("seeNews.php?pid=$arr[0]",$arr[1],"text_a");
                    echo "</th>";
                    echo "<th><button id=\"update$arr[0]\">修改</button></th>";
                    echo "<th><button id=\"delete$arr[0]\">删除</button></th>";
                    echo "</tr>";
                }
                echo "<tr><th><button id=\"previous\">上一页</button></th>
                    <th><button id=\"next\">下一页</button></th></tr>";
                echo "</table>";
                echo "</table>";
                drawJS($press,$maxNewsCount); 
            }
        }
    ?>
    </ul>
    </body>
</html>


