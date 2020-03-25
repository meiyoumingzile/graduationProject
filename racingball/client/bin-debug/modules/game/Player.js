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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.cameraDirty = false;
        _this._xMoved = 0;
        _this._invincibleTime = 0;
        _this.setSkin(app.pp.currentSkinID);
        return _this;
    }
    Player.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.cameraDirty = true;
        Game.inst.cameraCtr.update(0);
    };
    Player.prototype.moveX = function (x) {
        if (!this.dead && !this._slowdown) {
            this._xMoved += x * .03;
        }
    };
    Player.prototype.update = function (dt) {
        if (this.dead)
            return;
        var pos = this.group.position;
        if (this._xMoved) {
            pos.x += this._xMoved;
            pos.x < -4.5 && (pos.x = -4.5);
            pos.x > 4.5 && (pos.x = 4.5);
            this._xMoved = 0;
            this.cameraDirty = true;
        }
        _super.prototype.update.call(this, dt);
        this.updateInvincible(dt);
        this.checkLowCamera();
    };
    Player.prototype.checkLowCamera = function () {
        if (this._obsPageLow == this._obsPage)
            return;
        this._obsPageLow = this._obsPage;
        var obs = Game.inst.obstacleCtr.getObstacleByPage(this._obsPageLow - 1);
        if (obs instanceof Obstacle && obs.lowGate) {
            var camera_1 = Game.inst.cameraCtr;
            camera_1.tweenAngleYTo(-4 * GameConstant.ToRadian, function () {
                camera_1.tweenAngleYTo(-10 * GameConstant.ToRadian);
            });
        }
    };
    Object.defineProperty(Player.prototype, "invincible", {
        set: function (v) {
            this._invincible = v;
            this._invincibleFx || (this._invincibleFx = new PlayerInvincibleFx(), this.group2.add(this._invincibleFx.mesh));
            this._invincibleFx.active = v;
            this._invincibleTime = v ? 4 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.updateInvincible = function (dt) {
        if (this._invincibleTime > 0) {
            this._invincibleTime -= dt;
            this._invincibleTime <= 0 && (this.invincible = false);
        }
    };
    Player.prototype.die = function () {
        var _this = this;
        app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(function () { RankCtr.loadLeaderBoardAsync(); });
        //更新服务器的score数据
        if (_super.prototype.die.call(this)) {
            if (Game.inst.revived <= 0) {
                app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 2 });
            }
            AudioPlayer.pauseMusic();
            AudioPlayer.playSound("die-player.mp3");
            var flag = app.status.playerType == "old_player" || app.pp.currentLevel > 1;
            if (flag && app.ad.hasRAD() && Game.inst.revived < 1 && this.group.position.z < -5 * GameConstant.BaseSpeed) {
                Game.inst.revived++;
                Utils.callLater(function () {
                    Game.inst.ticker.stop();
                    app.ui.addPopup(new ReviveView(_this.rank + 1, Game.inst.currentProgress));
                    var gameView = app.ui.getPopup(GameView);
                    if (gameView) {
                        // gameView.group_progressbar.visible = false;
                        // gameView.txt_ranking.visible = false;
                    }
                }, 500);
            }
            else {
                Game.inst.finish();
                /*Utils.callLater(() => {
                    Game.inst.fail();
                    Game.inst.resetLevel(app.pp.currentLevel);
                    Game.inst.stop();
                    app.ui.getPopup(GameView).close();
                    app.ui.addPopup(new HomeView);
                    
                }, 1500)*/
            }
            if (Game.inst.revived <= 0) {
                if (-this.group.position.z <= 5 * GameConstant.BaseSpeed) {
                    app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 0 });
                }
                else if (!app.ad.hasRAD()) {
                    app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 2 });
                }
            }
            return true;
        }
        else {
            return false;
        }
        //this.player._speed = 0;
    };
    Player.prototype.onHitBoost = function () {
        AudioPlayer.playSound("boost.mp3");
    };
    return Player;
}(PlayerBase));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map