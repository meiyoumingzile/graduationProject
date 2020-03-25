class PlayerInvincibleFx {

	mesh: tr.Mesh;

	public constructor() {
		this.mesh = new tr.Mesh(PlayerInvincibleFx.geo, PlayerInvincibleFx.mtl);
		this.mesh.scale.setScalar(GameConstant.FBXScale * 1.3);
		this.mesh.visible = false;
	}

	_active = false;
	set active(v: boolean) {
		if (this._active == v) return;
		this._active = v;
		this.mesh.visible = v;
		if (v) {
			egret.Tween.get(this.mesh.rotation, { loop: true }).set({ y: 0 }).to({ y: Math.PI * 2 }, 2000);
		} else {
			egret.Tween.removeTweens(this.mesh.rotation);
		}
	}

	static mtl: tr.MeshBasicMaterial;
	static geo: tr.Geometry;
	static init() {
		this.mtl = new tr.MeshBasicMaterial({ map: Res3DManager.createTexture("tietu_fuhuoqiu.jpg"), transparent: true, opacity: .7 });
		this.geo = Res3DManager.getMeshFromFBX("ball_fuhuo", "ball.fbx").geometry as tr.Geometry;
	}
}