cc.Class({
    extends: cc.Component,

    properties: {
       num:0,
    },

    onLoad: function () {
    	this.num=parseInt(this.node.name.substr(6,1));
    },

    update: function (dt) {
        if(Math.abs(this.node.x-ALL.Lead.getComponent("Lead_control").Data.cameraMove.x)>600
            ||Math.abs(this.node.y-ALL.Lead.getComponent("Lead_control").Data.cameraMove.y)>400
            ){
            this.node.destroy();
        }
    },
    
    onCollisionEnter: function (other, self){
    	if(other.node.name=="Lead"){
    		ALL.Times.getComponent("Times").changeTime(this.num);
    		this.node.destroy();
    	}
    },

});
