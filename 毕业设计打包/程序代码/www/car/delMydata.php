
<?php
    include "public.php";
    $condition=@$_POST["condition"];
    //$dataCnt=10;
   // $beginID=0;
    $conn= consql();
    if( $conn){
        $sql="delete from mydata where  ".$condition;
        $res=mysqli_query($conn,$sql);
        echo "";
    }else{
        echo "数据库异常";
    }

	
?>
