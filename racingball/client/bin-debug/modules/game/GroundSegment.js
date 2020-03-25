var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GroundSegment = (function () {
    function GroundSegment() {
        this.mesh = new tr.Mesh(GroundSegment.geo, GroundSegment.mtl);
    }
    GroundSegment.init = function () {
        this.geo = undefined;
        this.mtl = undefined;
        var fbx = Res3DManager.getFBX(GameConstant.Map + ".fbx").children.find(function (c) { return c.name == "dixing"; });
        if (fbx) {
            this.geo = fbx.geometry;
            this.mtl = fbx.material;
        }
    };
    GroundSegment.init4Theme = function (insts) {
        this.mtl && Game.inst.materialCtr.remove(this.mtl);
        this.init();
        this.mtl && Game.inst.materialCtr.add(this.mtl);
        insts.forEach(function (m) {
            m.mesh.geometry = GroundSegment.geo;
            m.mesh.material = GroundSegment.mtl;
        });
    };
    GroundSegment.height = 104.39;
    return GroundSegment;
}());
__reflect(GroundSegment.prototype, "GroundSegment");
//# sourceMappingURL=GroundSegment.js.map