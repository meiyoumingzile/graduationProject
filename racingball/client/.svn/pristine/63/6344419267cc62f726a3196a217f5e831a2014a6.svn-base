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
var WindLine = (function (_super) {
    __extends(WindLine, _super);
    function WindLine() {
        var _this = _super.call(this) || this;
        _this.speed = 40;
        _this.trail = new Trail(50, .1);
        return _this;
    }
    WindLine.prototype.name = function () {
        return "WindLine";
    };
    WindLine.prototype.reset = function () {
        Game.inst.scene.add(this.trail.mesh);
        Game.inst.addTickObject(this);
        this.trail.reset();
        this.trail.mesh.material = WindLine.mtl;
        this.position = this.trail.mesh.position;
        this.position.x = Utils.randomRange(-5, 5);
        this.position.y = Utils.randomRange(3, 5);
        this.position.z = Game.inst.player.group.position.z - 100 - Math.random() * 30;
    };
    WindLine.prototype.dispose = function () {
        Game.inst.scene.remove(this.trail.mesh);
        _super.prototype.dispose.call(this);
    };
    WindLine.prototype.update = function (dt) {
        this.trail.update();
        var pz = Game.inst.player.group.position.z;
        var dis = Math.abs(this.position.z - pz);
        if (dis < 100) {
            var disRatio = (100 - dis) / 100;
            var x = Math.abs(this.position.x);
            this.position.y += dt * disRatio * disRatio * (20 - x);
        }
        var z = (this.position.z += this.speed * dt);
        return z > pz + 20;
    };
    WindLine.init = function () {
        this.mtl = new tr.MeshBasicMaterial({ map: Res3DManager.createTexture("wind-trail.png"), transparent: true, opacity: .6, side: tr.DoubleSide });
        ObjectPool.inst.register(WindLine, 5);
    };
    return WindLine;
}(PoolObject));
__reflect(WindLine.prototype, "WindLine");
//# sourceMappingURL=WindLine.js.map