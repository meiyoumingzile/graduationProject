cc.Class({
    extends: cc.Component,

    properties: {
        speed:cc.v2(0,0),
        nowlen:cc.v2(0,0),
        damage:0,
        player:null,
        state:"",
        state_character:"",
        snailSpeed:cc.v2(0,0),
        child:[],
        playState:"",
        lastPlayState:"",
        Public:null,
		snail5Serial:"1",
		Child0:null,
		Child1:null,
		Child2:null,
		Child3:null,
		isCal:cc.v2(1,1),
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.Public=this.node.getComponent("EnemyPublic");
    	this.player = this.node.getComponent(cc.Animation);
        
        this.state=this.node.name.substr(13,this.node.name.length-13);
        this.state_character=this.node.name.substr(0,13);
        this.child=this.node.getChildren();
		this.Child0=this.child[0].getComponent("EnemyPrefabChild_snail");
		this.Child1=this.child[1].getComponent("EnemyPrefabChild_snail");
		this.Child2=this.child[2].getComponent("EnemyPrefabChild_snail");
		this.Child3=this.child[3].getComponent("EnemyPrefabChild_snail");
        if(this.state.substr(0,2)=="up"){//头朝上
            this.node.rotation=0;
            this.playState=this.state_character+(this.state.indexOf("left")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="do"){//头朝下
            this.node.rotation=180;
            this.playState=this.state_character+(this.state.indexOf("right")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="le"){//头朝左
            this.node.rotation=270;
            this.playState=this.state_character+(this.state.indexOf("down")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="ri"){//头朝右
            this.node.rotation=90;
            this.playState=this.state_character+(this.state.indexOf("up")!=-1?"left":"right");
        }
        if(this.state_character=="Enemy_snail1_"){
            this.damage=1;
            this.snailSpeed=cc.v2(10,10);
            this.Public.life=cc.v2(2,2);
            this.Public.state_effecf="null";
        }else if(this.state_character=="Enemy_snail2_"){
			this.damage=2;
            this.snailSpeed=cc.v2(20,20);
            this.Public.life=cc.v2(3,3);
            this.Public.state_effecf="null";
        }else if(this.state_character=="Enemy_snail3_"){
			this.damage=1;
            this.snailSpeed=cc.v2(100,100);
            this.Public.life=cc.v2(4,4);
            this.Public.state_effecf="null";
        }else if(this.state_character=="Enemy_snail4_"){
			this.damage=1;
            this.snailSpeed=cc.v2(20,20);
            this.Public.life=cc.v2(8,8);
            this.Public.state_effecf="null";
        }else if(this.state_character=="Enemy_snail5_"){
			this.damage=1;
            this.snailSpeed=cc.v2(100,100);
            this.Public.life=cc.v2(4,4);
            this.Public.state_effecf="null";
			this.playState+=this.snail5Serial;
			
        }
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },
    
    update: function (dt) {
		this.visCharacter();
        this.changeAction();
        this.calSpeed(dt);
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
        }
    },

    onCollisionStay:function(other, self){

    },

    onCollisionExit:function(other, self){
    },






	visCharacter:function(){
		if(this.state_character=="Enemy_snail5_"){
			if(this.snail5Serial=="1"&&
			Math.abs(this.node.x-ALL.Lead.x)+Math.abs(this.node.y-ALL.Lead.y)<=200){
				this.snail5Serial="2",
				this.snailSpeed.x=400;
				this.snailSpeed.y=400;
			}
		}
	},

    calSpeed:function(dt){
        if(this.state.substr(0,2)=="up"){//头朝上
            this.speed.y=0;
            this.speed.x=this.state.indexOf("left")!=-1?-this.snailSpeed.x:this.snailSpeed.x;
        }else if(this.state.substr(0,2)=="do"){//头朝下
            this.speed.y=0;
            this.speed.x=this.state.indexOf("left")!=-1?-this.snailSpeed.x:this.snailSpeed.x;
        }else if(this.state.substr(0,2)=="le"){//头朝左
            this.speed.x=0;
            this.speed.y=this.state.indexOf("down")!=-1?-this.snailSpeed.y:this.snailSpeed.y;
        }else if(this.state.substr(0,2)=="ri"){//头朝右
            this.speed.x=0;
            this.speed.y=this.state.indexOf("down")!=-1?-this.snailSpeed.y:this.snailSpeed.y;
        }
    },

    changeAction:function(){
		this.isCal=cc.v2(1,1);
		if(this.state.substr(0,2)=="up"){//头朝上
			if(this.state.indexOf("left")!=-1&&this.Child3.isColl==true
			&&this.Child3.lastIsColl==false){
				this.state=this.state.replace("left","right");
			}else if(this.state.indexOf("right")!=-1&&this.Child2.isColl==true
			&&this.Child2.lastIsColl==false){
				this.state=this.state.replace("right","left");
			}
		}else if(this.state.substr(0,2)=="do"){//头朝下
			if(this.state.indexOf("left")!=-1&&this.Child2.isColl==true
			&&this.Child2.lastIsColl==false){
				this.state=this.state.replace("left","right");
			}else if(this.state.indexOf("right")!=-1&&this.Child3.isColl==true
			&&this.Child3.lastIsColl==false){
				this.state=this.state.replace("right","left");
			}
		}else if(this.state.substr(0,2)=="le"){//头朝左
			if(this.state.indexOf("up")!=-1&&this.Child2.isColl==true
			&&this.Child2.lastIsColl==false){
				this.state=this.state.replace("up","down");
			}else if(this.state.indexOf("down")!=-1&&this.Child3.isColl==true
			&&this.Child3.lastIsColl==false){
				this.state=this.state.replace("down","up");
			}
		}else if(this.state.substr(0,2)=="ri"){//头朝右
			if(this.state.indexOf("up")!=-1&&this.Child3.isColl==true
			&&this.Child3.lastIsColl==false){
				this.state=this.state.replace("up","down");
			}else if(this.state.indexOf("down")!=-1&&this.Child2.isColl==true
			&&this.Child2.lastIsColl==false){
				this.state=this.state.replace("down","up");
			}
		}

		if(this.state_character=="Enemy_snail5_"&&this.snail5Serial=="2"){

			if(this.state.substr(0,2)=="up"){//头朝上
				if(this.state.indexOf("left")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.isCal.x=0;
					this.node.rotation=270;
					this.state="left_down";	
					this.node.x=this.Child0.nowColl.node.x-this.Child0.nowColl._size.width/2-this.node.getComponent(cc.BoxCollider)._size.width/2;
				}else if(this.state.indexOf("right")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.isCal.x=0;
					this.node.rotation=90;
					this.state="right_down";
					this.node.x=this.Child1.nowColl.node.x+this.Child1.nowColl._size.width/2+this.node.getComponent(cc.BoxCollider)._size.width/2;
				}

			}else if(this.state.substr(0,2)=="do"){//头朝下

				if(this.state.indexOf("left")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.isCal.x=0;
					this.node.rotation=270;
					this.state="left_up";
					this.node.x=this.Child1.nowColl.node.x-this.Child1.nowColl._size.width/2-this.node.getComponent(cc.BoxCollider)._size.width/2;
				}else if(this.state.indexOf("right")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.isCal.x=0;
					this.node.rotation=90;
					this.state="right_up";
					this.node.x=this.Child0.nowColl.node.x+this.Child0.nowColl._size.width/2+this.node.getComponent(cc.BoxCollider)._size.width/2;
				}
			}else if(this.state.substr(0,2)=="le"){//头朝左
				if(this.state.indexOf("down")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.isCal.y=0;
					this.node.rotation=180;
					this.state="down_right";
					this.node.y=this.Child0.nowColl.node.y-this.Child0.nowColl._size.height/2-this.node.getComponent(cc.BoxCollider)._size.height/2
				}else if(this.state.indexOf("up")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.isCal.y=0;
					this.node.rotation=0;
					this.state="up_right";
					this.node.y=this.Child1.nowColl.node.y+this.Child1.nowColl._size.height/2+this.node.getComponent(cc.BoxCollider)._size.height/2;
				}
			}else if(this.state.substr(0,2)=="ri"){//头朝右
				if(this.state.indexOf("down")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.isCal.y=0;
					this.node.rotation=180;
					this.state="down_left";
					this.node.y=this.Child1.nowColl.node.y-this.Child1.nowColl._size.height/2-this.node.getComponent(cc.BoxCollider)._size.height/2-5;
				}else if(this.state.indexOf("up")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.isCal.y=0;
					this.node.rotation=0;
					this.state="up_left";
					this.node.y=this.Child0.nowColl.node.y+this.Child0.nowColl._size.height/2+this.node.getComponent(cc.BoxCollider)._size.height/2+5;
				}
			}
			
		}else{
			if(this.state.substr(0,2)=="up"){//头朝上
				if(this.state.indexOf("left")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.state=this.state.replace("left","right");
				}else if(this.state.indexOf("right")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.state=this.state.replace("right","left");
				}
			}else if(this.state.substr(0,2)=="do"){//头朝下
				if(this.state.indexOf("left")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.state=this.state.replace("left","right");
				}else if(this.state.indexOf("right")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.state=this.state.replace("right","left");
				}
			}else if(this.state.substr(0,2)=="le"){//头朝左
				if(this.state.indexOf("down")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.state=this.state.replace("down","up");
				}else if(this.state.indexOf("up")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.state=this.state.replace("up","down");
				}
			}else if(this.state.substr(0,2)=="ri"){//头朝右
				if(this.state.indexOf("down")!=-1&&this.Child0.isColl==false
				&&this.Child0.lastIsColl==true){
					this.state=this.state.replace("down","up");
				}else if(this.state.indexOf("up")!=-1&&this.Child1.isColl==false
				&&this.Child1.lastIsColl==true){
					this.state=this.state.replace("up","down");
				}
			}
		}
		
        if(this.state.substr(0,2)=="up"){//头朝上
            this.playState=this.state_character+(this.state.indexOf("left")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="do"){//头朝下
            this.playState=this.state_character+(this.state.indexOf("right")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="le"){//头朝左
            this.playState=this.state_character+(this.state.indexOf("down")!=-1?"left":"right");
        }else if(this.state.substr(0,2)=="ri"){//头朝右
            this.playState=this.state_character+(this.state.indexOf("up")!=-1?"left":"right");
        }
		
		if(this.state_character=="Enemy_snail5_"){
			this.playState+=this.snail5Serial;
		}
	
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },
	
	cal:function(dt){
		if(this.isCal.x==1){
			this.nowlen.x=this.speed.x*dt;
			this.node.x += this.nowlen.x;
		}
		if(this.isCal.y==1){
			this.nowlen.y=this.speed.y*dt;
			this.node.y += this.nowlen.y;
		}
        
	},
});
