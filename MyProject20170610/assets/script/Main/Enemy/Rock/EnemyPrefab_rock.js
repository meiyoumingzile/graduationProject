cc.Class({
    extends: cc.Component,

    properties: {
        gravity:-1000,
        speed:cc.v2(0,0),
        jumpSpeed:cc.v2(0,0),
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
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
        this.player = this.node.getComponent(cc.Animation);

        this.state_character=this.node.name+"_";
        this.Public.state_effecf="null";
        if(this.state_character=="Enemy_rock1_"){
            this.jumpSpeed=cc.v2(200,100);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.speed.x=this.jumpSpeed.x;
            this.speed.y=this.jumpSpeed.y;
        }else if(this.state_character==""){
           
        }else if(this.state_character==""){
            
        }
        var MainPosX=this.node.x;
        var MainPosY=this.node.y;
        this.state=(MainPosX>ALL.Lead.x?"left":"right");
        this.playState=this.node.name;
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
        if(ALL.Lead.getComponent("Lead_control").Data.state.indexOf("Stegosaurus_attack")!=-1){     
            this.Public.changeLife(-ALL.Lead.getComponent("Lead_control").Data.StegosaurusAttackDamage);
        }else if(other.node.name=="Lead"){
            if(ALL.Lead.getComponent("Lead_control").Data.state_character=="Lead"&&ALL.Lead.getComponent("Lead_control").Data.state_effecf=="null"){
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
                        this.speed.y=this.jumpSpeed.y;
                    }else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                        this.node.y-=selfAabb.yMax -otherPreAabb.yMin+1;
                        this.speed.y=0;
                    }
                    
                }
            }
        }else if(other.node.name.indexOf("Arms")!=-1){

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

        if(this.state=="left"){
            this.speed.x=-this.jumpSpeed.x;
        }else if(this.state=="right"){
            this.speed.x=this.jumpSpeed.x;
        }

    },
    
    changeAction:function(){
       
        
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },



});
