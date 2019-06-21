function compareName(str){
    
     if(str.indexOf("succ")!=-1){//js==不可靠，这里用等号就不能判断相等
         //跳转个人中心
         alert('注册成功');
         window.location.href="login.php";
     }else if(str.indexOf("erro")!=-1){
         alert("手机号或者用户名已经被注册...");
     }else{
         alert("网络异常,连接数据库错误");
     }
 }
 function isset(x){
    return (x !== null && x !== undefined && x!== '');
}
 function showNotice(id,str,mycolor,idList){
     text=document.getElementById(id);
     text.innerText=str;
     text.style.color="red";
     if(isset(mycolor)){
         text.style.color=mycolor;
     }
     /*if(idList!==null && idList!==undefined ){
        for(i=0;i<idList.length;i++){
            if(idList[i].indexOf(id)==-1)
                showNotice(idList[i],"");
        }
     }*/
 }

     var btn = document.getElementById("sub"); 
     
     //添加验证函数
   
    function  mycheck0(){
        str=document.getElementById("tel").value;
        id="notice_tel";
        var patt = new RegExp("^[0-9]{8,20}$");//暂时不检测"^[0-9]{8,20}$"
        if(patt.test(str)===false){
            showNotice(id,"必须是大于8位小于20位的纯数字","red");
            return false;
        }else{
            showNotice(id,"√√√","green");
            return true;
        }
     };
    function  mycheck1(){
        str=document.getElementById("nam").value;
        id="notice_nam";
        var patt = new RegExp("^[0-9a-zA-Z_]{3,20}$");
        if(patt.test(str)===false){
            showNotice(id,"用户名只能是3到20位的：英文字母,数字,下划线","red");
            return false;
        }else{
            showNotice(id,"√√√","green");
            return true;
        }
     };
     function  mycheck2(){
        var patt1 = new RegExp("[0-9]");
        var patt2 = new RegExp("[a-z]");
        var patt3 = new RegExp("[A-Z]");
        str=document.getElementById("pwd1").value;
        id="notice_pwd1";
        if(patt1.test(str)==false||patt2.test(str)==false||patt3.test(str)==false){
            showNotice(id,"密码必须包含：英文大写字母,英文大写字母，数字","red");
             return false;
        }else{
            showNotice(id,"√√√","green");
             return true;
        }
     };
     function  mycheck3(){
        str=document.getElementById("pwd2").value;
        id="notice_pwd2";
        if(str!=document.getElementById("pwd1").value){
            showNotice(id,"两次输入必须相同","red");
            return false;
        }else{
            showNotice(id,"√√√","green");
            return true;
        }
     };

     var inidlist=["tel","nam","pwd1","pwd2"];
    for(i=0;i<inidlist.length;i++){
         document.getElementById(inidlist[i]).onblur=eval("mycheck"+i);
    };

    btn.onclick=function(){
        isConnect=true;
        var inidlist=["tel","nam","pwd1","pwd2"];
        for(i=0;i<inidlist.length;i++){
            if( eval("mycheck"+i+"()")===false){
                isConnect=false;
            }
        };
        if(isConnect===true){
            url="PHP/register_check.php";
            tel=document.getElementById("tel").value;
            pwd=document.getElementById("pwd1").value;
            nam=document.getElementById("nam").value;
            json="{\"tel\":\""+tel+"\",\"pwd\":\""+pwd+"\",\"nam\":\""+nam+"\",\"jur\":\"1\"}";
            httpCon(url,json,"post",compareName);
         } 
    } 
    
   
     
 