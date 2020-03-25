var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RobotCtr = (function () {
    function RobotCtr() {
        this.robots = [];
        this._boostRateSum = 0;
        this._targetImg = new ImgOfTargetToSurpass();
        this._crown = new Crown();
        this.ranks = [];
        this._rankInterval = .5;
        for (var i = 0; i < GameConstant.PlayersCount - 1; ++i) {
            this.robots[i] = new Robot();
            this.ranks.push(this.robots[i]);
        }
        this.ranks.push(Game.inst.player);
    }
    RobotCtr.prototype.reset = function () {
        var _this = this;
        var aiLvs = [];
        for (var i = 0; i < 2; ++i) {
            aiLvs.push(0);
        }
        for (var i = 0; i < 5; ++i) {
            aiLvs.push(1);
        }
        for (var i = 0; i < 4; ++i) {
            aiLvs.push(2);
        }
        var tough = [];
        for (var i = 0; i < Game.inst.lvlCfg.partnernum[0]; ++i) {
            tough[i] = true;
        }
        for (var i = tough.length; i < GameConstant.PlayersCount; ++i) {
            tough[i] = false;
        }
        Utils.makeArrayRandom(aiLvs);
        Utils.makeArrayRandom(tough);
        var roadLen = GameConstant.TrackLength - 1;
        var range = roadLen - roadLen / GameConstant.BaseSpeed * GameConstant.BaseSpeedRobot;
        var gap = GameConstant.RobotGap; //range / this.robots.length;
        this.robots.forEach(function (r, i) {
            r.aiLv = aiLvs[i];
            r.isTough = tough[i];
            r.reset();
            r.group.position.z = -gap * (i + 1);
            r.group.position.x = Utils.randomRange(-5 + GameConstant.BallR, 5 - GameConstant.BallR);
            r.group.visible = true;
            r.setRobotInfo(app.status.localRobotData[i], _this.robots.length - i);
        });
        this._targetImg.setTarget(null);
        this._crown.setTarget(null);
    };
    RobotCtr.prototype.updateRanks = function (force) {
        if (force === void 0) { force = false; }
        if (!Game.inst.complete || force) {
            this.ranks.sort(function (a, b) { return a.group.position.z - b.group.position.z; });
            this.ranks.forEach(function (p, i) {
                p.rank = i;
                (p instanceof Robot) && (p._namePlane.text = Utils.getRankNumberText(i + 1));
            });
            var ahead = Game.inst.player.rank - 1;
            var r = this.ranks[ahead];
            if (r && r._active && ahead != 0) {
                this._targetImg.setTarget(r);
            }
            else {
                this._targetImg.setTarget(null);
            }
            this._crown.setTarget(this.ranks[0]);
        }
    };
    RobotCtr.prototype.visible = function (v) {
        this.robots.forEach(function (r) {
            r.group.visible = v;
        });
    };
    RobotCtr.prototype.getRobotsMtls = function () {
        var ret = [
            this._targetImg._mesh.material,
            this._crown.mesh.material,
        ];
        this.robots.forEach(function (r) {
            ret.push(r.ball.material);
            ret.push(r._namePlane.mesh.material);
        });
        return ret;
    };
    RobotCtr.prototype.allSlowDown = function () {
        this.robots.forEach(function (r) {
            r.slowDown();
        });
        this.updateRanks(true);
    };
    RobotCtr.prototype.update = function (dt) {
        this.robots.forEach(function (r) {
            r.update(dt);
        });
        this._crown.update(dt);
        if ((this._rankInterval -= dt) < 0) {
            this._rankInterval = .5;
            this.updateRanks();
            var view = app.ui.getPopup(GameView);
            view && (view.txt_ranking.text = Utils.getRankNumberText(Game.inst.player.rank + 1));
        }
        this._targetImg.update();
    };
    return RobotCtr;
}());
__reflect(RobotCtr.prototype, "RobotCtr");
//# sourceMappingURL=RobotCtr.js.map