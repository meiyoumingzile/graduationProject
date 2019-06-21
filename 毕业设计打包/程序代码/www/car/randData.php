
<?php
    include "public.php";
    $dir = array("car_id"=>rand(1,4),"car_time"=>"now()","latitude"=>rand(0,100),"longitude"=>rand(0,100),"temperature"=>rand(0,100),"humidity"=>rand(0,100),"energy"=>rand(0,100));
    $conn= consql();
    if( $conn){
        $sql=getSqlsen_insert("mydata",$dir,"0000000");
        echo $sql;
        $res=mysqli_query($conn,$sql);
       // echo $sql;
    }else{
        echo "数据库连接失败";
    }

	
?>
