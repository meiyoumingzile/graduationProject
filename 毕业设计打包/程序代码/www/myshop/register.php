<html>
    <head>
        <meta charset="UTF-8">
        <title>注册</title>
        <script type='text/javascript' src="JS/jquery.js"></script>
        <script type='text/javascript' src="JS/public.js"></script>
        <link rel="shortcut icon" href="pics/favicon.ico" >
        <link href="CSS/register.css" type=text/css rel=stylesheet>
        <link href="Flat-UI-master/dist/css/vendor/bootstrap.min.css" rel="stylesheet">
        <link href="Flat-UI-master/dist/css/flat-ui.css" rel="stylesheet">
        <link href="Flat-UI-master/docs/assets/css/demo.css" rel="stylesheet">
        <meta http-equiv=content-type content="text/html; charset=utf-8">
    </head>
    <body>
        <?php
        
        ?>
        <div style="position:absolute;left: 0;top: 0;width:100%; height: 100%; background-color:f8f8f8;z-index:-1;" ></div>
        <div id="header" style=" margin-left:200px;width:100%; height: 100px;">
            <a href="shopHome_html.php"><img src="pics/tit.png"/></a>
        </div>
        <div id="main">
            <p id="tittext">新用户注册</p>
            <ul id="myul">
                <li> <div class="box">
                <label>手机号</label>
                <input type="text"  id="tel"  placeholder="大于8位的纯数字" ></input> <a id="notice_tel"></a>
                </div></li>
                <li> <div class="box">
                     <label>用户名</label>
                     <input  type="text" id="nam"  placeholder="3到20位的:英文字母,数字,下划线"></input> <a id="notice_nam"></a>
                </div></li>
                <li><div class="box"> 
                     <label>密码</label>
                     <input  type="text" id="pwd1"  placeholder="包含:英文大写和小写字母，数字"></input> <a id="notice_pwd1"></a>
                </div></li>
                <li> <div class="box">
                    <label>确认密码</label>
                     <input type="text"  id="pwd2"  placeholder="两次必须一致"></input> <a id="notice_pwd2"></a>
                </div></li>
                <li> <div id="sub">
                    <button type="text" >确认注册</button>
                </div></li>
            <ul>
        </div>
        
        <div id="d"></div>
        
        <script type='text/javascript' src="JS/register.js"></script>
    </body>
</html>