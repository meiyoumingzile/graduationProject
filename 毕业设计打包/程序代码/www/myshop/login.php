<html>
    <head>
        <meta charset="UTF-8">
        <title>登录</title>
        
        <link rel="shortcut icon" href="pics/favicon.ico" >
        <link href="CSS/login.css" type=text/css rel=stylesheet>
        <meta http-equiv=content-type content="text/html; charset=utf-8">
    </head>
    <body>
        <div style="position:absolute;left: 0;top: 0;width:100%; height: 100%; background-color:f8f8f8;z-index:-1;" ></div>
        <div id="header" style=" margin-left:200px;width:100%; height: 100px;">
            <a href="shopHome_html.php"><img src="pics/tit.png"/></a>
        </div>
        <div id="bg">
            <img src="pics/login_bg.jpg"/>
        </div>
        
        
        <div id="main">
            <p >用户登陆</p>
            <form action="login.php" method="post">
            <div id="notice"></div>
            <div class="box">
                <img class="icon_nam" src="pics/usernam.png"></img>
                <input id="nam" type="text" name="nam" placeholder="用户名,手机号"><a id="namtxt"><a><br>
            </div>
            <div class="box">
                <img class="icon_nam" src="pics/userpwd.png"></img>
                <input id="pwd" type="password" name="pwd" placeholder="密码"><a id="pwdtxt"><a><br>
            </div>
            <a id="remtext">记住账户</a><input type="checkbox" name="rem"><br>
            <input id="sub" type="submit" value="登陆" >
            </form>
            <hr>
            <a id="linkRegister" href="register.php">去注册账号</a>
            <br>
            <hr>
        </div>
        <?php
        include 'PHP/public.php';
        $nam=@$_COOKIE['nam'];
        $pwd=@$_COOKIE['pwd'];   
        if(isset($_POST['nam'])&&isset($_POST['pwd'])){
            $nam=$_POST['nam'];
            $pwd=$_POST['pwd'];
            echo "<script>
                document.getElementById('nam').value='$nam';
                document.getElementById('pwd').value='$pwd';
            </script>";
        }else{
            if(isset($nam)&&isset($pwd)){
                echo "<script>
                document.getElementById('nam').value='$nam';
                document.getElementById('pwd').value='$pwd';
                </script>";
            }
            exit();
        }
        $keyList=array('tel','nam','pwd','jur');//网页属性列表
        function getSql_sel($tableName,$key,$str){
                $sql="select * from $tableName where $key=\"".$str.'"';
                return $sql;
        }
        $conn= consql();
        if( $conn){
            $sql=getSql_sel('user','nam',$nam);
            $res=mysqli_query($conn,$sql);
            $row= mysqli_fetch_array($res,MYSQL_ASSOC);
            if(count($row)>0&&$row['pwd']==$pwd){
                foreach ( $keyList as $a){
                    setcookie($a,$row[$a]);
                }
                setcookie("loginState",$row['nam']);
                setcookie("jur",$row['jur']);
                setcookie('user_id', $row['id']);
                echo "<script>
                window.location.href=\"shopHome_html.php\";
                </script>";
            }else{
                setcookie("nam",$nam);
                setcookie("pwd",$pwd);
                echo "<script>
                document.getElementById('notice').innerHTML='<font color=red>用户名或者密码错误</font>';
                </script>";
            }
        }
        ?>
    </body>
</html>
