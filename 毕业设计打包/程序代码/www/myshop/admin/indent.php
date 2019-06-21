<head>
  <meta charset="utf-8">
  <title>管理员-订单</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link rel="stylesheet" href="css/home.css">
    <link href="css/indent.css" rel="stylesheet">
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
    
    /*if(isset($_COOKIE['jur'])&&$_COOKIE['jur']>=3){
        
    }else{
        echo "你的权限不够,不能使用该功能";
    }*/
    
    echo readFileHTML("adminHeader.html");
    if(isset($_GET['status'])){
        function drawJS($category){
            if(!isset($category))
                return;
            /*
             * 添加监听：
             */
            $len=count($category);
            $url="php/deleteStatus.php";
            $method="post";
            $fun="success";
            $self="indent.php?status=1";
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
                                httpCon(\"php/updateStatus.php\",data,\"$method\",success2);
                            }

                        };
                    ";
                }
                $method="post";
                $self="indent.php?status=1";
                $url="php/addStatus.php";
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
             echo "<div id='bttoStatus'><button id='toStatus'> 返回</button></div>";
            echo "<div class='tab'>";
            $sql="select * from status ORDER BY id DESC limit $down,$cnt";
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
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxCnt=10;
        $begin=$maxCnt*$page;
        $toStatus="status=1";
        $arr=drawHTML($begin,$maxCnt);
        drawJs($arr);
        $rowCnt=count($arr)+1;
    }else{
        echo "<div ><button id='toStatus'>去订单状态目录</button></div>";
        $toStatus="";
        $keyDir=array("id"=>'订单编号','num'=>'购买数量','goods_id'=>'商品编号','user_id'=>'购买账号编号','time'=>'下单时间','status_id'=>'订单状态','touch_id'=>'联系方式编号');
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxCnt=10;
        $begin=$maxCnt*$page;
        $sql="select * from indent ORDER BY id DESC limit $begin,$maxCnt";
        $con= consql();
        echo "<div class='tab'>";
        echo "<table class='imagetable' id='tab'><tr>";
        foreach($keyDir as $k=>$v){
            echo "<td>$v</td>";
        }
        echo "</tr>";
        $rowCnt=1;
        if($con){
            $res=mysqli_query($con,$sql);
            while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                $id=$row['id'];
                echo "<tr  class='tr' id='tr$id'>";
                foreach($row as $k=>$v){
                    echo "<td>$v</td>";
                }
                echo "</tr>";
                $rowCnt++;
            }
        }
        echo "</div>";
        
    }
    $strUrl=isset($_GET["status"])?"":"status=1";
   
    echo "<div class='tab' id='right' ><button id='pre'><img src='img\icons\basic\up.png' height='30' width='30'></button><br>";
    echo "<button id='next'><img src='img\icons\basic\down.png' height='30' width='30'></button></div>";
    
    $pre=$page-1;
    $next=$page+1;
    
    echo "
        <script>
        document.getElementById('next').style.marginTop=30*$rowCnt+'px';
        document.getElementById('toStatus').onclick=function(){
            window.location.href='indent.php?$strUrl';
        }
        document.getElementById('pre').onclick=function(){
            if($pre>=0){
                window.location.href='indent.php?page=$pre&$toStatus';
            }
        }
        document.getElementById('next').onclick=function(){
            if($rowCnt==$maxCnt+1){
                window.location.href='indent.php?page=$next&$toStatus';
            }
        }
        </script>
    ";
    //<script src="js/user.js"></script>
?>

</body>
</html>