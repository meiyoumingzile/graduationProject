
cc.Class({
    extends: cc.Component,

    properties: {
       picSize:cc.v2(0,0),
       sizeSpeed:cc.v2(25,20),
    },

    onLoad: function () {
        this.picSize.x=this.node.width;
        this.picSize.y=this.node.height;
        this.sizeSpeed.x=70;
        this.sizeSpeed.y=60;
        this.node.width=0;
        this.node.height=0;
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            cc.director.loadScene("About");
        },this);
    },

    update:function (dt) {
        if(this.node.width+this.sizeSpeed.x*dt<=this.picSize.x){
            this.node.width+=this.sizeSpeed.x*dt;
        }
        if(this.node.height+this.sizeSpeed.y*dt<=this.picSize.y){
            this.node.height+=this.sizeSpeed.y*dt;
        }
    },
});