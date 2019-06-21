<?php
include 'public.php';
$input = file_get_contents('php://input');
$arr = json_decode($input,true);  //变成字典,这里属性有：username和password
if(isset($arr['fid'])){
    $fid=$arr['fid'];
    $Selling=$arr['Selling'];
    $conn= consql();
    if($conn){
        $sql="update field set Selling=$Selling where fid=$fid";
        if(mysqli_query($conn,$sql)){
            echo "更改成功";
        }else{
             echo "出错";
        }
    }
}else{
    echo "出错";
}
