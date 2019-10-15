cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
    },

    onCollisionEnter:function(other, self){
        if(other.node.name.indexOf("Object")!=-1){
            if(this.node.parent.getComponent("Lead_control").Data.state.indexOf("lie")!=-1){
                ALL.isStand=false;
            }
        }
    },

    onCollisionStay:function(other, self){
        if(other.node.name.indexOf("Object")!=-1){
            if(this.node.parent.getComponent("Lead_control").Data.state.indexOf("lie")!=-1){
                ALL.isStand=false;
            }
        }
    },

    onCollisionExit:function(other, self){
        if(other.node.name.indexOf("Object")!=-1){
            if(this.node.parent.getComponent("Lead_control").Data.state.indexOf("lie")!=-1){
                ALL.isStand=true;
            }
        }
    },
});
