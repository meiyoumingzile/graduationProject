<html>
    <head>
        <meta charset="UTF-8">
        <title>购物车</title>
        <link rel="stylesheet" type="text/css" href="../CSS/managesTicket.css">
        <link href="/pics/tit.ico" rel="shortcut icon">
        <script type='text/javascript' src="../JS/public.js"></script>
    </head>
    <body>
        <div id="mytop"></div>
        <div id="liname">
           <div id='returnLast'><a href="../myTicketHome.php">返回</a></div>
           <HR style="BORDER-RIGHT: #00686b 1px dotted; BORDER-TOP: #00686b 1px dotted; BORDER-LEFT: #00686b 1px dotted; BORDER-BOTTOM: #00686b 1px dotted" noShade SIZE=1>
       </div>
        <script type="text/javascript" src="../JS/onLoad/onLoadHome.js"></script>
        <?php
        include 'public.php';
        function drawRepHTML($dir){
            
        }
        $tel=judgeLog();
        $lastUrl=isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:"http://localhost/JICKET/myTicketHome.php";
        echo "<script>
            document.getElementById(\"returnLast\").innerHTML=\"<a href='$lastUrl'>返回</a>\";
        </script>";
        $sql="select ticket.tid,ticket.fid,repertoire.jmmc,theatre.jcmc,field.begintime,ticket.price,ticket.cnt,ticket.sumprice
            from ticket,field,repertoire,theatre
            where tel=\"$tel\"&&field.fid=ticket.fid&&field.rid=repertoire.rid&&field.thid=theatre.thid
            order by ticket.tid DESC";
        $conn= consql();
        if($conn){
            $strHTML="<table>";
            $strHTML.="<tr><th ></th><th>订单编号</th> <th>场次编号</th> <th>剧目</th> <th>剧场</th> <th>开始时间</th><th>单价</th><th>数量</th><th>总价</th></tr>";
            $res=mysqli_query($conn,$sql);
            $i=0;
            while( $row= mysqli_fetch_array($res,MYSQLI_NUM)){
                $strHTML.='<tr>';
                $strHTML.="<th><input type='checkbox' id=\"check$i\" name=\"$row[0]\"/></th>";
                $i++;
                foreach($row as $a){
                    $strHTML.="<th>$a</th>";
                }
                $strHTML.='</tr>';
            }
            $cnt=$i;
            $strHTML.="</table>";
            echo "<div id='myticket'>".$strHTML." 
            <button id=\"bt_del\">删除</button></th><th><button id=\"bt_pay\">确认支付</button>
            </div>
            <script>
                document.getElementById(\"bt_del\").onclick=function(){
                    data=\"\";
                    for(i=0;i<$cnt;i++){
                        var ch=document.getElementById(\"check\"+i);
                        if(ch.checked==true){
                            data+=','+ch.name;
                        }
                    }
                    data=data.substr(1);
                    if(data.length>0){
                        httpCon(\"delTicket.php\",data,\"post\",function(str){
                            alert(str);
                            window.location.href=\"managesTicket.php\";
                        });
                    }else{
                        alert(\"请选择订单\");
                    }
                }
                document.getElementById(\"bt_pay\").onclick=function(){
                    data=\"\";
                    for(i=0;i<$cnt;i++){
                        var ch=document.getElementById(\"check\"+i);
                        if(ch.checked==true){
                            data+=','+ch.name;
                        }
                    }
                    data=data.substr(1);
                    if(data.length>0){
                        httpCon(\"pay.php\",data,\"post\",function(str){
                            alert(str);
                            window.location.href=\"managesTicket.php\";
                        });
                    }else{
                        alert(\"请选择订单\");
                    }
                }
            </script>
            ";
        }
       
    ?>
    </div>
    
    </body>
</html>


            