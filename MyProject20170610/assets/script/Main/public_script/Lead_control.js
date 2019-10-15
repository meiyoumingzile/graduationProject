
cc.Class({

    extends: cc.Component,
    ////////////////////////初始化属性变量部分=====-----------------------------------------
    properties:{
    	
        map:{
            default: null,
            type: cc.Node,
        },
        Prearm_FireDarts:{
            default:null,
            type:cc.Prefab,
        }, 
        Prearm_Axe:{
            default:null,
            type:cc.Prefab,
        }, 
        Prearm_DragonFire:{//喷火龙的火
            default:null,
            type:cc.Prefab,
        },
        Prearm_DragonBattery:{//电龙的点
            default:null,
            type:cc.Prefab,
        },
        Prearm_DragonSto:{//飞龙的石头
            default:null,
            type:cc.Prefab,
        }, 

        Data:null,
    },

    ///////////////////////////////引擎自带的回调函数部分------------------------------
    start:function(){
        
    },

    onLoad: function () {
    	this.Data={
	        state:"Lead_walk_right",
	        prestate:"Lead_walk_right",//用于改变状态
	        Laststate:"Lead_walk_right",//用于判断
	        state_effecf:"null",
	        state_pos:"air",
	        state_character: "Lead",

	        nowColl:null,

	        isJump:false,
	        isAttack:true,
	        player:null,
	        img:cc.SpriteFrame,
	        speed: cc.v2(0, 0),
	        maxSpeed: cc.v2(150,1000),
			maxSpeedXKind:{
				walk:{
					water:{
						Lead:100,
						Seadragon:150,
					},
					air:{
						Lead:150,
						Fierydragon:150,
						Brontosaurus:150,
						Seadragon:150,
						Pterosaur:150,
						Stegosaurus:150,
					},
				},
				
				run:{
					water:{
						Lead:150,
						Seadragon:250,
					},
					air:{
						Lead:250,
						Fierydragon:320,
						Brontosaurus:320,
						Seadragon:250,
						Pterosaur:350,
						Stegosaurus:320,
					},
				},
				
				lie:100,
				climb:100,
			},
	        
	        jumpSpeedy: 520,
	        gravity: -1000,
			maxSpeedYKind:{
				water:{
					Lead:250,
					Seadragon:350,
				},
				air:{
					Lead:1000,
					Fierydragon:1000,
					Brontosaurus:1000,
					Seadragon:1000,
					Pterosaur:500,
					Stegosaurus:1000,
				},
				climb:100,
			},
			nowResistanceAcc:cc.v2(0,0),
			slope:{
				dir:0,
				cosα:1,
				sinα:0,
			},
			resistanceAccXKind:{
				backUpDrag:0,
				drag:{
					u:0.1,
					Static:0,
					Dynamic:100,
				},
				air:{
					Static:0,
					Dynamic:100,
				},
				water:{
					Static:0,
					Dynamic:50,
				},
			},
	        
			normalForceAcc:cc.v2(0,0),
			buoyancyAcc:{
				water:900,
				air:0,
			},
			accKindX:{//自己的加速度，仅仅是自己的牵引力没计算摩擦力
				Static:0,
				walk:{
					water:{
						Lead:100,
						Seadragon:200,
					},
					air:{
						Lead:300,
						Fierydragon:300,
						Brontosaurus:300,
						Seadragon:300,
						Pterosaur:300,
						Stegosaurus:300,
					},
				},
				
				run:{
					water:{
						Lead:130,
						Seadragon:400,
					},
					air:{
						Lead:400,
						Fierydragon:500,
						Brontosaurus:500,
						Seadragon:500,
						Pterosaur:500,
						Stegosaurus:500,
					},
				},
				
				lie:300,
				climb:300,
			},
			accKindY:{
				Static:0,
				water:{
					Lead:200,
					Fierydragon:0,
					Brontosaurus:0,
					Seadragon:500,
					Pterosaur:0,
					Stegosaurus:0,
				},
				air:{
					Lead:0,
					Fierydragon:0,
					Brontosaurus:0,
					Seadragon:0,
					Pterosaur:0,
					Stegosaurus:0,
				},
				climb:1000,
			},
			nowSelfAcc:cc.v2(300,0),
			nowMergeAcc:cc.v2(300,0),
			
	        key_left:false,
	        key_right:false,
	        key_down:false,
	        key_up:false,
	        key_attack:false,
	        key_acc:false,
	        key_jump:false,


	        nowlen:cc.v2(0,0),
	        cameraMove: cc.v2(0,0),//镜头移动的距离,是个正值
	        leadCollSize:cc.v2(0,0),//人物站立碰撞体大小

	        StegosaurusAttackDamage:2,
    	};

        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        cc.director.getCollisionManager().enabled = true;//初始化启用碰撞系统
        //cc.director.getCollisionManager().enabledDebugDraw = true;//显示碰撞框
        var selfCollider=this.node.getComponent(cc.BoxCollider);//获得碰撞体
        this.Data.player = this.node.getComponent(cc.Animation);//初始化动画
        this.Data.player.play(this.Data.state);
        cc.eventManager.addListener({//添加键盘监听
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this),
        }, this.node);
        this.MouseE();//鼠标监听


        this.Data.collisionX = 0;//初始化碰撞方向
        this.Data.collisionY = 0;
        this.Data.leadCollSize.x=selfCollider._size.width;//初始化人物大小
        this.Data.leadCollSize.y=selfCollider._size.height;
        //cc.log(ALL.lastSence);
        if(ALL.lastSence!=""){
        	ALL.Public.getComponent("Public").getSenceData(this,true);//此时要还原位置
        }else{
        	ALL.Public.getComponent("Public").getSenceData(this);//获得人物数据
        }
   		ALL.nowSence=this.node.parent.parent.parent.name;
   		this.changeBoxCollider(this.Data.state);

   		this.changeArms();
        this.AdjustLlens();
    },

    update: function (dt){
		this.getselfAcc();
		this.getNormalForce();
        this.getNowState();
        this.calSpeedY(dt);
        this.calSpeedX(dt);
        this.changeAction();
        this.calLen(dt);
        this.moveCamera(this.Data.nowlen.x,this.Data.nowlen.y);
    },
    
    onDisabled: function () {//????
        cc.director.getCollisionManager().enabled = false;
    },

    onDestroy: function (){
    	ALL.Public.getComponent("Public").setSenceData(this);
    },
    //////////////////////////////////以下是各种监听部分----------------------------------
    MouseE:function(){
        var self = this.Data;
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                var target = event.getCurrentTarget();//获取事件所绑定的target
                var locationInNode = target.convertToNodeSpace(touches.getLocation());
            },
            onTouchMoved: function (touches, event) {
              
            },
            onTouchEnded: function (touches, event) {
           
            },
            onTouchCancelled: function (touches, event) {
            }
        }
        cc.eventManager.addListener(listener, self.node);
    },

    onKeyPressed: function (keyCode, event){
        if(this.Data.state.indexOf("fall")!=-1){
        }else{
            switch(keyCode){
                case KEY.attackKey:
                    //this.Data.node=JSON.parse(cc.sys.localStorage.getItem('userData'));

                    this.Data.key_attack=true;
                    break;
                case cc.KEY.escape:
                    var ss;
                   // cc.log(this.Data.node);
                    //cc.sys.localStorage.setItem('userData', JSON.stringify(this.Data.node));
                    cc.director.loadScene('IngMenu');
                    break;
                case KEY.accKey:
                    this.Data.key_acc=true;
                    break;
                case KEY.leftKey:
                    this.Data.key_left=true;
                    break;
                case KEY.rightKey:
                    this.Data.key_right=true;
                    break;
                case KEY.jumpKey:
                    this.Data.key_jump=true;
                    break;
                case KEY.downKey:
                    this.Data.key_down=true;
                    break;
                case KEY.upKey:
                    this.Data.key_up=true;
            }
            if(this.Data.key_attack==true&&this.Data.state.indexOf("Stegosaurus_attack")==-1){
            	if(this.Data.isAttack==true){
            		this.newArm();
            	}
            }
            if(this.Data.key_acc==true&&this.Data.state.indexOf("lie")==-1){
                 
            }
            if(this.Data.key_left==true){
                 
                ALL.LeadFaceDir=-1;
                this.changeActionDir(ALL.LeadFaceDir);
            }
            if(this.Data.key_right==true){
                 
                ALL.LeadFaceDir=1;
                this.changeActionDir(ALL.LeadFaceDir);
            }
            if(this.Data.key_jump==true){
                if(this.Data.state_character=="Pterosaur"&&this.Data.collisionY<=0){
                    this.changeActionDir("jump");
                    this.Data.state_pos="air";
                    this.Data.speed.y = 300;//y轴速度等于跳跃速度   
                }else{
                    if(this.Data.state_pos=="water"&&this.Data.state.indexOf("lie")==-1){
						
                    }else if(this.Data.isJump==true&&this.Data.state.indexOf("lie")==-1){//如果当前不处于跳跃状态，就跳
                    	if(this.Data.state.indexOf("Stegosaurus_attack")==-1){
                    		this.changeActionDir("jump");
                    	}
                        this.Data.speed.y = this.Data.jumpSpeedy;//y轴速度等于跳跃速度    
                    }
                }
            }
            if(this.Data.key_down==true){
            	if(this.Data.state.indexOf("lie")==-1&&this.Data.state.indexOf("swim")==-1&&this.Data.state.indexOf("attack")==-1
                &&this.Data.state.indexOf("jump")==-1&&this.Data.state_character=="Lead"
                &&this.Data.state.indexOf("climb")==-1
                ){
                    this.changeBoxCollider("Lead_lie");
                    this.changeActionDir("lie");  
                }else if(this.Data.state_pos=="water"&&this.Data.state_character=="Seadragon"&&this.Data.speed.y>0){
                    this.Data.speed.y/=2;
                }
            }
            
            
        }
    },
    
    onKeyReleased: function (keyCode, event){//方向松开了变回0
        if(this.Data.state.indexOf("fall")!=-1){
            switch(keyCode){
                case KEY.accKey:
                    this.Data.key_acc=false;
                     
                    break;
                case KEY.leftKey:
                    this.Data.key_left=false;
                     
                    break;
                case KEY.rightKey:
                    this.Data.key_right=false;
                     
                    break;
                case KEY.jumpKey:
                    this.Data.key_jump=false;
                    if(this.Data.state_pos=="water"&&this.Data.state_character=="Seadragon"&&this.Data.speed.y>100){
                        this.Data.speed.y=100;
                    }else if(this.Data.state_pos=="water"&&this.Data.state_character=="Lead"&&this.Data.speed.y>150){
                        this.Data.speed.y=150;
                    }
                    break;
                case KEY.downKey:
                    this.Data.key_down=false;
                    break;
                case KEY.upKey:
                    this.Data.key_up=false;
            }
        }else{
            switch(keyCode){
                case KEY.attackKey:
                    this.Data.key_attack=false;
                    break;
                case KEY.accKey:
                    this.Data.key_acc=false;
                    break;
                case KEY.leftKey:
                    this.Data.key_left=false;
                    break;
                case KEY.rightKey:
                    this.Data.key_right=false;
                    break;
                case KEY.jumpKey:
                    this.Data.key_jump=false;
                    if(this.Data.state_pos=="water"&&this.Data.state_character=="Seadragon"&&this.Data.speed.y>100){
                        this.Data.speed.y=100;
                    }else if(this.Data.state_pos=="water"&&this.Data.state_character=="Lead"&&this.Data.speed.y>150){
                        this.Data.speed.y=150;
                    }
                    break;
                case KEY.downKey:
                    this.Data.key_down=false;
                    break;
                case KEY.upKey:
                    this.Data.key_up=false;
                    break;
            }
            if(this.Data.key_attack==false){
                
            }
            if(this.Data.key_acc==false){
                 
            }
            if(this.Data.key_left==false){
                 
            }
            if(this.Data.key_right==false){
                 
            }
            if(this.Data.key_jump==false){
                if(this.Data.state.indexOf("jump")!=-1){
                    if(this.Data.speed.y>0&&this.Data.speed.y>this.Data.jumpSpeedy/2){//处理小跳。
                        this.Data.speed.y=this.Data.speed.y-200;
                    }
                    if(this.Data.collisionY !== -1){
                        this.changeActionDir("jump");
                    } 
                }else if(this.Data.state.indexOf("swim")!=-1&&this.Data.state_character=="Lead"){
                    
                }
            }
            if(this.Data.key_down==false){
            	if(this.Data.state.indexOf("climb")!=-1){
            		this.Data.speed.y=0;;
            	}else if(this.Data.state.indexOf("lie")!=-1&&ALL.isStand){//松开并且可以站起来
                    this.changeActionDir("walk");
                }
            }
            if(this.Data.key_up==false){
            	if(this.Data.state.indexOf("climb")!=-1){
            		this.Data.speed.y=0;
            	}
				
            	
            }
            
        }
        
    },
    
    onCollisionEnter: function (other, self){
    	this.nowColl=other.node;
        if(other.node.name.indexOf("Arms")!=-1){
            // cc.log(other.node.name);
        }else if(other.node.name=="Stone1"){
            if(this.Data.state.indexOf("Stegosaurus_attack")==-1&&this.Data.state_character!="Lead"){//不是人物状态，也不是剑龙攻击状态
                this.dragonDestroy();
            }else if(this.Data.state_character=="Lead"){
            	this.Data.speed.y=400;
	            this.Data.isJump=false;//不加这句无限跳
	            this.changeActionDir("fall");
	            this.Data.speed.x=300*ALL.LeadFaceDir;
	            
            }
        }else if(other.node.name.indexOf("Enemy")!=-1){
        	//cc.log(this.Data.state);
            if(this.Data.state_effecf=="null"&&this.Data.state.indexOf("Stegosaurus_attack")==-1){
                var otherAabb = other.world.aabb;
                var otherPreAabb = other.world.preAabb.clone();
                var selfAabb = self.world.aabb;
                var selfPreAabb = self.world.preAabb.clone();
                selfPreAabb.x = selfAabb.x;
                otherPreAabb.x = otherAabb.x;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.Data.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)){
                        //this.node.x+=otherPreAabb.xMax-selfAabb.xMin+1;
                       // this.Data.collisionX = -1;
                        this.CollEnemy("external_right");
                    }else if (this.Data.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动，碰到物体左边
                        //this.node.x-=selfAabb.xMax-otherPreAabb.xMin+1;
                        //this.Data.collisionX = 1;
                        this.CollEnemy("external_left");
                    }
                   // other.touchingX = true;
                }else{

                    selfPreAabb.y = selfAabb.y;
                    otherPreAabb.y = otherAabb.y;
                    if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                        if (this.Data.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
                            //this.node.y+=otherPreAabb.yMax-selfAabb.yMin;
                            this.changeActionDir(this.Data.speed.x==0?"walk":"run");
                           // this.Data.collisionY = -1;
                            this.CollEnemy("external_up");
                        }
                        else if (this.Data.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                            //this.node.y-=selfAabb.yMax -otherPreAabb.yMin+1;
                            this.changeActionDir("jump");
                            //this.Data.collisionY = 1;
                            this.CollEnemy("external_down");
                        }
                        //other.touchingY = true;
                    }
                }    
            }else if(this.Data.state.indexOf("Stegosaurus_attack")!=-1){

            }
        }else if(other.node.name.indexOf("Ladder")!=-1){
        	if(this.Data.state_character=="Lead"&&(this.Data.key_down==true||this.Data.key_up==true)){
        		this.Data.state="Lead_climb";
        		
        	}

        }else if(other.node.name.indexOf("Object")!=-1){//碰到物体
        	var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();


        	if(other.points!=null){
				cc.log("多边形");

        		var dot=other.world.points.slice(0,other.world.points.length);
        		dot[dot.length]=dot[0];
				var localDot=other.points.slice(0,other.points.length);
        		localDot[localDot.length]=localDot[0];
        		for(var i=0;i<dot.length-1;i++){
					cc.log(cc.Intersection.lineRect(dot[i],dot[i+1],selfAabb));
        			if(cc.Intersection.lineRect(dot[i],dot[i+1],selfAabb)){
						if(this.Data.speed.y<0&&dot[i].y!=dot[i+1].y){
		
							var l=Math.sqrt((dot[i].x-dot[i+1].x)*(dot[i].x-dot[i+1].x)+(dot[i].y-dot[i+1].y)*(dot[i].y-dot[i+1].y));
							var minDot=(dot[i].y>dot[i+1].y?localDot[i+1]:localDot[i]);
							var myLen=Math.sqrt((minDot.x+other.node.x-this.node.x)*(minDot.x+other.node.x-this.node.x)
										+(minDot.y+other.node.y-this.node.y)*(minDot.y+other.node.y-this.node.y));
							this.Data.slope.cosα=Math.abs(dot[i].x-dot[i+1].x)/l;
							this.Data.slope.sinα=Math.abs(dot[i].y-dot[i+1].y)/l;
							this.Data.slope.dir=(dot[i].y-dot[i+1].y==0?0:(Math.abs(dot[i].y-dot[i+1].y)/(dot[i].y-dot[i+1].y)));
							this.moveCamera(0,this.node.y-(minDot.y+other.node.y+myLen*this.Data.slope.sinα+30));
							this.node.y=minDot.y+other.node.y+myLen*this.Data.slope.sinα+30;
							
							//this.Data.gravity=this.Data.gravity-this.Data.gravity*cosα*cosα+this.Data.drag*cosα*sinα;
							//this.Data.nowAcc;
							this.Data.speed.y = -this.Data.speed.x*this.Data.slope.dir*(this.Data.slope.sinα/this.Data.slope.cosα);
								this.changeActionDir(this.Data.speed.x==0?"walk":"run");
								if(this.Data.state_character=="Pterosaur"){
									this.node.y+=25;
								}
								this.Data.isJump=true;
							this.Data.collisionY=-1;
							
						}else if(this.Data.speed.y>0){
							this.Data.speed.y=0;
						}
						other.touchingY=true;
        			}
        		}
        	}else{
					//cc.log(other.world.points);
		  
				//var devy=this.Data.node.y-(selfAabb.yMin-this.Data.node.parent.parent.y+this.Data.cameraMove.y);
				selfPreAabb.x = selfAabb.x;
				otherPreAabb.x = otherAabb.x;
				if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
					if (this.Data.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)){//向左
						this.node.x+=otherPreAabb.xMax-selfAabb.xMin+1;
						//this.moveCamera(0,otherPreAabb.xMax-selfAabb.xMin+1,0);
						this.Data.collisionX = -1;
					}
					else if (this.Data.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
						this.node.x-=selfAabb.xMax-otherPreAabb.xMin+1;
						//this.moveCamera(0,selfAabb.xMax-otherPreAabb.xMin+1,0);
						this.Data.collisionX = 1;
					}
					this.Data.speed.x = 0;

					other.touchingX = true;
				}else{
					selfPreAabb.y = selfAabb.y;
					otherPreAabb.y = otherAabb.y;
					if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
						if (this.Data.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
							//this.Data.node.y = otherPreAabb.yMax-this.Data.node.parent.parent.y
							//+this.Data.cameraMove.y+devy;
							this.node.y+=otherPreAabb.yMax-selfAabb.yMin;
							this.moveCamera(0,otherPreAabb.yMax-selfAabb.yMin);
							this.Data.speed.y = 0;
							
							this.changeActionDir(this.Data.speed.x==0?"walk":"run");
							if(this.Data.state_character=="Pterosaur"){
								this.node.y+=25;
							}
							this.Data.isJump=true;
							this.Data.collisionY = -1;
						}else if (this.Data.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
							this.node.y-=selfAabb.yMax -otherPreAabb.yMin;
							//this.moveCamera(0,0,selfAabb.yMax -otherPreAabb.yMin+1);
							this.Data.speed.y = 0;
							if(this.Data.state_pos=="air"){
								this.changeActionDir("jump");
							}else if(this.Data.state_pos=="water"){
								this.changeActionDir("swim");
							}
			
							this.Data.collisionY = 1;
						}
						other.touchingY = true;
					}
				}
			}

            if(other.node.name.indexOf("lava")!=-1&&this.Data.state_character!="Fierydragon"&&this.Data.state_effecf=="null"){
            	if(this.Data.state_character!="Lead"){
            		this.dragonDestroy();
            	}
            	this.CollEnemy("external_down");
            }else if(other.node.name.indexOf("lava")!=-1){

            }

        }else if(other.node.name.indexOf("MyDragon")!=-1){
        	this.dragonGet(other.node.name.slice(9,other.node.name.length));
        }else if(other.node.name.indexOf("water")!=-1){
            if(this.Data.state_character!="Lead"&&this.Data.state_character!="Seadragon"){
                this.dragonDestroy();
            }
            this.Data.state_pos="water";
            this.changeActionDir("swim");
        }else if(other.node.name.indexOf("fruit")!=-1){//碰到的水果
            this.addEffect("note");
        }
       
    },

    onCollisionStay: function (other,self){
        if(other.node.name.indexOf("Object")!=-1){

        	/*var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            //var devy=this.Data.node.y-(selfAabb.yMin-this.Data.node.parent.parent.y+this.Data.cameraMove.y);
            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                if (this.Data.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)){//向左
                    this.node.x+=otherPreAabb.xMax-selfAabb.xMin+1;
                }
                else if (this.Data.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {//向右移动
                    this.node.x-=selfAabb.xMax-otherPreAabb.xMin+1;
                }
            }else{
                selfPreAabb.y = selfAabb.y;
                otherPreAabb.y = otherAabb.y;
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)){
                    if (this.Data.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)){//从上向下掉
                        //this.Data.node.y = otherPreAabb.yMax-this.Data.node.parent.parent.y
                        //+this.Data.cameraMove.y+devy;
                        this.node.y+=otherPreAabb.yMax-selfAabb.yMin-0.1;
                       
                    }else if (this.Data.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)){
                        this.node.y-=selfAabb.yMax -otherPreAabb.yMin+1;
                        
                    }
                    
                }
            }*/

           if(other.node.name.indexOf("lava")!=-1&&this.Data.state_character!="Fierydragon"&&this.Data.state_effecf=="null"){
            	if(this.Data.state_character!="Lead"){
            		this.dragonDestroy();
            	}
            	this.CollEnemy("external_down");
            }else if(other.node.name.indexOf("lava")!=-1){

            }
        }else if(other.node.name.indexOf("Ladder")!=-1){
        	if(this.Data.state_character=="Lead"&&(this.Data.key_down==true||this.Data.key_up==true)){
        		this.Data.state="Lead_climb";
        		
        	}

        }else if(other.node.name=="Stone1"){
           
        }else if(other.node.name.indexOf("Enemy")!=-1){
            if(this.Data.state_effecf=="null"&&this.Data.state.indexOf("Stegosaurus_attack")==-1){
                this.CollEnemy("inside");
            }else{
                //this.Data.CollEnemy();
            }
            
        }else if(other.node.name.indexOf("water")!=-1){
            
        }
        
    },

    onCollisionExit: function (other, self){//碰撞出口，因为碰完了要改变速度和状态

         
        if (other.touchingX){
            if(this.Data.state.indexOf("fall")!=-1){

            }else if(other.node.name.indexOf("Object")!=-1){

            }else if(other.node.name.indexOf("Enemy")!=-1){
                
            }
            this.Data.collisionX = 0;
            other.touchingX = false;
        }
        if(other.touchingY){
            if(this.Data.state.indexOf("fall")!=-1){

            }else if(other.node.name.indexOf("Object")!=-1){
                if(this.Data.state_pos=="air"){
                	if(this.Data.state.indexOf("Stegosaurus_attack")==-1){
						this.Data.collisionY=0;
						this.Data.slope.sinα=0;
						this.Data.slope.cosα=1;
						this.Data.slope.dir=0;
                		this.changeActionDir("jump");
                	}
                }else if(this.Data.state_pos=="water"){
                    if(this.Data.collisionY>=0){
                        this.changeActionDir("swim");
                    }else{
                        this.changeActionDir("swim");
                    }
                }
            }else if(other.node.name.indexOf("Enemy")!=-1){
                if(this.Data.state_pos=="air"){
                    this.changeActionDir("jump");
                }else if(this.Data.state_pos=="water"){
                    this.changeActionDir("swim");
                }
            }
            other.touchingY = false;
            this.Data.collisionY = 0;
        }
        if(other.node.name.indexOf("water")!=-1){
            this.Data.state_pos="air";
            if(this.Data.key_jump==true){
                this.Data.speed.y=500;
            }
            this.returnState();
        }
        if(other.node.name.indexOf("Ladder")!=-1){
            if(this.Data.state.indexOf("climb")!=-1){
                this.changeActionDir("jump");
            }
        }
    },


    //////////////////////////////最后是自定义的函数---------------------------------
	getselfAcc:function(){
		
		if(this.Data.state.indexOf("lie")!=-1){
			this.Data.nowSelfAcc.x=this.Data.accKindX["lie"];
		}else if(this.Data.state.indexOf("climb")!=-1){
			this.Data.nowSelfAcc.x=this.Data.accKindX["climb"];
		}else{
			this.Data.nowSelfAcc.x=this.Data.accKindX
			[this.Data.key_acc?"run":"walk"][this.Data.state_pos][this.Data.state_character];
		}
		if(this.Data.key_left&&!this.Data.key_right){
			this.Data.nowSelfAcc.x=-this.Data.nowSelfAcc.x;
		}else if(!this.Data.key_left&&this.Data.key_right){
			this.Data.nowSelfAcc.x=this.Data.nowSelfAcc.x;
		}if((!this.Data.key_left&&!this.Data.key_right)||(this.Data.key_left&&this.Data.key_right)){
			this.Data.nowSelfAcc.x=this.Data.accKindX.Static;
		}
		if(this.Data.state.indexOf("climb")!=-1){
			this.Data.nowSelfAcc.y=this.Data.accKindY.climb;
			if(!this.Data.key_up&&this.Data.key_down){
				this.Data.nowSelfAcc.y=this.Data.accKindY.climb-400;
			}if(!this.Data.key_down&&this.Data.key_up){
				this.Data.nowSelfAcc.y=this.Data.accKindY.climb+400;
			}
		}else{
			if(this.Data.key_jump){
				this.Data.nowSelfAcc.y=this.Data.accKindY[this.Data.state_pos][this.Data.state_character];
			}else{
				this.Data.nowSelfAcc.y=this.Data.accKindY.Static;
			}
		}
		
		
	},
	
    getNormalForce:function(){
		
		if(this.Data.collisionY==0){
			this.Data.normalForceAcc.x=0;
		}else{
			this.Data.normalForceAcc.x=-this.Data.gravity*this.Data.slope.cosα
			-this.Data.buoyancyAcc[this.Data.state_pos]*this.Data.slope.cosα;
			if(this.Data.normalForceAcc.x<0){
				this.Data.normalForceAcc.x=0;
			}
			
		}
	},
	
	calSpeedY:function(dt){
		this.Data.nowMergeAcc.y=this.getMergeAccY();
		//cc.log(this.Data.nowMergeAcc.y);
		if((this.Data.speed.y<0&&this.Data.speed.y +this.Data.nowMergeAcc.y* dt>0)
			||(this.Data.speed.y>0&&this.Data.speed.y +this.Data.nowMergeAcc.y* dt<0)){
			this.Data.speed.y=0;
		}else{
			this.Data.speed.y +=this.Data.nowMergeAcc.y* dt
		}
		this.Data.maxSpeed.y=this.getMaxSpeedY();
		
		if(Math.abs(this.Data.speed.y) > this.Data.maxSpeed.y){
            this.Data.speed.y = this.Data.speed.y > 0 ? this.Data.maxSpeed.y : -this.Data.maxSpeed.y;
        }
	},
	
	getMaxSpeedY:function(){
		if(this.Data.slope.dir!=0&&this.Data.slope.cosα!=0&&this.Data.state.indexOf("jump")==-1){
			return (this.Data.maxSpeed.x*(this.Data.slope.sinα/this.Data.slope.cosα));
		}else{
			if(this.Data.state.indexOf("climb")!=-1){
				return this.Data.maxSpeedYKind["climb"];
			}else{
				return this.Data.maxSpeedYKind[this.Data.state_pos][this.Data.state_character];
			}
		}
	},
	
	getMergeAccY:function(){
		this.Data.nowResistanceAcc.y=this.Data.normalForceAcc.x*this.Data.slope.cosα+this.Data.buoyancyAcc[this.Data.state_pos]
		+this.Data.nowSelfAcc.y;
		if(this.Data.speed.y>0){
			this.Data.nowResistanceAcc.y-=this.Data.resistanceAccXKind.drag.Dynamic*this.Data.slope.sinα
		}else if(this.Data.speed.y<0){
			this.Data.nowResistanceAcc.y+=this.Data.resistanceAccXKind.drag.Dynamic*this.Data.slope.sinα
		}
		return (this.Data.gravity+this.Data.nowResistanceAcc.y
		-this.Data.nowSelfAcc.x*this.Data.slope.sinα*this.Data.slope.dir);
	},
	
	calSpeedX:function(dt){
		////cc.log(this.Data.nowMergeAcc.x);
		this.Data.nowMergeAcc.x=this.getMergeAccX();
		//cc.log(this.Data.nowMergeAcc.x);
		if((this.Data.speed.x<0&&this.Data.speed.x +this.Data.nowMergeAcc.x* dt>0)
			||(this.Data.speed.x>0&&this.Data.speed.x +this.Data.nowMergeAcc.x* dt<0)){
			this.Data.speed.x=0;
		}else{
			this.Data.speed.x +=this.Data.nowMergeAcc.x* dt
		}
		this.Data.maxSpeed.x=this.getMaxSpeedX();
		
		if (Math.abs(this.Data.speed.x) > this.Data.maxSpeed.x) {
		
			this.Data.speed.x = this.Data.speed.x > 0 ? this.Data.maxSpeed.x : -this.Data.maxSpeed.x;
		}
	},
	
	getMaxSpeedX:function(){
		if(this.Data.state.indexOf("lie")!=-1){
			return this.Data.maxSpeedXKind["lie"];
		}else if(this.Data.state.indexOf("climb")!=-1){
			return this.Data.maxSpeedXKind["climb"];
		}else{
			return this.Data.maxSpeedXKind[this.Data.key_acc?"run":"walk"][this.Data.state_pos][this.Data.state_character];
		}
	},
	
	getMergeAccX:function(){

		//计算摩擦力
		this.Data.resistanceAccXKind.drag.Dynamic=this.Data.resistanceAccXKind.drag.u*this.Data.normalForceAcc.x;
		
		if(this.Data.speed.x>0&&this.Data.collisionY==-1){
			this.Data.nowResistanceAcc.x=-this.Data.resistanceAccXKind.drag.Dynamic*this.Data.slope.cosα;
		}else if(this.Data.speed.x<0){
			this.Data.nowResistanceAcc.x=this.Data.resistanceAccXKind.drag.Dynamic*this.Data.slope.cosα;
		}else{
			this.Data.nowResistanceAcc.x=this.Data.resistanceAccXKind.drag.Static;
		}
		
		//计算空气和水阻力，特别的:在地上跑不计算空气阻力
		if(this.Data.state_pos=="water"||this.Data.collisionY!=-1){
			if(this.Data.speed.x>0){
				this.Data.nowResistanceAcc.x=-this.Data.resistanceAccXKind[this.Data.state_pos].Dynamic
				-this.Data.resistanceAccXKind.drag.Dynamic;
			}else if(this.Data.speed.x<0){
				this.Data.nowResistanceAcc.x=this.Data.resistanceAccXKind[this.Data.state_pos].Dynamic
				+this.Data.resistanceAccXKind.drag.Dynamic;
			}else{
				this.Data.nowResistanceAcc.x=this.Data.resistanceAccXKind
				[this.Data.state_pos].Static;
			}	
		}
		return (this.Data.nowResistanceAcc.x+this.Data.nowSelfAcc.x*this.Data.slope.cosα
		+this.Data.normalForceAcc.x*this.Data.slope.sinα*this.Data.slope.dir);
	},
	
	calLen:function(dt){
		this.Data.nowlen.x=this.Data.speed.x*dt;
        this.Data.nowlen.y=this.Data.speed.y*dt;
        this.node.x += this.Data.nowlen.x;
        this.node.y += this.Data.nowlen.y;
	},
	

    moveCamera:function(lenX,lenY){//移动镜头

        if(Math.abs(this.node.x)<this.map.width/2-380&&
            this.node.x-this.Data.cameraMove.x>100&&this.Data.speed.x>0){
            this.Data.cameraMove.x+=lenX;
            this.node.parent.x-=lenX;
        }else if(Math.abs(this.node.x)<this.map.width/2-380&&
            this.node.x-this.Data.cameraMove.x<-100&&this.Data.speed.x<0){
            this.Data.cameraMove.x+=lenX;
            this.node.parent.x-=lenX;
        }
        if(Math.abs(this.node.y)<this.map.height/2-170&&
            this.node.y-this.Data.cameraMove.y>150&&this.Data.speed.y>0){
            this.Data.cameraMove.y+=lenY;
            this.node.parent.y-=lenY;
        }else if(Math.abs(this.node.y)<this.map.height/2-170&&
            this.node.y-this.Data.cameraMove.y<-150&&this.Data.speed.y<0){
            this.Data.cameraMove.y+=lenY;
            this.node.parent.y-=lenY;
        }
    },

    AdjustLlens:function(){
            this.Data.cameraMove.x=this.node.x-this.node.parent.x;
            if(Math.abs(this.Data.cameraMove.x)>this.map.width/2-480){
            	this.Data.cameraMove.x=(this.Data.cameraMove.x>0?1:-1)*(this.map.width/2-480);
            }
            this.node.parent.x-=this.Data.cameraMove.x;

        
            this.Data.cameraMove.y=this.node.y-this.node.parent.y;
            if(Math.abs(this.Data.cameraMove.y)>this.map.height/2-320){
            	this.Data.cameraMove.y=(this.Data.cameraMove.y>0?1:-1)*(this.map.height/2-320);
            }
            this.node.parent.y-=this.Data.cameraMove.y;
        
    },

    newArm:function(){//用来加载一个新武器
    	this.Data.isAttack=false;
        if(this.Data.state.indexOf("Lead")!=-1||this.Data.state.indexOf("Seadragon")!=-1){
        	this.attackTime(3);
        	if(ALL.nowArms=="Axe"){
				if(ALL.nowArmsNum.x<ALL.nowArmsNum.y){

		            if(this.Data.state.indexOf("lie")!=-1){
		                this.changeActionDir("lieattack");
		                var count = 0;
		                this.callback = function () {
		                    if(count === 2) {// 
		                        this.changeActionDir("lie");
		                        this.unschedule(this.callback);
		                    }
		                    count++;
		                }
		                this.schedule(this.callback,0.10,2,0);
		            }else{
		            	
		                this.changeActionDir("attack");
		                var count = 0;
		                this.callback = function () {
		                    if(count == 2) {// 
		                        this.returnState();
		                        this.unschedule(this.callback);
		                    }
		                    count++;
		                }
		                this.schedule(this.callback,0.10,2,0);
		            }
		            ALL.nowArmsNum.x++;
		            
		            var newarm=cc.instantiate(this.Prearm_Axe);
		            var armX=this.node.x+12*ALL.LeadFaceDir;
		            var armY=this.node.y+30;
		            newarm.setPosition(armX,armY);
		            this.node.parent.addChild(newarm);
		        }
        	}else if(ALL.nowArms=="FireDarts"){
        		if(ALL.nowArmsNum.x<ALL.nowArmsNum.y){
        			if(this.Data.state.indexOf("lie")!=-1){
		                this.changeActionDir("lieattack");
		                var count = 0;
		                this.callback = function () {
		                    if(count === 2) {// 
		                        this.changeActionDir("lie");
		                        this.unschedule(this.callback);
		                    }
		                    count++;
		                }
		                this.schedule(this.callback,0.10,2,0);
		            }else{
		            	
		                this.changeActionDir("attack");
		                var count = 0;
		                this.callback = function () {
		                    if(count == 2) {// 
		                        this.returnState();
		                        this.unschedule(this.callback);
		                    }
		                    count++;
		                }
		                this.schedule(this.callback,0.10,2,0);
		            }

		            ALL.nowArmsNum.x++;
		            var newarm=cc.instantiate(this.Prearm_FireDarts);
		            var armX=this.node.x+12*ALL.LeadFaceDir;
		            var armY=this.node.y+30;
		            newarm.setPosition(armX,armY);
		            this.node.parent.addChild(newarm);
		        }
        	}
		       
        }else if(this.Data.state.indexOf("Fierydragon")!=-1){
        	this.attackTime(5);
            if(ALL.nowArmsNum.x<ALL.nowArmsNum.y){
                this.changeActionDir("attack");
                var count = 0;
                this.callback = function () {
                    if(count === 2) {// 
                        this.returnState();
                        this.unschedule(this.callback);
                    }
                    count++;
                }
                this.schedule(this.callback,0.10,2,0);
                ALL.nowArmsNum.x++;
                var newarm=cc.instantiate(this.Prearm_DragonFire);
                var armX=this.node.x+12*ALL.LeadFaceDir;
                var armY=this.node.y;
                newarm.setPosition(armX,armY);
                this.node.parent.addChild(newarm);
            }
        }else if(this.Data.state.indexOf("Brontosaurus")!=-1){
        	this.attackTime(1);
            if(ALL.nowArmsNum.x<ALL.nowArmsNum.y){
                this.changeActionDir("attack");
                var count = 0;
                this.callback = function () {
                    if(count === 2) {// 
                        this.returnState();
                        this.unschedule(this.callback);
                    }
                    count++;
                }
                this.schedule(this.callback,0.10,2,0);
                ALL.nowArmsNum.x++;
                var newarm=cc.instantiate(this.Prearm_DragonBattery);
                this.node.parent.addChild(newarm);
                var armX=this.node.x+12*ALL.LeadFaceDir;
                var armY=this.node.y-30;
                newarm.setPosition(armX,armY);
            }
        }else if(this.Data.state.indexOf("Stegosaurus")!=-1){
        	this.attackTime(12);
            this.changeActionDir("attack");
            var count = 0;
            this.callback = function () {
                if(count === 5) {// 
                    this.returnState();
                    this.unschedule(this.callback);
                }
                count++;
            }
            this.schedule(this.callback,0.1,10,0);
        }else if(this.Data.state.indexOf("Pterosaur")!=-1){
        	this.attackTime(1);
            if(ALL.nowArmsNum.x<ALL.nowArmsNum.y){
                this.changeActionDir("attack");
                var count = 0;
                this.callback = function () {
                    if(count === 2) {// 
                        this.returnState();
                        this.unschedule(this.callback);
                    }
                    count++;
                }
                this.schedule(this.callback,0.10,2,0);
                ALL.nowArmsNum.x++;
                var newarm=cc.instantiate(this.Prearm_DragonSto);
                var armX=this.node.x+5*ALL.LeadFaceDir;
                var armY=this.node.y-20;
                newarm.setPosition(armX,armY);
                this.node.parent.addChild(newarm);
            }
        }
    },

    attackTime:function(t){
			var count = 0;
            this.callback1 = function () {
                if(count === t) {// 
                    this.Data.isAttack=true;
                    this.unschedule(this.callback1);
                }
                count++;
            }
            this.schedule(this.callback1,0.05,t,0);
    },

    changeArms:function(){
    	if(this.Data.state_character=="Lead"||this.Data.state_character=="Seadragon"){
    		if(ALL.nowArms=="Axe"){
    			ALL.nowArmsNum.y=2;
    		}else{

    		}
    	}else if(this.Data.state_character=="Fierydragon"){
    		ALL.nowArmsNum.y=2;
    	}else if(this.Data.state_character==""){
    		ALL.nowArmsNum.y=2;
    	}else if(this.Data.state_character=="Brontosaurus"){
    		ALL.nowArmsNum.y=3;
    	}else if(this.Data.state_character=="Pterosaur"){
    		ALL.nowArmsNum.y=2;
    	}
    },

    CollEnemy:function(position){//碰到敌人，要反弹,position代表人物在物体的位置,掉血在怪物脚本里
        ////////////////////////
        //cc.log(ALL.Lifes.getComponent("Lifes"));
        
        if(this.Data.state.indexOf("Stegosaurus_attack")!=-1){
            
        }else if(this.Data.state_character!="Lead"){
            this.dragonDestroy();

        }else if(this.Data.state_character=="Lead"){

        }
        this.changeColor("twinkle");
		
        if(position=="external_right"){//人物向右移动
            this.Data.speed.x=200;
        }else if(position=="external_left"){//人物向左移动
            this.Data.speed.x=-200;
        }else if(position=="external_up"){//向上
            //this.Data.speed.y=0;
        }else if(position=="external_down"){//向下
            //this.Data.speed.y=0;
        }else if(position=="inside"){//1表示如果在内部，朝着人物脸方向反弹
            if(this.Data.speed.x>0){//如果脸朝右，向右弹   
                this.Data.speed.x=-200;
            }else if(this.Data.speed.x<0){//如果脸朝左，向左弹 
                this.Data.speed.x=200;
            }
        }
    },

    changeColor:function(effect){
        this.Data.state_effecf=effect;
        if(effect=="twinkle"){//变成闪烁状态
            var count = 0;
            this.callback_color = function(){
                if(count === 25) {// 在第50次执行回调时取消这个计时器，变回本来颜色
                    this.node.opacity=255;
                    this.Data.state_effecf="null";
                    this.unschedule(this.callback_color);
                }else if(count%2==0){
                    this.node.opacity=0;
                    count++;
                }else{
                    this.node.opacity=255;
                    count++;
                }
            }
            this.schedule(this.callback_color,0.1,25,0);
        }else {

        }
    },

    changeActionDir:function(leadaction){//改变状态和方向
        if(typeof (leadaction)=="number"){//如果传递了脸方向，则换方向
            if(leadaction==1&&this.Data.state.indexOf("left")!=-1){//应该向右，但状态却是左应该调整;
                this.Data.state=this.Data.state.replace("left","right");
            }else if(leadaction==-1&&this.Data.state.indexOf("right")!=-1){//应该向左，但状态却是右应该调整;
                this.Data.state=this.Data.state.replace("right","left");
            }
        }else if(ALL.LeadFaceDir==1){
            this.Data.state=this.Data.state_character+"_"+leadaction+"_right";
        }else if(ALL.LeadFaceDir==-1){
            this.Data.state=this.Data.state_character+"_"+leadaction+"_left";
        }
        
    },

    changeAction:function(){
        if(this.Data.state.indexOf("Lead")!=-1){
            if(this.Data.state.indexOf("lie")!=-1){
                if(this.Data.speed.x==0&&this.Data.state.indexOf("lierun")!=-1){
                    this.Data.state=this.Data.state.replace("lierun","lie");
                }else if(this.Data.speed.x!=0&&this.Data.state.indexOf("lierun")==-1){//在地面上有速度，状是停(walk代表停)。
                    this.Data.state=this.Data.state.replace("lie","lierun");
                }
                if(this.node.getComponent(cc.BoxCollider)._size.height!=this.Data.leadCollSize.y/2){
                	this.changeBoxCollider("lie");
                }
            }else if(this.Data.state.indexOf("climb")!=-1){

            }else{
                if(Math.abs(this.Data.speed.x)<20&&this.Data.state.indexOf("run")!=-1){//在地面上没速度，状态是跑
                    this.Data.state=this.Data.state.replace("run","walk");
                }else if(Math.abs(this.Data.speed.x)>20&&this.Data.state.indexOf("walk")!=-1){//在地面上有速度，状态是停(walk代表停)。
                    this.Data.state=this.Data.state.replace("walk","run");
                }
                if(this.node.getComponent(cc.BoxCollider)._size.height!=this.Data.leadCollSize.y){
                	this.changeBoxCollider("Lead");
                }
            }
        }else if(this.Data.state.indexOf("Fierydragon")!=-1){
            if(this.Data.speed.x==0&&this.Data.state.indexOf("run")!=-1){//在地面上没速度，状态是跑
                this.Data.state=this.Data.state.replace("run","walk");
            }else if(this.Data.speed.x!=0&&this.Data.state.indexOf("walk")!=-1){//在地面上有速度，状态是停(walk代表停)。
                this.Data.state=this.Data.state.replace("walk","run");
            }
        }else if(this.Data.state.indexOf("Brontosaurus")!=-1){
            if(this.Data.speed.x==0&&this.Data.state.indexOf("run")!=-1){//在地面上没速度，状态是跑
                this.Data.state=this.Data.state.replace("run","walk");
            }else if(this.Data.speed.x!=0&&this.Data.state.indexOf("walk")!=-1){//在地面上有速度，状态是停(walk代表停)。
                this.Data.state=this.Data.state.replace("walk","run");
            }
        }else if(this.Data.state.indexOf("Stegosaurus")!=-1){
            if(this.Data.speed.x==0&&this.Data.state.indexOf("run")!=-1){//在地面上没速度，状态是跑
                this.Data.state=this.Data.state.replace("run","walk");
            }else if(this.Data.speed.x!=0&&this.Data.state.indexOf("walk")!=-1){//在地面上有速度，状态是停(walk代表停)。
                this.Data.state=this.Data.state.replace("walk","run");
            }
        }else if(this.Data.state.indexOf("Pterosaur")!=-1){
            if(this.Data.speed.x==0&&this.Data.state.indexOf("run")!=-1){//在地面上没速度，状态是跑
                this.Data.state=this.Data.state.replace("run","walk");
            }else if(this.Data.speed.x!=0&&this.Data.state.indexOf("walk")!=-1){//在地面上有速度，状态是停(walk代表停)。
                this.Data.state=this.Data.state.replace("walk","run");
            }
            if(this.Data.isJump==true){
                this.changeBoxCollider("MyDragon");
            }else{
                this.changeBoxCollider("fly");
                if(this.Data.speed.y<0&&this.Data.state_pos=="air"){
                    this.changeActionDir("taxi");
                }
            }

        }

        if(this.Data.state_pos=="air"){
            if(this.Data.collisionY<0||this.Data.state.indexOf("climb")!=-1){
                this.Data.isJump=true;
            }else{
                this.Data.isJump=false;
            }
        }else if(this.Data.state_pos=="water"){
            this.Data.isJump=true;
        }

        this.Data.Laststate=this.Data.state;
        if(this.Data.state!=this.Data.prestate){
            this.Data.prestate=this.Data.state;
            this.Data.player.play(this.Data.state);
        }
    },

    changeBoxCollider:function(kind){//kind表示要变到哪个碰撞体
        var selfCollider=this.node.getComponent(cc.BoxCollider);
        if(kind.indexOf("Lead")!=-1){
        	var child = [];
	        child = this.node.getChildren();
        	if(kind.indexOf("lie")!=-1){
     
	            this.node.y-=this.Data.leadCollSize.y/4;
	            child[0].getComponent(cc.BoxCollider)._offset.y+=this.Data.leadCollSize.y/4;

	            selfCollider._size.height=this.Data.leadCollSize.y/2;
	            selfCollider._size.width=80;
        	}else{
        		
	            if(this.Data.Laststate.indexOf("lie")!=-1){//如果是躺下要起来就要调整碰撞框位置和节点位置
	                child[0].getComponent(cc.BoxCollider)._offset.y-=this.Data.leadCollSize.y/4;
	                this.node.y+=this.Data.leadCollSize.y/4;
	            }else{//把碰撞框位置移到初始位置。
	                selfCollider._offset.y=0;
	                selfCollider._offset.x=0;
	            }
	            selfCollider._size.height=this.Data.leadCollSize.y;
	            selfCollider._size.width=this.Data.leadCollSize.x;
	            
        	}
         
        }else {
           	if(kind.indexOf("fly")!=-1){

	            selfCollider._size.height=50;
	            selfCollider._size.width=80;
	            selfCollider._offset.y=0;
	        }else{
		        if(this.Data.state_character=="Seadragon"){
	                selfCollider._size.height=70;
	                selfCollider._size.width=76;
	            }else{
	                selfCollider._size.height=80;
	                selfCollider._size.width=80;
	                selfCollider._offset.y=-10;
	            }
	        }
        }
    },

    returnState:function(){
        if(this.Data.state_pos=="air"){
            if(this.Data.speed.y!=0){
                this.changeActionDir("jump");
            }else if(this.Data.speed.x!=0&&this.Data.speed.y==0){
                this.changeActionDir("run");
            }else if(this.Data.speed.x==0&&this.Data.speed.y==0){
                this.changeActionDir("walk");
            }
        }else if(this.Data.state_pos=="water"){
            if(this.Data.collisionY>=0){
                this.changeActionDir("swim");
            }else if(this.Data.speed.x!=0&&this.Data.speed.y==0){
                this.changeActionDir("run");
            }else if(this.Data.speed.x==0&&this.Data.speed.y==0){
                this.changeActionDir("walk");
            }
            
        }
    },

    afterLie:function(){
        this.returnState();
    },

    getNowState:function(){//对于需要强制改变状态的情况
        if(this.Data.key_down==false&&this.Data.state.indexOf("lie")!=-1&&ALL.isStand){//没按下并且还趴着
            this.changeActionDir("walk");
            this.afterLie();
        }
        if(this.Data.Laststate.indexOf("lie")!=-1&&this.Data.state.indexOf("lie")==-1){//上个状态包含爬下，当前状态不包含爬下，则改变碰撞体
            this.changeBoxCollider("Lead");
            this.Data.key_down=false;
        }
    },

    addEffect:function(effect){
        ALL.Public.getComponent("Public").addEffect(this.node.x,this.node.y,this,effect);
    },

    dragonDestroy:function(){

    	this.Data.state_character="Lead";
        this.addEffect("blast");
        this.changeBoxCollider("Lead");
        this.changeArms();
        this.changeActionDir("jump");
    },

    dragonGet:function(dragon){

    	this.node.y+=15;
    	this.Data.state_character=dragon;
        this.changeActionDir("walk");
        this.changeBoxCollider("MyDragon");
        this.changeArms();

    },

    intoNextSence:function(){
    	
        ALL.Public.getComponent("Public").getIntoSence("Main1",0,0);	 	
        
    }
});

