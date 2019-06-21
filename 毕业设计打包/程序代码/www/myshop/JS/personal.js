type=isset(GET('type'))?GET('type'):'1';
var pos=parseInt(type)-1;
$(".select_op")[pos].style.backgroundColor="d4d3d3";
$(".select_op").children()[pos].style.color="black";
$(".select_op").each(
    function(ii, t) {
        if(ii!==pos){
            t.onclick=function(){
                window.location.href="personal.php?type="+(ii+1);
            };
            t.onmouseover=function(){
                this.style.backgroundColor="b8b5b5";
            };
            t.onmouseout=function(){
                this.style.backgroundColor="737070";
            } 
        }
    }
);
function success(str){
    alert(str);
    
    window.location.href=window.location.href;
}
switch(pos+1){
    case 1:
        $(".delete").each(
            function(ii, t) {
                t.fun=success;
                t.onclick=function(){
                    id=this.id.substr(6);
                    data="{\"id\":\""+id+"\"}";
                    httpCon("PHP/deleteTouch.php",data,"post",this.fun)
                }
                t.onmouseover=function(){
                    //this.style.backgroundColor="b8b5b5";
                }
                t.onmouseout=function(){
                    //this.style.backgroundColor="737070";
                } 
            }
        );
        $(".update").each(
            function(ii, t) {
                t.fun=success;
                t.onclick=function(){
                    id=this.id.substr(6);
                    arr=id.split("&");
                    $('.add')[0].id="add"+arr[0];
                    $('#labelAdd')[0].innerHTML="修改联系方式"+arr[1];
                    $(".inText").each(
                        function(ii, t) {
                            t.value="";
                        }
                    );
                }
                t.onmouseover=function(){
                    //this.style.backgroundColor="b8b5b5";
                }
                t.onmouseout=function(){
                    //this.style.backgroundColor="737070";
                } 
            }
        );
        $('.add')[0].fun=success;
        $('.add')[0].onclick=function(){
            id=this.id.substr(3);
            if(id.length==0){
                data={};
                data["user_id"]=$.cookie('user_id');
                $(".inText").each(
                    function(ii, t) {
                        str=t.id.substr(6);
                        data[str]=t.value;
                    }
                );
                httpCon("PHP/addTouch.php",JSON.stringify(data),"post",this.fun);
            }else{
                data={"id":id};
                $(".inText").each(
                    function(ii, t) {
                        str=t.id.substr(6);
                        data[str]=t.value;
                    }
                );
                httpCon("PHP/updateTouch.php",JSON.stringify(data),"post",this.fun);
            }
            
        }
        $('#cancel')[0].onclick=function(){
            $('#labelAdd')[0].innerHTML="添加新的联系方式";
            $('.add')[0].id="add";
            $(".inText").each(
                function(ii, t) {
                    t.value="";
                }
            );
        }
    break;
    case 2:
    case 3:
        barList= $(".delete");
        for(i=0;i<barList.length;i++){
            barList[i].fun=success;
            barList[i].onclick=function(){
                id=this.id.substr(6);
                data={"id":id};
                httpCon("PHP/deleteIndent.php",JSON.stringify(data),"post",this.fun);
            };
        }
        barList= $(".buy");
        for(i=0;i<barList.length;i++){
            barList[i].fun=success;
            barList[i].onclick=function(){
                id=this.id.substr(3);
                this.name.substr(3);
                num=$('#buyNum'+id)[0].value;
               // data={"id":id};
                window.location.href="settlement.php?num="+num+"&goods_id="+this.name.substr(3);
                //httpCon("settlement.php?goods_id="+id,JSON.stringify(data),"post",this.fun);
            };
        }
        $('#batch_1').children('input')[0].onclick=function(){
            $(".goodsbar_input").each(
                function(ii, t) {
                   t.checked=1-this.checked;
                }
            );
        }
        $('#batch').children('button')[0].fun=success;
        $('#batch').children('button')[0].onclick=function(){
            barList= $(".delete");
            for(i=0;i<barList.length;i++){
                id=barList[i].id.substr(6);
                if($("#input"+id)[0].checked===true){ 
                    data={"id":id};
                    httpCon("PHP/deleteIndent.php",JSON.stringify(data),"post",this.fun);
                };
            }
        }
    break;
    case 4:
        $('.hrefButton').each(
            function(ii, t) {
                t.fun=success;
                t.onclick=function(){
                    id=this.id.substr(10);
                    data={'id':id};
                    
                    httpCon('PHP//deleteComment.php',JSON.stringify(data),"post",this.fun);
                };
            }
        );
    break;
}
