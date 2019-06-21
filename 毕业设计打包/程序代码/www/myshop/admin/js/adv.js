if(isset(GET('add'))){
    var funArray=[function(str){
        if(str===null||str===undefined){
            str=document.getElementById('in_pos').value;
        }
        if(str.length>0&&str.length<200){
            document.getElementById('notice_pos').style.color='green';
            document.getElementById('notice_pos').innerText='√√√';
            return true;
        }else{
            document.getElementById('notice_pos').style.color='red';
            document.getElementById('notice_pos').innerText='×××';
            return false;
        }
    },function(str){
        if(str===null||str===undefined){
            str=document.getElementById('in_url').value;
        }
        if(str.length>0&&str.length<200){
            document.getElementById('notice_url').style.color='green';
            document.getElementById('notice_url').innerText='√√√';
            return true;
        }else{
            document.getElementById('notice_url').style.color='red';
            document.getElementById('notice_url').innerText='×××';
            return false;
        }
    }];
    document.getElementById("submit").funArray=funArray;
    document.getElementById("submit").onclick=function(){
        keyList=['pos','url'];
        var v=true;
        for(i=0;i<this.funArray.length;i++){
            var  tx=document.getElementById('in_'+keyList[i]);
            str=tx.value;
            v&=this.funArray[i](str);
        };
        if(v){
            f=document.getElementById('myform');
            if(GET('add')==='1'){
                f.action="php/addAdv.php";
            }else if(GET('add')==='2'){
                id=GET('id');
                f.action="php/updateAdv.php?id="+id;
            }
            this.type='submit';
        }
        return v;
    };
}else{
    document.getElementById('add').onclick=function(){
        window.location.href='adv.php?add=1&';//get属性
    }  
    function success(str){
        if(str.length==0)
            alert("操作成功");
        window.location.href='adv.php';//get属性
    }
    $('.delete').each(function(ii, t) {  
        t.fun=success;
        t.onclick=function(){
            id=this.id.substr(6);//
            data="{\"id\":\""+id+"\"}";
            httpCon("php/deleteAdv.php",data,"post",this.fun)
        }
    });  
    $('.update').each(function(ii, t) {  
        t.onclick=function(){
            id=this.id.substr(6);//
            window.location.href='adv.php?add=2&id='+id;//get属性
        }
    });
     $('.tr').each(function(ii, t) {  
        t.onmouseover=function(){
            id=this.id.substr(2);//
            pos=getMousePos();
            var hint=$("#hint")[0];
            //alert(pos.x+\" \"+pos.y);
            hint.style.position='absolute';
            hint.style.top=pos.y;
            hint.style.left=pos.x;
            hint.style.zIndex='2';
            hint.style.opacity='0.6';;
           // hint.style.backgroundColor='bab5fd'
            hint.innerHTML="<img src='"+this.id.substr(3)+"'>";
        }
        t.onmouseout=function(){
            id=this.id.substr(2);//
            var hint=$("#hint")[0];
            hint.innerHTML="";
        }
    }); 
}