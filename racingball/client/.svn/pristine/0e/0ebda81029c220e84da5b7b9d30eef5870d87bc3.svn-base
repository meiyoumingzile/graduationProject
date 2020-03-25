var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Crown = (function () {
    function Crown() {
        var fbx = Res3DManager.getMeshFromFBX("paper_guangguan", "ball.fbx");
        this.mesh = new tr.Mesh(fbx.geometry, fbx.material);
        this.mesh.scale.setScalar(GameConstant.FBXScale * .7);
        this.mesh.position.y = .8;
        this.mesh.rotation.x = -Math.PI * .5;
    }
    Crown.prototype.setTarget = function (p) {
        if (this._target == p)
            return;
        this._target = p;
        this.mesh.parent && this.mesh.parent.remove(this.mesh);
        p && p.group2.add(this.mesh);
    };
    Crown.prototype.update = function (dt) {
        this.mesh.rotation.z -= Math.PI * dt;
    };
    return Crown;
}());
__reflect(Crown.prototype, "Crown");
//# sourceMappingURL=Crown.js.map