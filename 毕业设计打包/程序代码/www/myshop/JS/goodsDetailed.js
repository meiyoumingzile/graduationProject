function success(str){
    alert(str);
     window.location.href=window.location.href;
}
$('#buy')[0].onclick=function(){
    id=this.name.substr(13);
    num=parseInt($('#num')[0].value);
    window.location.href ="settlement.php?num="+num+"&goods_id="+GET('id')+"&user_id="+$.cookie('user_id');
};
$('#cart')[0].fun=success;
$('#cart')[0].onclick=function(){
    num=parseInt($('#num')[0].value);
    data={'num':num,'goods_id':GET('id'),'user_id':$.cookie('user_id')};
    httpCon('PHP//addIndent.php',JSON.stringify(data),"post",this.fun);
};

$('#submitComment')[0].onclick=function(){
    id=this.name.substr(13);
    if(isset(id)&&parseInt(id)>-1){
        $('#addComment')[0].action+='&comment_id='+parseInt(id);
    }else{
        $('#addComment')[0].action+='&comment_id=-1';
    }
    alert( "发布成功");
};

$('.hrefButton').each(
    function(ii, t) {
        t.onclick=function(){
            name=this.name.substr(10);
            id=this.id.substr(10);
            $('#myCommentLabel')[0].innerHTML="发布我对 @"+name+"的评论：";
            $('#submitComment')[0].name="submitComment"+id;
            scrollTo(0,0);
        };
    }
);
$('.hrefDelButton').each(
    function(ii, t) {
        t.fun=success;
        t.onclick=function(){
            id=this.id.substr(13);
            data={'id':id};
            httpCon('PHP//deleteComment.php',JSON.stringify(data),"post",this.fun);
        };
    }
);