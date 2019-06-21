
<?php
    include "public.php";
    $dataCnt=@$_POST["dataCnt"];
    $beginID=@$_POST["beginID"];
    //$dataCnt=10;
   // $beginID=0;
    $conn= consql();
    if( $conn){
        $sql="select * from mydata LIMIT ". $beginID.",".$dataCnt;
        $res=mysqli_query($conn,$sql);
        echo getSqlJson($res);
    }else{
        echo "";
    }

	
?>
