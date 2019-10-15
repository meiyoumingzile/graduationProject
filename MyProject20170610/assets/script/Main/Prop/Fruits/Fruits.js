cc.Class({
    extends: cc.Component,

    properties: {
       	child:[],

       	Lead:{//血量
        	default:null,
        	type:cc.Node,
   		}, 
   		LeadScript:null,

   		Prefab_orange:{
        	default:null,
        	type:cc.Prefab,
   		}, 
   		Prefab_pepper:{
        	default:null,
        	type:cc.Prefab,
   		}, 
   		Prefab_banana:{
        	default:null,
        	type:cc.Prefab,
   		}, 
   		Prefab_radish:{
        	default:null,
        	type:cc.Prefab,
   		}, 
   		Prefab_grape:{
        	default:null,
        	type:cc.Prefab,
   		},
   		Prefab_apple:{
        	default:null,
        	type:cc.Prefab,
   		}, 
   		Prefab_pineapple:{
        	default:null,
        	type:cc.Prefab,
   		},
   		Prefab_cantaloupe:{
        	default:null,
        	type:cc.Prefab,
   		},

   		preCam:cc.v2(0,0),
   		nowPrefab:null,
      isAdd:true,
      mainPos:cc.v2(0,0),
    },

    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
        //cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
        this.LeadScript=this.Lead.getComponent("Lead_control");
        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
        if(this.node.name.indexOf("orange")!=-1){//橘子
        	this.nowPrefab=this.Prefab_orange;
        }else if(this.node.name.indexOf("pepper")!=-1){//青椒
        	this.nowPrefab=this.Prefab_pepper;
        }else if(this.node.name.indexOf("banana")!=-1){//香蕉
        	this.nowPrefab=this.Prefab_banana;
        }else if(this.node.name.indexOf("radish")!=-1){//萝卜
        	this.nowPrefab=this.Prefab_radish;
        }else if(this.node.name.indexOf("grape")!=-1){//葡萄
        	this.nowPrefab=this.Prefab_grape;
        }else if(this.node.name.indexOf("apple")!=-1){//苹果
        	this.nowPrefab=this.Prefab_apple;
        }else if(this.node.name.indexOf("pineApple")!=-1){//菠萝
        	this.nowPrefab=this.Prefab_pineapple;
        }else if(this.node.name.indexOf("cantaloupe")!=-1){//哈密瓜
        	this.nowPrefab=this.Prefab_cantaloupe;
        }
        for(var i=this.node;i.name!="MainCanvas";i=i.parent){
            this.mainPos.x+=i.x;
            this.mainPos.y+=i.y;
        }
    },

    update: function (dt) {
    	this.child=this.node.getChildren();
    
    	if(this.child.length==0&&this.visCanvas()==true&&this.isAdd==true){
        this.isAdd=false;
        var count = 0;
        this.callback = function () {
            if(count === 10) {// 
                this.isAdd=true;
                this.unschedule(this.callback);
            }
            count++;
        }
        this.schedule(this.callback,1,10,0);
    		var newfruit=cc.instantiate(this.nowPrefab);
            newfruit.setPosition(this.mainPos);
            ALL.MainCanvas.addChild(newfruit);
        }
        this.preCam.x=this.LeadScript.Data.cameraMove.x;
        this.preCam.y=this.LeadScript.Data.cameraMove.y;
	},


	visCanvas:function(){
    //cc.log(Math.abs(this.node.x-this.preCam.x)>=960)
		if((Math.abs(this.node.x-this.LeadScript.Data.cameraMove.x)<600&&Math.abs(this.node.y-this.LeadScript.Data.cameraMove.y)<400)
			&&(Math.abs(this.node.x-this.preCam.x)>=600||Math.abs(this.node.y-this.preCam.y)>=400)){
			return true;
		}else{
			return false;
		}
	},

});
