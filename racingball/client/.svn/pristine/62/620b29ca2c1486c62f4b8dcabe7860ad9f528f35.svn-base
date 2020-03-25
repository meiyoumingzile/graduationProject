var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tree = (function () {
    function Tree(side) {
        this.side = side;
        this.mesh = new tr.Mesh(Tree.geos[0], Tree.mtl);
        this.mesh.rotation.x = Math.PI * -.5;
    }
    Tree.prototype.reset = function (z) {
        var noGround = GameConstant.Map != "shamo";
        Game.inst.scene.add(this.mesh);
        var scale = noGround ? Utils.randomRange(4, 6) : Utils.randomRange(.5, 1.5);
        this.mesh.geometry = Utils.randomInArr(Tree.geos);
        this.mesh.scale.setScalar(GameConstant.FBXScale * scale);
        this.mesh.rotation.z = Math.random() < .5 ? Math.PI : 0;
        this.mesh.position.y = noGround ? (-14 + scale * Utils.randomRange(-5, 0)) : -GameConstant.BallR;
        this.mesh.position.z = z;
        if (noGround) {
            this.mesh.position.x = Utils.randomRange(-4, 4) + (this.side == "l" ? -1 : 1) * (10 + scale * 1.2);
        }
        else {
            this.mesh.position.x = Utils.randomRange(-2, 2) + (this.side == "l" ? -12 : 12);
        }
    };
    Tree.prototype.dispose = function () {
        Game.inst.scene.remove(this.mesh);
    };
    Tree.init = function () {
        var _this = this;
        this.mtl = this.mtl || new tr.MeshPhongMaterial();
        this.geos.length = 0;
        var mtlDone = false;
        var arr = Res3DManager.getFBX(GameConstant.Map + ".fbx").children;
        arr.forEach((function (i) {
            var fbx = i;
            if (i.name.indexOf("baijian_") == 0) {
                _this.geos.push(fbx.geometry);
                !mtlDone && (mtlDone = true, _this.mtl.map = fbx.material.map);
            }
        }));
    };
    Tree.geos = [];
    return Tree;
}());
__reflect(Tree.prototype, "Tree");
//# sourceMappingURL=Tree.js.map