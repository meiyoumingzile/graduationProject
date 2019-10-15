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
        if(this.state_character=="Enemy_frog1_"){
            this.jumpSpeed=cc.v2(200,650);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
        }else if(this.state_character=="Enemy_frog2_"){
            this.gravity=-2000;
            this.jumpSpeed=cc.v2(500,700);
            this.Public.life=cc.v2(1,1);
            this.damage=1;
            this.node.getComponent(cc.BoxCollider)._size.height=40;
            this.node.getComponent(cc.BoxCollider)._size.width=90;
        }else if(this.state_character=="Enemy_frog3_"){
            this.jumpSpeed=cc.v2(200,650);
            this.Public.life=cc.v2(5,5);
            this.damage=1;
            this.node.color=cc.Color.GREEN;
            this.state_character=this.state_character.replace("3","1");
        }

        this.speed.x=0;
        this.speed.y=0;
        var MainPosX=this.node.x;
        var MainPosY=this.node.y;
        this.state=(MainPosX>ALL.Lead.x?"left":"right")+"1";
        this.playState=this.state_character+this.state;
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
        this.addActionTimer();
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
                        this.inFloor();
                        this.addActionTimer();
                    }else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                        this.node.y-=selfAabb.yMax -otherPreAabb.yMin+1;
                        this.speed.y=0;
                    }
                    
                }
                other.frogTouchingY = true;
            }
        }else if(other.node.name.indexOf("Arms")!=-1){

        }
    },

    onCollisionExit: function (other, self){//碰撞出口，因为碰完了要改变速度和状态
        if (other.frogTouchingY){
            if(other.node.name.indexOf("Object")!=-1){
                other.frogTouchingY = false;
                this.collisionY = 0;
            }
        }
        
    },



    
    calSpeed:function(dt){
        if (this.state.indexOf("2")!=-1) {
            this.speed.y += this.gravity*dt;
        }

        if(this.state=="left2"){
            this.speed.x=-this.jumpSpeed.x;
        }else if(this.state=="right2"){
            this.speed.x=this.jumpSpeed.x;
        }

        if (this.speed.y<0) {
            this.speed.y-=20;
        }
    },
    
    changeAction:function(){
        if(this.isJump==true){
            this.isJump=false;
            this.state=this.state.replace("1","2");
            if(this.state_character=="Enemy_frog1_"){
                this.node.getComponent(cc.BoxCollider)._size.width=100;
            }else if(this.state_character=="Enemy_frog2_"){
                this.node.getComponent(cc.BoxCollider)._offset.y=15;
            }

            this.speed.y=this.jumpSpeed.y;
        }
        if(this.state.indexOf("right1")!=-1&&ALL.Lead.x<this.node.x){
            this.state="left1";
        }else if(this.state.indexOf("left1")!=-1&&ALL.Lead.x>this.node.x){
            this.state="right1";
        }

        this.playState=this.state_character+this.state;
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },

    addActionTimer:function(){
        this.isJump=false;
        if(this.state_character=="Enemy_frog1_"){
            var count1 = 0;
            this.callback1= function(){
                if(count1 >= this.Public.life.x*4) {
                    this.isJump=true;
                    this.unschedule(this.callback1);
                }
                count1++;
            }
            this.schedule(this.callback1,0.1,this.Public.life.x*4,0);
        }else if(this.state_character=="Enemy_frog2_"){
            var count1 = 0;
            this.callback1= function(){
                if(count1 === 10) {
                    this.isJump=true;
                    this.unschedule(this.callback1);
                }
                count1++;
            }
            this.schedule(this.callback1,0.1,10,0);
        }
        
    },

    inFloor:function(){
        this.state=this.state.replace("2","1");
        if(this.state_character=="Enemy_frog1_"){
            this.node.getComponent(cc.BoxCollider)._size.width=70;

        }else if(this.state_character=="Enemy_frog2_"){
            this.node.getComponent(cc.BoxCollider)._offset.y=0;
        }
        this.speed=cc.v2(0,0);
    },
});
