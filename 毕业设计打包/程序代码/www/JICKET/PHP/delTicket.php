<?php
include 'public.php';
$str = file_get_contents('php://input');
$arr=explode(",", $str);
//judgeLog();
$conn=consql();
if($conn){
    $sql="DELETE FROM ticket WHERE ";
    $delStr='';
    foreach($arr as $a){
        $delStr.='||'.'tid='.$a;
    }
    $delStr=substr($delStr,2);
    $sql.=$delStr;
    if(mysqli_query($conn,$sql)){//
        echo  "删除成功";  
    }else{
        echo  "删除未成功，数据库或者网络出错";  
    }
}
