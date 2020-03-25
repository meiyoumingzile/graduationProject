var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MaterialCtr = (function () {
    function MaterialCtr() {
        this._mtls = [];
        this._uniformValues = [];
        this._settedup = false;
        this._progress = 0;
        this._distOffsetFrom = new tr.Vector4();
        this._distOffsetTo = new tr.Vector4();
    }
    MaterialCtr.prototype.add = function (mtl) {
        this._mtls.push(mtl);
    };
    MaterialCtr.prototype.addMulti = function (mtls) {
        (_a = this._mtls).push.apply(_a, mtls);
        var _a;
    };
    MaterialCtr.prototype.hasAdd = function (mtl) {
        return this._mtls.includes(mtl);
    };
    MaterialCtr.prototype.remove = function (mtl) {
        this._mtls.rm(mtl);
    };
    MaterialCtr.prototype.setup = function () {
        if (!this._settedup) {
            this.gotoNextDistOffset();
        }
        ;
        this._settedup = true;
        var properties = Game.inst.world.renderer.properties;
        for (var i = 0; i < this._mtls.length; ++i) {
            var shader = properties.get(this._mtls[i]).shader;
            if (shader) {
                this._uniformValues.push(shader.uniforms.distOffset.value);
                this._mtls.splice(i--, 1);
            }
        }
    };
    MaterialCtr.prototype.reset = function () {
        this._uniformValues.forEach(function (v) {
            v.x = 0;
            v.y = 0;
        });
        this._progress = 0;
        this._distOffsetFrom.set(0, 0, 0, 0);
        this._distOffsetTo.set(0, 0, 0, 0);
    };
    MaterialCtr.prototype.update = function (dt) {
        var _this = this;
        var t = .02 * Game.inst.player._speed;
        this._progress += dt * .2 * t;
        if (this._progress >= 1) {
            this._progress = 0;
            this._distOffsetFrom.copy(this._distOffsetTo);
            this.gotoNextDistOffset();
        }
        this._distOffsetCrt = this._distOffsetFrom.clone().lerp(this._distOffsetTo, this._progress);
        this._uniformValues.forEach(function (v) {
            v.x = _this._distOffsetCrt.x;
            v.y = _this._distOffsetCrt.y;
        });
    };
    MaterialCtr.prototype.currentOffset = function () {
        return this._distOffsetCrt;
    };
    MaterialCtr.prototype.gotoNextDistOffset = function () {
        var range = 70;
        var x = Math.random() * range * (Math.random() > .5 ? -1 : 1), y = Math.random() * range;
        this._distOffsetTo.set(x, y, 0, 0);
    };
    return MaterialCtr;
}());
__reflect(MaterialCtr.prototype, "MaterialCtr");
//# sourceMappingURL=MaterialCtr.js.map