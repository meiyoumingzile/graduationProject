<?php
/*
<div style="position:relative;">
            <img src="" width="500" height="500" />
            <div style="position:absolute; left:80px; top:50px; border:#000 solid 1px;"><img  src="" width="50" height="50"/></div>
        </div>
 */
include 'public.php';
//$_GET['searchsel'],$_GET['searchtext'],$_GET['page'],
$sqlkeyList=array('rid','jmmc','rtime','jmjs','zyyy','jmsc','jz');//演出剧目:剧目rid，剧目名称jmmc，上架时间rtime，剧目介绍jmjs，主要演员zyyy，剧目时长jmsc，剧照jz
function addLaterepHTML($rid,$jmmc,$picUrl,$rtime){
    echo "<div class='repFrame'>
        <div class='repFrame_left'>
        <div style=\"width:100%\"><a>$jmmc</a></div>
        <div><a href=\"PHP/seeRepertoire.php?rid=$rid\"><img src=\"PHP/$picUrl\" alt=\"图片加载错误\"  height=\"240\" width=\"240\"><a></div>
        <div><a>上映时间：$rtime</a></div>
        </div>
        <div class='repFrame_right'>
        <button id=\"buy$rid\">购买</button>
        </div>
    </div>"; 
    echo "<script>
    document.getElementById('buy$rid').onclick=function(){
        window.location.href=\"PHP/seeRepertoire.php?rid=$rid&buy=1\";
    }
    </script>";
}

echo "<script>
document.getElementById('searchlink').name=\"myTicketHome.php?\searchsel=new&page=0\";
document.getElementById('searchlink').onclick=function(){
    if(document.getElementById('searchtext').value!=\"\"){
        sel=document.getElementById('searchsel').value;
        this.name=\"myTicketHome.php?\searchsel=\"+sel+\"&content=\"+document.getElementById('searchtext').value+\"&page=0\";
        window.location.href=this.name;
    }else{
        this.name=\"myTicketHome.php?\searchsel=new&page=0\";
        window.location.href=this.name;
    }
    return false;
}
</script>
";
$content=isset($_GET['content'])?$_GET['content']:"";
$searchsel=(isset($_GET['searchsel'])&&$content!="")?$_GET['searchsel']:"new";

$page=isset($_GET['page'])?$_GET['page']:0;
$down=0;
$maxCnt=5;
$cnt=0;
$conn= consql();
if($conn){
    switch ($searchsel){
        case "new":
            $sql="select * from repertoire order by rtime DESC limit $down,$maxCnt;";
            
            break;
        case "byjmmc":
            $arr=mb_str_split($content);
            $newContent='%';
            foreach($arr as $a){
                $newContent.=$a.'%';
            }

            $sql="select * from repertoire where jmmc like '$newContent' order by rtime DESC limit $down,$maxCnt;";
           
        case "byjmjs":
            $arr=mb_str_split($content);
            $newContent='%';
            foreach($arr as $a){
                $newContent.=$a.'%';
            }

            $sql="select * from repertoire where jmjs like '$newContent' order by rtime DESC limit $down,$maxCnt;";
           
        case "byzyyy":
            $arr=mb_str_split($content);
            $newContent='%';
            foreach($arr as $a){
                $newContent.=$a.'%';
            }
            $sql="select * from repertoire where zyyy like '$newContent' order by rtime DESC limit $down,$maxCnt;";
    }
    $res=mysqli_query($conn,$sql);
    while( $row= mysqli_fetch_array($res,MYSQL_ASSOC)){
       $cnt++;
       addLaterepHTML($row['rid'],$row['jmmc'],$row['jz'],$row['rtime']);
    }
    if($cnt==0){
        echo "<div style=\"width:100%;font-size:40px\"><a>没有找到结果</a></div>";
    }
    $pre=$page-1>=0?$page-1:0;
    $nex=$cnt==$maxCnt?$page+1:$page;
    $self= getSelfUrl();
    if(strpos($self,'page')==false){
        $self="myTicketHome.php?/searchsel=new&page=0";
    }else{
        $p=strrpos($self,'=');
        $self=substr($self,0,$p+1);
    }
    
    echo "<div style=\"width:90%;float:left;text-align:center;\" >
        <div style=\"float:left\"><a style=\"font-size:40px;\" href=\"$self$pre\">上一页</a></div>
        <div style=\"float:right\"><a style=\"font-size:40px;\" href=\"$self$nex\">下一页</a></div>
        </div>";
}