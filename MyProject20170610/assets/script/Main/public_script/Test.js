/*
全局变量

*///////////////////
window.ALL = {
    AexArmsNum:cc.v2(0,2),//
    FierydragonArmNum: cc.v2(0,2),
    BrontosaurusArmNum: cc.v2(0,3),
    PterosaurArmNum: cc.v2(0,2),
    nowArmsNum:cc.v2(0,0),
    nowArms:"Axe",

    Prop:{
        Axe:true,
        FireDarts:false,
    },

    Lifes:{//血量
        default:null,
        type:cc.Node,
    }, 
    Times:{//时间
        default:null,
        type:cc.Node,
    }, 

    Public:{//时间
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

    Doors:{
    	next:cc.v2(0,0),
    	Volcano1:{
    		door1:cc.v2(-2290,-160),
    		door2:cc.v2(2250,-250),
    	},
    	Volcano2:{
    		door1:cc.v2(4770,-220),
    	},
    },
    NextSence:"",
    nowSence:"",
    lastSence:"",

    life:cc.v2(2,2),//血量y是最大值，x是当前值
    time:cc.v2(10,10),//血量y是最大值，x是当前值
    isStand:true,
    LeadFaceDir: 1,//脸的方向，1是右，-1是左

    INF:1000000000,
    EnemyScript:[],
};


window .REM= {//
    nowSence:"",

    life:cc.v2(2,2),//血量y是最大值，x是当前值
    time:cc.v2(10,10),//血量y是最大值，x是当前值
    LeadPos:cc.v2(0,0),
    nowArms:"Axe",

    Data:{//记录数据只用得到前几个
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
				climb:cc.v2(100,100),
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
	        
			normalForceAcc:0,
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
				
				lie:100,
				climb:100,
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
    },

    Prop:{
        Axe:true,
        FireDarts:false,
    },
    
};

window .readRem= {//
    nowSence:"",

    life:cc.v2(2,2),//血量y是最大值，x是当前值
    time:cc.v2(10,10),//血量y是最大值，x是当前值
    LeadPos:cc.v2(0,0),
    nowArms:"Axe",

    Data:{//记录数据只用得到前几个
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
				climb:cc.v2(100,100),
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
	        
			normalForceAcc:0,
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
				
				lie:100,
				climb:100,
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
    },

    Prop:{
        Axe:true,
        FireDarts:false,
    },
    
};

window .Read={
    userData1:"userData1:",
    userData4:"userData4:",
    userData3:"userData3:",
    userData2:"userData2:",
};

window .KEY={
    upKey:cc.KEY.w,
    downKey:cc.KEY.s,
    leftKey:cc.KEY.a,
    rightKey:cc.KEY.d,
    attackKey:cc.KEY.j,
    accKey:cc.KEY.l,
    jumpKey:cc.KEY.k,
};

/*
        prestate:"Lead_walk_right",//用于改变状态
        Laststate:"Lead_walk_right",//用于判断
        state_effecf:"null",
        state_pos:"air",
        state_character: "Lead",
        isJump:false,
        player:null,
        img:cc.SpriteFrame,
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(150,1000),
        maxSpeedrun: 250,
        maxSpeedwalk: 150,
        maxSpeedlie: 100,
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
        key_attack:false,
        key_acc:false,
        key_jump:false,

        nowlen:cc.v2(0,0),
        cameraMove: cc.v2(0,0),//镜头移动的距离
        life:cc.v2(2,2),//血量y是最大值，x是当前值
        leadCollSize:cc.v2(0,0),//人物站立碰撞体大小
 */