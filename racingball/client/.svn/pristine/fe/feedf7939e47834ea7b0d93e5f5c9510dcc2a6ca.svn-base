
enum ObstacleType {
	empty,
	slope,
	box,
	movingBox,
	gate,
	border,
	random,
	max
}

enum Obstacles {
	box,
	ramp_0,
	ramp_1,
	ramp_2,
	ramp_3,
	ramp_4,
	ramp_5,
	gate_0,//2格高
	gate_1,//3
	gate_2,//4
	gateL_0,//比 gate0 缺少右腿
	gateL_1,
	gateL_2,
	I_0,//I 2
	I_1,//[1,3]
	I_2,
	L_0,//L:[2, 2]
	L_1,//顺时针旋转过的 L[2, 2]
	L_2, //[2,3]
	L_3,
	L_4,//上下翻转的 L 4
	T_0,//右 土
	T_1,//上下翻转的 L
	T_2,//R 土 4
	T_3,//R 土 4
}

class ObstacleCtr {
	public constructor() {
		ObjectPool.inst.register(ObsBox, 20);
		ObjectPool.inst.register(ObsSlope, 5);
	}

	groups = {
		[ObstacleType.empty]: [
			[null, null, null, null, null, null]
		],
		[ObstacleType.slope]: [
			[null, null, [Obstacles.ramp_0], null, null]
		],
		[ObstacleType.box]: [
			[null, [Obstacles.box, 2], null, [Obstacles.box, 3], null, [Obstacles.box, 0], null],
			[null, [Obstacles.box, 3], null, [Obstacles.box, 1], null, [Obstacles.box, 4], null],
			[null, [Obstacles.box, 4], null, [Obstacles.box, 2], null],
			[null, [Obstacles.box, 2], null, [Obstacles.box, 0], null],
		],
		[ObstacleType.movingBox]: [
			[null, [Obstacles.box, 1, 0], null, [Obstacles.box, 1, 1], null, [Obstacles.box, 1, 0], null],
			[null, [Obstacles.box, 1, 0], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 1, 1], null, [Obstacles.box, 3], null],
			[null, [Obstacles.box, 1, 0], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 2], null, [Obstacles.box, 1, 1], null],
			[null, [Obstacles.box, 0, 1], null, [Obstacles.box, 3], null, [Obstacles.box, 0], null],
			[null, [Obstacles.box, 1], null, [Obstacles.box, 0, 1], null, [Obstacles.gateL_0, 3], null],
			[null, [Obstacles.box, 2], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 0], null]
		],
		[ObstacleType.border]: [
			[null, [Obstacles.I_0, 0], null, [Obstacles.T_0, 1], null, [Obstacles.L_0, 0], null, null],
			[null, [Obstacles.I_0, 1], null, [Obstacles.L_1, 0], null, [Obstacles.L_2, 1], null, null],
			[null, [Obstacles.I_2, 0], null, [Obstacles.T_2, 1], null, [Obstacles.L_0, 0], null, [Obstacles.L_4, 1], null],
			[null, [Obstacles.I_1, 1], null, [Obstacles.I_0, 0], null, [Obstacles.L_3, 1], null, [Obstacles.T_1, 1], null],
			[null, [Obstacles.L_2, 0], null, [Obstacles.I_1, 1], null, [Obstacles.L_3, 0], null, [Obstacles.T_0, 1], null],
			[null, [Obstacles.I_2, 1], null, [Obstacles.L_3, 0], null, [Obstacles.I_1, 1], null, [Obstacles.T_1, 0], null],
		],
		[ObstacleType.gate]: [
			[null, [Obstacles.gate_0], null, [Obstacles.gate_1], null, [Obstacles.gate_2], null, [Obstacles.L_1, 0], null],
			[null, [Obstacles.gate_2], null, [Obstacles.gateL_2, 1], null, [Obstacles.gateL_1, 1], null, [Obstacles.gateL_2, 0], null],
			[null, [Obstacles.gateL_1, 0], null, [Obstacles.gate_1], null, [Obstacles.gateL_2, 0], null, [Obstacles.gate_2], null],
			[null, [Obstacles.L_3, 0], null, [Obstacles.gateL_0], null, [Obstacles.gateL_2, 1], null, [Obstacles.L_4, 0], null],
			[null, [Obstacles.I_2, 0], null, [Obstacles.gate_0], null, [Obstacles.gateL_2, 1], null, [Obstacles.L_4, 0], null]
		]
	}

	compound = {
		[Obstacles.box]: [[0]],
		[Obstacles.ramp_0]: [[0, 1], [1, 1], [2, 0], [3, 1], [4, 1]],
		[Obstacles.ramp_1]: [[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]],
		[Obstacles.ramp_2]: [[0, 0], [1, 0], [2, 0], [3, 1], [4, 1]],
		[Obstacles.ramp_3]: [[0, 0], [1, 0], [2, 1], [3, 1], [4, 0]],
		[Obstacles.ramp_4]: [[0, 0], [1, 1], [2, 1], [3, 0], [4, 0]],
		[Obstacles.ramp_5]: [[0, 1], [1, 1], [2, 0], [3, 0], [4, 0]],
		[Obstacles.gate_0]: [[0], [5], [6], [7], [8], [9], [4]],
		[Obstacles.gate_1]: [[0], [5], [10], [11], [12], [13], [14], [9], [4]],
		[Obstacles.gate_2]: [[0], [5], [10], [15], [16], [17], [18], [19], [14], [9], [4]],
		[Obstacles.gateL_0]: [[0], [5], [10], [15], [16], [17], [18], [19]],
		[Obstacles.gateL_1]: [[0], [5], [10], [11], [12], [13], [14]],
		[Obstacles.gateL_2]: [[0], [5], [6], [7], [8], [9]],
		[Obstacles.I_0]: [[0], [5]],
		[Obstacles.I_1]: [[0], [5], [10]],
		[Obstacles.I_2]: [[0], [5], [10], [15]],
		[Obstacles.L_0]: [[0], [5], [1]],
		[Obstacles.L_1]: [[0], [5], [6]],
		[Obstacles.L_2]: [[0], [5], [10], [1]],
		[Obstacles.L_3]: [[0], [5], [10], [15], [1]],
		[Obstacles.L_4]: [[0], [5], [10], [15], [16]],
		[Obstacles.T_0]: [[0], [5], [10], [6]],
		[Obstacles.T_1]: [[0], [5], [10], [11]],
		[Obstacles.T_2]: [[0], [5], [10], [15], [6]],
		[Obstacles.T_3]: [[0], [5], [10], [15], [11]],
	}

	collisions = {
		[Obstacles.ramp_0]: [[0]],
		[Obstacles.ramp_1]: [[-2], [2]],
		[Obstacles.ramp_2]: [[-2, -1, 0]],
		[Obstacles.ramp_3]: [[-2, -1], [2]],
		[Obstacles.ramp_4]: [[-2], [1, 2]],
		[Obstacles.ramp_5]: [[0, 1, 2]],
		[Obstacles.gate_0]: [[-2], [2]],
		[Obstacles.gate_1]: [[-2], [2]],
		[Obstacles.gate_2]: [[-2], [2]],
		[Obstacles.L_0]: [[-2, -1]],
		[Obstacles.L_2]: [[-2, -1]],
		[Obstacles.L_3]: [[-2, -1]],
	}

	private getObstacleParts(t: Obstacles) {
		// t = Obstacles.T_1;
		let ret: ObsPart[] = [];
		let cfgs = this.compound[t];
		cfgs.forEach(cfg => {
			let [pos, isSlope] = cfg;
			let box = ObjectPool.inst.get(isSlope ? ObsSlope : ObsBox);
			box.reset();
			box.mesh.position.x = (pos % 5) * 2;
			box.mesh.position.y = Math.floor(pos / 5) * 2;
			ret.push(box);
		})
		return ret;
	}

	static getObsX(i: number) {
		let n = i = i < 0 ? 0 : i > 4 ? 4 : i;
		return 2 * n - 4;
	}

	private Gap = 5;
	private _z = 0;
	private _obstacles: (Obstacle | Booster)[] = [];
	private _obstaclesMap: { [k: number]: Obstacle | Booster };
	private _protectCount = 5;
	private _currentCfg: number[][] = [];
	private _currentCfgIndex = 0;

	private BoosterGen = 5;
	private _boosterGen: number;
	reset() {
		this._z = 0;
		egret.log("obs dispose", this._obstacles.length)
		this._obstacles.forEach(o => {
			o.dispose();
		})
		this._obstacles.length = 0;
		this._obstaclesMap = {};
		this._protectCount = 5
		this._currentCfg.length = 0;
		this._currentCfgIndex = 0;
		this._boosterGen = this.BoosterGen;

		if (Game.inst.player.group.position.z < 0) egret.error("reset Player first");
		this.update(1);
	}

	update(dt: number) {
		let z = Game.inst.player.group.position.z;
		// while (this._z > z - this.Gap * 20 && this._z - this.Gap > -GameConstant.TrackLength) {
		while (this._z > z - this.Gap * 20 ) {
			this._z -= this.Gap;
			this.createOne(this._z);
		}

		for (let i = 0; i < this._obstacles.length; ++i) {
			let obs = this._obstacles[i];
			if (obs.update(dt)) {
				obs.dispose();
				this._obstacles.splice(i--, 1);
			}
		}
	}

	getObstaclePage(z: number) {
		return Math.floor(z / this.Gap);
	}

	getObstacleByPage(page: number) {
		return this._obstaclesMap[page];
	}

	deleteObstacleOfPage(page: number) {
		delete this._obstaclesMap[page];
	}

	private getNextObstacleType() {
		let weight = Game.inst.lvlCfg.weight;
		let sum = 0;
		weight.forEach(n => sum += n);
		let rand = Math.random() * sum;
		let t = weight.findIndex(n => {
			return (rand -= n) < 0
		})
		// console.log("weight t:", t, ObstacleType.max);
		return t;
		// return Utils.randomInt(0, ObstacleType.max);
	}

	private createARandomGroup() {
		let r: number[][] = [];
		for (let t = Utils.randomInt(1, 3); t >= 0; t--) {
			r.push(null)
			if (Math.random() < .5) {
				r.push([Obstacles.box, Utils.randomInt(0, 5)]);
			} else {
				r.push([Obstacles.box, Math.round(Math.random()), Math.round(Math.random())]);
			}
		}
		return r;
	}

	private createOne(z: number) {
		if (this._protectCount > 0) {
			this._protectCount--;
			if (this._protectCount == 1) this.createBooster(z);
			return;
		}
		this._protectCount = 4;

		if (!this._currentCfg.length || this._currentCfgIndex >= this._currentCfg.length) {
			let type = this.getNextObstacleType();
			this._currentCfg = type == ObstacleType.random ? this.createARandomGroup() : Utils.randomInArr(this.groups[type])
			this._currentCfgIndex = 0;
		}

		let cfg = this._currentCfg[this._currentCfgIndex++];
		if (!cfg) return;

		let obs = ObjectPool.inst.get(Obstacle);
		this._obstaclesMap[(z / this.Gap) | 0] = obs;
		this._obstacles.push(obs);

		let t = cfg[0] as Obstacles;
		let x: number;
		let flip = false;
		let collisions: number[][];
		let moving = cfg.length > 2;
		let slope = false;
		if (t == Obstacles.ramp_0) {

			t = Utils.randomInt(Obstacles.ramp_0, Obstacles.ramp_5 + 1);
			x = ObstacleCtr.getObsX(0)
			slope = true;
		} else if (t == Obstacles.box) {

			collisions = [[(cfg[1] || 0) - 2]];
			x = ObstacleCtr.getObsX(cfg[1] || 0)
		} else {

			flip = !!cfg[1] || true;
			x = ObstacleCtr.getObsX(flip ? 4 : 0)
		}
		let boxes = this.getObstacleParts(t);
		obs.reset(boxes, z, x, flip, collisions || this.collisions[t] || [[-2]]);
		moving && obs.startMoving(cfg[1], !!cfg[2]);
		obs.slope = slope;
		obs.lowGate = (t == Obstacles.gate_0) || (t == Obstacles.gateL_2)
	}

	private createBooster(z: number) {
		if (--this._boosterGen > 0) {
			return;
		}
		this._boosterGen = this.BoosterGen;

		let i = ObjectPool.inst.get(Booster);
		i.reset(z);
		this._obstaclesMap[(z / this.Gap) | 0] = i;
		this._obstacles.push(i);
	}
}

class ObsPart extends PoolObject {
	mesh: tr.Mesh;
	static size = 1.8

	constructor() {
		super();
	}

	reset() {

	}

	name() {
		return "ObsPart"
	}
}

class ObsBox extends ObsPart {

	constructor() {
		super();
		this.mesh = new tr.Mesh(Obstacle.geoBox, Obstacle.mtl);
		this.mesh.scale.setScalar(GameConstant.ObsScale);
		this.mesh.rotation.x = -Math.PI * .5;
	}

	reset() {
		this.mesh.geometry = Obstacle.geoBox;
	}

	name() {
		return "ObsBox"
	}
}

class ObsSlope extends ObsPart {

	constructor() {
		super();
		this.mesh = new tr.Mesh(Obstacle.geoSlope, Obstacle.mtl);
		this.mesh.scale.setScalar(GameConstant.ObsScale);
		this.mesh.rotation.x = -Math.PI * .5;
	}

	reset() {
		this.mesh.geometry = Obstacle.geoSlope;
	}

	name() {
		return "ObsSlope"
	}
}