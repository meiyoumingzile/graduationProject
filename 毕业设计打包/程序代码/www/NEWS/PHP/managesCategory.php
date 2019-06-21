<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="http://localhost/NEWS/CSS/addNews.css">
        <script type='text/javascript' src="http://localhost/NEWS/JS/public.js"></script>
        <link href="/pics/tit.ico" rel="shortcut icon">
    </head>
    <body>
    <?php   
        include 'public.php';
        function drawHtml(){
            echo "<a href='http://localhost/NEWS/myNewsHome_html.php'>回到主页</a><br>";
            $sql="select * from category";
            $conn=consql();
            $category=array();
            if($conn){
                $res=mysqli_query($conn,$sql);
                $kindNewsArr=array();
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $kindNewsArr[]= $row[1];
                    $category[]=$row;
                }
            }
            echo "<label class='lab'>当前的新闻分类有：</label><br>";
            echo "<table border='1'>";
            echo "<tr><td>类别编号</td><td>类别名称</td></tr>";
            foreach($category as $arr){
                echo "<tr>";
                foreach($arr as $a){
                    echo "<td>$a</td>";
                }
                echo "<td><button id='delete$arr[0]'>删除</button></td>";
                echo "<td><button id='update$arr[0]'>修改成:</button>";
                echo "<input type=\"text\" id=\"text$arr[0]\" /></td>";
                echo "</tr>";
            }
            echo "</table><br>";
            
            echo "<br><br><label class='lab'>添加新闻分类：</label><br>";
            echo "<label class='lab'>类别名称：</label><input type=\"text\" id='cname' /><br> ";
            echo "<button id=submit>确认添加</button>";
            return  $category;
        }
        function drawJS($category){
            /*
             * 添加监听：
             */
            $len=count($category);
            $url="delNewsKind.php";
            $method="post";
            $fun="success";
            $self="managesCategory.php";
            echo "<script language='javascript'>";
            echo 
            "
                function success1(str){
                    alert(\"删除成功\");
                    window.location.href=\"$self\";
                };
                function success2(str){
                    alert(\"修改成功\");
                    window.location.href=\"$self\";
                };";
                for($i=0;$i<$len;$i++){
                    $cid=$category[$i][0];
                    $data="{\\\"cid\\\":\\\"$cid\\\"}";
                    echo"document.getElementById(\"delete$cid\").onclick = function(){
                            data=\"$data\";
                            httpCon(\"$url\",data,\"$method\",success1);
                        };
                        document.getElementById(\"update$cid\").onclick = function(){
                            str=document.getElementById(\"text$cid\").value;
                            data=\"{\\\"cid\\\":\\\"$cid\\\",\\\"cname\\\":\\\"\" +str+\"\\\"}\";
                            if(str==\"\"){
                                alert(\"输入不能为空\");
                            }else{
                                httpCon(\"updateNewsKind.php\",data,\"$method\",success2);
                            }
                            
                        };
                    ";
                }
                $method="post";
                $self="managesCategory.php";
                $url="addNewsKind.php";
            echo "
                function success3(str){
                    res=str==1?\"添加成功\":\"该类别名称已经存在\";
                    alert(res);
                    window.location.href=\"$self\";
                }
               
                document.getElementById(\"submit\").onclick= function(){
                    str=document.getElementById(\"cname\").value;
                    data=\"{\\\"cname\\\":\\\"\"+str+\"\\\"}\";
                    httpCon(\"$url\",data,\"$method\",success3);
                }
                ";
                
            echo "</script>";
        }
        drawJS(drawHtml());
        
    ?>
    </body>
</html>

 
