
cc.Class({

    extends: cc.Component,
    ////////////////////////初始化属性变量部分=====-----------------------------------------
    properties:{
        nowColl:"",
        otherColl:null,
        isAffirm:true,
    },

    ///////////////////////////////引擎自带的回调函数部分------------------------------
    start:function(){
        
    },

    onLoad: function () {
        
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
        //cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
        var selfCollider=this.node.getComponent(cc.BoxCollider);//获得碰撞体
        cc.eventManager.addListener({//添加键盘监听
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this),
        }, this.node);
        
        this.collisionX = 0;//初始化碰撞方向
        this.collisionY = 0;
    },

    update: function (dt){
        if(this.nowColl.indexOf("userData")!=-1&&this.node.parent.x==0){
            this.node.parent.x=200;
        }else if(this.nowColl.indexOf("userData")==-1){
            this.node.parent.x=0;
        }
    },
    
    onDisabled: function () {//????
        cc.director.getCollisionManager().enabled = false;
    },

    onDestroy: function (){
        
        
    },
    //////////////////////////////////以下是各种监听部分----------------------------------

    onKeyPressed: function (keyCode, event){
        if(this.isAffirm==true){
            switch(keyCode){
                case cc.KEY.w:
                case cc.KEY.up:
                    this.changeY(100);
                    break;
                case cc.KEY.a:
                case cc.KEY.left:
                    this.changeX(-100);
                    break;
                case cc.KEY.d:
                case cc.KEY.right:
                    if(this.nowColl.indexOf("userData")!=-1){
                        this.node.position=cc.v2(-380,120);
                    }else{
                        this.changeX(100);
                    }
                    break;
                case cc.KEY.s:
                case cc.KEY.down:
                    this.changeY(-100);
                    break;
                case cc.KEY.escape:
                    ALL.Public.getComponent("Public").getIntoSence(REM.nowSence);
                    break;
                case cc.KEY.enter:
                    this.addEffect();
                    this.confirm();
                    break; 
            }  
        }    
    },
    
    onKeyReleased: function (keyCode, event){
       
        
    },
    
    onCollisionEnter: function (other, self){
        this.otherColl=other;
        this.node.position=other.node.position;
        this.nowColl=other.node.name;
    },

    onCollisionStay: function (other,self){
         
    },

    onCollisionExit: function (other, self){
       
    },




    confirm:function(){
        if(this.nowColl=="继续"){
            ALL.Public.getComponent("Public").getIntoSence(REM.nowSence);
        }else if(this.nowColl=="セーブ"){ 
            this.node.x-=150;  
        }else if(this.nowColl=="回主界面"){
            cc.director.loadScene("BeginMenu");
        }else if(this.nowColl.indexOf("userData")!=-1){
            cc.sys.localStorage.setItem(this.nowColl, JSON.stringify(REM));
        }else if(this.nowColl=="FireDarts"&&ALL.Prop.FireDarts==true){
            REM.nowArms="FireDarts";
            ALL.nowArmsNum.y=2;
        }else if(this.nowColl=="地图"){
            cc.director.loadScene("WorldMap");
        }else if(this.nowColl==""){

        }
    },

    changeX:function(num){
        if(this.node.x+num>-this.node.parent.parent.width/2&&this.node.x+num<this.node.parent.parent.width/2){
            this.node.x+=num;
        }
    },

    changeY:function(num){
        if(this.node.y+num>-this.node.parent.parent.height/2&&this.node.y+num<this.node.parent.parent.height/2){
            this.node.y+=num;
        }
    },

    addEffect:function(){
        this.node.scaleX = 0.8; this.node.scaleY = 0.8;
        var count = 0;
        this.callback = function () {
            if(count === 2) {// 
                this.node.scaleX = 1; this.node.scaleY = 1;
                this.unschedule(this.callback);
            }
            count++;
        }
        this.schedule(this.callback,0.1,2,0);
        if(this.otherColl.node.name.indexOf("userData")!=-1){
            this.isAffirm=false;
            var count1 = 0;
            this.callback1 = function () {
                this.otherColl.node.rotation+=5;
                if(count1 === 35) {
                    this.isAffirm=true;
                    this.otherColl.node.rotation%=360;
                    this.unschedule(this.callback1);
                }
                count1++;
            }
            this.schedule(this.callback1,0.01,35,0);
        }
    },
});

