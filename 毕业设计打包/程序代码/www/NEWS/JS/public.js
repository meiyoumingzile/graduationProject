function setcookie(name, value,path){ 
    //设置名称为name,值为value的Cookie
    var path="http://localhost/NEWS";
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path="+path;

   //即document.cookie= name+"="+value+";path=/";   时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
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

function echo(s){
    document.getElementById("d").innerHTML+="<font color=\"red\">"+s+"</font><br>";
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