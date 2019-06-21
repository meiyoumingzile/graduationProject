<?php
include 'public.php';
$input = file_get_contents('php://input');
$dir = json_decode($input,true);
$conn=consql();
if($conn){
    $sql= getSqlsen_insert("touch", $dir, "01111");
    if(mysqli_query($conn,$sql)){
        echo "添加成功";
    }else{
        echo "添加失败";
    }
}
