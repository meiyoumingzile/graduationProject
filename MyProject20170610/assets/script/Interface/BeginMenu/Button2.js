
cc.Class({
    extends: cc.Component,

    properties: {
       picSize:cc.v2(0,0),
       sizeSpeed:cc.v2(25,20),
       Rem:null,
    },

    onLoad: function () {
        this.Rem={
         
            nowSence:"",

            life:cc.v2(2,2),//血量y是最大值，x是当前值
            time:cc.v2(10,10),//血量y是最大值，x是当前值
            LeadPos:cc.v2(0,0),
            nowArms:"Axe",

            Data:{//记录数据只用得到前几个
                state:"Lead_jump_right",
                prestate:"Lead_jump_right",//用于改变状态
                Laststate:"Lead_jump_right",//用于判断
                state_effecf:"null",
                state_pos:"air",
                state_character: "Lead",
                nowColl:null,
                isJump:false,
                player:null,
                img:cc.SpriteFrame,
                speed: cc.v2(0, 0),
                maxSpeed: cc.v2(150,1000),
                maxSpeedrun: 250,
                maxSpeedwalk: 150,
                maxSpeedlie: 100,
                maxSpeedclimb:cc.v2(100,100),
                gravity: -1000,
                drag: 150,//地面摩擦力
                airdrag:150,//空气阻力，在x轴方向计算
                waterUpAcc: 0,//水阻力，水里才有
                buoyancy:0,//水里浮力
                acceleration: cc.v2(300,0),//加速度
                nowAcc:300,
                accDir: 0,//加速度方向
                jumpSpeedy: 520,
                key_left:false,
                key_right:false,
                key_down:false,
                key_up:false,
                key_attack:false,
                key_acc:false,
                key_jump:false,

                nowlen:cc.v2(0,0),
                cameraMove: cc.v2(0,0),//镜头移动的距离
                leadCollSize:cc.v2(0,0),//人物站立碰撞体大小

                StegosaurusAttackDamage:2,
            },

            Prop:{
                Axe:true,
                FireDarts:false,
            },
        };
        REM=this.Rem;
        this.picSize.x=this.node.width;
        this.picSize.y=this.node.height;
        this.sizeSpeed.x=70;
        this.sizeSpeed.y=60;
        this.node.width=0;
        this.node.height=0;
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            //ALL.
            ALL.Public.getComponent("Public").getIntoSence("Volcano1");
        },this);
    },

    update:function (dt) {
        if(this.node.width+this.sizeSpeed.x*dt<=this.picSize.x){
            this.node.width+=this.sizeSpeed.x*dt;
        }
        if(this.node.height+this.sizeSpeed.y*dt<=this.picSize.y){
            this.node.height+=this.sizeSpeed.y*dt;
        }
    },
});