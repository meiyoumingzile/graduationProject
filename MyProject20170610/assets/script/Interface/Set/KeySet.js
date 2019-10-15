cc.Class({
    extends: cc.Component,

    properties: {
        nowKey:null,
        beginColor:null,
        isColor:false,
        Listener1:null,
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.beginColor=this.node.color;
        this.nowKey=KEY[this.node.name];
        this.node.getChildren()[1].getComponent(cc.Label).string=String.fromCharCode(this.nowKey);
        //cc.log(String.fromCharCode());
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            if(this.isColor==false){
                var child=[];
                child=this.node.parent.getChildren();
                for(var i=0;i<child.length;i++){
                    if(child[i].name!=this.node.name){
                        var nodeScript=child[i].getComponent("KeySet");
                        if(nodeScript.isColor==true){
                            nodeScript.closeButton();
                        }
                    }
                }
                this.isColor=true;
                this.node.color=cc.Color.GREEN;
                this.Listener1=cc.eventManager.addListener({//添加键盘监听
                event: cc.EventListener.KEYBOARD, 
                onKeyPressed: this.onKeyPressed.bind(this),
                }, this.node);
            }else{
                this.closeButton();
            }
        },this);
    },

    onKeyPressed:function(keyCode, event){
        this.nowKey=keyCode;
        this.node.getChildren()[1].getComponent(cc.Label).string=String.fromCharCode(this.nowKey);
    },
    
    closeButton:function(){
        this.isColor=false;
        this.node.color=this.beginColor;
        KEY[this.node.name]=this.nowKey;
        if(this.Listener1!=null){
            cc.eventManager.removeListener(this.Listener1);
        }
    },
});
