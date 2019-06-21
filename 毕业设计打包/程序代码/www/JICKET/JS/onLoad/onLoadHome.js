function getSelfUrlVal(key){
    var str=window.location.search.substr(1);
    var arr=str.split("\;");//获取？后面
    for(i=0;i<arr.length;i++){
        a=arr[i].split("=");
        if(a[0]==key){
            return a[1];
        }
    }
    return "";
}
function getRandomColor(){ 
    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
} 
function addHtml_a(div,herf,str,myclass){//字体等样式由相应css或者单独设置,myclass代表想添加的class
    document.getElementById(div).innerHTML+="<a href=\""+herf+"\" class=\""+myclass+"\">"+str+"</a>";
}
function addHtml_A(div,herf,str,myclass){//字体等样式由相应css或者单独设置,myclass代表想添加的class
    div.innerHTML+="<a href=\""+herf+"\" class=\""+myclass+"\">"+str+"</a>";
}

function addCSS_colorTwinkle(div){
    var d=document.getElementById(div);
    setInterval(function(){
        d.style.backgroundColor=getRandomColor();
    },100);
    
   
}

//初始顶部信息
var nowName=getCookie("logonState");
//echo(document.cookie);
if(nowName==""){
    addHtml_a("mytop","http://localhost/JICKET/logon_html.php","账号登录","mytop_a");
    addHtml_a("mytop","http://localhost/JICKET/register_html.php","还没有账号？","mytop_a");
}else{
    addHtml_a("mytop","personal.html",nowName+" 的个人中心","mytop_a");
    addHtml_a("mytop","http://localhost/JICKET/PHP/managesTicket.php","我的订票","mytop_a");
    if(parseInt(getCookie("jur"))>1){
        addHtml_a("mytop","http://localhost/JICKET/myTicketAdmin.php","进入管理界面","mytop_a");
    }
}
