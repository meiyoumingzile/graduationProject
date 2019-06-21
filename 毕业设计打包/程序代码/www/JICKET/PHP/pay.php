<?php
include 'public.php';
$str = file_get_contents('php://input');
$arr=explode(",", $str);
//judgeLog();
$conn=consql();
if($conn){
    $sql="select fid,cnt from ticket where ";
    $selStr='';
    foreach($arr as $a){
        $selStr.='||'.'tid='.$a;
    }
    $selStr=substr($selStr,2);
    $sql.=$selStr;
    $res=mysqli_query($conn,$sql);
    $arr=array();
    while($row= mysqli_fetch_array($res,MYSQLI_NUM)){
         $sql="update field set surtiCnt=(surtiCnt-$row[1]) where fid=$row[0]";   
         if(mysqli_query($conn,$sql)==false){
             echo "支付失败";
             exit();
         }
    }
    echo "支付成功";
}

