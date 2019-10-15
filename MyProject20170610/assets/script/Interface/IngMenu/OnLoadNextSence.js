cc.Class({
    extends: cc.Component,

    properties: {
        ingOnload:false,
        next:"",
        door:"",
        mainPos:cc.v2(0,0),
        Force:false,
    },

    // use this for initialization
    onLoad: function () {
        for(var i=this.node;i.name!="MainCanvas";i=i.parent){
            this.mainPos.x+=i.x;
            this.mainPos.y+=i.y;
        }
        if(this.node.name.indexOf("Force")!=-1){
            this.node.name=this.node.name.replace("Force","");
            this.Force=true;
        }
        //this.myDoor=this.node.name.slice(0,this.node.name.indexOf("_"));
        this.next=this.node.name.slice(this.node.name.indexOf("_")+1,this.node.name.length);
        this.door=this.next.slice(this.next.indexOf("_")+1,this.next.length);
        this.next=this.next.slice(0,this.next.indexOf("_"));  

    },

    
    // update: function (dt) {

    // },
    

    onCollisionEnter: function (other, self){
       
    },

    onCollisionStay: function (other, self){
        if(other.node.name=="Lead"){//碰到跳转场景
            if(this.Force==true&&this.ingOnload==false){
                ALL.Doors.next=ALL.Doors[this.next][this.door];
                ALL.Public.getComponent("Public").getIntoSence(this.next);
                this.ingOnload=true;
            }else if(ALL.Lead.getComponent("Lead_control").Data.key_up==true&&this.ingOnload==false){
                ALL.Doors.next=ALL.Doors[this.next][this.door];
                ALL.Public.getComponent("Public").getIntoSence(this.next);
                this.ingOnload=true;
            }   
        }
    },

});
