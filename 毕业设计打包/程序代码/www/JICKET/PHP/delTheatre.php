<?php
include 'public.php';
//judgeLog();
$conn=consql();
if($conn){
    $thid= $_GET['id'];
    $sql="DELETE FROM `theatre` WHERE `theatre`.`thid` = $thid";
    if(mysqli_query($conn,$sql)){//
        echo  "<script>alert(\"删除成功\");
            window.location.href=\"../myTicketAdmin.php?kind=1;page=0\";
        </script>";
    }else{
        echo  "<script>alert(\"删除未成功\");
            window.location.href=\"../myTicketAdmin.php?kind=1;page=0\";
        </script>";
    }
}
