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
        $page=isset($_GET['page'])?$_GET['page']:0;
        function drawJS($press,$maxNewsCount){

            $page=isset($_GET['page'])?$_GET['page']:0;
            echo "<script language='javascript'>";
            echo "
                function success1(str){
                    res=(str==1?\"已经允许该条新闻发布\":\"访问数据库失败\");
                    alert(res);
                    window.location.href=\"managesPress.php?page=$page\";
                };
                function success2(str){
                    res=str==1?\"删除成功\":\"删除失败\";
                    alert(res);
                    window.location.href=\"managesPress.php?page=$page\";
                };
            ";
            foreach($press as $arr){
                $data="{\\\"pid\\\":\\\"$arr[0]\\\"}";
                if($arr[2]==0){
                    echo "
                        document.getElementById(\"review$arr[0]\").onclick=function(){
                            data=\"$data\";
                            httpCon(\"updateNewsReview.php\",data,\"post\",success1);
                        };
                    ";
                }
                echo "
                document.getElementById(\"delete$arr[0]\").onclick=function(){
                    data=\"$data\";
                    httpCon(\"delNews.php\",data,\"post\",success2);
                };
                ";
            }
            $previous=$page==0?0:($page-1);
            $next=count($press)<$maxNewsCount?$page:($page+1);
             echo "
                document.getElementById(\"previous\").onclick=function(){
                    window.location.href=\"managesPress.php?page=$previous\";
                };
                document.getElementById(\"next\").onclick=function(){
                    window.location.href=\"managesPress.php?page=$next\";
                };
                ";
            echo "</script>";
        }
        addHtml_a("http://localhost/NEWS/myNewsHome_html.php", "返回首页", "return");
        echo "<br>待审核的新闻列表:<br>";
        $maxNewsCount=10;
        $down=$page*$maxNewsCount;
        $conn=consql();
        if($conn){
            $sql="select pid,ptitle,review from press order by pdate desc limit $down,$maxNewsCount;";
            $press=array();
            if($res=mysqli_query($conn,$sql)){
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $press[]=$row;
                }
                echo "<table border='0'>";
                foreach($press as $arr){
                    echo "<tr>";
                    echo "<th>";
                    addHTML_a("seeNews.php?pid=$arr[0]",$arr[1],"text_a");
                    echo "</th>";
                    if($arr[2]==0){
                        echo "<th><button id=\"review$arr[0]\">通过审核</button></th>";
                    }else{
                        echo "<th><label >已经过审</label></th>";
                    }
                    echo "<th><button id=\"delete$arr[0]\">删除</button></th>";
                    echo "</tr>";
                }
                echo "<tr><th><button id=\"previous\">上一页</button></th>
                    <th><button id=\"next\">下一页</button></th></tr>";
                echo "</table>";
              
                drawJS($press,$maxNewsCount); 
            }
        }
    ?>
    </ul>
    </body>
</html>


