class PlayerBoostSprite extends PoolObject {

	sprite: tr.Mesh;

	public constructor() {
		super();
		this.sprite = new tr.Mesh(PlayerBoostSprite.geo, new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("fx-boost.png"), blending: tr.AdditiveBlending }));
		this.sprite.position.y = .1;
	}
	static geo: tr.PlaneGeometry;

	name() {
		return "PlayerBoostSprite"
	}

	static init() {
		this.geo = new tr.PlaneGeometry(1, 1);
		ObjectPool.inst.register(PlayerBoostSprite, 10);
	}

	reset() {
		Game.inst.scene.add(this.sprite);
		!Game.inst.materialCtr.hasAdd(this.sprite.material as tr.Material) && Game.inst.materialCtr.add(this.sprite.material as tr.Material);
		let sl0 = 1.5
		let sl1 = 1.6;
		let sl2 = .5;
		let t = 400;
		(this.sprite.material as tr.MeshBasicMaterial).opacity = .4;
		this.sprite.scale.setScalar(sl0);
		this.sprite.position.z = -.5;
		egret.Tween.get(this.sprite.position).to({ z: 2 }, t);
		egret.Tween.get(this.sprite.material).to({ opacity: 1 }, t / 4).wait(t / 2).to({ opacity: 0 }, t / 4);
		egret.Tween.get(this.sprite.scale).
			to({ x: sl1, y: sl1, z: sl1 }, t / 3).
			to({ x: sl2, y: sl2, z: sl2 }, t * 2 / 3).
			wait(50).call(() => {
				this.dispose()
			})
	}

	dispose() {
		Game.inst.scene.remove(this.sprite);
		super.dispose()
	}
}