<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="../CSS/seeRepertoire.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
        <script type='text/javascript' src="../JS/public.js"></script>
    </head>
    <body>
        <div id="mytop"></div>
        <div id="liname">
           <div id='returnLast'><a href="../myTicketHome.php">返回</a></div>
           <HR style="BORDER-RIGHT: #00686b 1px dotted; BORDER-TOP: #00686b 1px dotted; BORDER-LEFT: #00686b 1px dotted; BORDER-BOTTOM: #00686b 1px dotted" noShade SIZE=1>
       </div>
        <?php
        include 'public.php';
        function drawRepHTML($dir){
            echo "<div id='repertoire'>";
            echo "<div id=\"rid\" class=\"text_div\"><p class=\"text_p\">剧目编号:".$dir['rid']."</p></div>";
            echo "<div id=\"jmmc\" class=\"text_div\"><p class=\"text_p\">剧名:".$dir['jmmc']."</p></div>";
            $path=$dir['jz'];
            echo "<div id=\"jz\" class=\"text_div\"><img class=\"text_p\" src=\"$path\"  alt=\"加载错误\" /></div>";
            
            echo "<div id=\"jmjs\" class=\"text_div\"><p class=\"text_p\">".$dir['jmjs']."</p></div>";
            echo "<div id=\"zyyy\" class=\"text_div\"><p class=\"text_p\">主演：".$dir['zyyy']."</p></div><br>";
            $t=$dir['jmsc']/60.0;
            echo "<div id=\"jmsc\" class=\"text_div\"><p class=\"text_p\">时长:".$t."分钟</p></div><br>";
            echo "</div>";
        }
        $rid=$_GET['rid'];
        if(empty($rid)){
            echo "出错了";
            exit();
        }
        $lastUrl=isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:"http://localhost/JICKET/myTicketHome.php";
        echo "<script>
            document.getElementById(\"returnLast\").innerHTML=\"<a href='$lastUrl'>返回</a>\";
        </script>";
        $sql="select * from repertoire  where rid=$rid;";
        $conn=consql();
        if($conn&&$res=mysqli_query($conn,$sql)){
            $row= mysqli_fetch_array($res,MYSQLI_ASSOC);
            echo "<script>document.title = \"".$row['jmmc']."\" </script>";
            drawRepHTML($row);
        }
        
        /*
         添加购买的HTML
         */
        if(isset($_GET['buy'])){
            $usertel=judgeLog();
            echo "<script>
                document.getElementById(\"repertoire\").style.width=\"60%\";
            </script>
            <div id='buyOption '>";
            $arr=array();
            $conn=consql();
            if($conn){
                $sql="select theatre.jcmc,field.* from theatre, field where field.rid=$rid&&theatre.thid= field.thid&&field.Selling=1";
                $res=mysqli_query($conn,$sql);
                while($row= mysqli_fetch_array($res,MYSQLI_ASSOC)){
                    $arr[]=$row;
                }
            }
            echo "<select id='selJcmc'><option value ='0|0|0|0|0'>未选中</option>";
            foreach($arr as $dir){
                $a=$dir['jcmc'];
                $thid= $dir['thid'];
                $date=$dir['begintime'];
                $price=$dir['price'];
                $surtiCnt=$dir['surtiCnt'];
                echo "<option value ='$price|$surtiCnt|$thid|$date'>$a---时间：$date</option>";
            }
            
            echo "</select>";
            echo "
                <a id='price' name='0'>单价:0元</a>
                <br><label>购买数量:<label><input id=\"number\" type=\"number\" min=\"0\" max=\"0\" value=\"0\"></input><a id=\"maxCnt\">总数量:未选中</a>
                <br><a id='sumprice'>总价:0 元</a>  
                <br><button id='sub'>确认订单</button>  
            ";
            echo "</div >";
            
            echo "<script>
                document.getElementById(\"selJcmc\").onchange=function(){
                   li=this.value.split(\"|\");
                   document.getElementById(\"price\").innerHTML=\"单价:\"+li[0]+\"元\";
                   document.getElementById(\"price\").name=li[0];
                   document.getElementById(\"number\").max=li[1];
                   document.getElementById(\"maxCnt\").innerHTML=\"总数量：\"+li[1];
                    num=parseInt(document.getElementById(\"number\").value);
                    if(num>parseInt(li[1])){
                        document.getElementById(\"number\").value=num=parseInt(li[1]);
                    }
                    price=parseInt(li[0]);
                   document.getElementById(\"sumprice\").innerHTML=\"总价:\"+num*price+\"元\";
                }
                document.getElementById(\"number\").onblur=function(){
                    li=document.getElementById(\"selJcmc\").value.split(\"|\");
                    num=parseInt(this.value);
                    price=parseInt(li[0]);
                    document.getElementById(\"sumprice\").innerHTML=\"总价:\"+num*price+\"元\";
                }
                document.getElementById(\"sub\").onclick=function(){
                    function success(str){
                        alert(str);
                    }
                    li=document.getElementById(\"selJcmc\").value.split(\"|\");
                    num=parseInt(document.getElementById(\"number\").value);
                    price=parseInt(li[0]);
                    sumprice=num*price;
                    if(sumprice>0){
                        jsonData={\"tel\":\"$usertel\",\"rid\":\"$rid\",\"thid\":li[2],\"begintime\":li[3],\"price\":li[0],\"cnt\":num,\"sumprice\":sumprice};
                        jsonData=JSON.stringify(jsonData);
                        httpCon(\"addTicket.php\",jsonData,\"post\",success);
                    }else{
                       alert(\"你还没有选择任何票\");
                    }
                    
                }
            </script>";
        }
    ?>
    </div>
    <script type="text/javascript" src="../JS/onLoad/onLoadHome.js"></script>
    </body>
</html>

