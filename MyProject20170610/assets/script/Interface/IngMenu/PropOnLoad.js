cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        var child=[];
            child=this.node.getChildren();
        for(var i=0;i<child.length;i++){
            if(ALL.Prop[child[i].name]==false){
                child[i].destroy();
            }
        }
    },

    // update: function (dt) {

    // },
});
