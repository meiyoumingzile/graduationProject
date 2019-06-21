<?php
include 'public.php';
$input = file_get_contents('php://input');
$arr = json_decode($input,true);  
$id=$arr['id'];
$conn=consql();
if($conn){
    $sql="DELETE FROM touch  WHERE id = $id;";
    if(mysqli_query($conn,$sql)){
        echo "删除成功";
    }
}