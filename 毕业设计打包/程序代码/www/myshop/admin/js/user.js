if(!isset(GET('id'))){
    $('.tr').each(function(ii, t) {
        t.onclick=function(){
            id=this.id.substr(2);
            window.location.href='user.php?id='+id;//get属性
        }
        t.onmouseover=function(){
            this.style.cursor="hand";
        }
        t.onmouseout=function(){
            this.style.cursor="";
        }
    });
}