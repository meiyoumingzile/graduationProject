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
var Robot = (function (_super) {
    __extends(Robot, _super);
    function Robot() {
        var _this = _super.call(this) || this;
        _this._namePlane = new TextPlane(.5, 64, 0xffffff);
        _this.isTough = false;
        _this._avoidRate = 1;
        _this._boostRate = 2;
        _this._active = false;
        _this._moveTime = 0;
        _this._movedTime = 0;
        _this._namePlane.mesh.position.y = 1.2;
        _this.group2.add(_this._namePlane.mesh);
        return _this;
    }
    Robot.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._active = this.group.visible = false;
        this._speed = GameConstant.BaseSpeedRobot;
        this.setSkin(Utils.randomInt(1, app.status.skinItemData.length), true);
        this._avoidRate = Game.inst.lvlCfg.obstacle[this.aiLv];
        this._boostRate = Game.inst.lvlCfg.speedup[this.aiLv];
        this._tailerTimeMin = Game.inst.lvlCfg.partnernum[1];
        this._tailerTimeMax = Game.inst.lvlCfg.partnernum[2];
        this._roamInfo = undefined;
    };
    Robot.prototype.setRobotInfo = function (d, idx) {
        this.robotInfo = d;
        // this._namePlane.text = idx.toString();
    };
    Robot.prototype.update = function (dt) {
        if (this.dead)
            return;
        var active = Utils.isInRange(this.group.position.z, Game.inst.cameraPos.z - 100, Game.inst.cameraPos.z + 5);
        var behind = this.group.position.z >= Game.inst.cameraPos.z;
        if (this._active != active) {
            this._active = active;
            this.group.visible = active;
            if (active) {
                this.trail.reset();
            }
        }
        if (!active) {
            if (behind) {
                if (this._tailingInfo) {
                    this.updateTailingInfo(dt);
                }
                else if (this.boost) {
                    this.updateZ(dt);
                    this.updateBoost(dt);
                }
                else if (this.isTough) {
                    // egret.log("tailer set");
                    this._tailingInfo = {
                        remaining: Utils.randomRange(this._tailerTimeMin, this._tailerTimeMax),
                        zOffset: Utils.randomRange(10, 25)
                    };
                }
                else {
                    this.die(true);
                }
            }
            else {
                this.updateZ(dt);
                this.updateBoost(dt);
            }
        }
        else {
            this.checkObstacles();
            this.updateMoveTo(dt);
            this.updateRoaming(dt);
            this.updateZ(dt);
            this.updateBoost(dt);
            this.group.position.z > Game.inst.cameraPos.z - 70 && this.checkCollision();
            this.updateJump(dt);
            this.trail.update();
        }
    };
    Robot.prototype.checkObstacles = function () {
        var page = Game.inst.obstacleCtr.getObstaclePage(this.group.position.z);
        if (this._moveToOnPage && this._moveToOnPage.page == page) {
            this.resetRoaming();
            this.moveTo(this._moveToOnPage.x);
            this._moveToOnPage = undefined;
        }
        var pageToCheck = page - 3;
        var obs = Game.inst.obstacleCtr.getObstacleByPage(pageToCheck);
        if (!obs || pageToCheck == this._pageChecked)
            return;
        this._pageChecked = pageToCheck;
        this._moveToOnPage = undefined;
        if (obs instanceof Booster) {
            if (Math.random() > this._boostRate)
                return;
            var obsCrt = Game.inst.obstacleCtr.getObstacleByPage(page);
            if (!obsCrt) {
                this.resetRoaming();
                this.moveTo(obs.position.x + Utils.randomRange(-.4, .4));
            }
            else {
                this._moveToOnPage = { page: page - 1, x: obs.position.x + Utils.randomRange(-.4, .4) };
            }
        }
        else if (obs.moving) {
            if (Math.random() > this._avoidRate)
                return;
            var dist = this.group.position.z - (obs.position.z + .5);
            var t = dist / this.currentSpeed;
            var obsX = obs.getEstimatedPos(t);
            var to = void 0;
            if (Math.abs(obsX) > 2.2) {
                to = -obsX;
            }
            else {
                to = obsX > 0 ? -4 : 4;
            }
            this.resetRoaming();
            this.moveTo(to);
        }
        else {
            var aisles = this._getAisleByCollision(obs.collisions);
            var aisle = aisles.length == 1 ? aisles[0] : Utils.randomInArr(aisles);
            var min = aisle.min + GameConstant.BallR + .1, max = aisle.max - GameConstant.BallR - .1;
            if (!Utils.isInRange(this.currentXOrMovingTo(), min, max)) {
                var x = Utils.randomRange(min, max);
                this.resetRoaming();
                this.moveTo(x);
            }
        }
    };
    Robot.prototype._getAisleByCollision = function (collisions) {
        var ret = [];
        var brk = true;
        var _loop_1 = function (i) {
            if (collisions.some(function (arr) { return arr.some(function (v) { return v == i; }); })) {
                brk = true;
            }
            else {
                if (brk) {
                    brk = false;
                    ret.push([]);
                }
                ret[ret.length - 1].push(i);
            }
        };
        for (var i = -2; i < 3; ++i) {
            _loop_1(i);
        }
        return this.getCollisionXRange(ret);
    };
    Robot.prototype.roam = function () {
        this._roamInfo = {
            delay: Utils.randomRange(2, 4),
            duration: Utils.randomRange(.5, 1),
            toX: Utils.randomRange(-4, 4),
        };
    };
    Robot.prototype.resetRoaming = function () {
        this._roamInfo && (this._roamInfo.delay = Utils.randomRange(2, 4));
    };
    Robot.prototype.updateRoaming = function (dt) {
        if (this._roamInfo) {
            if ((this._roamInfo.delay -= dt) < 0) {
                this.moveTo(this._roamInfo.toX, this._roamInfo.duration);
                this._roamInfo = undefined;
            }
        }
        else if (this._movedTime >= this._moveTime) {
            this.roam();
        }
    };
    Robot.prototype.moveTo = function (x, time) {
        if (time === void 0) { time = 0; }
        this._moveTime = time || Utils.randomRange(.15, .25) - .04 * this.boost;
        this._movedTime = 0;
        this._moveFrom = this.group.position.x;
        this._moveDiff = x - this.group.position.x;
    };
    Robot.prototype.currentXOrMovingTo = function () {
        if (this._movedTime < this._moveTime) {
            return this.group.position.x = this._moveFrom + this._moveDiff;
        }
        else {
            return this.group.position.x;
        }
    };
    Robot.prototype.stopMoving = function () {
        this._movedTime = this._moveTime = 0;
    };
    Robot.prototype.updateMoveTo = function (dt) {
        if (this._movedTime < this._moveTime) {
            this._movedTime += dt;
            if (this._movedTime > this._moveTime) {
                this._movedTime = this._moveTime;
            }
            this.group.position.x = this._moveFrom + this._moveDiff * this._movedTime / this._moveTime;
        }
    };
    Robot.prototype.updateTailingInfo = function (dt) {
        this._tailingInfo.remaining -= dt;
        var bo = -Game.inst.cameraPos.z < GameConstant.TrackLength - 300 || Game.inst.complete;
        if (this._tailingInfo.remaining < 0 && bo) {
            this.group.position.z = Game.inst.cameraPos.z + this._tailingInfo.zOffset;
            this.boost = 1;
            this.onBoostChange();
            this._tailingInfo = undefined;
            egret.log("tailer boost");
        }
    };
    Robot.prototype.slowDown = function () {
        _super.prototype.slowDown.call(this);
        if (this._tailingInfo) {
            this._tailingInfo.remaining = 0;
            this.group.position.z = Game.inst.cameraPos.z + this._tailingInfo.zOffset;
        }
    };
    Robot.prototype.tryBoost = function () {
        if (Math.random() > Game.inst.lvlCfg.beyondRate)
            return false;
        // let arr = Game.inst.lvlCfg.bootsWght;
        // let sum = arr.reduce((a, b) => a + b);
        // let r = Utils.randomRange(0, sum);
        // let s = 0;
        // let boostLv = arr.findIndex(v => {
        // 	return r < (s += v)
        // })
        this.boost = 1; //boostLv + 1;
        this.onBoostChange();
        this.group.position.z -= 3;
        return true;
    };
    Robot.prototype.die = function (noAnim) {
        if (noAnim === void 0) { noAnim = false; }
        Game.inst.nowPlayerCount--;
        if (_super.prototype.die.call(this, noAnim)) {
            noAnim || AudioPlayer.playSound("die-others.mp3");
            return true;
        }
        return false;
    };
    return Robot;
}(PlayerBase));
__reflect(Robot.prototype, "Robot");
//# sourceMappingURL=Robot.js.map