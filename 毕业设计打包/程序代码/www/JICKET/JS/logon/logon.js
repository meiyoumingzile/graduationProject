
function compareData(str){
    if(str.indexOf("succ")!=-1){//js==不可靠，这里用等号就不能判断相等
        url="myTicketHome.php";
        var rem = document.getElementById("rem").checked.toString();
        var arr=str.split("; ");
        setcookie("logonState",document.getElementById("tel").value);
        setcookie("jur",arr[1]);
        if(rem.indexOf("true")!=-1){
            setcookie("pwd",document.getElementById("pwd").value);
            setcookie("tel",document.getElementById("tel").value);
        }else{
            delCookie("pwd");
            delCookie("tel");
        }
        window.location.href=url;
    }else{
        echo("用户名或者密码错误");
    }
}

window.onload = function(){ 
    var bt_log = document.getElementById("log"); 
    var bt_reg = document.getElementById("reg");
    var allcookies = document.cookie;
    //echo(allcookies);
    if(allcookies.indexOf(";")>-1){
        //.echo(allcookies);
        var arr=allcookies.split("; ");
        for(i=0;i<arr.length;i++){
            a=arr[i].split("=");
            if(document.getElementById(a[0])){
                document.getElementById(a[0]).value=a[1];
            }
        }
    }
    bt_reg.onclick = function(){
        url="register_html.php";
        window.location.href=url;
    }
    bt_log.onclick = function(){
        var isConnect=true;
        document.getElementById("d").innerHTML="";
        var tel = document.getElementById("tel").value; 
        var pwd = document.getElementById("pwd").value; 
        var rem = document.getElementById("rem").checked.toString();
        url="PHP/logon.php";
        json="{\"pwd\":\""+pwd+"\",\"tel\":\""+tel+"\",\"rem\":\""+rem+"\"}";
        httpCon(url,json,"post",compareData);
    } 

}