
cc.Class({
    extends: cc.Component,

    properties: {
        child:[],

        LeadScript:null,

        Prefab1:{
            default:null,
            type:cc.Prefab,
        }, 

        preCam:cc.v2(0,0),
        nowPrefab:null,
        isLoad:false,
        isMake:true,
        mainPos:cc.v2(0,0),
    },

    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
        //cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
        this.LeadScript=ALL.Lead.getComponent("Lead_control");
        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
        this.nowPrefab=this.Prefab1;
        for(var i=this.node;i.name!="MainCanvas";i=i.parent){
            this.mainPos.x+=i.x;
            this.mainPos.y+=i.y;
        }

    },

    update: function (dt) {
        this.makePrefab();
       

        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
    },

    visCanvas:function(){
        if((Math.abs(this.mainPos.x-this.LeadScript.Data.cameraMove.x)<600&&Math.abs(this.mainPos.y-this.LeadScript.Data.cameraMove.y)<400)
            &&(Math.abs(this.mainPos.x-this.preCam.x)>=600||Math.abs(this.mainPos.y-this.preCam.y)>=400)){
            return true;
        }else{
            return false;
        }
    },

    makePrefab:function(){
        if(this.node.name.indexOf("Enemy_dropOb1")!=-1){
            if(!this.isLoad&&this.visCanvas()==true){
                this.isLoad=true;
                var newpre=cc.instantiate(this.nowPrefab);
                newpre.setPosition(this.mainPos.x,this.mainPos.y);
                newpre.name=this.node.name;
                newpre.getComponent("EnemyPublic").lastNodeScript=this;
                ALL.MainCanvas.addChild(newpre);
            }
        }else if(this.node.name.indexOf("Enemy_dropOb2")!=-1){
            if(this.isMake==true&&
            (Math.abs(this.mainPos.x-this.LeadScript.Data.cameraMove.x)<600&&Math.abs(this.mainPos.y-this.LeadScript.Data.cameraMove.y)<400)){
                var newpre=cc.instantiate(this.nowPrefab);
                newpre.setPosition(this.mainPos.x,this.mainPos.y);
                newpre.name=this.node.name;
                newpre.getComponent("EnemyPublic").lastNodeScript=this;
                ALL.MainCanvas.addChild(newpre);
                this.isMake=false;
                var count1 = 0;
                this.callback1 = function () {
                    if(count1 === 6) {// 
                        this.isMake=true;
                        this.unschedule(this.callback1);
                    }
                    count1++;
                }
                this.schedule(this.callback1,0.5,6,0);
            }
        }else if(this.node.name.indexOf("Enemy_dropOb4")!=-1){
            if(this.isMake==true&&
            (Math.abs(this.mainPos.x-this.LeadScript.Data.cameraMove.x)<600&&Math.abs(this.mainPos.y-this.LeadScript.Data.cameraMove.y)<400)){
                var newpre=cc.instantiate(this.nowPrefab);
                newpre.setPosition(this.mainPos.x,this.mainPos.y);
                newpre.name=this.node.name;
                newpre.getComponent("EnemyPublic").lastNodeScript=this;
                ALL.MainCanvas.addChild(newpre);
 
                this.isMake=false;
                var count1 = 0;
                this.callback1 = function () {
                    if(count1 === 4) {// 
                        this.isMake=true;
                        this.unschedule(this.callback1);
                    }
                    count1++;
                }
                this.schedule(this.callback1,1,4,0);
            }
        }
    }

});
