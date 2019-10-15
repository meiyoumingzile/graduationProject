cc.Class({
    extends: cc.Component,

    properties: {
        gravity: -1000,
        speed:cc.v2(0,0),
    },

    onLoad: function () {
    },


    update: function (dt) {
    	this.speed.y+=this.gravity*dt;
    	if(this.node.y<0){
    		this.node.y=0;
    		this.speed.y=-this.speed.y/2;
    	}
    	this.node.y+=this.speed.y*dt;
    },
});