cc.Class({
    extends: cc.Component,

    properties: {
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
        maxMoveLen:0,
        nowLen:0,//位移，是有方向的初始是0
        moveDir:1,//移动方向初始为1，相反是-1
        isAttack:true,
        attackCnt:0,
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
        this.player = this.node.getComponent(cc.Animation);
        this.state=this.node.name.slice(13,this.node.name.length);
        this.state_character=this.node.name.slice(0,13);
        this.Public.state_effecf="null";
        if(this.state_character=="Enemy_cloud1_"){
            this.Public.life=cc.v2(1,1);
            this.damage=1;
        }
        var spX=parseInt(this.state.slice(0,4));
        var spY=parseInt(this.state.slice(5,9));
        
        this.beginSpeed=cc.v2(spX,spY);
        this.speed.x=this.beginSpeed.x;
        this.speed.y=this.beginSpeed.y;
        this.playState=this.state_character.slice(0,12);
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
        cc.log(this.playState);
    },

    update: function (dt) {
        cc.log(this.playState);
        if(this.node.name.indexOf("Enemy_cloud1")!=-1){
            this.attack();
        }
        this.calSpeed();
        this.cal(dt);
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

            
        }else if(other.node.name.indexOf("Arms")!=-1){

        }
    },

    onCollisionExit: function (other, self){//碰撞出口，因为碰完了要改变速度和状态
       
        
    },



    

    calSpeed:function(){

        //this.speed.y=this.beginSpeed.y;
        //this.speed.x=this.beginSpeed.x;
    },
    
    changeMoveDir:function(){
        if(Math.abs(this.nowLen)>this.maxMoveLen){
            this.nowLen=this.maxMoveLen*this.moveDir;
            this.speed.y=-this.speed.y;
            this.speed.x=-this.speed.x;
            this.moveDir=-this.moveDir;
        }
    },

    cal:function(dt){

        this.nowlen.x=this.speed.x*dt;
        this.nowlen.y=this.speed.y*dt;
        this.nowLen+=Math.sqrt(this.nowlen.x*this.nowlen.x+this.nowlen.y*this.nowlen.y)*this.moveDir;
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y;
    },

    attack:function(){
        if(this.isAttack==true){
            this.Public.addEbullet(2,this.node.x,this.node.y);
            this.isAttack=false;
            if(this.attackCnt%3==0){
                var count1 = 0;
                this.callback1 = function () {
                    if(count1 === 4) {// 
                        this.isAttack=true;
                        this.unschedule(this.callback1);
                    }
                    count1++;
                }
                this.schedule(this.callback1,0.5,4,0);
            }else{
                var count2 = 0;
                this.callback2 = function () {
                    if(count2 === 2) {// 
                        this.isAttack=true;
                        this.unschedule(this.callback2);
                    }
                    count2++;
                }
                this.schedule(this.callback2,0.5,2,0);
            }
            this.attackCnt++;
        }
    },

    

});
