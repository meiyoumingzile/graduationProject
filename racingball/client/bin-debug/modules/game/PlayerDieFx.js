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
var PlayerDieFx = (function (_super) {
    __extends(PlayerDieFx, _super);
    function PlayerDieFx() {
        var _this = _super.call(this) || this;
        _this.splatters1 = [];
        _this.splatters2 = [];
        _this.ticker = new Ticker(_this.update, _this);
        _this.group = new tr.Group();
        _this.elapsed = 0;
        _this.time = .15;
        _this.haloMtl = new tr.SpriteMaterial({ map: PlayerDieFx.texHalo });
        _this.splatters1Mtl = new tr.SpriteMaterial({ map: PlayerDieFx.texSplatter });
        _this.splatters2Mtl = new tr.MeshBasicMaterial({ map: PlayerDieFx.texSplatter, transparent: true });
        _this.halo = new tr.Sprite(_this.haloMtl);
        _this.group.add(_this.halo);
        for (var i = 0; i < 5; ++i) {
            var spr = new tr.Sprite(_this.splatters1Mtl);
            _this.group.add(spr);
            _this.splatters1.push(spr);
        }
        for (var i = 0; i < 4; ++i) {
            var mesh = new tr.Mesh(PlayerDieFx.geoPlane, _this.splatters2Mtl);
            mesh.rotateX(Math.PI * -.5);
            _this.group.add(mesh);
            _this.splatters2.push(mesh);
        }
        return _this;
    }
    PlayerDieFx.prototype.name = function () {
        return "PlayerDieFx";
    };
    PlayerDieFx.init = function () {
        this.texHalo = Res3DManager.createTexture("fx-die1.png");
        this.texSplatter = Res3DManager.createTexture("fx-die2.png");
        this.geoPlane = new tr.PlaneGeometry(1, 1);
        ObjectPool.inst.register(PlayerDieFx, 1);
    };
    PlayerDieFx.prototype.reset = function (px, pz) {
        Game.inst.scene.add(this.group);
        this.group.position.set(px, -GameConstant.BallR + .05, pz);
        var scale2 = 3;
        this.halo.scale.setScalar(1);
        this.haloMtl.opacity = 1;
        egret.Tween.get(this.halo.scale).to({ x: scale2, y: scale2, z: scale2 }, 200, egret.Ease.quadOut);
        egret.Tween.get(this.haloMtl).wait(100).to({ opacity: 0 }, 100);
        this.splatters2Mtl.opacity = 1;
        egret.Tween.get(this.splatters2Mtl).wait(1000).to({ opacity: 0 }, 500).call(this.dispose, this);
        this.splatters2.forEach(function (mesh) {
            mesh.position.x = Utils.randomRange(-.5, .5);
            mesh.position.z = Utils.randomRange(-.5, .5);
        });
        this.splatters1.forEach(function (spr) {
            spr['dirx'] = Utils.randomRange(-1, 1);
            spr['diry'] = Math.random();
            spr['dist'] = Utils.randomRange(2, 5);
        });
        this.elapsed = 0;
        this.ticker.start();
        Game.inst.materialCtr.add(this.haloMtl);
        Game.inst.materialCtr.add(this.splatters1Mtl);
        Game.inst.materialCtr.add(this.splatters2Mtl);
    };
    PlayerDieFx.prototype.update = function (dt) {
        this.elapsed += dt * .001;
        var prg = this.elapsed / this.time;
        if (prg > 1) {
            prg = 1;
            this.ticker.stop();
        }
        this.splatters1.forEach(function (spr) {
            spr.position.x = spr['dirx'] * spr['dist'] * prg;
            spr.position.y = spr['diry'] * spr['dist'] * prg;
            spr.scale.setScalar(1 - prg * .8);
        });
        this.splatters1Mtl.opacity = 1 - prg;
    };
    PlayerDieFx.prototype.dispose = function () {
        Game.inst.scene.remove(this.group);
        Game.inst.materialCtr.remove(this.haloMtl);
        Game.inst.materialCtr.remove(this.splatters1Mtl);
        Game.inst.materialCtr.remove(this.splatters2Mtl);
        _super.prototype.dispose.call(this);
    };
    return PlayerDieFx;
}(PoolObject));
__reflect(PlayerDieFx.prototype, "PlayerDieFx");
//# sourceMappingURL=PlayerDieFx.js.map