
<?php
    include "public.php";
    $keyList=explode(',',@$_POST['__key']);
    $dir = array();
    foreach($keyList as $a){
        $dir[$a]=@$_POST[$a];
    }
    $name=$dir["name"];
    $conn= consql();
    if( $conn){
        $sql="select * from user where name=\"".$name."\"";
        $res=mysqli_query($conn,$sql);
        $row= mysqli_fetch_array($res,MYSQLI_ASSOC);
        if(!isset($row['name'])){
            $sql=getSqlsen_insert("user",$dir,"1110");
            $res=mysqli_query($conn,$sql);
            echo "yes";
        }else{
            echo "用户名已存在";
        }
    }else{
        echo "数据库连接失败";
    }

	
?>
