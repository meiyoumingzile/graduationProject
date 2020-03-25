class PlayerBase {
	group: tr.Group;
	group2: tr.Group;
	ball: tr.Mesh;
	trail: Trail;
	rank: number;

	public constructor() {
		let fbx = Res3DManager.getMeshFromFBX("ball_1", "ball.fbx");
		let ballGeo = fbx.geometry
		let ballMtl = new tr.MeshPhongMaterial({ map: Res3DManager.createTexture("ball.jpg") })
		this.ball = new tr.Mesh(ballGeo, ballMtl);
		this.ball.scale.setScalar(GameConstant.FBXScale);
		
		this.group = new tr.Group();
		Game.inst.scene.add(this.group);
		this.group2 = new tr.Group();
		this.group.add(this.group2)
		this.group2.add(this.ball);

		this.trail = new Trail();
		this.trail.mesh.position.y = -GameConstant.BallR + .05;
		this.trail.mesh.position.z = -.3;
		this.group2.add(this.trail.mesh)

		!PlayerBase.shadowGeo && (PlayerBase.shadowGeo = new tr.PlaneGeometry(1, 1));
		!PlayerBase.shadowMtl && (PlayerBase.shadowMtl = new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("shadow.png") }))
		let shadow = new tr.Mesh(PlayerBase.shadowGeo, PlayerBase.shadowMtl);
		shadow.position.y = -GameConstant.BallR + .1;
		shadow.rotation.x = -Math.PI * .5;
		this.group.add(shadow);

		this.reset();
	}
	static shadowGeo: tr.Geometry;
	static shadowMtl: tr.Material;

	oldFBXs = ['3', '5', '6']
	setSkin(id: number, render = true) {
		let cfg = DB_skin.get(id);
		let fbx = Res3DManager.getMeshFromFBX(`ball_${cfg.fbx}`, "ball.fbx");
		this.ball.geometry = fbx.geometry;
		this.ball.scale.setScalar(this.oldFBXs.includes(cfg.fbx) ? GameConstant.FBXScale * 5.5 / 8 : GameConstant.FBXScale);
		this.ball.rotation.y = 0;
		Res3DManager.getImage(cfg.tex) || Res3DManager.preload(null, "skin/" + cfg.tex);
		Res3DManager.createTextureAsync(cfg.tex).then(tex=>{
			(this.ball.material as tr.MeshBasicMaterial).map = tex;
			render && Game.inst.world.render()
		})
	}

	_speed: number;
	_invincible = false;
	reset() {
		this.ball.rotation.x = -.5 * Math.PI;
		this.group2.position.y = 0;
		this.group.position.set(0, 0, 0);
		this.trail.reset();
		this._obsPage = Infinity;
		this._obsCrt = undefined;
		this.boost = 0;
		this.dead = false;
		this._invincible = false;
		this._speed = GameConstant.BaseSpeed;
		this._slowdown = false;
		this.group.visible = true;
	}

	private BoostFXInterval = .15;
	private boostFXInterval = 0;
	private BoostTime = 1.5;
	private boostTime = 0;
	boost = 0;
	boostLevel = 0;
	onBoostChange() {
		this.boost > 1 && (this.boost = 1)
		this.boostTime = this.boost > 0 ? this.BoostTime : 0;
	}

	onHitBoost() {

	}

	updateBoost(dt: number) {
		if (this.boost > 0 && (this.boostFXInterval -= dt) <= 0) {
			this.boostFXInterval = this.BoostFXInterval;
			let spr = ObjectPool.inst.get(PlayerBoostSprite);
			spr.reset();
			this.group.add(spr.sprite);
		}
		if (this.boostLevel > this.boost) {
			this.boostLevel -= dt;
		}
		if (this.boostLevel < this.boost) {
			this.boostLevel = this.boost;
		}
		if (this.boost > 0 && this.boostTime > 0 && (this.boostTime -= dt) <= 0) {
			this.boost--;
			this.onBoostChange();
		}
	}

	_slowdown = false;
	slowDown() {
		this._slowdown = true;
	}

	update(dt: number) {
		this.updateZ(dt);
		this.updateBoost(dt);
		this.checkCollision();
		this.updateJump(dt);

		this.trail.update()
	}

	updateZ(dt: number) {
		let moved = dt * this.currentSpeed;
		this._slowdown && this._speed > 0 && (this._speed -= 30 * dt, this._speed < 0 && (this._speed = 0))
		this.group.position.z -= moved;
		this.ball.rotation.x -= moved * .5
	}

	get currentSpeed() {
		return this._speed + this.boostLevel * GameConstant.PlayerBoostLevelSpeed
	}

	_jumpUpTime = 0
	_speedY = 0
	_jumping = false;
	jump() {
		let spd = this.currentSpeed;
		this._jumpUpTime = 2 / spd;
		this._speedY = spd / 2;
		this._jumping = true;
	}

	updateJump(dt: number) {
		if (!this._jumping) return;

		if (this._jumpUpTime > 0) {
			this._jumpUpTime -= dt;
		} else {
			this._speedY -= 300 * dt;
		}
		this.group2.position.y += this._speedY * dt;
		if (this.group2.position.y < 0) {
			this.group2.position.y = 0;
			this._speedY *= -.6
			if (this._speedY < 10) {
				this._speedY = 0;
				this._jumping = false;
			}
		}
	}

	dead = false;
	die(noAnim = false) {
		if (this.dead) return false;
		this.dead = true;
		this._jumping = false;
		this.group.visible = false;
		this.boost = this.boostLevel = 0;

		noAnim || this._obsCrt && ObjectPool.inst.get(PlayerDieFx).reset(this.group.position.x, this._obsCrt.position.z + 1.1);
		return true;
	}

	protected _obsPage: number;
	private _obsCrt: Obstacle | Booster;
	checkCollision() {
		let pos = this.group.position;
		let page = Game.inst.obstacleCtr.getObstaclePage(pos.z);
		if (this._obsPage > page) {
			this._obsCrt && this.hitTestX(); //跳过了没检测到，补上
			this._obsCrt = Game.inst.obstacleCtr.getObstacleByPage(page);
			this._obsPage = page;
		}
		if (this._obsCrt) {
			let zOffset = Math.abs(this._obsCrt.position.z - pos.z);
			if (zOffset > GameConstant.BallR + GameConstant.ObsSize * .5 + .5) return; //适当扩大检测范围

			this.hitTestX();
			this._obsCrt = null;
		}
		if (this.dead) { //后退至少2格
			this._obsCrt = null;
			this._obsPage += 2;
		}
	}

	hitTestX() {
		let ranges = this.getCollisionXRange(this._obsCrt.collisions);
		if (this._obsCrt instanceof Booster) {
			let x = this.group.position.x;
			let hit = ranges.some(range => {
				return x > range.min && x < range.max;
			})
			if (hit) {
				this.boost++;
				this.onBoostChange();
				this.onHitBoost();
			}
		} else {
			let xL = this.group.position.x - GameConstant.BallR;
			let xR = this.group.position.x + GameConstant.BallR;
			this._obsCrt.moving && (ranges = [{
				min: this._obsCrt.position.x - 1,
				max: this._obsCrt.position.x + 1
			}])
			let hit = ranges.some(range => {
				return xL > range.min && xL < range.max || xR > range.min && xR < range.max;
			})
			if (hit) {
				this._invincible || this.die();
			} else if (this._obsCrt.slope) {
				this.jump();
			}
		}
	}

	// -2, 2
	getCollisionXRange(arr: number[][]) {
		let ret: { min: number, max: number }[] = [];
		arr.forEach(ar => {
			let min = Infinity, max = -Infinity;
			ar.forEach(n => {
				let x0 = n * 2 - 1;
				let x1 = n * 2 + 1;
				x0 < min && (min = x0);
				x1 > max && (max = x1);
			})
			ret.push({ min, max })
		})
		return ret;
	}
}