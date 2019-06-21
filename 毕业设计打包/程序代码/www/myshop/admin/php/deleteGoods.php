<?php
    include '../../PHP/public.php';
    //judgeLog();
    $input = file_get_contents('php://input');
    $arr = json_decode($input,true);   
    $conn=consql();
    if($conn){
        $id= $arr['id'];
        $sql="DELETE FROM goods WHERE id = $id";
        $sqlSel="select img,id from goods where id=$id;";
        $res=mysqli_query($conn,$sqlSel);
        $row=mysqli_fetch_array($res,MYSQLI_NUM);
        
        if(mysqli_query($conn,$sql)){//
            wf($sql);
            if($row[0]!=""&&(unlink ("../".$row[0])||unlink ($row[0]))){
                $sql="DELETE FROM comment WHERE goods_id=$row[1]";
                if(mysqli_query($conn,$sql)){
                    exit();
                }else{
                    echo  "删除未成功";
                }
            }else{
                echo  "文件未删除";
            }
        }else{
            echo  "删除未成功";
        }
    }
?>