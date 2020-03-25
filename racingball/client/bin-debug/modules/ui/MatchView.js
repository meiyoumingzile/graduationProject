var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MatchView = (function (_super) {
    __extends(MatchView, _super);
    function MatchView() {
        var _this = _super.call(this) || this;
        _this.modalAlpha = .4;
        _this.currentAmount = 0;
        _this.totalAmount = 12;
        _this._done = false;
        return _this;
    }
    MatchView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        // app.ui.addPopup(new GameView);
        // LocalRobotData.getRobotsInfo().then(arr => {
        // 	app.status.localRobotData = arr;
        // 	Game.inst.start();
        // })
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
            _this.totalAmount = robotData.length;
            robotData.forEach(function (item) {
                _this.gp.addChild(new MatchItemRender(item));
            });
        });
        if (!Context.isFB) {
            setTimeout(function () {
                _this.close();
                app.ui.addPopup(new GameView);
                Game.inst.start();
            }, 500); //0.5s之后执行
            return;
        }
        ;
        this.addEventListener("LoadingDone", function () {
            _this.currentAmount++;
            Utils.clamp(_this.currentAmount, 0, _this.totalAmount);
            var percent = _this.currentAmount / _this.totalAmount;
            if (percent >= 1 && !_this._done) {
                _this._done = true;
                _this.setProgress(1);
                setTimeout(function () {
                    _this.close();
                    app.ui.addPopup(new GameView);
                    Game.inst.start();
                }, 500);
            }
            else {
                _this.setProgress(percent);
            }
        }, this);
        this.initGraphics();
    };
    MatchView.prototype.initGraphics = function () {
        this.validateNow();
        var rect = this.rect_mask;
        this.img_progressbar_yellow.mask = rect;
    };
    /**progress from 0-1 */
    MatchView.prototype.setProgress = function (percentage) {
        if (percentage < 0 || percentage > 1) {
            console.warn("parameters error");
            return;
        }
        this.txt_progress.text = "Matching  " + this.currentAmount + "/" + this.totalAmount;
        this.rect_mask.scaleX = percentage;
    };
    return MatchView;
}(BasePopup));
__reflect(MatchView.prototype, "MatchView");
//# sourceMappingURL=MatchView.js.map