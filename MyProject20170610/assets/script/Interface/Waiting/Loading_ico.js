cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    
    onLoad: function () {
		var count=0;
        cc.director.preloadScene(ALL.NextSence, function () {//加载下一个场景资源，加载完成就进入
            if(ALL.lastSence!=null){
                REM.LeadPos=ALL.Doors.next;
            }
            cc.director.loadScene(ALL.NextSence);
        });
        
    },

    
    // update: function (dt) {

    // },
});
