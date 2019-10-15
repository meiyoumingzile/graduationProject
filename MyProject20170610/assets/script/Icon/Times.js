cc.Class({
    extends: cc.Component,

    properties: {
        img_true:cc.SpriteFrame,
        img_false:cc.SpriteFrame,
        count:0,
    },

    // use this for initialization
    onLoad: function () {
       
            this.count=0;
            this.callback = function () {
                if(this.count ==4) {// 
                    this.changeTime(-1);
                    this.count=0;
                }
                this.count++;
            }
            this.schedule(this.callback,1,3000000,0);
    },

    changeTime:function(time_value){
        this.count=0;
        var child = [];
        child = this.node.getChildren();
        if(time_value>0){
            var i=ALL.time.x;
            while(i<ALL.time.x+time_value&&i<ALL.time.y){
                child[i].getComponent(cc.Sprite).spriteFrame=this.img_true;
                i++;
            }
            ALL.time.x+=time_value;
        }else if(time_value<0){
            var i=ALL.time.x-1;
            //cc.log(i);
            while(i>=ALL.time.x+time_value&&i>=0){
                child[i].getComponent(cc.Sprite).spriteFrame=this.img_false;
                i--;
            }
            ALL.time.x+=time_value;
        }
        this.VisLoseLife();
    },
    
    changeToTime:function(time_value){
        this.count=0;
        var child = [];
        child = this.node.getChildren();
        ALL.time.x=time_value.x;
        var i;
        for(i=0;i<time_value.x;i++){
            child[i].getComponent(cc.Sprite).spriteFrame=this.img_true;
        }
        while(i<ALL.time.y){
            child[i].getComponent(cc.Sprite).spriteFrame=this.img_false;
            i++;
        }
        this.VisLoseLife();
    },

    VisLoseLife:function(){
        if(ALL.time.x<=0){
            ALL.time.x=ALL.time.y;
            ALL.Lifes.getComponent("Lifes").changeLife(-1,0);
            ALL.time.x=0;
            this.changeTime(ALL.time.y);
        }
        if(ALL.time.x>ALL.time.y){
            ALL.time.x=ALL.time.y;
        }
    },

    // update: function (dt) {

    // },
});
