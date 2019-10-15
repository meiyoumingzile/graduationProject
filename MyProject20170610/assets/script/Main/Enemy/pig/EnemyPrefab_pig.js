cc.Class({
    extends: cc.Component,

    properties: {
        gravity:-1000,
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
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
        this.player = this.node.getComponent(cc.Animation);
        this.LeadScript=ALL.Lead.getComponent("Lead_control");
        var MainPosX=this.node.x;
        this.state=this.node.name+"_"+(MainPosX>ALL.Lead.x?"left":"right");
        this.state_character=this.state.substr(0,11);
        this.Public.state_effecf="null";
        if(this.state_character=="Enemy_pig1_"){
            this.beginSpeed=cc.v2(400,0);
            this.Public.life=cc.v2(1,1);

            this.damage=1;
        }else if(this.state_character=="Enemy_pig2_"){
            this.beginSpeed=cc.v2(150,0);
            this.Public.life=cc.v2(5,5);

            this.damage=1;
        }else if(this.state_character=="Enemy_pig3_"){
            this.beginSpeed=cc.v2(500,0);
            this.Public.life=cc.v2(3,3);
            this.state=this.state.replace("3","1");
            this.node.color=cc.Color.RED;
            this.damage=1;
        }
        this.speed.x=this.beginSpeed.x;
        this.speed.y=this.beginSpeed.y;
        this.playState=this.state;
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },

    update: function (dt) {
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

            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                if (this.state.indexOf("left")!=-1&& (selfPreAabb.xMax > otherPreAabb.xMax)){//向左
                    this.node.x+=otherPreAabb.xMax-selfAabb.xMin+1;
                    this.state=this.state.replace("left","right");
                }
                else if (this.state.indexOf("right")!=-1&& (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
                    this.node.x-=selfAabb.xMax-otherPreAabb.xMin+1;
                    this.state=this.state.replace("right","left");
                }
            }else{
                selfPreAabb.y = selfAabb.y;
                otherPreAabb.y = otherAabb.y;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
                        this.node.y+=otherPreAabb.yMax-selfAabb.yMin;
                        this.collisionY = -1;
                    }else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                        this.node.y-=selfAabb.yMax -otherPreAabb.yMin+1;
                        
                    }
                    
                }
                other.pigTouchingY = true;
            }
        }else if(other.node.name.indexOf("Arms")!=-1){

        }
    },

    onCollisionExit: function (other, self){//碰撞出口，因为碰完了要改变速度和状态
        if (other.pigTouchingY){
            if(other.node.name.indexOf("Object")!=-1){
                other.pigTouchingY = false;
                this.collisionY = 0;
            }
        }
        
    },



    

    calSpeedY:function(dt){
        if (this.collisionY >=0) {
            this.speed.y += this.gravity*dt;
        }else{
            this.speed.y =0;
        }
    },

    calSpeedX:function(dt){
        this.speed.x=this.state.indexOf("left")!=-1?-this.beginSpeed.x:this.beginSpeed.x;
    },
    
    changeAction:function(){
        this.playState=this.state;
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },
});
