<html>
    <head>
        <title>注册页</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
        <script charset="utf-8">
        function compareName(str){
            if(str.indexOf("succ")!=-1){//js==不可靠，这里用等号就不能判断相等
                echo("注册成功");
            }else if(str.indexOf("erro")!=-1){
                echo("账号已存在...");
            }else{
                echo("网络异常。。.");
            }
        }
        function httpCon(url,data,method,success) {
            var ajax = new XMLHttpRequest();
            if (method=='get') {
                if (data) {
                        url+='?';
                        url+=data;
                }else{

                }
                // 设置 方法 以及 url
                ajax.open(method,url);
                ajax.send();
            }else{
                    ajax.open(method,url);
                    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

                if (data) {
                    ajax.send(data);
                }else{
                    ajax.send();
                }
            }

            // 注册事件
            ajax.onreadystatechange = function () {
                 // 在事件中 获取数据 并修改界面显示
                if (ajax.readyState==4&&ajax.status==200) {

                    // 将 数据 让 外面可以使用
                     //return ajax.responseText;

                    // 当 onreadystatechange 调用时 说明 数据回来了
                    // ajax.responseText;

                    // 如果说 外面可以传入一个 function 作为参数 success
                    success(ajax.responseText);
                }
            }
        }
        
        function echo(s){
             document.getElementById("d").innerHTML+="<font color=\"red\">"+s+"</font><br>";
        }
        window.onload = function(){ 
            var btn = document.getElementById("sub"); 
            btn.onclick = function(){
                var isConnect=true;
                document.getElementById("d").innerHTML="";
                var nam = document.getElementById("nam").value; 
                var pwd1 = document.getElementById("pwd1").value; 
                var pwd2 = document.getElementById("pwd2").value; 
                var mail = document.getElementById("mail").value; 
                var patt = new RegExp("^[0-9a-zA-Z_]{3,20}$");
                if(patt.test(nam)==false){
                    echo("用户名只能是3到20位的：英文字母,数字,下划线");
                    isConnect=false;
                }
               var patt1 = new RegExp("[0-9]");
               var patt2 = new RegExp("[a-z]");
               var patt3 = new RegExp("[A-Z]");
                if(patt1.test(pwd1)==false||patt2.test(pwd1)==false||patt3.test(pwd1)==false){
                    echo("密码必须包含：英文大写字母,英文大写字母，数字");
                    isConnect=false;
                }
                if(pwd1!=pwd2){
                    echo("再次输入必须相同");
                    isConnect=false;
                }
                
                var patt = new RegExp("");
                if(patt.test(mail)==false){
                    echo("邮箱格式错误");
                    isConnect=false;
                }
                
                if(isConnect==true){
                    url="PHP/register.php";
                    json="{\"pwd\":\""+pwd1+"\",\"nam\":\""+nam+"\",\"mail\":\""+mail+"\",\"jur\":\"1\"}";
                    httpCon(url,json,"post",compareName);
                } 
            } 
               
        }
        </script>

    </head>
    <body>
     
        <label>         your name:</label>
        <input  id="nam" /> 
        <br />
        <label>      your passage:</label>
        <input  id="pwd1" /> 
        <br />
        <label>again your passage:</label>
        <input  id="pwd2" /> 
        <br />
        <label>       your E-mail:</label>
        <input  id="mail" /> 
        <br />
        <button id="sub" >Registered account</button>
        <div id="d"></div>
    </body>
</html>