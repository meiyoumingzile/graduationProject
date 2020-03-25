class WindLine extends PoolObject {

	trail: Trail;
	position: tr.Vector3;

	speed = 40;

	public constructor() {
		super();

		this.trail = new Trail(50, .1);
	}

	name() {
		return "WindLine";
	}

	reset() {
		Game.inst.scene.add(this.trail.mesh)
		Game.inst.addTickObject(this);
		this.trail.reset();
		this.trail.mesh.material = WindLine.mtl;
		this.position = this.trail.mesh.position;
		this.position.x = Utils.randomRange(-5, 5);
		this.position.y = Utils.randomRange(3, 5);
		this.position.z = Game.inst.player.group.position.z - 100 - Math.random() * 30;
	}

	dispose() {
		Game.inst.scene.remove(this.trail.mesh)
		super.dispose();
	}

	update(dt: number) {
		this.trail.update();

		let pz = Game.inst.player.group.position.z;

		let dis = Math.abs(this.position.z - pz)
		if (dis < 100) {
			let disRatio = (100 - dis) / 100;
			var x = Math.abs(this.position.x);
			this.position.y += dt * disRatio * disRatio * (20 - x)
		}

		let z = (this.position.z += this.speed * dt);
		return z > pz + 20
	}

	static mtl: tr.MeshBasicMaterial;
	static init() {
		this.mtl = new tr.MeshBasicMaterial({ map: Res3DManager.createTexture("wind-trail.png"), transparent: true, opacity: .6, side: tr.DoubleSide })
		ObjectPool.inst.register(WindLine, 5);
	}
}