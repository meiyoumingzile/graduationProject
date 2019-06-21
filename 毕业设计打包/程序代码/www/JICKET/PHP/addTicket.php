<?php
 include 'public.php';
$input = file_get_contents('php://input');
$arr = json_decode($input,true);  //变成字典,这里属性有：username和password
$conn= consql();
if($conn){
    //dir tel=>Aa123 fid=>  price=>11 cnt=>3 sumprice=>33 
    $rid=$arr['rid'];
    $thid=$arr['thid'];
    $begintime=$arr['begintime'];
    $sql="select fid from field where rid=$rid&&thid=$thid&&begintime=\"$begintime\";";
    if($res=mysqli_query($conn,$sql)){
        $row= mysqli_fetch_array($res,MYSQLI_NUM);
        $arr['fid']=$row[0];
        $dir=array('tel'=>$arr['tel'],'fid'=>$row[0],'price'=>$arr['price'],'cnt'=>$arr['cnt'],'sumprice'=>$arr['sumprice']);
        $sql=getSqlsen_insert("ticket",$dir,"10000");
        //wf($sql);
        if(mysqli_query($conn,$sql)){
            echo "下单成功";
        }else{
            echo "下单失败，检查网络和数据库";
        }
    }
    
    
}