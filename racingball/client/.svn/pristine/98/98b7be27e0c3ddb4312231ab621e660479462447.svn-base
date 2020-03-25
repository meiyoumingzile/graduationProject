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
var RoadSegment = (function (_super) {
    __extends(RoadSegment, _super);
    function RoadSegment() {
        var _this = _super.call(this) || this;
        _this.height = RoadSegment.height;
        _this.mesh = new tr.Mesh(RoadSegment.geo, RoadSegment.mtl);
        _this.mesh.rotateX(Math.PI * -.5);
        _this.mesh.position.y = -GameConstant.BallR;
        return _this;
    }
    RoadSegment.prototype.name = function () {
        return "RoadSegment";
    };
    RoadSegment.prototype.reset = function (z) {
        Game.inst.scene.add(this.mesh);
        this.mesh.position.z = z;
    };
    RoadSegment.prototype.dispose = function () {
        Game.inst.scene.remove(this.mesh);
        _super.prototype.dispose.call(this);
    };
    RoadSegment.init = function () {
        this.geo = new tr.PlaneGeometry(this.height, this.height, 2, 2);
        var tex = Res3DManager.createTexture("lane_" + GameConstant.Map + ".jpg", GameConstant.Anisotropy);
        Game.inst.world.renderer.getMaxAnisotropy() == 0 && GameConstant.Map == "shamo" && (tex.minFilter = tex.magFilter = tr.NearestFilter);
        this.mtl = new tr.MeshBasicMaterial({ map: tex });
        ObjectPool.inst.register(RoadSegment, 20);
    };
    RoadSegment.height = 10;
    return RoadSegment;
}(PoolObject));
__reflect(RoadSegment.prototype, "RoadSegment");
//# sourceMappingURL=RoadSegment.js.map