<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="">
        <link href="/pics/tit.ico" rel="shortcut icon">
    </head>
    <body>
        
    <?php 
        include 'public.php';
        function wrNotice($id,$str,$mycolor){
            echo "<script language='javascript'>document.getElementById(\"$id\").innerText=\"$str\";
                document.getElementById(\"$id\").style.color=\"$mycolor\";
            </script>";
        }
        function judgeLeg($id,$ex=false){
            if(!isset($_POST[$id])){
                exit();
            }else if($_POST[$id]==""||$ex){
                wrNotice("notice_".$id,"×××","red");
                $canSub=false;
            }else{
               wrNotice("notice_".$id,"√√√","green");
            }
        }
        function drawHtml(){
            $sqlkeyList=array('fid','rid','thid','begintime','surtiCnt','price','Selling');//剧场名称
            $ridArr=array();
            $thidArr=array();
            $conn=consql();
            if($conn){
                $sql="select rid from repertoire order by rid asc";
                $res=mysqli_query($conn,$sql);
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $ridArr[]=$row;
                }
                $sql="select thid,zwsl from theatre order by thid asc";
                $res=mysqli_query($conn,$sql);
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $thidArr[]=$row;
                }
            }
            echo "<table frame=void >";
            echo "<form method='post' enctype='multipart/form-data'>";
           
            echo "<tr><td><label class='lab'>剧目编号:</label></td>
                  <td><select name='rid' id='rid'/>";
                  foreach($ridArr as $a){
                     echo " <option value ='$a[0]'>$a[0]</option>";
                  }
            echo" </select><a  id='notice_rid'></a></td></tr>";
            
            echo "<tr><td><label class='lab'>剧场编号:</label></td>
                  <td><select name='thid' id='thid'/>";
                  foreach($thidArr as $a){
                     echo " <option value ='$a[0]'>$a[0]</option>";
                  }
            echo" </select><a  id='notice_rid'></a></td></tr>";
            
            echo "<tr><td><label class='lab'>开始时间:</label></td>
                  <td><input name='begintime' id='begintime' type=\"datetime-local\"/>
                  <a  id='notice_begintime'></a></td></tr>";
          
            echo "<tr><td><label class='lab'>单价:</label></td>
                  <td><input name='price' id='price' placeholder=\"纯数字\"/>
                  <a  id='notice_price'></a></td></tr>";
             echo "<tr><td><label class='lab'>发售状态:</label></td>
                  <td><input name='Selling' id='Selling' type=\"checkbox\"/>
                  <a  id='notice_Selling'></a></td></tr>";
            $name=empty($_GET['id'])?"提交":"确认修改";
            echo "<tr><td><input type='submit' name='submit' value='$name' /></td></tr> </form></table>";
        }
        function drawJS($id){
             /*
             * 添加js语句，初始化表单值
             */
            $conn=consql();
            $sql="select * from field where fid=$id;";
            $res=mysqli_query($conn,$sql);
            $row=mysqli_fetch_array($res,MYSQLI_ASSOC);
            echo "<script language='javascript'>";
            foreach($row as $k=>$v){
                $v=addslashes($v);
                echo " 
                var d=document.getElementById(\"$k\");
                if(typeof d == \"undefined\" || d == null){
                }else{
                    d.value=\"$v\";
                }";

            }
            echo "</script>";
        }
       
        $sqlkeyList=array('rid','thid','begintime','surtiCnt','price','Selling');
        $fid=empty($_GET['id'])?0:$_GET['id'];
        addHtml_a("../myTicketAdmin.php?kind=2;page=0","返回", "back");
        if($fid==0){//通过id来判断是添加还是修改，0添加，1修改
            echo "<script>document.title = \"".'添加剧场信息'."\" </script>";
        }else if($fid>0){
            echo "<script>document.title = \"".'修改剧场信息'."\" </script>";
        }else{
            echo "出错了";
            exit();
        }
        drawHtml();
        drawJS($fid);
        $sqlkeyList=array('rid','thid','begintime','surtiCnt','price','Selling');
        if(!isset($_POST['rid'])||!isset($_POST['thid'])||!isset($_POST['begintime'])||!isset($_POST['price'])){
            exit();
        }
        
        $canSub=true;
        $rid=$_POST['rid'];
        $thid=$_POST['thid'];
        $begintime=$_POST['begintime']."";
        $price=$_POST['price'];
        $Selling=empty($_POST['Selling'])?0:1;
        judgeLeg('rid',!is_numeric($_POST['rid']));
        judgeLeg('thid',!is_numeric($_POST['thid']));
        judgeLeg('price',!is_numeric($_POST['price'])); 
        $conn=consql();
        if($conn&&$canSub){
            $sql="select zwsl from theatre where thid=$thid;";
            $res=mysqli_query($conn,$sql);
            $surtiCnt=mysqli_fetch_array($res,MYSQLI_NUM)[0];
            if($fid==0){//通过id来判断是添加还是修改,0是添加
                $dir=array("rid"=>$rid,"thid"=>$thid,"begintime"=>$begintime
                    ,'surtiCnt'=>$surtiCnt,'price'=>$price,'Selling'=>$Selling);
                $sql=getSqlsen_insert('field',$dir,"001000");
                if(mysqli_query($conn,$sql)){
                    alert("添加成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=3;page=0\";</script>";
                }
            }else if($fid>0){
                $dir=array("rid"=>$rid,"thid"=>$thid,"begintime"=>$begintime
                    ,'surtiCnt'=>$surtiCnt,'price'=>$price,'Selling'=>$Selling);
                $sql=getSqlsen_update('field',$dir,"fid=$fid","001000");
                if(mysqli_query($conn,$sql)){
                    alert("修改成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=3;page=0\";</script>";
                }
            }
        }
        
    ?>
    </body>
</html>


