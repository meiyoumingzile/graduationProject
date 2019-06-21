function GET(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return decodeURI(r[2]);  
    return null;  
}  

function isset(x){
    return (x !== null && x !== undefined && x!== '');
}
function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(key){
    var val="";
    var allcookies = document.cookie;
    if(allcookies.indexOf(key)>-1){
        var arr=allcookies.split("; ");
        for(i=0;i<arr.length;i++){
            a=arr[i].split("=");
            if(a[0]==key){
                return a[1];
            }
        }
    }
    return val;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);//把时间设置为过期
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function getMousePos() {
      var e =  window.event;
      return {'x':e.clientX,'y':e.clientY};
}

function echo(s,mycolor){
   if(isset(mycolor)){
       document.getElementById("d").innerHTML+="<font color=\""+mycolor+"\">"+s+"</font><br>";
   }else{
       document.getElementById("d").innerHTML+="<font color=\"red\">"+s+"</font><br>";
   };
}
function httpCon(url,data,method,success){
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
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4&&ajax.status==200) {
            success(ajax.responseText);
        }
    }
}
function pageName(){  
    var a = location.href;  
    var b = a.split("/");  
    var c = b.slice(b.length-1, b.length).toString(String).split(".");  
    return c.slice(0, 1);  
}  