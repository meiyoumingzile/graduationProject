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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super.call(this) || this;
        _this.group = new tr.Group();
        _this.moving = false;
        _this.slope = false;
        _this.lowGate = false;
        _this._moveIndexTime = 0;
        _this._moveIndex = 0;
        _this.group.position.y = -GameConstant.BallR;
        _this.position = _this.group.position;
        return _this;
    }
    Obstacle.init = function () {
        this.init4Theme();
        ObjectPool.inst.register(Obstacle, 5);
    };
    Obstacle.init4Theme = function () {
        var fbxs = Res3DManager.getFBX(GameConstant.Map + ".fbx").children;
        var fbxBox = fbxs.find(function (i) { return i.name == "xiangzi"; });
        var fbxSlope = fbxs.find(function (i) { return i.name == "tantiao"; });
        var fbxBooster = fbxs.find(function (i) { return i.name == "jiasu"; });
        this.geoBox = fbxBox.geometry;
        this.geoSlope = fbxSlope.geometry;
        this.geoBooster = fbxBooster.geometry;
        this.mtl = this.mtl || fbxBox.material;
        this.mtl.map.anisotropy = GameConstant.Anisotropy;
    };
    Obstacle.prototype.name = function () {
        return "Obstacle";
    };
    Obstacle.prototype.reset = function (arr, z, x, flip, collisions) {
        var _this = this;
        this.boxes = arr;
        this.boxes.forEach(function (i) {
            _this.group.add(i.mesh);
        });
        this.group.position.z = z;
        this.group.position.x = x;
        this.group.rotation.y = flip ? Math.PI : 0;
        this.collisions = collisions.map(function (ar) { return ar.map(function (v) { return flip ? -v : v; }); });
        Game.inst.scene.add(this.group);
        this.moving && (egret.Tween.removeTweens(this.position), this.moving = false);
        this.slope = false;
        this.lowGate = false;
    };
    Obstacle.prototype.startMoving = function (t, flip) {
        var _this = this;
        this.moving = true;
        var movePath = this._movePath = t == 0 ? flip ? [-1, 2, -2, 2] : [1, -2, 2, -2] : flip ? [2, -2] : [-2, 2];
        this.group.position.x = movePath[0] * 2;
        var tween = egret.Tween.get(this.position, { loop: true });
        var speed = Utils.randomRange(Game.inst.lvlCfg.cubeSpMin, Game.inst.lvlCfg.cubeSpMax);
        this._moveInterval = 1000 / speed;
        this._moveIndex = 0;
        this._moveIndexTime = egret.getTimer();
        var _loop_1 = function (i) {
            var pos = movePath[(i + 1) % movePath.length] * 2;
            tween = tween.call(function () {
                _this._moveIndex = i;
                _this._moveIndexTime = egret.getTimer();
            }).to({ x: pos }, this_1._moveInterval, egret.Ease.quadInOut);
        };
        var this_1 = this;
        for (var i = 0; i < movePath.length; ++i) {
            _loop_1(i);
        }
    };
    Obstacle.prototype.getEstimatedPos = function (dt) {
        var passed = egret.getTimer() - this._moveIndexTime;
        var percent = Utils.clamp(passed / this._moveInterval, 0, 1);
        var percentT = dt * 1000 / this._moveInterval + percent;
        percent = percentT % 1;
        var i = (this._moveIndex + (percentT | 0)) % this._movePath.length;
        var pCrt = this._movePath[i] * 2;
        var pTgt = this._movePath[(i + 1) % this._movePath.length] * 2;
        percent = egret.Ease.getPowInOut(2)(percent);
        var p = (pTgt - pCrt) * percent + pCrt;
        return p;
    };
    Obstacle.prototype.dispose = function () {
        var _this = this;
        this.boxes.forEach(function (i) {
            _this.group.remove(i.mesh);
            i.dispose();
        });
        Game.inst.scene.remove(this.group);
        _super.prototype.dispose.call(this);
    };
    Obstacle.prototype.update = function (dt) {
        return this.group.position.z > Game.inst.cameraPos.z - 1;
    };
    return Obstacle;
}(PoolObject));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map