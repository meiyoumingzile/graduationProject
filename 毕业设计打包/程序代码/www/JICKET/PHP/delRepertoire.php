<?php
include 'public.php';
//judgeLog();
$conn=consql();
if($conn){
    $rid= $_GET['id'];
    $sql="DELETE FROM `repertoire` WHERE `repertoire`.`rid` = $rid";
    $sqlSel="select jz from repertoire where rid=$rid;";
    $res=mysqli_query($conn,$sqlSel);
    $row=mysqli_fetch_array($res,MYSQLI_NUM);
    if(mysqli_query($conn,$sql)){//
        if($row[0]!=""){
            unlink ($row[0]);
        }  
        echo  "<script>alert(\"删除成功\");
            window.location.href=\"../myTicketAdmin.php?kind=0;page=0\";
        </script>";
    }else{
        echo  "<script>alert(\"删除未成功\");
            window.location.href=\"../myTicketAdmin.php?kind=0;page=0\";
        </script>";
    }
}
