<?php
include 'public.php';
$input = file_get_contents('php://input');
$dir = json_decode($input,true);
$id=$dir['id'];
$num=$dir['num'];
$conn=consql();
$mydir=array('num'=>$num,'goods_id'=>$id,'user_id'=>$_COOKIE['user_id'],'time'=>date("Y-m-d",time()),'status_id'=>1,'touch_id '=>$dir['touch_id']);
if($conn){
    $sql1= "update goods set renum=renum-$num where id=$id;";
    $sql2= getSqlsen_insert('indent', $mydir, '000100');
    if(mysqli_query($conn,$sql1)&&mysqli_query($conn,$sql2)){
        echo "支付成功";
    }else{
        echo "支付失败";
    }
}
