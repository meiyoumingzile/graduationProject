$('.cancel').each(
    function(ii, t) {
        bt=$(t).children('button')[0];
        bt.d=t;
        bt.onclick=function(){
           this.d.innerHTML="";
        };
    }
);