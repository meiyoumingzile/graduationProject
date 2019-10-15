cc.Class({
    extends: cc.Component,

    properties: {
        EbulletPrefab:{
            default:null,
            type:cc.Prefab,
        },
        life:cc.v2(1,1),
        state_effecf:"null",
        lastNodeScript:null,
    },

    // use this for initialization
    onLoad: function () {

    },

    
    update: function (dt) {
        this.visDie();
    },

    onDestroy: function (){
        this.lastNodeScript.isLoad=false;
    },





    changeLife:function(value){
        this.life.x+=value;
        this.changeColor();
    },

    visDie:function(){
        if(this.life.x<=0||Math.abs(this.node.x-ALL.Lead.getComponent("Lead_control").Data.cameraMove.x)>960
            ||Math.abs(this.node.y-ALL.Lead.getComponent("Lead_control").Data.cameraMove.y)>640
            ){
            
            this.node.destroy();
            ALL.Public.getComponent("Public").addEffect(this.node.x,this.node.y,this,"blast");
        }
		
    },

    changeColor:function(){
        this.state_effecf="twinkle";
        var count = 0;
        this.callback = function(){
            if(count === 10) {
                this.node.opacity=255;
                this.state_effecf="null";
                this.unschedule(this.callback);
            }else if(count%2==0){
                this.node.opacity=0;
                count++;
            }else{
                this.node.opacity=255;
                count++;
            }
        }
        this.schedule(this.callback,0.0500,50,0);
       
    },

    addEbullet(kind,X,Y,dir){
        var newEbullet=cc.instantiate(this.EbulletPrefab);
        newEbullet.getComponent("EnemyPrefab_Ebullet").kind=kind;
        newEbullet.name="_Enemy_Ebullent"+kind;
        if(dir!=null){

            newEbullet.getComponent("EnemyPrefab_Ebullet").state=dir;
        }
        newEbullet.setPosition(X,Y);
        ALL.MainCanvas.addChild(newEbullet);
    },
});
