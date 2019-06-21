
<?php
    include "public.php";
    $keyList=array('tel','nam','pwd','mail','jur');//网页属性列表
    $tobase=array('tel'=>'tel','nam'=>'uname','pwd'=>'upassword','mail'=>'email','jur'=>'jur');//网页属性转换数据库属性
    
    function getSql_insert($tableName,$arr,$keyList){//tableName是数据库表名称，arr是数据字典，$keyList是数据库键名
            $sql="insert into ".$tableName."(";
            $l=count($keyList);
            for($i=0;$i<$l-1;$i++)
                $sql=$sql.$keyList[$i].',';
            $sql=$sql.$keyList[$l-1].')values(';
            for($i=0;$i<$l-1;$i++){
                    if($arr[$keyList[$i]]){
                            $sql=$sql."\"".$arr[$keyList[$i]].'",';
                    }
            }
            $sql=$sql."\"".$arr[$keyList[$l-1]].'");';
            return $sql;
    }
    function getSql_sel($tableName,$key,$str){
            $sql="select * from $tableName where $key=\"".$str.'"';
            return $sql;
    }
    $input = file_get_contents('php://input');
    $arr = json_decode($input,true);  //变成字典,这里属性有：username和password


    $conn= consql();
    if( $conn){
        $sql=getSql_sel("user",$tobase['tel'],$arr['tel']);
        $res=mysqli_query($conn,$sql);
        
        $row= mysqli_fetch_array($res,MYSQL_ASSOC);
        if(count($row)>0){
            echo "erro";
        }else{
            $sqlKeyList=array();
            foreach($keyList as $a){
                $arr[$tobase[$a]]=$arr[$a];
                $sqlKeyList[]=$tobase[$a];
            }
            $sql=getSql_insert("user",$arr,$sqlKeyList);//传入一个字典
            echo $sql;
            mysqli_query($conn,$sql);
            echo "succ";
        }
    }

	
?>
