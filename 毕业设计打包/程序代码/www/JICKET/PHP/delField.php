<?php
include 'public.php';
//judgeLog();
$conn=consql();
if($conn){
    $fid= $_GET['id'];
    $sql="DELETE FROM `field` WHERE `field`.`fid` = $fid";
    if(mysqli_query($conn,$sql)){//
        echo  "<script>alert(\"删除成功\");
            window.location.href=\"../myTicketAdmin.php?kind=3;page=0\";
        </script>";
    }else{
        echo  "<script>alert(\"删除未成功\");
            window.location.href=\"../myTicketAdmin.php?kind=3;page=0\";
        </script>";
    }
}
