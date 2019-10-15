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
        isAttack:true,
        stopTime:5,
        attackTime:1,
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
        this.player = this.node.getComponent(cc.Animation);

        this.state_character=this.node.name.slice(0,12)+"_";
        var MainPosX=this.node.x;
        this.Public.state_effecf="null";
        if(this.state_character=="Enemy_worm1_"){
            this.jumpSpeed=cc.v2(200,250);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.isAttack=true,
            this.stopTime=30,
            this.attackTime=20,//0.1一个

            this.state=(MainPosX>ALL.Lead.x?"left":"right")+"1";
            this.node.getComponent(cc.BoxCollider)._size.height=60;
            this.node.getComponent(cc.BoxCollider)._size.width=70;
        }else if(this.state_character=="Enemy_worm2_"){
            this.jumpSpeed=cc.v2(0,0);
            this.Public.life=cc.v2(2,2);
            this.damage=1;
            this.isAttack=true,
            this.stopTime=ALL.INF,
            this.attackTime=15,//0.1一个

            this.state=(MainPosX>ALL.Lead.x?"left":"right");
            this.node.getComponent(cc.BoxCollider)._size.height=60;
            this.node.getComponent(cc.BoxCollider)._size.width=90;
        }else if(this.state_character=="Enemy_worm3_"){
            this.jumpSpeed=cc.v2(200,250);
            this.Public.life=cc.v2(2,2);
            this.damage=1;
            this.isAttack=true,
            this.stopTime=30,
            this.attackTime=20,//0.1一个

            this.state=(MainPosX>ALL.Lead.x?"left":"right")+"1";
            this.node.getComponent(cc.BoxCollider)._size.height=70;
            this.node.getComponent(cc.BoxCollider)._size.width=70;
        }else if(this.state_character=="Enemy_worm4_"){
            this.jumpSpeed=cc.v2(0,0);
            this.Public.life=cc.v2(3,3);
            this.damage=1;
            this.isAttack=true,
            this.stopTime=ALL.INF,
            this.attackTime=20,//0.1一个

            this.state=(MainPosX>ALL.Lead.x?"left":"right")+"1";
            this.node.getComponent(cc.BoxCollider)._size.height=70;
            this.node.getComponent(cc.BoxCollider)._size.width=70;
            this.state_character=this.state_character.replace("4","3");
        }
        
        this.speed.x=0;
        this.speed.y=0;
        this.playState=this.state_character+this.state;
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
        this.addActionTimer();
    },

    update: function (dt) {
        this.attack();
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
                    this.state.replace("left","right");
                }
                else if (this.state.indexOf("right")!=-1&& (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
                    this.state.replace("right","left");
                }
            }else{
                selfPreAabb.y = selfAabb.y;
                otherPreAabb.y = otherAabb.y;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
                        this.node.y+=otherPreAabb.yMax-selfAabb.yMin;
                        this.collisionY=-1;
                        this.inFloor();
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
         if(this.isJump==true&&this.state.indexOf("1")!=-1){
            this.isJump=false;
            this.state=this.state.replace("1","2");
            this.speed.x=this.jumpSpeed.x*(this.state.indexOf("left")==-1?1:-1);
            this.speed.y=this.jumpSpeed.y;
        }
        
        this.playState=this.state_character+this.state;
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },


    attack:function(){
        if(this.state_character=="Enemy_worm1_"){
            if(this.isAttack==true&&this.state.indexOf("1")!=-1){
                this.Public.addEbullet(3,this.node.x,this.node.y+15,this.state.slice(0,this.state.length-1));  
                          
                this.isAttack=false;
                this.state=this.state.replace("1","3");

                var count = 0;
                this.callback_worm1 = function () {
                    if(count == this.attackTime) {
                        this.isAttack=true;
                        this.unschedule(this.callback_worm1);
                    }
                    count++;
                }
                this.schedule(this.callback_worm1,0.1,this.attackTime,0);

                var count3 = 0;
                this.callback_worm3 = function () {
                    if(count3 == 5) {
                        this.state=this.state.replace("3","1");
                        this.unschedule(this.callback_worm3);
                    }
                    count3++;
                }
                this.schedule(this.callback_worm3,0.1,5,0);
            }
        }else if(this.state_character=="Enemy_worm2_"){

            if(this.isAttack==true){
                this.Public.addEbullet(5,this.node.x,this.node.y+15,this.state);
                var count = 0;
                this.isAttack=false;
                this.callback_worm1 = function () {
                    if(count == this.attackTime) {
                        this.isAttack=true;
                        this.unschedule(this.callback_worm1);
                    }else if(count==1){
                        this.Public.addEbullet(5,this.node.x,this.node.y+10,this.state);
                    }
                    count++;
                }
                this.schedule(this.callback_worm1,0.1,this.attackTime,0);
            }

        }else if(this.state_character=="Enemy_worm3_"){
            if(this.isAttack==true&&this.state.indexOf("1")!=-1){
                this.Public.addEbullet(6,this.node.x,this.node.y+20,this.state.slice(0,this.state.length-1));  
                          
                this.isAttack=false;
                this.state=this.state.replace("1","3");

                var count = 0;
                this.callback_worm1 = function () {
                    if(count == this.attackTime) {
                        this.isAttack=true;
                        this.unschedule(this.callback_worm1);
                    }
                    count++;
                }
                this.schedule(this.callback_worm1,0.1,this.attackTime,0);

                var count3 = 0;
                this.callback_worm3 = function () {
                    if(count3 == 5) {
                        this.state=this.state.replace("3","1");
                        this.unschedule(this.callback_worm3);
                    }
                    count3++;
                }
                this.schedule(this.callback_worm3,0.1,5,0);
            }
        }
        
    },

    addActionTimer:function(){
        this.isJump=false;
        if(this.state_character=="Enemy_worm1_"){
            var count1 = 0;
            this.callback_worm2= function(){
                if(count1 >= this.stopTime) {
                    this.isJump=true;
                    this.unschedule(this.callback_worm2);
                }
                count1++;
            }
            this.schedule(this.callback_worm2,0.1,this.stopTime,0);
        }else if(this.state_character=="Enemy_worm2_"){
            
        }else if(this.state_character=="Enemy_worm3_"){
            var count1 = 0;
            this.callback_worm2= function(){
                if(count1 >= this.stopTime) {
                    this.isJump=true;
                    this.unschedule(this.callback_worm2);
                }
                count1++;
            }
            this.schedule(this.callback_worm2,0.1,this.stopTime,0);
        } 
    },

    inFloor:function(){
        this.state=this.state.replace("2","1");
        if(this.state_character=="Enemy_worm1_"){
            this.addActionTimer();
            this.speed=cc.v2(0,0);
        }else if(this.state_character=="Enemy_worm2_"){
            this.speed=cc.v2(0,0);
        }else if(this.state_character=="Enemy_worm3_"){
            this.addActionTimer();
            this.speed=cc.v2(0,0);
        }else if(this.state_character=="Enemy_worm4_"){
            this.addActionTimer();
            this.speed=cc.v2(0,0);
        }
    },
});
