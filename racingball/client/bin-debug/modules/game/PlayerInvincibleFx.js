var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerInvincibleFx = (function () {
    function PlayerInvincibleFx() {
        this._active = false;
        this.mesh = new tr.Mesh(PlayerInvincibleFx.geo, PlayerInvincibleFx.mtl);
        this.mesh.scale.setScalar(GameConstant.FBXScale * 1.3);
        this.mesh.visible = false;
    }
    Object.defineProperty(PlayerInvincibleFx.prototype, "active", {
        set: function (v) {
            if (this._active == v)
                return;
            this._active = v;
            this.mesh.visible = v;
            if (v) {
                egret.Tween.get(this.mesh.rotation, { loop: true }).set({ y: 0 }).to({ y: Math.PI * 2 }, 2000);
            }
            else {
                egret.Tween.removeTweens(this.mesh.rotation);
            }
        },
        enumerable: true,
        configurable: true
    });
    PlayerInvincibleFx.init = function () {
        this.mtl = new tr.MeshBasicMaterial({ map: Res3DManager.createTexture("tietu_fuhuoqiu.jpg"), transparent: true, opacity: .7 });
        this.geo = Res3DManager.getMeshFromFBX("ball_fuhuo", "ball.fbx").geometry;
    };
    return PlayerInvincibleFx;
}());
__reflect(PlayerInvincibleFx.prototype, "PlayerInvincibleFx");
//# sourceMappingURL=PlayerInvincibleFx.js.map