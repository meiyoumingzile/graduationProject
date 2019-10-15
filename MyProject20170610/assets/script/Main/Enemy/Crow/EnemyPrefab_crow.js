cc.Class({
    extends: cc.Component,

    properties: {
       	speed:cc.v2(0,0),
       	acceleration:cc.v2(0,0),
       	nowAcc:cc.v2(0,0),
        nowlen:cc.v2(0,0),
        damage:0,
        player:null,
        state:"",
        state_character:"",
        beginSpeed:cc.v2(0,0),
        playState:"",
        lastPlayState:"",
        Public:null,
		LeadScript:null,
        dirDegree:0,
    },

    // use this for initialization
    onLoad: function () {

        this.Public=this.node.getComponent("EnemyPublic");
    	this.player = this.node.getComponent(cc.Animation);
        this.LeadScript=ALL.Lead.getComponent("Lead_control");
        this.state=this.node.name;
       	this.state_character=this.state.substr(0,12);
       	this.Public.state_effecf="null";
        if(this.state_character=="Enemy_crow1_"){
            this.beginSpeed=cc.v2(200,200);
            this.Public.life=cc.v2(2,2);
            this.acceleration=cc.v2(0,150);
            this.nowAcc=cc.v2(0,150);
            this.damage=1;
        }else if(this.state_character=="Enemy_crow2_"){
			this.beginSpeed=cc.v2(0,300);
            this.Public.life=cc.v2(1,1);
            this.acceleration=cc.v2(0,200);
            this.nowAcc=cc.v2(0,200);
            this.damage=1;
            this.dirDegree=1;
        }else if(this.state_character=="Enemy_crow3_"){
            this.beginSpeed=cc.v2(300,300);
            this.Public.life=cc.v2(2,2);
            this.acceleration=cc.v2(0,400);
            this.nowAcc=cc.v2(0,400);
            this.damage=1;
        }else if(this.state_character=="Enemy_crow4_"){
            this.beginSpeed=cc.v2(200,200);
            this.Public.life=cc.v2(7,7);
            this.acceleration=cc.v2(0,150);
            this.nowAcc=cc.v2(0,150);
            this.damage=1;
        }
		this.speed.x=this.beginSpeed.x;
		this.speed.y=this.beginSpeed.y;
		this.playState=this.state;
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },

    update: function (dt) {
		this.changeSpeed();
    	this.calSpeedY(dt);
    	this.calSpeedX(dt);
        this.changeAction();
        this.nowlen.x=this.speed.x*dt;
        this.nowlen.y=this.speed.y*dt;
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y

    },

    onCollisionEnter: function (other, self){
        if(other.node.name=="Lead"){
            if(ALL.Lead.getComponent("Lead_control").Data.state.indexOf("Stegosaurus_attack")!=-1){     
                this.Public.changeLife(-ALL.Lead.getComponent("Lead_control").Data.StegosaurusAttackDamage);

            }else if(ALL.Lead.getComponent("Lead_control").Data.state_character=="Lead"&&ALL.Lead.getComponent("Lead_control").Data.state_effecf=="null"){
                ALL.Lifes.getComponent("Lifes").changeLife(-this.damage,0);
            }else{

            }
        }else if(other.node.name.indexOf("Object")!=-1){
            if(this.state_character=="Enemy_crow2_"){

            }else{
                var otherAabb = other.world.aabb;
                var otherPreAabb = other.world.preAabb.clone();
                var selfAabb = self.world.aabb;
                var selfPreAabb = self.world.preAabb.clone();
                selfPreAabb.x = selfAabb.x;
                otherPreAabb.x = otherAabb.x;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)){//向左
                         this.state=this.state.replace("left","right");
                    }else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
                         this.state=this.state.replace("right","left");
                    }
                }
            }
        }else if(other.node.name.indexOf("Arms")!=-1){
            //this.Injured();
        }
    },



	
    calSpeedY:function(dt){
    	if(this.speed.y>this.beginSpeed.x){
    		this.nowAcc.y=-this.acceleration.y;
    	}else if(this.speed.y<-this.beginSpeed.y){
    		this.nowAcc.y=this.acceleration.y;
    	}
    	this.speed.y+=this.nowAcc.y*dt;
    },

    calSpeedX:function(dt){
    	this.speed.x=this.state.indexOf("left")!=-1?-this.beginSpeed.x:this.beginSpeed.x;
    },
	
	changeSpeed:function(){
		if(this.state_character=="Enemy_crow2_"){
			if(Math.abs(this.node.y-ALL.Lead.y)<=50){
				this.beginSpeed.x=250;
			}
		}
	},
	
	changeAction:function(){
		if(this.state_character=="Enemy_crow2_"){
			if(this.state.indexOf("right")!=-1&&this.node.x-ALL.Lead.x>0&&this.dirDegree>=0){
				this.state=this.state.replace("right","left");
                if(this.speed.x!=0){
                    this.dirDegree--;
                }
			}else if(this.state.indexOf("left")!=-1&&this.node.x-ALL.Lead.x<0&&this.dirDegree>=0){
				this.state=this.state.replace("left","right");
                if(this.speed.x!=0){
                    this.dirDegree--;
                }
			}
		}
		this.playState=this.state;
		if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
	},
});
