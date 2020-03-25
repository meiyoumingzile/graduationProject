class Robot extends PlayerBase {
	public constructor() {
		super();
		this._namePlane.mesh.position.y = 1.2;
		this.group2.add(this._namePlane.mesh);
	}
	_namePlane = new TextPlane(.5, 64, 0xffffff);
	aiLv: number;
	isTough = false;
	_tailingInfo: { remaining: number, zOffset: number }
	_avoidRate = 1
	_boostRate = 2
	_tailerTimeMin: number;
	_tailerTimeMax: number;
	reset() {
		super.reset();

		this._active = this.group.visible = false;
		this._speed = GameConstant.BaseSpeedRobot;

		this.setSkin(Utils.randomInt(1, app.status.skinItemData.length), true);

		this._avoidRate = Game.inst.lvlCfg.obstacle[this.aiLv];
		this._boostRate = Game.inst.lvlCfg.speedup[this.aiLv];
		this._tailerTimeMin = Game.inst.lvlCfg.partnernum[1];
		this._tailerTimeMax = Game.inst.lvlCfg.partnernum[2];
		this._roamInfo = undefined;
	}

	robotInfo: RobotInfo;
	setRobotInfo(d: RobotInfo, idx: number) {
		this.robotInfo = d;
		// this._namePlane.text = idx.toString();
	}

	_active = false;
	update(dt: number) {
		if (this.dead) return;

		let active = Utils.isInRange(this.group.position.z, Game.inst.cameraPos.z - 100, Game.inst.cameraPos.z + 5);
		let behind = this.group.position.z >= Game.inst.cameraPos.z;
		if (this._active != active) {
			this._active = active;
			this.group.visible = active;

			if (active) {
				this.trail.reset()
			}
		}

		if (!active) {
			if (behind) {
				if (this._tailingInfo) {
					this.updateTailingInfo(dt);
				} else if (this.boost) { //no collision check
					this.updateZ(dt);
					this.updateBoost(dt);
				} else if (this.isTough) {
					// egret.log("tailer set");
					this._tailingInfo = {
						remaining: Utils.randomRange(this._tailerTimeMin, this._tailerTimeMax),
						zOffset: Utils.randomRange(10, 25)
					}
				} else {
					this.die(true)
				}
			} else { //ahead of me
				this.updateZ(dt);
				this.updateBoost(dt);
			}
		} else {
			this.checkObstacles();
			this.updateMoveTo(dt);
			this.updateRoaming(dt);

			this.updateZ(dt);
			this.updateBoost(dt);
			this.group.position.z > Game.inst.cameraPos.z - 70 && this.checkCollision();
			this.updateJump(dt);
			this.trail.update()
		}
	}

	_pageChecked: number;
	_moveToOnPage: {
		page: number,
		x: number,
	};
	checkObstacles() {
		let page = Game.inst.obstacleCtr.getObstaclePage(this.group.position.z);
		if (this._moveToOnPage && this._moveToOnPage.page == page) {
			this.resetRoaming();
			this.moveTo(this._moveToOnPage.x);
			this._moveToOnPage = undefined;
		}

		let pageToCheck = page - 3;
		let obs = Game.inst.obstacleCtr.getObstacleByPage(pageToCheck);
		if (!obs || pageToCheck == this._pageChecked) return;
		this._pageChecked = pageToCheck;
		this._moveToOnPage = undefined;
		if (obs instanceof Booster) {
			if (Math.random() > this._boostRate) return;

			let obsCrt = Game.inst.obstacleCtr.getObstacleByPage(page);
			if (!obsCrt) {
				this.resetRoaming();
				this.moveTo(obs.position.x + Utils.randomRange(-.4, .4));
			} else {
				this._moveToOnPage = { page: page - 1, x: obs.position.x + Utils.randomRange(-.4, .4) }
			}
		} else if (obs.moving) {
			if (Math.random() > this._avoidRate) return;

			let dist = this.group.position.z - (obs.position.z + .5);
			let t = dist / this.currentSpeed;
			let obsX = obs.getEstimatedPos(t);
			let to: number;
			if (Math.abs(obsX) > 2.2) {
				to = -obsX
			} else {
				to = obsX > 0 ? -4 : 4;
			}
			this.resetRoaming();
			this.moveTo(to);
		} else {
			let aisles = this._getAisleByCollision(obs.collisions)
			let aisle = aisles.length == 1 ? aisles[0] : Utils.randomInArr(aisles)
			let min = aisle.min + GameConstant.BallR + .1, max = aisle.max - GameConstant.BallR - .1
			if (!Utils.isInRange(this.currentXOrMovingTo(), min, max)) {
				let x = Utils.randomRange(min, max);
				this.resetRoaming();
				this.moveTo(x);
			}
		}
	}

	private _getAisleByCollision(collisions: number[][]) {
		let ret: number[][] = [];
		let brk = true;
		for (let i = -2; i < 3; ++i) {
			if (collisions.some(arr => arr.some(v => v == i))) {
				brk = true;
			} else {
				if (brk) {
					brk = false;
					ret.push([]);
				}
				ret[ret.length - 1].push(i);
			}
		}

		return this.getCollisionXRange(ret);
	}

	_roamInfo: {
		delay: number,
		toX: number,
		duration: number,
	}
	roam() {
		this._roamInfo = {
			delay: Utils.randomRange(2, 4),
			duration: Utils.randomRange(.5, 1),
			toX: Utils.randomRange(-4, 4),
		}
	}

	resetRoaming() {
		this._roamInfo && (this._roamInfo.delay = Utils.randomRange(2, 4))
	}

	updateRoaming(dt: number) {
		if (this._roamInfo) {
			if ((this._roamInfo.delay -= dt) < 0) {
				this.moveTo(this._roamInfo.toX, this._roamInfo.duration);
				this._roamInfo = undefined;
			}
		} else if (this._movedTime >= this._moveTime) { //no moving
			this.roam();
		}
	}

	_moveTime = 0;
	_movedTime = 0;
	_moveDiff: number;
	_moveFrom: number;
	moveTo(x: number, time = 0) {
		this._moveTime = time || Utils.randomRange(.15, .25) - .04 * this.boost;
		this._movedTime = 0;
		this._moveFrom = this.group.position.x;
		this._moveDiff = x - this.group.position.x;
	}

	currentXOrMovingTo() {
		if (this._movedTime < this._moveTime) {
			return this.group.position.x = this._moveFrom + this._moveDiff;
		} else {
			return this.group.position.x;
		}
	}

	stopMoving() {
		this._movedTime = this._moveTime = 0;
	}

	updateMoveTo(dt: number) {
		if (this._movedTime < this._moveTime) {
			this._movedTime += dt;
			if (this._movedTime > this._moveTime) {
				this._movedTime = this._moveTime
			}
			this.group.position.x = this._moveFrom + this._moveDiff * this._movedTime / this._moveTime;
		}
	}

	updateTailingInfo(dt: number) {
		this._tailingInfo.remaining -= dt;
		let bo = -Game.inst.cameraPos.z < GameConstant.TrackLength - 300 || Game.inst.complete
		if (this._tailingInfo.remaining < 0 && bo) {
			this.group.position.z = Game.inst.cameraPos.z + this._tailingInfo.zOffset;

			this.boost = 1;
			this.onBoostChange();

			this._tailingInfo = undefined;
			egret.log("tailer boost");
		}
	}

	slowDown() {
		super.slowDown();
		if (this._tailingInfo) {
			this._tailingInfo.remaining = 0
			this.group.position.z = Game.inst.cameraPos.z + this._tailingInfo.zOffset;
		}
	}

	tryBoost() {
		if (Math.random() > Game.inst.lvlCfg.beyondRate) return false;

		// let arr = Game.inst.lvlCfg.bootsWght;
		// let sum = arr.reduce((a, b) => a + b);
		// let r = Utils.randomRange(0, sum);
		// let s = 0;
		// let boostLv = arr.findIndex(v => {
		// 	return r < (s += v)
		// })
		this.boost = 1;//boostLv + 1;
		this.onBoostChange();

		this.group.position.z -= 3;
		return true;
	}

	die(noAnim = false) {
		Game.inst.nowPlayerCount--;
		if (super.die(noAnim)) {
			noAnim || AudioPlayer.playSound("die-others.mp3")
			return true;
		}
		return false;
	}
}