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
        function drawHtml($thid){////剧场管理,剧场thid，剧场名称jcmc，座位数量zwsl
             $li=array('thid','jcmc','zwsl');
             echo "<table frame=void >";
             echo "<form method='post' enctype='multipart/form-data'>";
             if($thid>0){
                echo "<tr><td><label class='lab'>剧场编号:</label></td> 
                   <td><a>$thid</a></td></tr>";
             }
             echo "<tr><td><label class='lab'>剧场名称:</label></td>
                   <td><input  name='jcmc' id='jcmc'  placeholder=\"1到50个字符\"/><a  id='notice_jcmc'></a></td></tr>";
             echo "<tr><td><label class='lab'>座位数量:</label></td>
                   <td><input  name='zwsl' id='zwsl'  placeholder=\"纯数字\"/><a  id='notice_zwsl'></a></td></tr>";

            $name=empty($_GET['id'])?"提交":"确认修改";
            echo "<tr><td><input type='submit' name='submit' value='$name' /></td></tr> </form></table>";
        }
       function drawJS($id){
           /*
           * 添加js语句，初始化表单值
           */
          $conn=consql();
          $sql="select * from theatre where thid=$id;";
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
        $li=array('thid','jcmc','zwsl');
        
        $thid=empty($_GET['id'])?0:$_GET['id'];
        addHtml_a("../myTicketAdmin.php?kind=1;page=0","返回", "back");
        if($thid==0){//通过id来判断是添加还是修改，0添加，1修改
            echo "<script>document.title = \"".'添加剧场'."\" </script>";
        }else if($thid>0){
            echo "<script>document.title = \"".'修改剧场'."\" </script>";
        }else{
            echo "出错了";
            exit();
        }
        drawHtml($thid);
        drawJS($thid);
        $sqlkeyList=array('thid','jcmc','zwsl');//要演员zyyy，剧目时长jmsc，剧照jz

        //验证输入
        if(!isset($_POST['jcmc'])||!isset($_POST['zwsl'])){
            exit();
        }
        $canSub=true;
        
        judgeLeg('jcmc');
        judgeLeg('zwsl',!is_numeric($_POST['zwsl']));
        
        $conn=consql();
        if($conn&&$canSub){
            if($thid==0){//通过id来判断是添加还是修改,0是添加
                $dir=array('jcmc'=>$_POST['jcmc'],'zwsl'=>$_POST['zwsl']);
                $sql=getSqlsen_insert('theatre',$dir,"10");
                
                if(mysqli_query($conn,$sql)){
                    alert("添加成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=1;page=0\";</script>";
                }
            }else if($thid>0){
                $dir=array('jcmc'=>$_POST['jcmc'],'zwsl'=>$_POST['zwsl']);
                $sql=getSqlsen_update('theatre',$dir,"thid=$thid","10");
                if(mysqli_query($conn,$sql)){
                    alert("修改成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=1;page=0\";</script>";
                }
            }
        }
        
    ?>
    </body>
</html>