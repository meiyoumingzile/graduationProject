function compareName(str){
    
     if(str.indexOf("succ")!=-1){//js==不可靠，这里用等号就不能判断相等
         echo("注册成功","green");
     }else if(str.indexOf("erro")!=-1){
         echo("手机号已经被注册...");
     }else{
         echo("网络异常。。.");
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
     function  mycheck4(){
        str=document.getElementById("mail").value;
        id="notice_mail";
        var patt = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})");///^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if(patt.test(str)===false){
            showNotice(id,"邮箱格式错误","red");
             return false;
        }else{
            showNotice(id,"√√√","green");
              return true;
        }
     };

     var inidlist=["tel","nam","pwd1","pwd2","mail"];
    for(i=0;i<inidlist.length;i++){
         document.getElementById(inidlist[i]).onblur=eval("mycheck"+i);
    };

    btn.onclick=function(){
        isConnect=true;
        var inidlist=["tel","nam","pwd1","pwd2","mail"];
        for(i=0;i<inidlist.length;i++){
            if( eval("mycheck"+i+"()")===false){
                isConnect=false;
            }
        };
        if(isConnect===true){
            url="PHP/register.php";
            tel=document.getElementById("tel").value;
            pwd=document.getElementById("pwd1").value;
            nam=document.getElementById("nam").value;
            mail=document.getElementById("mail").value;

            json="{\"tel\":\""+tel+"\",\"pwd\":\""+pwd+"\",\"nam\":\""+nam+"\",\"mail\":\""+mail+"\",\"jur\":\"1\"}";
            httpCon(url,json,"post",compareName);
         } 
    } 
    
   
     
 