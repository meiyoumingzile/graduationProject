class RoadSegment extends PoolObject {
	mesh: tr.Mesh;
	static geo: tr.Geometry;
	static mtl: tr.MeshBasicMaterial;
	height = RoadSegment.height;
	public constructor() {
		super();
		this.mesh = new tr.Mesh(RoadSegment.geo, RoadSegment.mtl);
		this.mesh.rotateX(Math.PI * -.5);
		this.mesh.position.y = -GameConstant.BallR;
	}

	name() {
		return "RoadSegment";
	}

	reset(z: number) {
		Game.inst.scene.add(this.mesh);
		this.mesh.position.z = z;
	}

	dispose() {
		Game.inst.scene.remove(this.mesh);
		super.dispose()
	}

	static height = 10
	static init() {
		this.geo = new tr.PlaneGeometry(this.height, this.height, 2, 2);
		let tex = Res3DManager.createTexture(`lane_${GameConstant.Map}.jpg`, GameConstant.Anisotropy);
		Game.inst.world.renderer.getMaxAnisotropy() == 0 && GameConstant.Map == "shamo" && (tex.minFilter = tex.magFilter = tr.NearestFilter)
		this.mtl = new tr.MeshBasicMaterial({ map: tex });
		ObjectPool.inst.register(RoadSegment, 20);
	}
}