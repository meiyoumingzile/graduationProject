cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            cc.director.loadScene("BeginMenu");
        },this);
    },

    // update: function (dt) {

    // },
});
