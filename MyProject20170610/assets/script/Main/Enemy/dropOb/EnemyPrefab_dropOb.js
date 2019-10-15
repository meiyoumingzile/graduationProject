cc.Class({
    extends: cc.Component,

    properties: {
        gravity:-1500,
        speed:cc.v2(0,0),
        beginSpeed:cc.v2(0,0),
        acceleration:cc.v2(0,0),
        nowAcc:cc.v2(0,0),
        nowlen:cc.v2(0,0),
        damage:0,
        player:null,
        state:"",
        state_character:"",
        playState:"",
        lastPlayState:"",
        Public:null,
        LeadScript:null,
        collisionY:0,
        isJump:false,
        collNum:0,
        boxColl:null,
        dir:1,
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
        this.player = this.node.getComponent(cc.Animation);
        this.boxColl=this.node.getComponent(cc.BoxCollider);
        this.state_character=this.node.name.slice(0,14);
        this.state=this.node.name.slice(14,this.node.name.length);
        this.Public.state_effecf="null";
        if(this.state_character=="Enemy_dropOb1_"){
            this.beginSpeed=cc.v2(0,0);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.collNum=3;
            this.boxColl._size.height=30;
            this.boxColl._size.width=30;
        }else if(this.state_character=="Enemy_dropOb2_"){
            var X=parseInt(this.state.slice(0,4));
           	this.beginSpeed=cc.v2(X,700);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.boxColl._size.height=30;
            this.boxColl._size.width=30;
        }else if(this.state_character=="Enemy_dropOb3_"){
            this.beginSpeed=cc.v2(0,0);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
        }else if(this.state_character=="Enemy_dropOb4_"){
        	var X=parseInt(this.state.slice(0,4));
        	var Y=parseInt(this.state.slice(5,this.state.length));
            this.beginSpeed=cc.v2(X,Y);
            this.gravity=-1000;
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.boxColl._size.height=30;
            this.boxColl._size.width=40;
        }
        this.speed.x+=this.beginSpeed.x*this.dir;
        this.speed.y+=this.beginSpeed.y;
        this.playState=this.node.name.slice(0,13);
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },

    update: function (dt) {
        this.calSpeed(dt);
        this.changeAction();
        this.nowlen.x=this.speed.x*dt;
        this.nowlen.y=this.speed.y*dt;
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y
    },

    onCollisionEnter: function (other, self){
        if(other.node.name=="Lead"){
            if(ALL.Lead.getComponent("Lead_control").Data.state.indexOf("Stegosaurus_attack")!=-1){     

            }else if(ALL.Lead.getComponent("Lead_control").Data.state_character=="Lead"&&ALL.Lead.getComponent("Lead_control").Data.state_effecf=="null"){
                ALL.Lifes.getComponent("Lifes").changeLife(-this.damage,0);
            }else{

            }
        }else if(other.node.name.indexOf("Object")!=-1){

            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                if (this.state.indexOf("left")!=-1&& (selfPreAabb.xMax > otherPreAabb.xMax)){//向左
                    
                }else if (this.state.indexOf("right")!=-1&& (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
                    
                }
            }else{
                selfPreAabb.y = selfAabb.y;
                otherPreAabb.y = otherAabb.y;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
                    	this.node.y+=otherPreAabb.yMax-selfAabb.yMin;
                    	this.collisionY=-1;
                        this.visCollY();
                    }else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                        
                    }
                    
                }
            }
        }
    },

    onCollisionExit: function (other, self){//碰撞出口，因为碰完了要改变速度和状态
        if (other.node.name.indexOf("Object")!=-1){
            if ((other.node.y+other._size.height/2+self._size.height/2)-(this.node.y)<=1){//从上向下掉,经测试有精度问题，而且还不小
                this.collisionY=0;
            }
        }
        
    },



    
    calSpeed:function(dt){
        if (this.collisionY>=0) {
            this.speed.y += this.gravity*dt;
        }

    },
    
    changeAction:function(){
        if(this.node.rotation==0&&this.speed.y>0){
        	this.node.rotation=180;
        }else if(this.node.rotation==180&&this.speed.y<=0){
        	this.node.rotation=0;
        }

        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },

    visCollY:function(){
		if(this.state_character=="Enemy_dropOb1_"){
			if(this.collNum==0){
				this.node.destroy();
			}
			this.speed.y=-this.speed.y/2;
			this.beginSpeed.x=100*(ALL.Lead.x>this.node.x?1:-1);
            this.collNum--;
        }else if(this.state_character=="Enemy_dropOb2_"){
           	this.node.destroy();
        }else if(this.state_character=="Enemy_dropOb3_"){
            this.node.destroy();
        }else if(this.state_character=="Enemy_dropOb4_"){
            this.node.destroy();
        }
    },


});
