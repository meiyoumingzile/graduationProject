
<?php
    include "public.php";
    $keyList=explode(',',@$_POST['__key']);
    $dir = array();
    foreach($keyList as $a){
        $dir[$a]=@$_POST[$a];
    }
    $conn= consql();
    if( $conn){
        $sql=getSqlsen_insert("remember",$dir,"0011");
        $res=mysqli_query($conn,$sql);
        echo "yes";
    }else{
        echo "数据库连接失败";
    }

	
?>
