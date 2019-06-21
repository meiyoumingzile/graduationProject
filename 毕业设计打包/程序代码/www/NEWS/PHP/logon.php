
<?php
    $keyList=array('nam','pwd','rem');//网页属性列表
    $tobase=array('nam'=>'uname','pwd'=>'upassword');//网页属性转换数据库属性
    
    function getSql_sel($tableName,$key,$str){
            $sql="select * from $tableName where $key=\"".$str.'"';
            return $sql;
    }
    $input = file_get_contents('php://input');
    $arr = json_decode($input,true);  //变成字典,这里属性有：username和password

    $host="localhost";
    $user="root";
    $password="";
    
    $sql=getSql_sel('user',$tobase['nam'],$arr['nam']);
    $conn=mysqli_connect($host,$user,$password);//连接
    if(mysqli_select_db($conn,"MYNEWS")){
        $res=mysqli_query($conn,$sql);
        $row= mysqli_fetch_array($res,MYSQL_ASSOC);
        if(count($row)>0&&$row[$tobase['pwd']]==$arr['pwd']){
            echo "succ"."; ".$row['jur'];
        }else{
            echo "erro";
        }
    }

	
?>
