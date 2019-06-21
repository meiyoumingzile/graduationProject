<html><head>
    <title>个人中心</title>
    <script src="JS/jquery.js"></script>
    <script src="JS/jquery.cookie.js"></script>
    <script src="JS/public.js"></script>
    <link rel="shortcut icon" href="pics/favicon.ico" >
    <link href="Flat-UI-master/dist/css/flat-ui.css" rel="stylesheet">
    <link href="Flat-UI-master/docs/assets/css/demo.css" rel="stylesheet">
    <link href="CSS/personal.css" type=text/css rel=stylesheet>
    <link href="CSS/header.css" type=text/css rel=stylesheet>
    <meta http-equiv=content-type content="text/html; charset=utf-8">
</head>
<body>
    <div id="main_body">
        <?php
        include 'PHP/public.php';
        // <link rel="stylesheet" href="CSS/reset.css">
        function drawIndentHTML($arr){
            $img=$arr[2];
            $price=$arr[3];
            $name=$arr[1];
            $num=$arr[8];
            $id=$arr[9];
            $statusName=$arr[10];
           // alert($statusName);
            $img=str_replace("../","",$img);
            echo "<div class='goodsbar' style=\"width:100%;height:100px;margin-top:10px;margin-bottom:6px;line-height:100px;\">
            <div style=\"width:40px;float:left;text-align:center;padding-top:40px;\"><input id='input$id' class='goodsbar_input' type='checkbox' style=\"width:20px;height:20px;\"/></div>
            <div style=\"float:left;\"><a href='goodsDetailed.php?id=$arr[0]'><img src='$img' width='100px' height='100px'></a></div>
            <div style=\"width:100px;float:left;text-align:center;\"><label>$name</label></div>
            <div style=\"width:150px;float:left;text-align:center;\">单价：$price 元</div>
            <div style=\"width:100px;float:left;text-align:center;\"><a>数量:$num</a></div>
            <div style=\"width:100px;float:left;text-align:center;padding-top:40px;\"><button class='delete'id='delete$id' ><img src='admin\img\icons\basic\delete.png' height='30' width='30'></button></div>
            <div style=\"width:200px;float:left;text-align:center;\"><a>订单状态:$statusName<a></div>
            <div  style=\"width:800px\">送货的地址:$arr[12]  ($arr[11])收<div>
            </div>";
        }
        function drawGoodsbarHTML($arr){//goods.* indent.num,indent.id
            $img=$arr[2];
            $price=$arr[3];
            $name=$arr[1];
            $num=$arr[8];
            $id=$arr[9];
            $img=str_replace("../","",$img);
            echo "<div class='goodsbar' style=\"width:100%;height:100px;margin-top:10px;margin-bottom:6px;line-height:100px;\">
            <div style=\"width:40px;float:left;text-align:center;padding-top:40px;\"><input id='input$id' class='goodsbar_input' type='checkbox' style=\"width:20px;height:20px;\"/></div>
            <div style=\"float:left;\"><a href='goodsDetailed.php?id=$arr[0]'><img src='$img' width='100px' height='100px'></a></div>
            <div style=\"width:100px;float:left;text-align:center;\"><label>$name</label></div>
            <div style=\"width:200px;float:left;text-align:center;\">单价：$price 元</div>
            <div style=\"width:200px;float:left;text-align:center;\"><a>数量</a><input id='buyNum$id' type='number' value='$num' min=0 style=\"width:40px;height:40px;font-size:28px;\"/></div>
            <div style=\"width:100px;float:left;text-align:center;padding-top:40px;\"><button class='delete'id='delete$id' ><img src='admin\img\icons\basic\delete.png' height='30' width='30'></button></div>
            <div style=\"width:100px;float:left;text-align:center;padding-top:40px;\"><button name='buy$arr[0]' class='buy' id='buy$id' style=\"width:80px;height:40px;font-size:20px;\">购买</button></div>
            </div>";
        }
        function drawCommentHTML($arr){
              $id=$arr['id'];
              $comment_id=$arr['comment_id'];
              $selfName=$arr['nam'];
              $text='@'.$selfName;
              $content=$arr['content'];
              $goods_id=$arr['goods_id'];
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
                              <a >$otherComment</a>
                              <hr>
                              ";
                      }

              echo "<a href='goodsDetailed.php?id=$goods_id'>$content</a><br>
                  <a class='hrefButton' name='hrefButton$selfName' id='hrefButton$id '>删除</a>
                  </div>";
          }
        $loginState=judgeLog();
        echo readFileHTML('header.html');
        echo "
            <div id='select'><div class='select_op'><a>我的联系方式</a></div>
            <div class='select_op'><a>我的订单</a></div>
            <div class='select_op'><a>我的购物车</a></div>
            <div class='select_op'><a>我的评论</a></div></div>
            ";
        echo"<div id='main'>";
        $type=isset($_GET['type'])?$_GET['type']:'1';
        $user_id=$_COOKIE['user_id'];
        switch( $type){
        case "1":
            $tabList=array('name'=>'联系人','addr'=>'送货地址','tel'=>'手机号','email'=>'邮箱');
            echo "<a>我的联系人:</a>";
            echo "<table class='mytable'>";
            $con= consql();
            if($con){
                $sql="select touch.*  from touch,user where touch.user_id=user.id&&user.nam='$loginState';";
                $res=mysqli_query($con,$sql);
                $i=1;
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    $id=$row['id'];
                    echo "<tr>";
                    echo "<td class='alt'><a>我的联系方式$i</a></td>";
                    foreach($tabList as $k=>$v){
                        echo "<td class='alt'><a>$v:$row[$k]</a></td>";
                    }
                    echo "<td class='alt'><button class='delete'  id='delete$id' ><img src='admin\img\icons\basic\delete.png' height='30' width='30'></button> </td>
                            <td class='alt'><button class='update' id='update$id&$i'><img src='admin\img\icons\basic\update.png' height='30' width='30'></button></td>
                            </tr>";
                    $i++;
                }
            }
            echo "<tr><td id='labelAdd'>添加新的联系方式</td>";
            foreach($tabList as $k=>$v){
                echo "<td><a>$v:</a><input class='inText' id='inText$k'></input></td>";
            }     
            echo "<td><button id='add' class='add'><img src='admin\img\icons\basic\save.png' height='30' width='30'></button></td>";
            echo "<td><button id='cancel'><img src='admin\img\icons\basic\cancel.png' height='30' width='30'></button></td></tr>";
            echo "</table>";
        break;
        case "2":
            echo "<div id='myshoppingCart'>";
            $con= consql();
            if($con){
                $sql="select goods.*,indent.num,indent.id,status.name,touch.name,touch.addr from goods,indent,status,touch where touch.id=indent.touch_id&&status.id=indent.status_id&&indent.goods_id=goods.id&&indent.user_id=$user_id&&indent.touch_id is not null";
                $res=mysqli_query($con,$sql);
                $i=1;
                while($row= mysqli_fetch_array($res,MYSQL_NUM)){
                    drawIndentHTML($row);
                    $i++;
                }
                if($i>1){//<button>购买选中</button></div>
                    echo "<div id='batch'>
                        <div id='batch_1'>全选<input type='checkbox' style=\"width:20px;height:20px;\"/></div>
                        <div id='batch_2'></div>
                        <button>删除选中</button>
                        </div>";
                }else{
                    echo "没有任何订单";
                }
            }
            echo "</div>";
        break;
        case "3":
            echo "<div id='myshoppingCart'>";
            $con= consql();
            if($con){
                $sql="select goods.*,indent.num,indent.id from goods,indent where indent.goods_id=goods.id&&indent.user_id=$user_id&&indent.touch_id is null";
                $res=mysqli_query($con,$sql);
                $i=1;
                while($row= mysqli_fetch_array($res,MYSQL_NUM)){
                    drawGoodsbarHTML($row);
                    $i++;
                }
                if($i>1){//<button>购买选中</button></div>
                    echo "<div id='batch'>
                        <div id='batch_1'>全选<input type='checkbox' style=\"width:20px;height:20px;\"/></div>
                        <div id='batch_2'></div>
                        <button>删除选中</button>
                        </div>";
                }else{
                    echo "没有任何物品";
                }
            }
            echo "</div>";
        break;
        case "4":
            $con= consql();
            if($con){
                $sql="select comment.*,user.nam from comment LEFT OUTER JOIN user on comment.user_id=user.id&&comment.user_id=$user_id order by comment.id desc";;
                $res=mysqli_query($con,$sql);
                while($row= mysqli_fetch_array($res,MYSQL_ASSOC)){
                    drawCommentHTML($row);
                }
            }
        break;
        }
        echo"</div>";
        ?>
    </div>
    <script src="js/carts.js"></script>
    <script src='JS//personal.js'></script>
</body>
</htmL>
