<html>
    <head>
        <title>注册页</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
        <link rel="stylesheet" type="text/css" href="CSS/register.css">
        <script type='text/javascript' src="JS/public.js"></script>
    </head>
    <body>
       
        <ul id="myul">
            <li> <a href="http://localhost/JICKET/myTicketHome.php">返回主页</a></li>
            <li> <label>手机号：</label>
                 <input type="text"  id="tel"  placeholder="必须是大于8位的纯数字" ></input> <a id="notice_tel"></a>
            </li>
            <li> <label>用户名：</label>
                 <input  type="text" id="nam"  placeholder="用户名只能是3到20位的：英文字母,数字,下划线"></input> <a id="notice_nam"></a>
            </li>
            <li> <label>密码：</label>
                 <input  type="text" id="pwd1"  placeholder="密码必须包含：英文大写字母,英文小写字母，数字"></input> <a id="notice_pwd1"></a>
            </li>
            <li> <label>确认密码：</label>
                 <input type="text"  id="pwd2"  placeholder="两次必须一致"></input> <a id="notice_pwd2"></a>
            </li>
            <li> <label>邮箱：</label>
                 <input type="text"  id="mail"  placeholder="注意邮箱格式"></input> <a id="notice_mail"></a>
            </li>
            <li> 
                <button type="text"  id="sub">确认注册</button>
            </li>
        <ul>
        <div id="d"></div>
        <script type='text/javascript' src="JS/register/register.js"></script>
    </body>
</html>