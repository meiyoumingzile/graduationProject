<html><head>
    <title>主页</title>
    <script src="JS/jquery.js"></script>
    <script src="JS/jquery.cookie.js"></script>
    <script src="JS/public.js"></script>
    <link rel="shortcut icon" href="pics/favicon.ico" >
    <link href="CSS/shopHome_html.css" type=text/css rel=stylesheet>
    <link href="CSS/header.css" type=text/css rel=stylesheet>
    <meta http-equiv=content-type content="text/html; charset=utf-8">
</head>
<body>
    
    <div id="main_body">
        <?php
        include 'PHP/public.php';
        echo readFileHTML('header.html');
        /*W
        <div class='myadv' id='myadv1'></div>
        <div class='myadv' id='myadv2'></div>
         */
        function drawadvHTML(){
            $con=conSql();
            if($con){
                $sql="SELECT * FROM adv ORDER BY RAND() LIMIT 4";
                $res=mysqli_query($con,$sql);
                $i=0;
                echo "<div class='myadv' id='myadv1'>";
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    $url=$row['url'];
                    $img=$row['img'];
                    $img=str_replace("../","",$img);
                    echo "<div class='cancel'><button><img src='admin\img\icons\basic\cancel.png' width='10px' height='10px'></button><br>
                    <a href='$url'><img src='$img' width='100%'></a></div>";
                    $i++;
                    if($i>=2)
                        break;
                }
                echo "</div>";
                echo "<div class='myadv' id='myadv2'>";
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    $url=$row['url'];
                    $img=$row['img'];
                    $img=str_replace("../","",$img);
                    echo "<div class='cancel'><button><img src='admin\img\icons\basic\cancel.png' width='10px' height='10px'></button><br>
                    <a href='$url'><img src='$img' width='100%'></a></div>";
                }
                echo "</div>";
            }
        }
        drawadvHTML();
        ?>
        <hr class="blueline">
        <div id="middle">
            <form  method="get">
            <select name='kind'>
                <option value='0'>名称</option>
                <option value='1'>类别</option>
                <option value='2'>品牌</option>
            </select>
            <input name='search' placeholder="商品名称，品牌，分类"></input>
            <button>搜索</button>
            </form>
        </div>
        <hr class="blueline">
        <div id='main'>
            <?php
            function drawKindList($arr){
                $name=$arr['name'];
                $id=$arr['id'];
                $con=conSql();
                $goods=array();
                if($con){
                    $sql="SELECT * FROM goods where shelf=1&&kind_id=$id ORDER BY  RAND() LIMIT 4";
                    $res=mysqli_query($con,$sql);
                    while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                        $goods[]=$row;
                    }
                }
                if(count($goods)){
                    echo "<div class='kindList'>
                        <div class='kindTop'> $name:<div class='more' id='more$id'> <a href='shopHome_html.php?kind=1&search=$name'>查看更多》》</a></div></div>";
                    foreach($goods as $li){//$goods
                        $img=$li['img'];
                        $nam=$li['name'];
                        $goods_id=$li['id'];
                        $img=str_replace("../","",$img);
                        echo "<div class='goodsLink'><a href='goodsDetailed.php?id=$goods_id'><img src='$img'></a>
                             <div class='goodsBottom'><a>$nam</a></div></div> ";

                    }
                    echo "</div>";
                }
                
            }
            function drawSearchResList($list){
                echo "<div class='kindList'>";
                foreach($list as $arr){
                    $name=$arr['name'];
                    $id=$arr['id'];
                    $img=$arr['img'];
                    $nam=$arr['name'];
                    $img=str_replace("../","",$img);
                    echo "<div class='goodsLink'><a href='goodsDetailed.php?id=$id'><img src='$img'></a>
                         <div class='goodsBottom'><a>$nam</a></div></div> ";
                }
                echo "</div>";
            }
            $selfUrl=getSelfUrl();
            if(isset($_GET['page'])){
                $pos=strripos(getSelfUrl(),'?');
                $selfUrl=substr($selfUrl,0,$pos+1);
                $str=substr($selfUrl,$pos+1);
                $strArr= explode('&',substr($selfUrl,$pos+1));
                foreach($strArr as $a){
                    if(explode('=',$a)[0]!='page'){
                        $selfUrl.='&'.$a;
                    }
                }
                $page=$_GET['page'];
            }else{
                if(strripos(getSelfUrl(),'?')==false)
                    $selfUrl.='?';
                $page=0;
            }
            $maxCnt=5;
            $begin=$maxCnt*$page;
            $nowCnt=0;
            if(!empty($_GET['search'])){ 
                $content=$_GET['search'];
                $goodsKind=isset($_GET['kind'])?$_GET['kind']:0;
                $arr=mb_str_split($content);
                $newContent='%';
                foreach($arr as $a)
                    $newContent.=$a.'%';
                if($goodsKind=="0"){
                    $sql="select * from goods where shelf=1&&name like '$newContent' order by id DESC limit $begin,$maxCnt;";
                    echo "搜索商品：”$content ”";
                }else if($goodsKind=="1"){
                    $sql="select * from goods,kind where shelf=1&&kind.id=goods.kind_id&& kind.name like '$newContent' order by goods.id DESC limit $begin,$maxCnt;";
                     echo "搜索商品分类：”$content ”";
                }else if($goodsKind=="2"){
                    $sql="select * from goods,brand where shelf=1&&brand.id=goods.brand_id&& brand.name like '$newContent' order by goods.id DESC limit $begin,$maxCnt;";
                    echo "搜索商品品牌：”$content ”"; 
                }
                $con=conSql();
                if($con){
                    $res=mysqli_query($con,$sql);
                    $list=array();
                    while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                        $list[]=$row;
                        if(count($list)==4){
                            drawSearchResList($list);
                            $list=array();
                        }
                        $nowCnt++;
                    }
                    if(count($list)>0){
                        drawSearchResList($list);
                    }
                }
            }else{
                $con=conSql();
                if($con){
                    $sql="select * from kind order by id limit $begin,$maxCnt";
                    $res=mysqli_query($con,$sql);
                    while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                        drawKindList($row);
                        $nowCnt++;
                    }
                }
            }
            ?>
        </div>
        <hr class="blueline">
        <div id='bottom'>
            <?php
                $rowCnt=$nowCnt+1;
                $pre=$page-1;
                $next=$page+1;
                echo "<div ><button id='pre' style='float:letf'><img src='admin\img\icons\basic\left.png' height='30' width='30'></button>";
                echo "<button id='next' style='float:right'><img src='admin\img\icons\basic\\right.png' height='30' width='30'></button></div>";
                echo "
                    <script>
                    document.getElementById('pre').onclick=function(){
                        if($pre>=0){
                            window.location.href='$selfUrl&page=$pre';
                        }
                    }
                    document.getElementById('next').onclick=function(){
                        if($rowCnt==$maxCnt+1){
                            window.location.href='$selfUrl&page=$next';
                        }
                    }
                    </script>
                ";
            ?>
        </div>
    </div>
    
    <script src='JS//shopHome_html.js'></script>
</body>
</htmL>
