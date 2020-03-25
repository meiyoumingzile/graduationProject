var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Trail = (function () {
    function Trail(fragments, hW) {
        if (fragments === void 0) { fragments = 8; }
        if (hW === void 0) { hW = .25; }
        this.fragments = fragments;
        this.hW = hW;
        this._postions = [];
        this.geo = new tr.BufferGeometry();
        var points = this.fragments * 2;
        this.bufferPosition = new Float32Array(points * 3);
        this.attrPosition = new tr.BufferAttribute(this.bufferPosition, 3);
        this.bufferUV = new Float32Array(points * 2);
        this.attrUV = new tr.BufferAttribute(this.bufferUV, 2);
        this.geo = new tr.BufferGeometry();
        this.geo.addAttribute('position', this.attrPosition);
        this.geo.addAttribute('uv', this.attrUV);
        var index = [];
        for (var i = 0; i < points - 2; i += 2) {
            index.push(i, i + 2, i + 1);
            index.push(i + 1, i + 2, i + 3);
        }
        this.geo.setIndex(index);
        this.mesh = new tr.Mesh(this.geo, Trail.mtl);
    }
    Trail.init = function () {
        this.mtl = new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("player-trail.png") });
    };
    Trail.prototype.reset = function () {
        this._postions.length = 0;
        this.bufferPosition.forEach(function (v, i, arr) { arr[i] = 0; });
        this.bufferUV.forEach(function (v, i, arr) { arr[i] = 0; });
        this.attrPosition.needsUpdate = true;
        this.attrUV.needsUpdate = true;
    };
    Trail.prototype.update = function () {
        var _this = this;
        var wp = this.mesh.localToWorld(new tr.Vector3);
        this._postions.unshift(wp);
        while (this._postions.length > this.fragments) {
            this._postions.pop();
        }
        var len = this._postions.length;
        this._postions.forEach(function (p, i) {
            var x = p.x - wp.x;
            var y = p.y - wp.y;
            var z = p.z - wp.z;
            var j = i * 2, k = i * 2 + 1;
            _this.bufferPosition[j * 3] = x - _this.hW;
            _this.bufferPosition[j * 3 + 1] = y;
            _this.bufferPosition[j * 3 + 2] = z;
            _this.bufferPosition[k * 3] = x + _this.hW;
            _this.bufferPosition[k * 3 + 1] = y;
            _this.bufferPosition[k * 3 + 2] = z;
            _this.bufferUV[j * 2] = 0;
            _this.bufferUV[j * 2 + 1] = 1 - i / (len - 1);
            _this.bufferUV[k * 2] = 1;
            _this.bufferUV[k * 2 + 1] = 1 - i / (len - 1);
        });
        this.attrPosition.needsUpdate = true;
        this.attrUV.needsUpdate = true;
    };
    return Trail;
}());
__reflect(Trail.prototype, "Trail");
//# sourceMappingURL=Trail.js.map