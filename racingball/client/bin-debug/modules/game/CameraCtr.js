var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CameraCtr = (function () {
    function CameraCtr(camera) {
        this.camera = camera;
        this._distance = GameConstant.CameraFollowDist;
        this._tweenPrg = 1;
    }
    CameraCtr.prototype.setTarget = function (t) {
        this._target = t;
    };
    CameraCtr.prototype.setAngleY = function (y) {
        this._angleY = y;
    };
    CameraCtr.prototype.tweenAngleYTo = function (y, callback) {
        this._angleYTo = y;
        this._angleYFrom = this._angleY;
        this._tweenPrg = 0;
        this._tweenCallback = callback;
    };
    CameraCtr.prototype.updateCameraTrans = function () {
        var quat = new tr.Quaternion();
        quat.setFromAxisAngle(GameConstant.V3Right, this._angleY);
        var offset = new tr.Vector3(0, 0, -1 * this._distance);
        offset.applyQuaternion(quat);
        var pos = this.camera.position;
        pos.copy(this._target.group.position);
        pos.sub(offset);
        this.camera.rotation.z = pos.x * Math.abs(pos.x) / 360;
        pos.x *= .6;
        this._yOffset = -offset.z;
    };
    CameraCtr.prototype.update = function (dt) {
        if (!this._target)
            return;
        var dirty = false;
        if (this._tweenPrg < 1) {
            this._tweenPrg += dt / .5;
            this._tweenPrg >= 1 && (this._tweenPrg = 1, this._tweenCallback && egret.setTimeout(this._tweenCallback, null, 10));
            this._angleY = Utils.lerp(this._tweenPrg, this._angleYFrom, this._angleYTo);
            dirty = true;
        }
        if (this._target.cameraDirty || dirty) {
            this._target.cameraDirty = false;
            this.updateCameraTrans();
        }
        else {
            this.camera.position.z = this._target.group.position.z + this._yOffset;
        }
    };
    return CameraCtr;
}());
__reflect(CameraCtr.prototype, "CameraCtr");
//# sourceMappingURL=CameraCtr.js.map