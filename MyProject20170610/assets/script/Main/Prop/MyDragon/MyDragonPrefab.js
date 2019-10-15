cc.Class({
    extends: cc.Component,

    properties: {
        player:null,
        state:"",
        state_character:"",
        playState:"",
        lastPlayState:"",
        lastNode:null,
    },

    // use this for initialization
    onLoad: function () {
        this.player = this.node.getComponent(cc.Animation);
        this.state_character=this.node.name.slice(9,this.node.name.length);
        this.state=this.node.x>ALL.Lead.x?"left":"right";
        this.playState="My"+this.state_character;
        this.playState+="_"+this.state;

        this.lastPlayState=this.playState;
        this.player.play(this.playState);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.visChangeDir();
        this.visDie();
    },

    onDestroy: function (){
        this.lastNode.getComponent("MyDragon").isLoad=false;
    },




    onCollisionEnter: function (other, self){
        if(other.node.name=="Lead"){
            this.node.destroy();
        }
    },

    onCollisionStay: function (other, self){
        if(other.node.name=="Lead"){
            this.node.destroy();
        }
    },



    visChangeDir:function(){

        if(this.node.x>ALL.Lead.x&&this.playState.indexOf("right")!=-1){

            this.playState=this.playState.replace("right","left");
        }else if(this.node.x<ALL.Lead.x&&this.playState.indexOf("left")!=-1){
            this.playState=this.playState.replace("left","right");
        }

        if(this.playState!=this.lastPlayState){
            this.player.play(this.playState);
            this.lastPlayState=this.playState;
        }
    },


    visDie:function(){
        if(Math.abs(this.node.xx-ALL.Lead.getComponent("Lead_control").Data.cameraMove.x)>960
            ||Math.abs(this.node.y-ALL.Lead.getComponent("Lead_control").Data.cameraMove.y)>640
            ){
            
            this.node.destroy();
        }
        
    },
});
