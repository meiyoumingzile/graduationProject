

cc.Class({
    extends: cc.Component,

    properties: {
        Lifes:{//血量
            default:null,
            type:cc.Node,
        },
       	Times:{//时间
        	default:null,
        	type:cc.Node,
    	}, 
        Lead:{
            default:null,
            type:cc.Node,
        },
        MainCanvas:{
            default:null,
            type:cc.Node,
        },
        PrearmEffect:{//爆炸效果预制体
            default:null,
            type:cc.Prefab,
        }, 
    },

    onLoad: function () {
    	cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
    	ALL.Lifes=this.Lifes;
    	ALL.Times=this.Times;
        ALL.Public=this.node;
        ALL.Lead=this.Lead;
        ALL.MainCanvas=this.MainCanvas;
    },

    onDestroy:function(){
        ALL.lastSence=this.node.parent.name;
    },

    getIntoSence:function(next,X,Y){//进入下一个场景
        ALL.NextSence=next;
        
        
        cc.director.loadScene("Waiting");
    },

    addEffect:function(X,Y,self,effect){//添加效果
        var neweffect=cc.instantiate(this.PrearmEffect);
        neweffect.setPosition(X,Y);
        neweffect.getComponent("effects").kind=effect;
        self.node.parent.addChild(neweffect);
    },

    setSenceData:function(self){
        REM.time=ALL.time;
        REM.life=ALL.life;
        REM.LeadPos=self.node.position;
        REM.nowArms=ALL.nowArms;

        REM.Data.state=self.Data.state;
        REM.Data.state_character=self.Data.state_character;
        REM.Data.state_pos=self.Data.state_pos;
        REM.Data.state_effecf=self.Data.state_effecf;
        REM.nowSence=ALL.nowSence;
    },

    getSenceData:function(self,isRemPos){
        ALL.nowArmsNum.x=0;
        ALL.Times.getComponent("Times").changeToTime(REM.time);
        ALL.Lifes.getComponent("Lifes").changeToLife(REM.life);
        if(isRemPos==null){
        }else{
            self.node.position=REM.LeadPos;
            self.node.x+=5;
            self.node.y+=5;
        }
        
        ALL.nowArms=REM.nowArms;


        self.Data.state=REM.Data.state;
        self.Data.state_character=REM.Data.state_character;
        self.Data.state_pos=REM.Data.state_pos;
        self.Data.state_effecf=REM.Data.state_effecf;
        self.Data.nowArms=REM.Data.nowArms;
    },

    


    // update: function (dt) {

    // },
});

