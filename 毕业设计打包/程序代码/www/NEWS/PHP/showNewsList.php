<?php
    function addHTML_lia($url,$myclass,$str){
        echo "<li><a target=\"_blank\" href=\"$url\" class=\"$myclass\">$str</a>";
    }
    function addHTML_lia2($url,$myclass,$str1,$str2){
        echo "<li><a>$str1</a><a  target=\"_blank\" href=\"$url\" class=\"$myclass\">$str2</a></li>";
    }
    $sqlKeyList=array("pid","ptitle","pcontent","pdepartment","pdate","ppicture","uname","cid","clnum",'review');
    $maxNewsCount=10;
    $down=$maxNewsCount*$page;
    if($kind==0){
        $sql="select pid,ptitle,category.cname from press,category  where category.cid=press.cid&&press.review>0 order by pdate desc limit $down,$maxNewsCount;";
    }else{
        $sql="select pid,ptitle from press where cid=$kind&&review>0 order by pdate desc limit $down,$maxNewsCount;";
    }
    $pressCount=0;
    $conn=consql();
    echo "<ul>";
    if($conn){
        $res=mysqli_query($conn,$sql);
        if($kind==0){
            while($row= mysqli_fetch_array($res,MYSQLI_NUM)){
                $pressCount++;
                addHTML_lia2("PHP/seeNews.php?pid=$row[0]","main_con_text_a",'('.$row[2].')',$row[1]);
            } 
        }else{
            while($row= mysqli_fetch_array($res,MYSQLI_NUM)){
                $pressCount++;
                addHTML_lia("PHP/seeNews.php?pid=$row[0]","main_con_text_a",$row[1]);
            } 
        }
    }
    echo "</ul>";
    /*
     * 添加换页按钮
     */
    echo" <div id=\"main_con_button\">
        <button id=\"bt_previous\">上一页</button>
        <button id=\"bt_next\">下一页</button>
    </div>";
    $previous=$page==0?0:($page-1);
    $next=$pressCount<$maxNewsCount?$page:($page+1);
    echo "<script language='javascript'>";
    echo "
        document.getElementById(\"bt_previous\").onclick=function(){
            window.location.href=\"myNewsHome_html.php?kind=$kind;page=$previous\";
        };
        document.getElementById(\"bt_next\").onclick=function(){
            window.location.href=\"myNewsHome_html.php?kind=$kind;page=$next\";
        };
        ";
    echo "</script>";
