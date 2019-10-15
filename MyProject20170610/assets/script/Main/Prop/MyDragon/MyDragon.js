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
    },

    onLoad: function () {
        //cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        //cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
        //cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
        this.LeadScript=ALL.Lead.getComponent("Lead_control");
        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
        this.nowPrefab=this.Prefab1;   
    },

    update: function (dt) {
    
        if(!this.isLoad&&this.visCanvas()==true&&
            ALL.Lead.getComponent("Lead_control").Data.state_character!=this.node.name.slice(7,this.node.name.length)){
            this.isLoad=true;
            var X=this.node.x;
            var Y=this.node.y;
            for(var i=this.node;i.parent.name!="MainCanvas";i=i.parent){
                X+=i.x;
                Y+=i.y;
            }
            var newpre=cc.instantiate(this.nowPrefab);
            newpre.setPosition(cc.v2(X,Y));
            newpre.name="MyDragon_"+this.node.name.slice(7,this.node.name.length);
            newpre.getComponent("MyDragonPrefab").lastNode=this.node;
            ALL.MainCanvas.addChild(newpre);
        }
        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
        
       },

    visCanvas:function(){
        if((Math.abs(this.node.x-this.LeadScript.Data.cameraMove.x)<960&&Math.abs(this.node.y-this.LeadScript.Data.cameraMove.y)<640)
            &&(Math.abs(this.node.x-this.preCam.x)>=960||Math.abs(this.node.y-this.preCam.y)>=640)){
            return true;
        }else{
            return false;
        }
    },

});
