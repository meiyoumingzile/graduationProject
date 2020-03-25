class RobotCtr {
	public constructor() {
		for (let i = 0; i < GameConstant.PlayersCount - 1; ++i) {//
			this.robots[i] = new Robot();
			this.ranks.push(this.robots[i]);
		}
		this.ranks.push(Game.inst.player);
	}

	robots: Robot[] = [];
	_boostRateSum = 0;
	_targetImg = new ImgOfTargetToSurpass();
	_crown = new Crown();
	reset() {
		let aiLvs: number[] = [];
		for (let i = 0; i < 2; ++i) {
			aiLvs.push(0);
		}
		for (let i = 0; i < 5; ++i) {
			aiLvs.push(1);
		}
		for (let i = 0; i < 4; ++i) {
			aiLvs.push(2);
		}
		let tough: boolean[] = [];
		for (let i = 0; i < Game.inst.lvlCfg.partnernum[0]; ++i) {
			tough[i] = true;
		}
		for (let i = tough.length; i < GameConstant.PlayersCount; ++i) {
			tough[i] = false;
		}
		Utils.makeArrayRandom(aiLvs);
		Utils.makeArrayRandom(tough);
		let roadLen = GameConstant.TrackLength - 1;
		let range = roadLen - roadLen / GameConstant.BaseSpeed * GameConstant.BaseSpeedRobot
		let gap = GameConstant.RobotGap;//range / this.robots.length;
		this.robots.forEach((r, i) => {
			r.aiLv = aiLvs[i];
			r.isTough = tough[i];
			r.reset();
			r.group.position.z = -gap * (i + 1)
			r.group.position.x = Utils.randomRange(-5 + GameConstant.BallR, 5 - GameConstant.BallR);
			r.group.visible = true;
			r.setRobotInfo(app.status.localRobotData[i], this.robots.length - i);
		})
		this._targetImg.setTarget(null);
		this._crown.setTarget(null);
	}

	ranks: PlayerBase[] = [];
	updateRanks(force = false) {
		if (!Game.inst.complete || force) {
			this.ranks.sort((a, b) => a.group.position.z - b.group.position.z);
			this.ranks.forEach((p, i) => {
				p.rank = i;
				(p instanceof Robot) && (p._namePlane.text = Utils.getRankNumberText(i + 1));
			})
			let ahead = Game.inst.player.rank - 1;
			let r = this.ranks[ahead] as Robot;
			if (r && r._active && ahead != 0) {
				this._targetImg.setTarget(r);
			} else {
				this._targetImg.setTarget(null);
			}
			this._crown.setTarget(this.ranks[0]);
		}
	}

	visible(v: boolean) {
		this.robots.forEach(r => {
			r.group.visible = v;
		});
	}

	getRobotsMtls() {
		let ret: tr.Material[] = [
			this._targetImg._mesh.material as tr.Material,
			this._crown.mesh.material as tr.Material,
		]
		this.robots.forEach(r => {
			ret.push(r.ball.material as tr.Material);
			ret.push(r._namePlane.mesh.material as tr.Material);
		})
		return ret;
	}

	allSlowDown() {
		this.robots.forEach(r => {
			r.slowDown();
		})
		this.updateRanks(true);
	}

	_rankInterval = .5;
	update(dt: number) {
		this.robots.forEach(r => {
			r.update(dt);
		})
		this._crown.update(dt);

		if ((this._rankInterval -= dt) < 0) {
			this._rankInterval = .5;
			this.updateRanks();

			let view = app.ui.getPopup(GameView)
			view && (view.txt_ranking.text = Utils.getRankNumberText(Game.inst.player.rank + 1));
		}
		this._targetImg.update();
	}
}