<?php
include 'public.php';
$input = file_get_contents('php://input');
$dir = json_decode($input,true);
$dir['time']=date("Y-m-d",time());
$conn=consql();
if($conn){
    $sql= getSqlsen_insert("indent", $dir, "0001");
    if(mysqli_query($conn,$sql)){
        echo "添加成功";
    }else{
        echo "添加失败";
    }
}
