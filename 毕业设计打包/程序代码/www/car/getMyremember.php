
<?php
    include "public.php";
    $dataCnt=@$_POST["dataCnt"];
    $beginID=@$_POST["beginID"];
    $user_name=@$_POST["user_name"];
    //$dataCnt=10;
   // $beginID=0;
    $conn= consql();
    if( $conn){
        $sql="select * from remember where "."user_name=\"$user_name\""." LIMIT ". $beginID.",".$dataCnt;
        wf($sql);
        $res=mysqli_query($conn,$sql);
        echo getSqlJson($res);
    }else{
        echo "";
    }

	
?>
