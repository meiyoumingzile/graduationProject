class MaterialCtr {
	public constructor() {
	}

	_mtls: tr.Material[] = [];
	_uniformValues: tr.Vector4[] = [];

	add(mtl: tr.Material) {
		this._mtls.push(mtl);
	}

	addMulti(mtls: tr.Material[]) {
		this._mtls.push(...mtls);
	}

	hasAdd(mtl: tr.Material) {
		return this._mtls.includes(mtl)
	}

	remove(mtl: tr.Material) {
		this._mtls.rm(mtl);
	}

	_settedup = false;
	setup() {
		if (!this._settedup) {
			this.gotoNextDistOffset();
		};
		this._settedup = true;
		let properties = Game.inst.world.renderer.properties;
		for (let i = 0; i < this._mtls.length; ++i) {
			let shader = properties.get(this._mtls[i]).shader
			if (shader) {
				this._uniformValues.push(shader.uniforms.distOffset.value)
				this._mtls.splice(i--, 1);
			}
		}
	}

	reset() {
		this._uniformValues.forEach(v => {
			v.x = 0;
			v.y = 0;
		})
		this._progress = 0;
		this._distOffsetFrom.set(0, 0, 0, 0);
		this._distOffsetTo.set(0, 0, 0, 0);
	}

	_progress = 0;
	_distOffsetFrom: tr.Vector4 = new tr.Vector4();
	_distOffsetTo: tr.Vector4 = new tr.Vector4();
	_distOffsetCrt: tr.Vector4
	update(dt: number) {
		var t = .02 * Game.inst.player._speed;
		this._progress += dt * .2 * t
		if (this._progress >= 1) {
			this._progress = 0;
			this._distOffsetFrom.copy(this._distOffsetTo);
			this.gotoNextDistOffset();
		}
		this._distOffsetCrt = this._distOffsetFrom.clone().lerp(this._distOffsetTo, this._progress);
		this._uniformValues.forEach(v => {
			v.x = this._distOffsetCrt.x;
			v.y = this._distOffsetCrt.y;
		})
	}

	currentOffset() {
		return this._distOffsetCrt;
	}

	gotoNextDistOffset() {
		let range = 70
		let x = Math.random() * range * (Math.random() > .5 ? -1 : 1), y = Math.random() * range;
		this._distOffsetTo.set(x, y, 0, 0);
	}
}