<?php
include 'public.php';

function addRepHTML($rid,$title,$picUrl){
    echo "<div class='repFrame'>
    <div style=\"width:100%\"><a>$title</a></div>
    <div><a href=\"PHP/seeRepertoire.php?rid=$rid\"><img src=\"$picUrl\" alt=\"图片加载错误\"  height=\"240\" width=\"240\"></a></div>
    <div><a href=\"PHP/delRepertoire.php?id=$rid\"><<删除</a></div>
    <div><a href=\"PHP/addRepertoire.php?id=$rid\"><<更改</a></div>
    </div>"; 
}
function addFieHTML($dir){
    //$sqlkeyList=array('fid','rid','thid','begintime','surtiCnt','price','Selling');
    $keyArr=array();
    foreach($dir as $k=>$v){
        $keyArr[]=$v;
    }
    $keyArr[6]=($keyArr[6]==0?"未开启":"开启");
    $btStr="更改";
     echo "<div class='fieFrame'>
     <div ><a>场次编号：$keyArr[0]</a></div>
     <div ><a>剧目编号：$keyArr[1]</a></div>
     <div ><a>剧场编号：$keyArr[2]</a></div>
     <div ><a>开演时间：$keyArr[3]</a></div>
     <div ><a>剩余票数：$keyArr[4]</a></div>  
     <div ><a>单价：$keyArr[5]</a></div>      
     <div ><a>售票开启状态：".$keyArr[6]."</a><button id=\"bt_Selling$keyArr[0]\">$btStr</button></div>  
      </div>";
}
function addFieJs($id,$Selling,$page){
    $dir=array("fid"=>$id,'Selling'=>(string)(1-$Selling));
    $json=json_encode($dir);
    $json=addslashes($json);
    echo "<script>
        document.getElementById(\"bt_Selling$id\").onclick=function(){
            function success(str){
                alert(str);
                window.location.href=\"myTicketAdmin.php?kind=2;page=$page\";
            }  
            httpCon(\"PHP/switchFieldSelling.php\",\"$json\",\"post\",success);
        }
    </script>";
}
function addUserJs($id){
    $strHTML="<table ><tr><th>订单编号</th> <th>场次编号</th> <th>剧目</th> <th>剧场</th> <th>开始时间</th><th>单价</th><th>数量</th><th>总价</th></tr>";
    $conn= consql();
    if($conn){
        $sql="select ticket.tid,ticket.fid,repertoire.jmmc,theatre.jcmc,field.begintime,ticket.price,ticket.cnt,ticket.sumprice
            from ticket,field,repertoire,theatre
            where tel=\"$id\"&&field.fid=ticket.fid&&field.rid=repertoire.rid&&field.thid=theatre.thid
            order by ticket.tid DESC";
        $res=mysqli_query($conn,$sql);
        while( $row= mysqli_fetch_array($res,MYSQLI_NUM)){
            $strHTML.='<tr>';
            foreach($row as $a){
                $strHTML.="<th>$a</th>";
            }
            $strHTML.='</tr>';
        }
        $strHTML.="</table>";
    }
    echo "<script>
        document.getElementById(\"th$id\").onmouseover=function(){
            var hint=document.getElementById(\"hintList\");
            pos=getMousePos();
            //alert(pos.x+\" \"+pos.y);
            hint.style.position=\"absolute\";
            hint.style.top=pos.y;
            hint.style.left=pos.x;
            hint.style.zIndex=\"2\";
            hint.style.opacity=\"0.6\";
            hint.style.backgroundColor=\"bab5fd\";
            hint.innerHTML=\"$strHTML\";
        }
        document.getElementById(\"th$id\").onmouseout=function(){
           var hint=document.getElementById(\"hintList\");
           hint.innerHTML=\"\";
        }
    </script>";
}
$kind= getUrlData('kind');
$kind=empty($kind)?0:(int)$kind;
$page=getUrlData('page');
$page=empty($page)?0:(int)$page;
$cnt=0;
/*
top_right
 * 
 */
/*=judgeLog();
 echo "<script>
     document.getElementById(\"th$id\").innerHTML=\"<a>$</a>\";
     </script>";*/
switch($kind){
    case 0://剧目管理
         echo "<div class='repFrame'>
             <a style=\"color:red\">点击添加剧目</a><br>
        <div><a href=\"PHP/addRepertoire.php\"><img src=\"pics/add.png\" alt=\"图片加载错误\"  height=\"100\" width=\"100\"><a></div>
        </div>"; 
        
        $sqlkeyList=array('rid','jmmc','rtime','jmjs','zyyy','jmsc','jz');//演出剧目:剧目rid，剧目名称jmmc，上架时间rtime，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz
        $maxCnt=5;
        $down=$page*$maxCnt;
        $conn= consql();
        if($conn){
            $sql="select * from repertoire order by rtime DESC limit $down,$maxCnt;";
            $res=mysqli_query($conn,$sql);
            while( $row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                addRepHTML($row['rid'],$row['jmmc'],"PHP/".$row['jz']);
                $cnt++;
            }
        }
        $pre=$page-1>=0?$page-1:0;
        $nex=$cnt==$maxCnt?$page+1:$page;
        echo "<div style=\"width:90%;float:left;text-align:center;\" >
            <div style=\"float:left\"><a style=\"font-size:40px;\" href=\"myTicketAdmin.php?kind=0;page=$pre\">上一页</a></div>
            <div style=\"float:right\"><a style=\"font-size:40px;\" href=\"myTicketAdmin.php?kind=0;page=$nex\">下一页</a></div>
            </div>";
    break;    
    case 1://剧场管理,剧场thid，剧场名称jcmc，座位数量zwsl
        echo "<table border='1' align=\"center\">";
        echo "<tr><th>剧场编号</th> <th>剧场名称</th> <th>座位数</th></tr>";
        $maxCnt=20;
        $down=$page*$maxCnt;
        $conn= consql();
        if($conn){
            $sql="select * from theatre order by thid DESC limit $down,$maxCnt;";
            $res=mysqli_query($conn,$sql);
            $thArr=array();
            while( $row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                $thArr[]=$row;
                $thid=$row['thid'];
                echo "<tr id=\"tr$thid\">";
                foreach($row as $k=>$v){
                    echo "<th><a style=\"font-size:20px;\">$v</a></th>";   
                }
                
                echo "<th><a style=\"font-size:20px;\" href=\"PHP/addTheatre.php?id=$thid\">修改</a></th>";   
                echo "<th><a style=\"font-size:20px;\" href=\"PHP/delTheatre.php?id=$thid\">删除</a></th>";   
                echo "</tr>";
                $cnt++;
            }
        }
        $pre=$page-1>=0?$page-1:0;
        $nex=($cnt==$maxCnt?$page+1:$page);
        echo "<tr >
        <th><a style=\"font-size:20px;\" href=\"myTicketAdmin.php?kind=1;page=$pre\"\">上一页</a></th>
        <th><a style=\"font-size:20px;\" href=\"PHP/addTheatre.php\">添加</a></th> 
        <th><a style=\"font-size:20px;\" href=\"myTicketAdmin.php?kind=1;page=$nex\"\">下一页</a></th>
        </tr>";
        echo "</table> ";
    break; 
    case 2:
        echo "<div>
            <a href=\"PHP/addField.php\"><img src=\"pics/add.png\" alt=\"图片加载错误\"  height=\"40\" width=\"40\"></a>
            </div>";
        $sqlkeyList=array('fid'	,'rid','thid','begintime','surtiCnt','price','Selling');
        $maxCnt=5;
        $down=$page*$maxCnt;
        $conn= consql();
        if($conn){
            $sql="select * from field order by begintime DESC limit $down,$maxCnt;";
            $res=mysqli_query($conn,$sql);
            while( $row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                addFieHTML($row);
                addFieJs($row['fid'],$row['Selling'],$page);
                $cnt++;
            }
        }
        
        $pre=$page-1>=0?$page-1:0;
        $nex=$cnt==$maxCnt?$page+1:$page;
        echo "<div style=\"width:90%;float:left;text-align:center;\" >
            <div style=\"float:left\"><a style=\"font-size:40px;\" href=\"myTicketAdmin.php?kind=2;page=$pre\">上一页</a></div>
            <div style=\"float:right\"><a style=\"font-size:40px;\" href=\"myTicketAdmin.php?kind=2;page=$nex\">下一页</a></div>
            </div>";
    break; 
    case 3:
        echo '<div id="hintList"></div>';
        echo "<table border='1' align=\"center\">";
        echo "<tr><th>手机号</th> <th>用户名称</th> <th>订票数量</th></tr>";
        $maxCnt=20;
        $down=$page*$maxCnt;
        $conn= consql();
        if($conn){
            $sql="select * from user order by tel DESC limit $down,$maxCnt;";
            $res=mysqli_query($conn,$sql);
            while( $row= mysqli_fetch_array($res,MYSQLI_ASSOC)){
                $tel=$row['tel'];
                $uname=$row['uname'];
                
                echo "<tr><th><a style=\"font-size:20px;\" >$tel</a></th> 
                <th><a style=\"font-size:20px;\" >$uname</a></th>";  
                //$sql="select count(tid),fid,price,cnt,sumprice from ticket where tel=$tel";
                $sql="select count(tid) from ticket where tel=\"$tel\"";//得到数量，如果查不到，显示0
                $res1=mysqli_query($conn,$sql);
                $row1= mysqli_fetch_array($res1,MYSQLI_NUM);
                $ticketCnt=isset($row1[0])?$row1[0]:0;
                echo "<th id=\"th$tel\"><a  style=\"font-size:20px;\" >$ticketCnt</a></th></tr>";
                if($ticketCnt>0){
                    addUserJs($tel);
                }
                $cnt++;
            }
        }
        $pre=$page-1>=0?$page-1:0;
        $nex=($cnt==$maxCnt?$page+1:$page);
        echo "<tr >
        <th><a style=\"font-size:20px;\" href=\"myTicketAdmin.php?kind=3;page=$pre\"\">上一页</a></th>
        <th><a style=\"font-size:20px;\" href=\"myTicketAdmin.php?kind=3;page=$nex\"\">下一页</a></th>
        </tr>";
        echo "</table> ";
    break;     
}


