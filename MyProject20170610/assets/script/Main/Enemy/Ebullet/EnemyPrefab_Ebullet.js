cc.Class({
    extends: cc.Component,

    properties: {
        gravity:-1000,
        speed:cc.v2(0,0),
        acceleration:cc.v2(0,0),
        nowAcc:cc.v2(0,0),
        nowlen:cc.v2(0,0),
        damage:0,
        player:null,
        state:"",
        state_character:"",
        beginSpeed:cc.v2(0,0),
        playState:"",
        lastPlayState:"",
        Public:null,
        LeadScript:null,
        dirDegree:0,
        kind:0,
        dir:cc.v2(0,0),
    },

    // use this for initialization
    onLoad: function () {
        cc._initDebugSetting(cc.DebugMode.INFO);//打印 测试 用的
        this.player = this.node.getComponent(cc.Animation);
        var MyBox=this.node.getComponent(cc.BoxCollider);
        var MainPosX=this.node.x;
        var MainPosY=this.node.y;
        if(this.kind==1){
            this.beginSpeed=cc.v2(100,100);
            if(MainPosX-ALL.Lead.x==0){
                this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.x;
                this.speed.y=0;
            }else if(MainPosY-ALL.Lead.y==0){
                this.speed.x=0;
                this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.y;
            }else{
                var tanX=Math.abs(MainPosY-ALL.Lead.y)/Math.abs(MainPosX-ALL.Lead.x);
                if(tanX<=1){
                    this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.x;
                    this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.x*tanX;
                }else{
                    this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.y;
                    this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.y/tanX;
                }
            }
            this.playState="Enemy_Ebullet1";

            MyBox._size.height=25;
            MyBox._size.width=30;
            this.damage=1;
        }else if(this.kind==2){
            this.beginSpeed=cc.v2(120,120);
            if(MainPosX-ALL.Lead.x==0){
                this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.x;
                this.speed.y=0;
            }else if(MainPosY-ALL.Lead.y==0){
                this.speed.x=0;
                this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.y;
            }else{
                var tanX=Math.abs(MainPosY-ALL.Lead.y)/Math.abs(MainPosX-ALL.Lead.x);
                if(tanX<=1){
                    this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.x;
                    this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.x*tanX;
                }else{
                    this.speed.y=(MainPosY>ALL.Lead.y?-1:1)*this.beginSpeed.y;
                    this.speed.x=(MainPosX>ALL.Lead.x?-1:1)*this.beginSpeed.y/tanX;
                }
            }
            this.playState="Enemy_Ebullet2";

            MyBox._size.height=30;
            MyBox._size.width=30;
            this.damage=1;
        }else if(this.kind==3){
            this.beginSpeed=cc.v2(200,200);
            this.playState="Enemy_Ebullet3"+"_"+this.state;
            this.speed.x=(this.state=="left"?-1:1)*this.beginSpeed.x;

            MyBox._size.height=20;
            MyBox._size.width=70;
            this.damage=1;
        }else if(this.kind==4){
            this.beginSpeed=cc.v2(200,200);
            this.playState="Enemy_Ebullet4";
            this.speed.x=(this.state=="left"?-1:1)*this.beginSpeed.x;

            MyBox._size.height=25;
            MyBox._size.width=125;
            this.damage=2;
        }else if(this.kind==5){
            this.beginSpeed=cc.v2(300,300);
            this.playState="Enemy_Ebullet5"+"_"+this.state;
            this.speed.x=(this.state=="left"?-1:1)*this.beginSpeed.x;

            MyBox._size.height=20;
            MyBox._size.width=85;
            this.damage=1;
        }else if(this.kind==6){

            this.beginSpeed=cc.v2(300,100);
            this.playState="Enemy_Ebullet3"+"_"+this.state;
            this.speed.x=(this.state=="left"?-1:1)*this.beginSpeed.x;
            this.dir=cc.v2(0,(parseInt(3*Math.random())-1));
            this.speed.y=this.dir.y*this.beginSpeed.y;

            MyBox._size.height=20;
            MyBox._size.width=30;
            this.damage=1;
        }
        
        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },

    update: function (dt) {
        this.visDie();
        this.changeSpeed();
        this.calSpeed()
        this.changeAction();
        this.nowlen.x=this.speed.x*dt;
        this.nowlen.y=this.speed.y*dt;
        this.node.x += this.nowlen.x;
        this.node.y += this.nowlen.y

    },

    onCollisionEnter: function (other, self){
        if(other.node.name=="Lead"){
            if(ALL.Lead.getComponent("Lead_control").Data.state.indexOf("Stegosaurus_attack")!=-1){     
                

            }else if(ALL.Lead.getComponent("Lead_control").Data.state_character=="Lead"&&ALL.Lead.getComponent("Lead_control").Data.state_effecf=="null"){
                ALL.Lifes.getComponent("Lifes").changeLife(-this.damage,0);
            }else{

            }
        }else if(other.node.name.indexOf("Object")!=-1){
            //this.node.destroy();
        }else if(other.node.name.indexOf("Arms")!=-1){
            //this.Injured();
        }
    },



    
    calSpeed:function(){
        if(this.kind==1){
            
        }else if(this.kind==2){
            
        }else if(this.kind==3){
            
        }else if(this.kind==4){
            
        }else if(this.kind==5){
            
        }else if(this.kind==6){
            this.speed.y-=5*this.dir.y;
            if(Math.abs(this.speed.y)>=this.beginSpeed.y){
                this.dir.y=-this.dir.y;
            }
        }
    },
    
    changeSpeed:function(){
        if(this.kind==1){
            
        }else if(this.kind==2){
            
        }else if(this.kind==3){
            
        }else if(this.kind==4){
            
        }else if(this.kind==5){
            
        }
    },
    
    changeAction:function(){
        if(this.kind==1){
            
        }else if(this.kind==2){
            
        }else if(this.kind==3){
            
        }else if(this.kind==4){
            
        }else if(this.kind==5){
            
        }
        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },


    die:function(){
        /*var child=this.node.parent.getChildren();
        for(var i=0;i<child.length;i++){
            if(child[i].name.indexOf("Ebullent")==-1){
                child[i].getComponent("EnemyPublic").EbulletNum[this.kind]--;
            }
        }*/
        this.node.destroy(); 
    },

    visDie:function(){
        if(Math.abs(this.node.x-ALL.Lead.getComponent("Lead_control").Data.cameraMove.x)>960
            ||Math.abs(this.node.y-ALL.Lead.getComponent("Lead_control").Data.cameraMove.y)>640){
            this.die();
        }
    },

});
