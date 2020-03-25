class PlayerDieFx extends PoolObject {
	public constructor() {
		super();

		this.haloMtl = new tr.SpriteMaterial({ map: PlayerDieFx.texHalo });
		this.splatters1Mtl = new tr.SpriteMaterial({ map: PlayerDieFx.texSplatter });
		this.splatters2Mtl = new tr.MeshBasicMaterial({ map: PlayerDieFx.texSplatter, transparent: true });

		this.halo = new tr.Sprite(this.haloMtl);
		this.group.add(this.halo);

		for (let i = 0; i < 5; ++i) {
			let spr = new tr.Sprite(this.splatters1Mtl);
			this.group.add(spr);
			this.splatters1.push(spr);
		}
		for (let i = 0; i < 4; ++i) {
			let mesh = new tr.Mesh(PlayerDieFx.geoPlane, this.splatters2Mtl);
			mesh.rotateX(Math.PI * -.5);
			this.group.add(mesh);
			this.splatters2.push(mesh);
		}

	}

	name() {
		return "PlayerDieFx";
	}

	halo: tr.Sprite;
	splatters1: tr.Sprite[] = [];
	splatters2: tr.Mesh[] = [];

	haloMtl: tr.SpriteMaterial;
	splatters1Mtl: tr.SpriteMaterial;
	splatters2Mtl: tr.MeshBasicMaterial;

	ticker = new Ticker(this.update, this);
	group: tr.Group = new tr.Group();

	static texHalo: tr.Texture;
	static texSplatter: tr.Texture;
	static geoPlane: tr.PlaneGeometry;
	static init() {
		this.texHalo = Res3DManager.createTexture("fx-die1.png")
		this.texSplatter = Res3DManager.createTexture("fx-die2.png")
		this.geoPlane = new tr.PlaneGeometry(1, 1);
		ObjectPool.inst.register(PlayerDieFx, 1);
	}

	reset(px: number, pz: number) {
		Game.inst.scene.add(this.group)
		this.group.position.set(px, -GameConstant.BallR + .05, pz);

		let scale2 = 3;
		this.halo.scale.setScalar(1);
		this.haloMtl.opacity = 1;
		egret.Tween.get(this.halo.scale).to({ x: scale2, y: scale2, z: scale2 }, 200, egret.Ease.quadOut)
		egret.Tween.get(this.haloMtl).wait(100).to({ opacity: 0 }, 100);
		
		this.splatters2Mtl.opacity = 1;
		egret.Tween.get(this.splatters2Mtl).wait(1000).to({ opacity: 0 }, 500).call(this.dispose, this);
		this.splatters2.forEach(mesh => {
			mesh.position.x = Utils.randomRange(-.5, .5);
			mesh.position.z = Utils.randomRange(-.5, .5);
		})

		this.splatters1.forEach(spr => {
			spr['dirx'] = Utils.randomRange(-1, 1);
			spr['diry'] = Math.random();
			spr['dist'] = Utils.randomRange(2, 5);
		})
		this.elapsed = 0;
		this.ticker.start();

		Game.inst.materialCtr.add(this.haloMtl);
		Game.inst.materialCtr.add(this.splatters1Mtl);
		Game.inst.materialCtr.add(this.splatters2Mtl);
	}

	elapsed = 0;
	time = .15;
	update(dt: number) {
		this.elapsed += dt * .001;
		let prg = this.elapsed / this.time;
		if (prg > 1) {
			prg = 1
			this.ticker.stop();
		}
		this.splatters1.forEach(spr => {
			spr.position.x = spr['dirx'] * spr['dist'] * prg;
			spr.position.y = spr['diry'] * spr['dist'] * prg;
			spr.scale.setScalar(1 - prg * .8);
		})
		this.splatters1Mtl.opacity = 1 - prg;
	}

	dispose() {
		Game.inst.scene.remove(this.group)

		Game.inst.materialCtr.remove(this.haloMtl);
		Game.inst.materialCtr.remove(this.splatters1Mtl);
		Game.inst.materialCtr.remove(this.splatters2Mtl);

		super.dispose();
	}
}