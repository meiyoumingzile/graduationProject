<head>
    <meta charset="utf-8">
  <title>管理员-分类</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link rel="stylesheet" href="css/home.css">
    <link href="css/kind.css" rel="stylesheet">
  <!---jQuery Files-->
  <script src="js/jquery-1.7.1.min.js"></script>
  <script src="js/jquery-ui-1.8.17.min.js"></script>
  <script src="js/styler.js"></script>
  <script src="js/jquery.tipTip.js"></script>
  <script src="js/colorpicker.js"></script>
  <script src="../JS/public.js"></script>
  
</head>
<body >
<?php
    include '../PHP/public.php';
    judgeAdmin();
    /*if(isset($_COOKIE['jur'])&&$_COOKIE['jur']>=3){
        
    }else{
        echo "你的权限不够,不能使用该功能";
    }*/
    function drawJS($category){
        if(!isset($category))
            return;
        /*
         * 添加监听：
         */
        $len=count($category);
        $url="php/deleteGoodsKind.php";
        $method="post";
        $fun="success";
        $self="kind.php";
        echo "<script>";
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
                $id=$category[$i][0];
                $data="{\\\"id\\\":\\\"$id\\\"}";
                echo"document.getElementById(\"delete$id\").onclick = function(){
                        data=\"$data\";
                        httpCon(\"$url\",data,\"$method\",success1);
                    };
                    document.getElementById(\"update$id\").onclick = function(){
                        str=document.getElementById(\"text$id\").value;
                        data=\"{\\\"id\\\":\\\"$id\\\",\\\"name\\\":\\\"\" +str+\"\\\"}\";
                        if(str==\"\"){
                            alert(\"输入不能为空\");
                        }else{
                            httpCon(\"php/updateGoodsKind.php\",data,\"$method\",success2);
                        }

                    };
                ";
            }
            $method="post";
            $self="kind.php";
            $url="php/addGoodsKind.php";
        echo "
            function success3(str){
                res=str==1?\"添加成功\":\"该类别名称已经存在\";
                alert(res);
                window.location.href=\"$self\";
            }

            document.getElementById(\"submit\").onclick= function(){
                str=document.getElementById(\"name\").value;
                if(str.length>0){
                    data=\"{\\\"name\\\":\\\"\"+str+\"\\\"}\";
                    httpCon(\"$url\",data,\"$method\",success3);
                }else{
                    alert('添加的类别不能为空');
                }
            }
            ";

        echo "</script>";
    }
    function drawHTML($down,$cnt){
        echo "<div class='tab'>";
        $sql="select * from kind ORDER BY id DESC limit $down,$cnt";
        $con= consql();
        $arr=array();
        if($con){
            $res=mysqli_query($con,$sql);
            while($row= mysqli_fetch_array($res,MYSQL_NUM)){
                $arr[]=$row;
            }
        }

        echo "<table class='imagetable' ><tr>";
        echo "<td>编号</td><td>类别名称</td><td>删除</td><td>修改</td></tr>";
        foreach($arr as $row){
            echo "<tr>";
            $id=$row[0];
            $kname=$row[1];
            echo "<td>$id</td><td>$kname</td>";
            echo "<td><button id='delete$id'><img src='img\icons\basic\delete.png' height='30' width='30'></button> </td>
                <td><input id='text$id'></input><button id='update$id'><img src='img\icons\basic\save.png' height='30' width='30'></button></td>
                </tr>";
        }
        
        echo "<tr><td><button id='submit'><img src='img\icons\basic\plus.png' height='30' width='30'></button></td>
        <td><input id='name'></input></td>
        </tr>";
        echo "</table></div>";
        return $arr;
    }
    
    echo readFileHTML("adminHeader.html");
    $page=isset($_GET['page'])?$_GET['page']:0;
    $maxCnt=10;
    echo "<div id='main'>";
    $arr=drawHTML($page*$maxCnt,$maxCnt);
    drawJS($arr);
    
    $rowCnt=1+count($arr);
    $pre=$page-1;
    $next=$page+1;
    echo "
        <br><div ><button id='pre'><img src='img/icons/basic/left.png' height='30' width='30'></button>
        <button id='next'><img src='img/icons/basic/right.png' height='30' width='30'></button></div>
        <script>
        document.getElementById('next').style.marginLeft=30*$rowCnt+'px';
        document.getElementById('pre').onclick=function(){
            if($pre>=0){
                window.location.href='kind.php?page=$pre';
            }
        }
        document.getElementById('next').onclick=function(){
            if($rowCnt==$maxCnt+1){
                window.location.href='kind.php?page=$next';
            }
        }
        </script>
    ";
    echo "</div>";
    
?>
</body>
</html>