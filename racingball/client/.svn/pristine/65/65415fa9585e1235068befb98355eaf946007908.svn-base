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
var Booster = (function (_super) {
    __extends(Booster, _super);
    function Booster() {
        var _this = _super.call(this) || this;
        _this.mesh = new tr.Mesh(Obstacle.geoBooster, Obstacle.mtl);
        _this.mesh.scale.setScalar(GameConstant.ObsScale);
        _this.mesh.position.y = -GameConstant.BallR - .1;
        _this.mesh.rotation.x = -Math.PI * .5;
        _this.position = _this.mesh.position;
        return _this;
    }
    Booster.prototype.name = function () {
        return "Booster";
    };
    Booster.prototype.reset = function (z) {
        var c = Utils.randomInt(-2, 3);
        this.collisions = [[c]];
        this.mesh.position.x = ObstacleCtr.getObsX(c + 2);
        this.mesh.position.z = z;
        Game.inst.scene.add(this.mesh);
        Game.inst.addTickObject(this);
    };
    Booster.prototype.update = function (dt) {
        return this.mesh.position.z > Game.inst.cameraPos.z + 1;
    };
    Booster.prototype.dispose = function () {
        Game.inst.scene.remove(this.mesh);
        _super.prototype.dispose.call(this);
    };
    Booster.init = function () {
        ObjectPool.inst.register(Booster, 2);
    };
    return Booster;
}(PoolObject));
__reflect(Booster.prototype, "Booster");
//# sourceMappingURL=Booster.js.map