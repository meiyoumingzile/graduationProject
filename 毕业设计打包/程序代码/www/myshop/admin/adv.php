<head>
  <meta charset="utf-8">
  <title>管理员-商品</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link href="css/adv.css" rel="stylesheet">
  <!---jQuery Files-->
  <script src="js/jquery-1.7.1.min.js"></script>
  <script src="js/jquery-ui-1.8.17.min.js"></script>
  <script src="js/styler.js"></script>
  <script src="js/jquery.tipTip.js"></script>
  <script src="js/colorpicker.js"></script>
  <script src="../JS/public.js"></script>
  
</head>
<body>
<div id='hint'></div>
<?php
    include '../PHP/public.php';
    judgeAdmin();
    function drawAddHTML(){
        $keyList=array('pos',"url");
        $name=$_GET['add']==1?"确认添加":"确认修改";
        $arr=array("","","","",0,0);
        if(isset($_GET['id'])){
            $con= consql();
            if($con){
                $sql="select * from adv where id=".$_GET['id'];
                $res=mysqli_query($con,$sql);
                $row= mysqli_fetch_array($res,MYSQL_ASSOC);
                $i=0;
                foreach($keyList as $a){
                    $arr[$i]=$row[$a];
                    $i++;        
                }
            }
        }
        echo "<div id='addAdvForm'>
            <table frame=void >
            <form action='' method='post' enctype='multipart/form-data' id='myform' >
                  <tr><td><label class='lab'>广告名称:</label></td>
                  <td><input  name='pos' id='in_pos'  placeholder=\"1到200个字符\" value='$arr[0]'style=\"width:300px;\"/><a  id='notice_pos'></a></td></tr>
                  <tr><td><label class='lab'>链接地址</label></td>
                  <td><input  name='url' id='in_url' placeholder=\"1到200个字符\"  value='$arr[1]' style=\"width:300px;\"/><a  id='notice_url'></a></td></tr>";
        echo"          <tr><td><label class='lab'>上传图片</label></td>
                  <td><input  type='file' name='img' accept ='image/gif,jpg,png' /></td></tr>
                  <tr><td></td><td><input type='button' name='submit' value='$name' id='submit'/></td></tr> 
            </form></table>
        </div>";
    }
    function drawListHTML($down,$cnt){
        echo "<div class='tab'>";
        $sql="select * from adv ORDER BY id DESC limit $down,$cnt";
        $con= consql();
        $arr=array();
        if($con){
            $res=mysqli_query($con,$sql);
            while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                $arr[]=$row;
            }
        }
        $keyList=array('id','pos','url');
        echo "<table class='imagetable' ><tr>";
        echo "<td>广告编号</td><td>广告单位</td><td>链接地址</td><td>删除</td><td>修改</td></tr>";
        foreach($arr as $row){
            $id=$row['id'];
            $img=$row['img'];
            echo "<tr class='tr' id='tr$img'>";
            foreach($keyList as $a){
                echo "<td>$row[$a]</td>";
            }
            echo "<td><button class='delete' id='delete$id'><img src='img\icons\basic\delete.png' height='30' width='30'></button> </td>
                <td><button class='update' id='update$id'><img src='img\icons\basic\update.png' height='30' width='30'></button></td>
                </tr>";
        }
        echo "<tr><td><button id='add'><img src='img\icons\basic\plus.png' height='30' width='30'></button></td>
        </tr>";
        echo "</table></div>";
        return $arr;
    }
    echo readFileHTML("adminHeader.html");
    
    if(isset($_GET['add'])){
        
        drawAddHTML();
    }else{
        $page=isset($_GET['page'])?$_GET['page']:0;
        $maxCnt=10;
        $arr=drawListHTML($page*$maxCnt,$maxCnt);
        $rowCnt=1+count($arr);
        $pre=$page-1;
        $next=$page+1;
        echo "<div class='tab' id='right' ><button id='pre'><img src='img\icons\basic\up.png' height='30' width='30'></button><br>";
        echo "<button id='next'><img src='img\icons\basic\down.png' height='30' width='30'></button></div>";
        echo "
            <script>
            document.getElementById('next').style.marginTop=30*$rowCnt+'px';
            document.getElementById('pre').onclick=function(){
                if($pre>=0){
                    window.location.href='adv.php?page=$pre';
                }
            }
            document.getElementById('next').onclick=function(){
                if($rowCnt==$maxCnt+1){
                    window.location.href='adv.php?page=$next';
                }
            }
            </script>
        ";
    }
    
?>
    
<script src="js/adv.js"></script>
</body>
</html>
