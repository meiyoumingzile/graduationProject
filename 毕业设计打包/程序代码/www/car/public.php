<?php
function jumpUrl($url){
    echo "<script>  window.location.href=\"$url\"; </script>";
}
function judgeAdmin($url="login.php"){
    if(!isset($_COOKIE['loginState'])){
        echo "<script> alert('登录失效，请重新登录');window.location.href=\"../login.php\"; </script>";
        return null;
    }
    if(isset($_COOKIE['jur'])&&$_COOKIE['jur']>1){
    }else{
        echo "<script> alert('权限不够不能进入');window.location.href=\"../login.php\"; </script>";
        return null;
    }
    return $_COOKIE['loginState'];
}
function judgeLog($url="login.php"){
    if(!isset($_COOKIE['loginState'])){
        notice("登录失效，请重新登录");
        echo "<script>  window.location.href=\"$url\"; </script>";
        return null;
    }
    return $_COOKIE['loginState'];
}
function getUrlData($key,$url){
    $str=isset($url)?$url:$_SERVER["QUERY_STRING"];
    $ind=stripos($str,'?');
    if($ind==false)
        return "";
    $str=substr($str,$ind+1);
    $arr= explode('&',$str);
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
    $myfile = fopen("E:/newfile.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $txt);
    fclose($myfile);
}
function consql(){
    $host="localhost";
    $user="root";
    $password="";
    $con= mysqli_connect($host,$user,$password);
    
    if($con&&mysqli_select_db($con, 'car')){
        mysqli_query($con,"SET NAMES 'utf8'");
        return $con;
    }else{
        echo "<script>'数据库异常'</script>";
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
function getSqlsen_update($tableName,$dir,$condition,$mark){
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
    $sql=$sql." where ".$condition;
    return $sql;
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
function getLastUrl(){
    return $_SERVER['HTTP_REFERER'];
}
function readFileHTML($url){
    $myfile = fopen($url, "r") or die("Unable to open file!");
    $str= fread($myfile,filesize($url));
    fclose($myfile);
    return isset($str)?$str:"";
}
function getSqlJson($res){//参数是数据库查询结果
    if (!$res) {
        return "";
    }
    $jarr = array();
    $i=0;
    while ($rows=mysqli_fetch_array($res,MYSQLI_ASSOC)){
        $jarr[$i++]=$rows;      
    }
    return json_encode($jarr);
}