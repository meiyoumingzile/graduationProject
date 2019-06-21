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
    addHtml_a("mytop","logon_html.php","账号登录","mytop_a");
    addHtml_a("mytop","register_html.php","还没有账号？","mytop_a");
}else{
    addHtml_a("mytop","personal.html",nowName+" 的个人中心","mytop_a");
    addHtml_a("mytop","PHP/addNews.php?id=0","添加新闻","mytop_a");
    addHtml_a("mytop","PHP/myNews.php?page=0","我已发布的新闻","mytop_a");
    if(parseInt(getCookie("jur"))>1){
        addHtml_a("mytop","PHP//managesCategory.php","管理新闻类别","mytop_a");
        addHtml_a("mytop","PHP//managesPress.php?page=0","管理所有新闻","mytop_a");
    }
}

//添加闪烁效果
addCSS_colorTwinkle("main_line1");
addCSS_colorTwinkle("main_line2");