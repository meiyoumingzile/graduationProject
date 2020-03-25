class Crown {
	mesh: tr.Mesh
	public constructor() {
		let fbx = Res3DManager.getMeshFromFBX("paper_guangguan", "ball.fbx") as tr.Mesh;
		this.mesh = new tr.Mesh(fbx.geometry, fbx.material);
		this.mesh.scale.setScalar(GameConstant.FBXScale * .7);
		this.mesh.position.y = .8;
		this.mesh.rotation.x = -Math.PI * .5;
	}

	_target: PlayerBase;
	setTarget(p: PlayerBase) {
		if (this._target == p) return
		this._target = p;
		this.mesh.parent && this.mesh.parent.remove(this.mesh)
		p && p.group2.add(this.mesh);
	}

	update(dt: number) {
		this.mesh.rotation.z -= Math.PI * dt;
	}
}