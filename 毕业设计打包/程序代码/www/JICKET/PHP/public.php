<?php
function judgeLog(){
    if(!isset($_COOKIE['logonState'])){
        notice("登录失效，请重新登录");
        echo "<script>  window.location.href=\"../logon_html.php\"; </script>";
        return null;
    }
    return $_COOKIE['logonState'];
}
function getUrlData($key){
    $str=$_SERVER["QUERY_STRING"];
    $arr= explode(';',$str);
    foreach($arr as $a){
        $k= explode('=',$a);
        if(isset($k[1])&&$k[0]==$key){
            return $k[1];
        }
    }
    return "";
}
function addHtml_a($href,$str,$myclass){
    echo "<a href=\"$href\" class=\"$myclass\">$str</a>";
}
function alert($str){
    echo "<script>alert(\"$str\");</script>";
}
function wf($txt){
    $myfile = fopen("C:/newfile.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $txt);
    fclose($myfile);
}
function consql(){
    $host="localhost";
    $user="root";
    $password="";
    $con= mysqli_connect($host,$user,$password);
    
    if($con&&mysqli_select_db($con, 'MYTICKET')){
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
function getSqlsen_insert($tableName,$dir,$mark){//tableName是数据库表名称，arr是数据字典，$keyList是数据库键名,mark是01字符串，代表相应位有木有引号
        $sql="insert into ".$tableName."(";
        $cnt=count($dir);
        $keyStr="";
        $valStr="";
        $i=1;
        foreach($dir as $k=>$v){
            $dou=($i==$cnt?'':',');
            $keyStr=$keyStr.$k.$dou;
            if(empty($mark[$i-1])||$mark[$i-1]=="0"){
                $valStr=$valStr.$v.$dou;
            }else{
                $valStr=$valStr.'"'.$v.'"'.$dou;
            }
            $i++;
        }
        $sql=$sql.$keyStr.")values(".$valStr.");";
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

class REP{
    public $sqlkeyList=array('rid','jmmc','rtime','jmjs','zyyy','jmsc','jz');//演出剧目:剧目rid，剧目名称jmmc，上架时间rtime，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz
    
    function showli($picUrl){
        echo "<div class=\"oneRep\">";
        echo "<img href=\"\" src=\"$picUrl\" alt=\"图片加载错误\">";
        //echo ""
        echo "</div>";
    }
}
/**
 * 根据key删除数组中指定元素
 * @param  array  $arr  数组
 * @param  string/int  $key  键（key）
 */
function array_remove_by_key($arr, $key){
    if(!array_key_exists($key, $arr)){
        return $arr;
    }
    $keys = array_keys($arr);
    $index = array_search($key, $keys);
    if($index !== FALSE){
        array_splice($arr, $index, 1);
    }
    return $arr;
 
}
function mb_str_split($str,$split_length=1,$charset="UTF-8"){
  if(func_num_args()==1){
    return preg_split('/(?<!^)(?!$)/u', $str);
  }
  if($split_length<1)return false;
  $len = mb_strlen($str, $charset);
  $arr = array();
  for($i=0;$i<$len;$i+=$split_length){
    $s = mb_substr($str, $i, $split_length, $charset);
    $arr[] = $s;
  }
  return $arr;
}
function getSelfUrl(){
    return 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"]; 
}