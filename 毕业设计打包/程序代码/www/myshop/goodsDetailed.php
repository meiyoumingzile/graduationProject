<html><head>
    <title></title>
    <script src="JS/jquery.js"></script>
    <script src="JS/jquery.cookie.js"></script>
    <script src="JS/public.js"></script>
    <link rel="shortcut icon" href="pics/favicon.ico" >
    <link href="CSS/goodsDetailed.css" type=text/css rel=stylesheet>
    <link href="CSS/header.css" type=text/css rel=stylesheet>
    <meta http-equiv=content-type content="text/html; charset=utf-8">
</head>
<body>
    <div id="main_body">
        <?php
        include 'PHP/public.php';
        echo readFileHTML('header.html');
        judgeLog();
        ?>
        <hr class="blueline">
        <div class='main'>
            <?php
            function drawCommentHTML($arr){
                $id=$arr['id'];
                $comment_id=$arr['comment_id'];
                $selfName=$arr['nam'];
                $text='@'.$selfName;
                $content=$arr['content'];
                $con=consql();
                $otherName=null;
                $otherComment=null;
                if($con){
                    $sql="select comment.content,user.nam from comment,user where comment.user_id=user.id&&comment.id=$comment_id";
                    $res=mysqli_query($con,$sql);
                    while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                        $otherName=$row['nam'];
                        $otherComment=$row['content'];
                        $text.=" 回复 @".$otherName;
                    }
                }
                echo"<div class='commentList'>
                    <div class='userName'><a>$text;</a></div>";
                        if(!empty($otherComment)){
                            echo "
                                <a>@$otherName:</a><br>
                                <a>$otherComment</a>
                                <hr>
                                ";
                        }
                        
                echo "<a>$content</a><br>
                    <a class='hrefButton' name='hrefButton$selfName' id='hrefButton$id '>回复</a>";
                if($selfName==$_COOKIE['loginState']){
                    echo "<a class='hrefDelButton' name='hrefDelButton$selfName' id='hrefDelButton$id '>删除</a>";
                }
                echo"</div>";
            }
            if(!isset($_GET['id'])){
                echo "没有找到页面！！！";
                exit();
            }
            $id=$_GET['id'];
            
            $con= consql();
            if($con){
                $sql="select * from goods where id=$id;";
                $res=mysqli_query($con,$sql);
                $row= mysqli_fetch_array($res,MYSQL_ASSOC);
            }
            $img=$row['img'];
            $img=str_replace("../","",$img);
            $num=$row['renum'];
            $name=$row['name'];
            $price=$row['price'];
            echo " <table class='goodsList'>
                <tr><td></td><td></td><td>价格</td><td>库存数量</td><td>购买数量</td><td></td><tr>
                <tr><td><img src='$img'></td>
                <td id='goodsName'><label>$name</label></td> 
                <td>$price 元</td><td>$num</td>
                <td><input type='number' id='num' value='1'></td>
                <td class='submit'><button id='buy'>直接购买</button><button id='cart'>加入购物车</button></td><tr>    
                </table>
                ";
            echo "<div id='commentHead'><a> 商品评论：</a></div>";
            $user_id=$_COOKIE['user_id'];
            
            echo "<div id='myComment'><a id='myCommentLabel'> 发布我对商品的评论：</a>
                <form id='addComment'action='PHP//addComment.php?user_id=$user_id&goods_id=$id' method='post'>
                <textarea name='content' placeholder='发表你的看法,少于300字符' maxlength='300'></textarea><br>
                <button id='submitComment' name='submitComment'>发表</button>
                </form>
                </div>";
            echo"<hr class='blueline'>";
            $con= consql();
            if($con){
                $sql="select comment.*,user.nam from comment,user where comment.user_id=user.id&&comment.goods_id=$id order by comment.id desc";;
                $res=mysqli_query($con,$sql);
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    drawCommentHTML($row);
                }
            }
            ?>
        </div>
    </div>    
    <script src='JS//goodsDetailed.js'></script>
</body>
</htmL>
