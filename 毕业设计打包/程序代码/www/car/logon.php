
<?php
    include "public.php";
    $name=@$_POST["name"];
    $pwd=@$_POST["pwd"];
    $conn= consql();
    if( $conn){
        $sql="select * from user where name=\"".$name."\"";
        $res=mysqli_query($conn,$sql);
        if(empty($res)){
            echo "用户名或者密码错误";
        }else{
            $row= mysqli_fetch_array($res,MYSQLI_ASSOC);
            //$json_string = json_encode($row, JSON_FORCE_OBJECT);
            
            if($pwd==$row['pwd']){
                echo "ac";
            }else{
                echo "用户名或者密码错误";
            }
        }
    }else{
        echo "数据库连接失败";
    }

	
?>
