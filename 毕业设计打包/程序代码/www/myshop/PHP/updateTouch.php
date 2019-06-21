<?php
include 'public.php';
$input = file_get_contents('php://input');
$dir = json_decode($input,true);
$id=$dir['id'];
unset($dir['id']);
$conn=consql();
if($conn){
    $sql= getSqlsen_update("touch", $dir,"id=".$id, "1111");
    if(mysqli_query($conn,$sql)){
        echo "修改成功";
    }else{
        echo "修改失败";
    }
}
