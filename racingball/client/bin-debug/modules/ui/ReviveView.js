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
var ReviveView = (function (_super) {
    __extends(ReviveView, _super);
    function ReviveView(rank, progress) {
        var _this = _super.call(this) || this;
        _this.rank = rank;
        _this.progress = progress;
        _this.modalAlpha = .4;
        _this._slideDistance = 428 * 1.13;
        return _this;
    }
    ReviveView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.group_revive.scale = Constant.FullWidthScale;
        this.gp_play.scale = Constant.FullWidthScale;
        this.group_nothanks.touchEnabled = false;
        this.group_nothanks.visible = false;
        this.nothanksTimer = egret.setTimeout(function () {
            _this.group_nothanks.visible = true;
            _this.group_nothanks.alpha = 0;
            egret.Tween.get(_this.group_nothanks)
                .to({ alpha: .6 }, 1000)
                .call(function () {
                _this.group_nothanks.touchEnabled = true;
            });
        }, this, 1500);
        this.img_revive.addEventListener("touchTap", this.revive, this);
        this.btn_continue.addEventListener("touchTap", this.revive, this);
        this.group_nothanks.addEventListener("touchTap", function () {
            AudioPlayer.stopMusic();
            Game.inst.complete = true;
            //	app.pp.starCount += Constant.starAmount[Game.inst.player.rank + 1];
            app.pp.checkNewSkin();
            var lvl = app.pp.currentLevel;
            if (app.pp.currentLevel < 10 || ++Game.inst._levelCompleteTimes >= 2) {
                Game.inst._levelCompleteTimes = 0;
                app.pp.currentLevel++;
                app.pp.pushData();
            }
            Game.inst.player.slowDown();
            Game.inst.robotCtr.allSlowDown();
            app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(function () { RankCtr.loadLeaderBoardAsync(); });
            //更新服务器的score数据
            Game.inst.stop();
            ReviveView != null && app.ui.getPopup(ReviveView).close();
            GameView != null && app.ui.getPopup(GameView).close();
            app.ui.addPopup(new EndView());
            //this.goHome();
            //app.platform.logEvent(Log.EventType.ReviveClick, { type: app.status.playerType, source: "btnNoThanks" });
        }, this);
        this.txt_ranking.text = Utils.getRankNumberText(this.rank);
        this.txt_percent.text = Math.floor(this.progress * 100) + "%";
        // egret.Tween.get(this.img_wheel, { loop: true }).to({ rotation: 360 }, 1500);
        this.initGraphics();
        this.changeGraphics();
        this.setProgress(this.progress);
        // let percent = 0;
        // let timer = egret.setInterval(() => {
        // 	this.setProgress(percent);
        // 	percent += .001
        // 	if (percent > 1) {
        // 		egret.clearInterval(timer);
        // 	}
        // }, this, 10)
    };
    ReviveView.prototype.initGraphics = function () {
        this.validateNow();
        var shape = this._shape = new egret.Shape();
        shape.x = this.group_revive.x + this.group_revive.width / 2;
        shape.y = this.group_revive.y + this.group_revive.height / 2;
        this.addChild(shape);
        var rect = this.rect = new egret.Shape();
        // rect.x = this.group_progressbar.x - this.group_progressbar.width;
        // rect.y = this.group_progressbar.y;
        rect.graphics.clear();
        rect.graphics.beginFill(0x00ffff, 1);
        // rect.graphics.drawRect(0, 0, this.group_progressbar.width, this.group_progressbar.height);
        this.addChild(rect);
        this.img_greenbg.mask = shape;
        this.img_progressbar_yellow.mask = rect;
    };
    //轻触修改属性
    ReviveView.prototype.changeGraphics = function () {
        var _this = this;
        var shape = this._shape;
        var anglePerMillisecond = 360 / Constant.ReviveTime;
        var angle = 0;
        this.ticker = new Ticker(function (dt) {
            changeGraphics(angle);
            angle += dt * anglePerMillisecond;
            if (angle > 360) {
                _this.ticker.stop();
                _this.img_greenbg.visible = false;
                _this.goHome();
            }
        }, this);
        this.ticker.start();
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(200, 0);
            shape.graphics.drawArc(0, 0, 200, -90 * Math.PI / 180, -90 * Math.PI / 180 + angle * Math.PI / 180, true);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    };
    /**progress from 0-1 */
    ReviveView.prototype.setProgress = function (percentage) {
        if (percentage < 0 || percentage > 1) {
            console.warn("parameters error");
            return;
        }
        // this.rect.x = this.group_progressbar.x - this.group_progressbar.width + this._slideDistance * percentage;
        this.img_wheel.x = this._slideDistance * percentage;
    };
    ReviveView.prototype.revive = function () {
        var _this = this;
        app.platform.logEvent(Log.EventType.ReviveClick, { type: app.status.playerType, source: "btnContinue" });
        this.ticker.stop();
        if (app.ad.hasRAD()) {
            Common.showRAD('adRevive', function () {
                var gameView = app.ui.getPopup(GameView);
                if (gameView) {
                    // gameView.group_progressbar.visible = true;
                    gameView.txt_ranking.visible = true;
                }
                _this.close();
                Game.inst.revive();
            }, function () { _this.ticker.start(); });
        }
    };
    ReviveView.prototype.goHome = function () {
        this.close();
        Game.inst.resetLevel(app.pp.currentLevel);
        Game.inst.stop();
        app.ui.getPopup(GameView).close();
        app.ui.addPopup(new HomeView);
        Common.tryPlayAD();
        app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 1 });
    };
    ReviveView.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        egret.Tween.removeAllTweens();
        this.ticker.stop();
        egret.clearTimeout(this.nothanksTimer);
    };
    return ReviveView;
}(BasePopup));
__reflect(ReviveView.prototype, "ReviveView");
//# sourceMappingURL=ReviveView.js.map