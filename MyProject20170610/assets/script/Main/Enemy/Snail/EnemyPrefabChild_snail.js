cc.Class({
    extends: cc.Component,

    properties: {
		lastIsColl:false,
    	nowIsColl:false,
        isColl:false,
		nowColl:null,
    },

    // use this for initialization
    onLoad: function () {
    	cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
    },

    update:function(dt){

    	this.lastIsColl=this.isColl;
    	this.isColl=this.nowIsColl;
    },

    onCollisionEnter:function(other, self){
        if(other.node.name.indexOf("Object")!=-1){
			this.nowColl=other;
			this.nowIsColl=true;
            
        }
    },

    onCollisionStay:function(other, self){
        if(other.node.name.indexOf("Object")!=-1){
		
        }
    },

    onCollisionExit:function(other, self){ 
        if(other.node.name.indexOf("Object")!=-1){
            this.nowIsColl=false;
        }
    },
});
