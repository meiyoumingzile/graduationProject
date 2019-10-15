cc.Class({
    extends: cc.Component,

    properties: {
       picSize:cc.v2(0,0),
       sizeSpeed:cc.v2(25,20),
       isCanUse:false,
    },

    onLoad: function () {
        this.picSize.x=this.node.width;
        this.picSize.y=this.node.height;
        this.sizeSpeed.x=70;
        this.sizeSpeed.y=60;
        this.node.width=0;
        this.node.height=0;
        //this.node.parent.getComponent(cc.Animation).destroy();
        if(this.node.parent.name=="返回"){
        }else{
            try{
                if(JSON.parse(cc.sys.localStorage.getItem(this.node.parent.name)).nowSence!=""){
                    this.isCanUse=true;
                    cc.log("hehe");
                }else{
                    this.node.parent.destroy();
                }
            }catch(e){
                this.node.parent.destroy();
            }
        }
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            if(this.node.parent.name=="返回"){
                cc.director.loadScene("BeginMenu");
            }else{
                REM=JSON.parse(cc.sys.localStorage.getItem(this.node.parent.name));//读取复杂对象数据
                ALL.Public.getComponent("Public").getIntoSence(REM.nowSence);
            }
        },this);
    },

    update:function (dt) {
        if(this.node.width+this.sizeSpeed.x*dt<=this.picSize.x&&this.isCanUse==true){
            this.node.width+=this.sizeSpeed.x*dt;
        }
        if(this.node.height+this.sizeSpeed.y*dt<=this.picSize.y&&this.isCanUse==true){
            this.node.height+=this.sizeSpeed.y*dt;
        }
    },
});