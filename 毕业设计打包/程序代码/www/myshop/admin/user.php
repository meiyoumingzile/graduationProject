<head>
  <meta charset="utf-8">
  <title>管理员-用户</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link rel="stylesheet" href="css/home.css">
    <link href="css/user.css" rel="stylesheet">
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
    function handlePost(){// 处理post数据
        $keyList=array('tel','nam','pwd','jur','state');
        $dir=array();
        foreach($keyList as $a){
            if(isset($_POST['in_'.$a])&&$_POST['in_'.$a]!=""){
                $dir[$a]=$_POST['in_'.$a];
            }else{
                if(isset($_POST['in_'.$a]))
                    alert("添加未成功，某些数据是空");
                return;
            }
        }
        $con= consql();
        if($con){
            $sql=getSqlsen_insert('user',$dir,"11101");
            if($res=mysqli_query($con,$sql))
                alert("添加成功");
        }
    }
    
    /*if(isset($_COOKIE['jur'])&&$_COOKIE['jur']>=3){
        
    }else{
        echo "你的权限不够,不能使用该功能";
    }*/
    handlePost();
    echo readFileHTML("adminHeader.html");
    echo "<div class='tab'>";
    if(isset($_GET['id'])){
        $id=$_GET['id'];
        $toTouch="id=".$id;
        $keyDir=array("user_id"=>"用户账号编号","name"=>"联系人","addr"=>"地址","tel"=>"联系电话","email"=>"邮箱");
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxCnt=10;
        $begin=$maxCnt*$page;
        $sql="select * from touch where user_id=$id ORDER BY id DESC limit $begin,$maxCnt";
        $con= consql();
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
                foreach($keyDir as $k=>$v){
                    $a=$row[$k];
                    echo "<td>$a</td>";
                }
                echo "</tr>";
                $rowCnt++;
            }
        }
       
    }else{
        $toTouch="";
        $keyDir=array("id"=>'编号','tel'=>'手机号','nam'=>'姓名','pwd'=>'密码','jur'=>'权限','state'=>'状态');
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxCnt=10;
        $begin=$maxCnt*$page;
        $sql="select * from user ORDER BY id DESC limit $begin,$maxCnt";
        $con= consql();
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
        echo "<form  method='post'><tr><td><button id='addUser'><img src='img\icons\basic\plus.png' height='30' width='30'></button></td>
        <td><input name='in_tel'></td> <td><input name='in_nam'></td> <td><input name='in_pwd'></td>
        <td><select name='in_jur'><option value ='0'>普通用户</option><option value ='1'>管理员</option><option value='2'>超级管理员</option></select></td>
        <td><select name='in_state'><option value ='normal'>正常</option><option value ='unavailable'>停用</option></select></td>
        </form></tr>
        </table>";
    }
    echo "</div>";
    echo "<div class='tab' id='right' ><button id='pre'><img src='img\icons\basic\up.png' height='30' width='30'></button><br>";
    echo "<button id='next'><img src='img\icons\basic\down.png' height='30' width='30'></button></div>";
    
    $pre=$page-1;
    $next=$page+1;
    echo "
        <script>
        document.getElementById('next').style.marginTop=30*$rowCnt+'px';
        document.getElementById('pre').onclick=function(){
            if($pre>=0){
                window.location.href='user.php?page=$pre&$toTouch';
            }
        }
        document.getElementById('next').onclick=function(){
            if($rowCnt==$maxCnt+1){
                window.location.href='user.php?page=$next&$toTouch';
            }
        }
        </script>
    ";
?>
<script src="js/user.js"></script>
</body>
</html>