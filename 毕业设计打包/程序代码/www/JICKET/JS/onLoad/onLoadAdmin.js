function getSelfUrlVal(key){
    var str=window.location.search.substr(1);//获取？后面
    var arr=str.split("\;");
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

var kind=getSelfUrlVal("kind");
kind=kind==""?0:parseInt(kind);
opList=document.getElementById("box").getElementsByTagName("div");
for(i=0;i<opList.length;i++){
    opList[i].id="box_op_"+i;
}
for(i=0;i<opList.length;i++){
    if(kind!=i){
        opList[i].onmouseover=function(){
            this.style.backgroundColor="1b2028";
            this.style.cursor="hand";
        }
        opList[i].onmouseout=function(){
            this.style.backgroundColor="262b32";
        }
        opList[i].onclick=function(){
            i=this.id.substr(7,1);//box_op_
            window.location.href="myTicketAdmin.php?kind="+i+";page=0";
        }
    }else{
        opList[i].style.backgroundColor="191919";
    }
}