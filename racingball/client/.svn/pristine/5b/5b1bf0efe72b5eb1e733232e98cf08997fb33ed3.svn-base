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
var PlayerBoostSprite = (function (_super) {
    __extends(PlayerBoostSprite, _super);
    function PlayerBoostSprite() {
        var _this = _super.call(this) || this;
        _this.sprite = new tr.Mesh(PlayerBoostSprite.geo, new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("fx-boost.png"), blending: tr.AdditiveBlending }));
        _this.sprite.position.y = .1;
        return _this;
    }
    PlayerBoostSprite.prototype.name = function () {
        return "PlayerBoostSprite";
    };
    PlayerBoostSprite.init = function () {
        this.geo = new tr.PlaneGeometry(1, 1);
        ObjectPool.inst.register(PlayerBoostSprite, 10);
    };
    PlayerBoostSprite.prototype.reset = function () {
        var _this = this;
        Game.inst.scene.add(this.sprite);
        !Game.inst.materialCtr.hasAdd(this.sprite.material) && Game.inst.materialCtr.add(this.sprite.material);
        var sl0 = 1.5;
        var sl1 = 1.6;
        var sl2 = .5;
        var t = 400;
        this.sprite.material.opacity = .4;
        this.sprite.scale.setScalar(sl0);
        this.sprite.position.z = -.5;
        egret.Tween.get(this.sprite.position).to({ z: 2 }, t);
        egret.Tween.get(this.sprite.material).to({ opacity: 1 }, t / 4).wait(t / 2).to({ opacity: 0 }, t / 4);
        egret.Tween.get(this.sprite.scale).
            to({ x: sl1, y: sl1, z: sl1 }, t / 3).
            to({ x: sl2, y: sl2, z: sl2 }, t * 2 / 3).
            wait(50).call(function () {
            _this.dispose();
        });
    };
    PlayerBoostSprite.prototype.dispose = function () {
        Game.inst.scene.remove(this.sprite);
        _super.prototype.dispose.call(this);
    };
    return PlayerBoostSprite;
}(PoolObject));
__reflect(PlayerBoostSprite.prototype, "PlayerBoostSprite");
//# sourceMappingURL=PlayerBoostSprite.js.map