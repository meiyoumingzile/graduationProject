var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnterGameCmd = (function () {
    function EnterGameCmd() {
    }
    EnterGameCmd.prototype.excute = function (data, name) {
        egret.log("enter EnterGameCmd");
        LocalRobotData.getRobotsInfo().then(function (arr) {
            var robotData = app.status.localRobotData = arr;
            robotData = robotData.concat(); //组合两个或多个数组
            if (Context.isFB) {
                var player = {
                    id: FBInstant.player.getID(),
                    name: FBInstant.player.getName(),
                    photo: FBInstant.player.getPhoto(),
                    me: true,
                };
                robotData.splice(Utils.randomInt(0, robotData.length), 0, player); //从xx开始，删除0个数据，插入数据player
            }
            app.ui.addPopup(new GameView);
            Game.inst.start();
        });
    };
    return EnterGameCmd;
}());
__reflect(EnterGameCmd.prototype, "EnterGameCmd", ["ICommand"]);
//# sourceMappingURL=EnterGameCmd.js.map