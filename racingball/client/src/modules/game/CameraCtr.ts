class CameraCtr {

	public constructor(public camera: tr.Camera) {
	}

	private _distance = GameConstant.CameraFollowDist;

	private _target: Player
	setTarget(t: Player) {
		this._target = t;
	}

	private _angleY: number;
	setAngleY(y: number) {
		this._angleY = y;
	}

	private _angleYTo: number;
	private _angleYFrom: number;
	private _tweenPrg = 1;
	private _tweenCallback: Function;
	tweenAngleYTo(y: number, callback?: Function) {
		this._angleYTo = y;
		this._angleYFrom = this._angleY;
		this._tweenPrg = 0;
		this._tweenCallback = callback;
	}

	private _yOffset: number
	updateCameraTrans() {
		let quat = new tr.Quaternion();
		quat.setFromAxisAngle(GameConstant.V3Right, this._angleY);
		let offset = new tr.Vector3(0, 0, -1 * this._distance);
		offset.applyQuaternion(quat);

		let pos = this.camera.position;
		pos.copy(this._target.group.position)
		pos.sub(offset);

		this.camera.rotation.z = pos.x * Math.abs(pos.x) / 360;
		pos.x *= .6;

		this._yOffset = -offset.z;
	}

	update(dt: number) {
		if (!this._target) return;

		let dirty = false;
		if (this._tweenPrg < 1) {
			this._tweenPrg += dt / .5;
			this._tweenPrg >= 1 && (this._tweenPrg = 1, this._tweenCallback && egret.setTimeout(this._tweenCallback as any, null, 10));
			this._angleY = Utils.lerp(this._tweenPrg, this._angleYFrom, this._angleYTo)
			dirty = true;
		}

		if (this._target.cameraDirty || dirty) {
			this._target.cameraDirty = false;
			this.updateCameraTrans();
		} else {
			this.camera.position.z = this._target.group.position.z + this._yOffset;
		}
	}
}