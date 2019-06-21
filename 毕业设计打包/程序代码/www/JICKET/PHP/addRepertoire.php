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
           //剧目名称jmmc，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz
            $li=array('jmmc','jmjs','zyyy','jmsc','jz');
            echo "<table frame=void >";
            echo "<form method='post' enctype='multipart/form-data'>";
           
            echo "<tr><td><label class='lab'>剧目名称:</label></td>
                  <td><input  name='jmmc' id='jmmc'  placeholder=\"1到50个字符\"/><a  id='notice_jmmc'></a></td></tr>";
            echo "<tr><td><label class='lab'>剧目介绍:</label></td>
                  <td><textarea name='jmjs' id='jmjs' cols='50'; rows='5' warp='virtual' placeholder=\"1到200个字符\"></textarea>
                  <a  id='notice_jmjs'></a></td></tr>";
            echo "<tr><td><label class='lab'>主要演员:</label></td>
                  <td><input  name='zyyy' id='zyyy' placeholder=\"1到50个字符\" /><a  id='notice_zyyy'></a></td></tr>";
            echo "<tr><td><label class='lab'>剧目时长:</label></td>
                  <td><input  name='jmsc' id='jmsc' placeholder=\"纯数字\" /><a  id='notice_jmsc'></a></td></tr>";
            echo "<tr><td><label class='lab'>上传剧照</label></td>
                  <td><input  type='file' name='jz' accept ='image/gif,image/jpg,image/png' /></td></tr> ";
            $name=empty($_GET['id'])?"提交":"确认修改";
            echo "<tr><td><input type='submit' name='submit' value='$name' /></td></tr> </form></table>";
        }
        function drawJS($id){
             /*
             * 添加js语句，初始化表单值
             */
            $conn=consql();
            $sql="select * from repertoire where rid=$id;";
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
        $sqlkeyList=array('rid','jmmc','rtime','jmjs','zyyy','jmsc','jz');//演出剧目:剧目rid，剧目名称jmmc，上架时间rtime，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz
        
        $id=empty($_GET['id'])?0:$_GET['id'];
        addHtml_a("../myTicketAdmin.php?kind=0;page=0","返回", "back");
        if($id==0){//通过id来判断是添加还是修改，0添加，1修改
            echo "<script>document.title = \"".'添加剧目'."\" </script>";
        }else if($id>0){
            echo "<script>document.title = \"".'修改新闻'."\" </script>";
        }else{
            echo "出错了";
            exit();
        }
        drawHtml();
        drawJS($id);
        $sqlkeyList=array('rid','jmmc','rtime','jmjs','zyyy','jmsc','jz');//演出剧目:剧目rid，剧目名称jmmc，上架时间rtime，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz

        //验证输入
        if(!isset($_POST['jmmc'])||!isset($_POST['jmjs'])||!isset($_POST['zyyy'])||!isset($_POST['jmsc'])){
            exit();
        }
        $canSub=true;
        $picUrl="";
        
        if(isset($_FILES["jz"])){
            if ($_FILES["jz"]["error"] > 0){
                $picUrl="";
            }else if((int)$_FILES["jz"]["size"] >2*1024*1024){
                notice("图片太大！");
                $canSub=false;
            }else{
            }
        }
        judgeLeg('jmmc');
        judgeLeg('jmjs');
        judgeLeg('zyyy');
        judgeLeg('jmsc',!is_numeric($_POST['jmsc']));
        
        $conn=consql();
        if($conn&&$canSub){
            if(isset($_FILES["jz"])&&$_FILES["jz"]["error"]==0){
                 $arr=$_FILES["jz"];
                 $picName=$arr['name'];
                 $hz=explode('.',$picName);
                 $hz=$hz[count($hz)-1];
                 $stringtime = date('Y-m-d H:i:s',time());
                 $picUrl='repPics/'.strtotime($stringtime).".".$hz;
                 if(file_exists($picUrl)){
                 }else if(move_uploaded_file($arr['tmp_name'],$picUrl)){
                 }else{
                     notice("图片上传失败！");
                 }
            }
            if($id==0){//通过id来判断是添加还是修改,0是添加
                $dir=array("jmmc"=>$_POST['jmmc'],"rtime"=>'NOW()',"jmjs"=>$_POST['jmjs'],
                    "zyyy"=>$_POST['zyyy'], "jmsc"=>$_POST['jmsc'],'jz'=>$picUrl);
                $sql=getSqlsen_insert('repertoire',$dir,"101101");
                echo $sql;
                if(mysqli_query($conn,$sql)){
                    alert("添加成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=0;page=0\";</script>";
                }
            }else if($id>0){
                $dir=array("jmmc"=>$_POST['jmmc'],"rtime"=>'NOW()',"jmjs"=>$_POST['jmjs'],
                    "zyyy"=>$_POST['zyyy'], "jmsc"=>$_POST['jmsc'],'jz'=>$picUrl);
                $sql=getSqlsen_update('repertoire',$dir,"rid=$id","101101");
                if(mysqli_query($conn,$sql)){
                    alert("修改成功");
                    echo "<script>window.location.href=\" ../myTicketAdmin.php?kind=0;page=0\";</script>";
                }
            }
        }
        
    ?>
    </body>
</html>


