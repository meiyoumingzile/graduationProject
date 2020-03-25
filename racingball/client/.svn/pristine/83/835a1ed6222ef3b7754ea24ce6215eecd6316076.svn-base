class Booster extends PoolObject {
	public constructor() {
		super();
		this.mesh = new tr.Mesh(Obstacle.geoBooster, Obstacle.mtl);
		this.mesh.scale.setScalar(GameConstant.ObsScale);
		this.mesh.position.y = -GameConstant.BallR - .1;
		this.mesh.rotation.x = -Math.PI * .5;
		this.position = this.mesh.position;
	}

	name() {
		return "Booster";
	}

	mesh: tr.Mesh;
	position: tr.Vector3;
	collisions: number[][];
	reset(z: number) {
		let c = Utils.randomInt(-2, 3);
		this.collisions = [[c]];
		this.mesh.position.x = ObstacleCtr.getObsX(c + 2);
		this.mesh.position.z = z;
		Game.inst.scene.add(this.mesh);
		Game.inst.addTickObject(this);
	}

	update(dt: number) {
		return this.mesh.position.z > Game.inst.cameraPos.z + 1;
	}

	dispose() {
		Game.inst.scene.remove(this.mesh);
		super.dispose();
	}

	static init() {
		ObjectPool.inst.register(Booster, 2);
	}
}