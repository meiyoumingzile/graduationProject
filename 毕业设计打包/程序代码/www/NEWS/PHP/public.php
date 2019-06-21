<?php
function addHtml_a($href,$str,$myclass){
    echo "<a href=\"$href\" class=\"$myclass\">$str</a>";
}
function alert($str){
    echo "<script>alert(\"$str\");</script>";
}
function consql(){
    $host="localhost";
    $user="root";
    $password="";
    $con= mysqli_connect($host,$user,$password);
    
    if($con&&mysqli_select_db($con, 'MYNEWS')){
        mysqli_query($con,"SET NAMES 'utf8'");
        return $con;
    }else{
        echo "数据库异常<br>";
    }
    return null;
}
function notice($str){
    echo "<font color=red>$str</font><br>";
}
function getSqlsen_insert($tableName,$arr,$keyList,$mark){//tableName是数据库表名称，arr是数据字典，$keyList是数据库键名,mark是01字符串，代表相应位有木有引号
        $sql="insert into ".$tableName."(";
        $l=count($keyList);
        for($i=0;$i<$l-1;$i++)
            $sql=$sql.$keyList[$i].',';
        $sql=$sql.$keyList[$l-1].')values(';
        for($i=0;$i<$l-1;$i++){
            if(isset($arr[$keyList[$i]])){//isset和emtpy的却别，empty是值是0或者指针是NULL都算空，isset是只有指针是NULL才是false
                    if(empty($mark[$i])||$mark[$i]=="0"){
                        $sql=$sql.$arr[$keyList[$i]].',';
                    }else{
                        $sql=$sql.'"'.$arr[$keyList[$i]].'",';
                    }
            }
        }
        if(empty($mark[$i])||$mark[$i]=="0"){
            $sql=$sql.$arr[$keyList[$i]].');';
        }else{
            $sql=$sql.'"'.$arr[$keyList[$i]].'");';
        }
        return $sql;
}

function getSqlsen_update($tableName,$dir,$str,$mark){
    $sql="UPDATE `$tableName` set ";
    $i=0;
    $l=count($dir);
    foreach($dir as $k=>$v){
        if(empty($mark[$i])||$mark[$i]=="0"){
            $sql=$sql.$k.'='.$v;
        }else{
            $sql=$sql.$k.'="'.$v.'"';
        }
        $i++;
        if($i<$l){
            $sql=$sql.',';
        }
    }
    $sql=$sql." where ".$str;
    return $sql;
}