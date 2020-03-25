class Tree {
	mesh: tr.Mesh;
	static geos: tr.Geometry[] = [];
	static mtl: tr.MeshPhongMaterial;

	public constructor(public side: "l" | "r") {
		this.mesh = new tr.Mesh(Tree.geos[0], Tree.mtl);
		this.mesh.rotation.x = Math.PI * -.5
	}

	reset(z: number) {
		let noGround = GameConstant.Map != "shamo"
		Game.inst.scene.add(this.mesh);
		let scale = noGround ? Utils.randomRange(4, 6) : Utils.randomRange(.5, 1.5);
		this.mesh.geometry = Utils.randomInArr(Tree.geos);
		this.mesh.scale.setScalar(GameConstant.FBXScale * scale);
		this.mesh.rotation.z = Math.random() < .5 ? Math.PI : 0;
		this.mesh.position.y = noGround ? (-14 + scale * Utils.randomRange(-5, 0)) : -GameConstant.BallR;
		this.mesh.position.z = z;
		if (noGround) {
			this.mesh.position.x = Utils.randomRange(-4, 4) + (this.side == "l" ? -1 : 1) * (10 + scale * 1.2);
		} else {
			this.mesh.position.x = Utils.randomRange(-2, 2) + (this.side == "l" ? -12 : 12);
		}
	}

	dispose() {
		Game.inst.scene.remove(this.mesh);
	}

	static init() {
		this.mtl = this.mtl || new tr.MeshPhongMaterial();
		this.geos.length = 0;
		
		let mtlDone = false;
		let arr = Res3DManager.getFBX(`${GameConstant.Map}.fbx`).children
		arr.forEach((i => {
			let fbx = i as tr.Mesh;
			if (i.name.indexOf("baijian_") == 0) {
				this.geos.push(fbx.geometry as any);
				!mtlDone && (mtlDone = true, this.mtl.map = (fbx.material as tr.MeshPhongMaterial).map);
			}
		}))
	}
}