<head>
  <meta charset="utf-8">
  <title>管理员-评论</title>
  <link rel="shortcut icon" href="../pics/favicon.ico" >
  <link rel="stylesheet" href="css/master.css">
  <link href="css/comment.css" rel="stylesheet">
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
    function drawAddHTML(){
        judgeAdmin();
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
                  <tr><td><label class='lab'>广告发布单位:</label></td>
                  <td><input  name='pos' id='in_pos'  placeholder=\"1到50个字符\" value='$arr[0]'/><a  id='notice_pos'></a></td></tr>
                  <tr><td><label class='lab'>链接地址</label></td>
                  <td><input  name='url' id='in_url' placeholder=\"1到50个字符\"  value='$arr[1]'/><a  id='notice_url'></a></td></tr>";
        echo"          <tr><td><label class='lab'>上传图片</label></td>
                  <td><input  type='file' name='img' accept ='image/gif,image/jpg,image/png' /></td></tr>
                  <tr><td></td><td><input type='button' name='submit' value='$name' id='submit'/></td></tr> 
            </form></table>
        </div>";
    }
    function drawListHTML($down,$cnt){
        echo "<div class='tab'>";
        $sql="select * from comment ORDER BY id DESC limit $down,$cnt";
        $con= consql();
        $arr=array();
        if($con){
            $res=mysqli_query($con,$sql);
            while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                $arr[]=$row;
            }
        }
        $keyList=array('id','user_id','content','goods_id','time','comment_id');
        echo "<table class='imagetable' ><tr>";
        echo "<td>评论编号</td><td>发布账号编号</td><td>内容</td><td>商品编号</td><td>发布时间</td><td>评论对象</td><td>删除</td></tr>";
        foreach($arr as $row){
            $id=$row['id'];
            echo "<tr class='tr' id='tr$id'>";
            for($i=0;$i<count($keyList)-1;$i++){
                $a=$keyList[$i];
                echo "<td>$row[$a]</td>";
            }
            $a=$row[$keyList[$i]];
            $str=$a=='-1'?'商品':'评论'.$a;
            echo "<td>$str</td>
                <td><button class='delete' id='delete$id'><img src='img\icons\basic\delete.png' height='30' width='30'></button> </td>
                </tr>";
        }
        echo "<tr><td><button id='add'><img src='img\icons\basic\plus.png' height='30' width='30'></button></td>
        </tr>";
        echo "</table></div>";
        return $arr;
    }
    echo readFileHTML("adminHeader.html");
    if(isset($_GET['add'])){
        
        //drawAddHTML();
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
    
<script src="js/comment.js"></script>
</body>
</html>
