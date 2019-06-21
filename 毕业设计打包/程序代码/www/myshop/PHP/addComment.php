<?php
include 'public.php';
$dir=array('user_id'=>$_GET['user_id'],'content'=>$_POST['content'],'goods_id'=>$_GET['goods_id'],'time'=>date("Y-m-d",time()),'comment_id'=>$_GET['comment_id']);
$conn=consql();
if($conn){
    $sql= getSqlsen_insert("comment", $dir, "01010");
    if(mysqli_query($conn,$sql)){
        echo "添加成功";
    }else{
        echo "添加失败";
    }
}
jumpUrl(getLastUrl());
