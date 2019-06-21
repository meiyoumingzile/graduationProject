if(isset(GET('add'))){
    var funArray=[function(str){
        if(str===null||str===undefined){
            str=document.getElementById('in_name').value;
        }
        if(str.length>0&&str.length<50){
            document.getElementById('notice_name').style.color='green';
            document.getElementById('notice_name').innerText='√√√';
            return true;
        }else{
            document.getElementById('notice_name').style.color='red';
            document.getElementById('notice_name').innerText='×××';
            return false;
        }
    },function(str){
        if(str===null||str===undefined){
            str=document.getElementById('in_price').value;
        }
        if(str.length>0&&!isNaN(str)){
            document.getElementById('notice_price').style.color='green';
            document.getElementById('notice_price').innerText='√√√';
            return true;
        }else{
            document.getElementById('notice_price').style.color='red';
            document.getElementById('notice_price').innerText='×××';
            return false;
        }
    },function(str){
        if(str===null||str===undefined){
            str=document.getElementById('in_renum').value;
        }
        if(str.length>0&&!isNaN(str)){
            document.getElementById('notice_renum').style.color='green';
            document.getElementById('notice_renum').innerText='√√√';
            return true;
        }else{
            document.getElementById('notice_renum').style.color='red';
            document.getElementById('notice_renum').innerText='×××';
            return false;
        }
    }];
    document.getElementById("submit").funArray=funArray;
    document.getElementById("submit").onclick=function(){
        keyList=['name','price','renum'];
        var v=true;
        for(i=0;i<this.funArray.length;i++){
            var  tx=document.getElementById('in_'+keyList[i]);
            str=tx.value;
            v&=this.funArray[i](str);
        };
        if(v){
            f=document.getElementById('myform');
            if(GET('add')==='1'){
                f.action="php/addGoods.php";
            }else if(GET('add')==='2'){
                id=GET('id');
                f.action="php/updateGoods.php?id="+id;
            }
            this.type='submit';
        }
        return v;
    };
}else{
    document.getElementById('add').onclick=function(){
        window.location.href='goods.php?add=1&';//get属性
    }  
    function success(str){
        if(str.length===0)
            alert("操作成功");
        window.location.href='goods.php';//get属性
    }
    $('.delete').each(function(ii, t) {  
        t.fun=success;
        t.onclick=function(){
            id=this.id.substr(6);//
            data="{\"id\":\""+id+"\"}";
            alert('ff');
            httpCon("php/deleteGoods.php",data,"post",this.fun)
        }
    });  
    $('.update').each(function(ii, t) {  
        t.onclick=function(){
            id=this.id.substr(6);//
            window.location.href='goods.php?add=2&id='+id;//get属性
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
            hint.style.opacity='0.6';
            hint.style.width='60px';
            hint.style.height='60px';
           // hint.style.backgroundColor='bab5fd'
            hint.innerHTML="<img src='"+this.id.substr(3)+"' height='240' width='240'>";
        }
        t.onmouseout=function(){
            id=this.id.substr(2);//
            var hint=$("#hint")[0];
            hint.innerHTML="";
        }
    }); 
}