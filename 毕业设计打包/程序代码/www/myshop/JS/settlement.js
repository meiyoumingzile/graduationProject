function success(str){
    alert(str);
}
$('#J_Go')[0].fun=success;
$('#J_Go')[0].onclick=function(){
    list=$('.J_MakePoint');
    id=0;
    for(i=0;i<list.length;i++){
        if(list[i].checked===true){
            id=list[i].id.substr(4);
            break;
        }
    }
    data={'id':GET('goods_id'),'num':GET('num'),'touch_id':id};
    httpCon("PHP/updateGoodsRenum.php",JSON.stringify(data),"post",this.fun);
}