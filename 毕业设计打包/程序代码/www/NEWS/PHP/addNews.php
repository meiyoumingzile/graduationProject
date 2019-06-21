<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="http://localhost/NEWS/CSS/addNews.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
    </head>
    <body>
        
    <?php 
        include 'public.php';
        function drawHtml(){
            $sql="select * from category";
            $conn=consql();
            $category=array();
            if($conn){
                $res=mysqli_query($conn,$sql);
                while($row=mysqli_fetch_array($res,MYSQLI_NUM)){
                    $category[]=$row;
                }
            }
            $li=array("ptitle","pcontent","pdepartment","uname");
            $dir=array("ptitle"=>"标题","pcontent"=>"正文","pdepartment"=>'发布单位');//看着用的仅此而已
            echo "<form method='post' enctype='multipart/form-data'>";
            echo "<label class='lab'>标题:</label><input  name='ptitle' id='ptitle' /><a class='note'>必填,要求少于50个字符</a><br> ";
            echo "<label class='lab'>正文:</label><br>"
                 . "<textarea name='pcontent' id='pcontent' cols='100'; rows='10' warp='virtual'></textarea>"
                    . "<a class='note'>必填</a><br> ";
            echo "<label class='lab'>发布单位:</label><input  name='pdepartment' id='pdepartment'  /><a class='note'>必填</a><br> ";
            echo "<label class='lab'>上传图片:</label><input  type='file' name='ppicture' accept ='image/gif,image/jpg,image/png' /><a class='note'>支持小于2M的jpg,gif,png图片</a><br> ";
            echo "<label class='lab'>选择类别:</label><select name='cid' id='cid'>";
            foreach($category as $arr){
                echo "<option value ='$arr[0]'>$arr[1]</option>";
            }
            echo "</select><br> ";
            $name=$_GET['id']==0?"提交":"确认修改";
            echo "<input type='submit' name='submit' value='$name' /> </form>";
            return  $category;
        }
        function drawJS($id){
             /*
             * 添加js语句，初始化表单值
             */
            $conn=consql();
            $sql="select * from press where pid=$id;";
            $res=mysqli_query($conn,$sql);
            $row=mysqli_fetch_array($res,MYSQLI_ASSOC);
            echo "<script language='javascript'>";
            foreach($row as $k=>$v){
                echo 
                " 
                var d=document.getElementById(\"$k\");
                if(typeof d == \"undefined\" || d == null){
                }else{
                    d.value=\"$v\";
                }";

            }
            echo "</script>";
        }
        $sqlKeyList=array("ptitle","pcontent","pdepartment","pdate","ppicture","uname","cid","clnum",'review');
        
        $id=$_GET['id'];
        addHtml_a("http://localhost/NEWS/myNewsHome_html.php","返回首页", "back");
        if($id==0){//通过id来判断是添加还是修改，0添加，1修改
            echo "<script>document.title = \"".'添加新闻'."\" </script>";
        }else if($id>0){
            echo "<script>document.title = \"".'修改新闻'."\" </script>";
        }else{
            echo "出错了";
            exit();
        }
        $category=drawHtml();
        drawJS($id);
        if(!isset($_POST['ptitle'])||!isset($_POST['pcontent'])||!isset($_POST['pdepartment'])){
            exit();
        }
        $canSub=true;
        $picUrl="";
        if(isset($_FILES["ppicture"])){
            if ($_FILES["ppicture"]["error"] > 0){
                $picUrl="";
            }else if((int)$_FILES["ppicture"]["size"] >2*1024*1024){
                notice("图片太大！");
                $canSub=false;
            }else{
            }
        }
        if($_POST['ptitle']==""){
             notice("标题不合法！");
             $canSub=false;
        }
        if($_POST['pcontent']==""){
            notice("正文不能是空！");
            $canSub=false;
        }
        if($_POST['pdepartment']==""){
            notice("发布单位不能是空！");
            $canSub=false;
        }
        $cid=$_POST['cid'];
        $review=0;
        $selfName=$_COOKIE["logonState"];
        $conn=consql();
        if($conn&&$canSub){
            $review=$_COOKIE["jur"]>1?1:0;//$review审核状态，0是不通过，非0是通过,通过jur来得到审核状态的值
            if(isset($_FILES["ppicture"])&&$_FILES["ppicture"]["error"]==0){
                 $picName=$_FILES['ppicture']['name'];
                 $hz=explode('.',$picName);
                 $hz=$hz[count($hz)-1];
                 $stringtime = date('Y-m-d H:i:s',time());
                 $picUrl='pics/'.strtotime($stringtime).".".$hz;
                 if(file_exists($picUrl)){
                 }else if(move_uploaded_file($_FILES['ppicture']['tmp_name'],$picUrl)){
                 }else{
                     notice("图片上传失败！");
                 }
            }
            if($id==0){//通过id来判断是添加还是修改，0添加，1修改
                $dir=array("ptitle"=>$_POST['ptitle'],"pcontent"=>$_POST['pcontent'],"pdepartment"=>$_POST['pdepartment'],
                    "pdate"=>'NOW()',"ppicture"=>$picUrl,"uname"=>$selfName,"cid"=>$cid,"clnum"=>0,'review'=>$review);
                $sql=getSqlsen_insert('press',$dir,$sqlKeyList,"111011000");
                if(mysqli_query($conn,$sql)){
                    if($review==0){
                        alert("已经提交审核，请等待");
                    }else{
                        alert("添加成功");
                    }
                }
            }else if($id>0){
                $dir=array("ptitle"=>$_POST['ptitle'],"pcontent"=>$_POST['pcontent'],"pdepartment"=>$_POST['pdepartment'],
                    "pdate"=>'NOW()',"ppicture"=>$picUrl,"uname"=>$selfName,"cid"=>$cid,"clnum"=>0,'review'=>$review);
                $sql=getSqlsen_update('press',$dir,"pid=$id","111011000");
                if(mysqli_query($conn,$sql)){
                    if($review==0){
                        alert("更改的文章已经提交审核，请等待");
                    }else{
                        alert("修改成功");
                    }
                }
            }
        }
        
    ?>
    </body>
</html>


