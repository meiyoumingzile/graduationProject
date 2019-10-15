cc.Class({
    extends: cc.Component,

    properties: {
        img_true:cc.SpriteFrame,
        img_false:cc.SpriteFrame,
    },

    // use this for initialization
    onLoad: function () {

    },

    changeLife:function(life_value,maxlife_value){
        var child = [];
        child = this.node.getChildren();
        if(life_value>0){
            var i=ALL.life.x-1;
            while(i<ALL.life.x+life_value&&i<ALL.life.y){
                child[i].getComponent(cc.Sprite).spriteFrame=this.img_true;
                i++;
            }
            ALL.life.x+=life_value;
        }else if(life_value<0){
            var i=ALL.life.x-1;
            //cc.log(i);
            while(i>=ALL.life.x+life_value&&i>=0){
                child[i].getComponent(cc.Sprite).spriteFrame=this.img_false;
                i--;
            }
            ALL.life.x+=life_value;
        }
        ALL.life.y+=maxlife_value;
        if(maxlife_value>0){//加一个上限
            var i=ALL.life.y-1;
            var newLife=cc.instantiate(cc.Sprtie);
            var X=child[i]+40;
            var Y=0;
            newLife.spriteFrame=this.img_false;
            newarm.setPosition(X,Y);
            this.node.addChild(newLife);
        }
        this.visEnd();
    },

    changeToLife:function(life_value){
        var child = [];
        child = this.node.getChildren();
        var i;
        if(life_value.y>ALL.life.y){
            var newLife=child[ALL.life.y-1];
            for(i=ALL.life.y;i<life_value.y;i++){
                var X=newLife.x+40;
                var Y=0;
                newLife=cc.instantiate(cc.Sprtie);
                newarm.setPosition(X,Y);
                newLife.spriteFrame=this.img_false;
                this.node.addChild(newLife);
            }
            ALL.life.y=life_value.y;
        }else if(life_value.y<ALL.life.y){
            for(i=ALL.life.y-1;i>=life_value.y;i--){
                child[i].destroy();
            }
            ALL.life.y=life_value.y;
        }

        for(i=0;i<life_value.x;i++){//重置当前血量
            child[i].getComponent(cc.Sprite).spriteFrame=this.img_true;
        }
        for(i=life_value.x;i<life_value.y;i++){//重置当前血量
            child[i].getComponent(cc.Sprite).spriteFrame=this.img_false;
        }
        ALL.life.x=life_value.x;
        this.visEnd();
    },

    visEnd:function(){
        if(ALL.life.x<=0){
            cc.director.loadScene('End');
        }
        if(ALL.life.x>ALL.life.y){
            ALL.life.x=ALL.life.y;
        }
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
