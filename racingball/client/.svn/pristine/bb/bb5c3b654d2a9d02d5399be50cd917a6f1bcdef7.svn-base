var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ObstacleType;
(function (ObstacleType) {
    ObstacleType[ObstacleType["empty"] = 0] = "empty";
    ObstacleType[ObstacleType["slope"] = 1] = "slope";
    ObstacleType[ObstacleType["box"] = 2] = "box";
    ObstacleType[ObstacleType["movingBox"] = 3] = "movingBox";
    ObstacleType[ObstacleType["gate"] = 4] = "gate";
    ObstacleType[ObstacleType["border"] = 5] = "border";
    ObstacleType[ObstacleType["random"] = 6] = "random";
    ObstacleType[ObstacleType["max"] = 7] = "max";
})(ObstacleType || (ObstacleType = {}));
var Obstacles;
(function (Obstacles) {
    Obstacles[Obstacles["box"] = 0] = "box";
    Obstacles[Obstacles["ramp_0"] = 1] = "ramp_0";
    Obstacles[Obstacles["ramp_1"] = 2] = "ramp_1";
    Obstacles[Obstacles["ramp_2"] = 3] = "ramp_2";
    Obstacles[Obstacles["ramp_3"] = 4] = "ramp_3";
    Obstacles[Obstacles["ramp_4"] = 5] = "ramp_4";
    Obstacles[Obstacles["ramp_5"] = 6] = "ramp_5";
    Obstacles[Obstacles["gate_0"] = 7] = "gate_0";
    Obstacles[Obstacles["gate_1"] = 8] = "gate_1";
    Obstacles[Obstacles["gate_2"] = 9] = "gate_2";
    Obstacles[Obstacles["gateL_0"] = 10] = "gateL_0";
    Obstacles[Obstacles["gateL_1"] = 11] = "gateL_1";
    Obstacles[Obstacles["gateL_2"] = 12] = "gateL_2";
    Obstacles[Obstacles["I_0"] = 13] = "I_0";
    Obstacles[Obstacles["I_1"] = 14] = "I_1";
    Obstacles[Obstacles["I_2"] = 15] = "I_2";
    Obstacles[Obstacles["L_0"] = 16] = "L_0";
    Obstacles[Obstacles["L_1"] = 17] = "L_1";
    Obstacles[Obstacles["L_2"] = 18] = "L_2";
    Obstacles[Obstacles["L_3"] = 19] = "L_3";
    Obstacles[Obstacles["L_4"] = 20] = "L_4";
    Obstacles[Obstacles["T_0"] = 21] = "T_0";
    Obstacles[Obstacles["T_1"] = 22] = "T_1";
    Obstacles[Obstacles["T_2"] = 23] = "T_2";
    Obstacles[Obstacles["T_3"] = 24] = "T_3";
})(Obstacles || (Obstacles = {}));
var ObstacleCtr = (function () {
    function ObstacleCtr() {
        this.groups = (_a = {},
            _a[ObstacleType.empty] = [
                [null, null, null, null, null, null]
            ],
            _a[ObstacleType.slope] = [
                [null, null, [Obstacles.ramp_0], null, null]
            ],
            _a[ObstacleType.box] = [
                [null, [Obstacles.box, 2], null, [Obstacles.box, 3], null, [Obstacles.box, 0], null],
                [null, [Obstacles.box, 3], null, [Obstacles.box, 1], null, [Obstacles.box, 4], null],
                [null, [Obstacles.box, 4], null, [Obstacles.box, 2], null],
                [null, [Obstacles.box, 2], null, [Obstacles.box, 0], null],
            ],
            _a[ObstacleType.movingBox] = [
                [null, [Obstacles.box, 1, 0], null, [Obstacles.box, 1, 1], null, [Obstacles.box, 1, 0], null],
                [null, [Obstacles.box, 1, 0], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 1, 1], null, [Obstacles.box, 3], null],
                [null, [Obstacles.box, 1, 0], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 2], null, [Obstacles.box, 1, 1], null],
                [null, [Obstacles.box, 0, 1], null, [Obstacles.box, 3], null, [Obstacles.box, 0], null],
                [null, [Obstacles.box, 1], null, [Obstacles.box, 0, 1], null, [Obstacles.gateL_0, 3], null],
                [null, [Obstacles.box, 2], null, [Obstacles.box, 0, 0], null, [Obstacles.box, 0], null]
            ],
            _a[ObstacleType.border] = [
                [null, [Obstacles.I_0, 0], null, [Obstacles.T_0, 1], null, [Obstacles.L_0, 0], null, null],
                [null, [Obstacles.I_0, 1], null, [Obstacles.L_1, 0], null, [Obstacles.L_2, 1], null, null],
                [null, [Obstacles.I_2, 0], null, [Obstacles.T_2, 1], null, [Obstacles.L_0, 0], null, [Obstacles.L_4, 1], null],
                [null, [Obstacles.I_1, 1], null, [Obstacles.I_0, 0], null, [Obstacles.L_3, 1], null, [Obstacles.T_1, 1], null],
                [null, [Obstacles.L_2, 0], null, [Obstacles.I_1, 1], null, [Obstacles.L_3, 0], null, [Obstacles.T_0, 1], null],
                [null, [Obstacles.I_2, 1], null, [Obstacles.L_3, 0], null, [Obstacles.I_1, 1], null, [Obstacles.T_1, 0], null],
            ],
            _a[ObstacleType.gate] = [
                [null, [Obstacles.gate_0], null, [Obstacles.gate_1], null, [Obstacles.gate_2], null, [Obstacles.L_1, 0], null],
                [null, [Obstacles.gate_2], null, [Obstacles.gateL_2, 1], null, [Obstacles.gateL_1, 1], null, [Obstacles.gateL_2, 0], null],
                [null, [Obstacles.gateL_1, 0], null, [Obstacles.gate_1], null, [Obstacles.gateL_2, 0], null, [Obstacles.gate_2], null],
                [null, [Obstacles.L_3, 0], null, [Obstacles.gateL_0], null, [Obstacles.gateL_2, 1], null, [Obstacles.L_4, 0], null],
                [null, [Obstacles.I_2, 0], null, [Obstacles.gate_0], null, [Obstacles.gateL_2, 1], null, [Obstacles.L_4, 0], null]
            ],
            _a);
        this.compound = (_b = {},
            _b[Obstacles.box] = [[0]],
            _b[Obstacles.ramp_0] = [[0, 1], [1, 1], [2, 0], [3, 1], [4, 1]],
            _b[Obstacles.ramp_1] = [[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]],
            _b[Obstacles.ramp_2] = [[0, 0], [1, 0], [2, 0], [3, 1], [4, 1]],
            _b[Obstacles.ramp_3] = [[0, 0], [1, 0], [2, 1], [3, 1], [4, 0]],
            _b[Obstacles.ramp_4] = [[0, 0], [1, 1], [2, 1], [3, 0], [4, 0]],
            _b[Obstacles.ramp_5] = [[0, 1], [1, 1], [2, 0], [3, 0], [4, 0]],
            _b[Obstacles.gate_0] = [[0], [5], [6], [7], [8], [9], [4]],
            _b[Obstacles.gate_1] = [[0], [5], [10], [11], [12], [13], [14], [9], [4]],
            _b[Obstacles.gate_2] = [[0], [5], [10], [15], [16], [17], [18], [19], [14], [9], [4]],
            _b[Obstacles.gateL_0] = [[0], [5], [10], [15], [16], [17], [18], [19]],
            _b[Obstacles.gateL_1] = [[0], [5], [10], [11], [12], [13], [14]],
            _b[Obstacles.gateL_2] = [[0], [5], [6], [7], [8], [9]],
            _b[Obstacles.I_0] = [[0], [5]],
            _b[Obstacles.I_1] = [[0], [5], [10]],
            _b[Obstacles.I_2] = [[0], [5], [10], [15]],
            _b[Obstacles.L_0] = [[0], [5], [1]],
            _b[Obstacles.L_1] = [[0], [5], [6]],
            _b[Obstacles.L_2] = [[0], [5], [10], [1]],
            _b[Obstacles.L_3] = [[0], [5], [10], [15], [1]],
            _b[Obstacles.L_4] = [[0], [5], [10], [15], [16]],
            _b[Obstacles.T_0] = [[0], [5], [10], [6]],
            _b[Obstacles.T_1] = [[0], [5], [10], [11]],
            _b[Obstacles.T_2] = [[0], [5], [10], [15], [6]],
            _b[Obstacles.T_3] = [[0], [5], [10], [15], [11]],
            _b);
        this.collisions = (_c = {},
            _c[Obstacles.ramp_0] = [[0]],
            _c[Obstacles.ramp_1] = [[-2], [2]],
            _c[Obstacles.ramp_2] = [[-2, -1, 0]],
            _c[Obstacles.ramp_3] = [[-2, -1], [2]],
            _c[Obstacles.ramp_4] = [[-2], [1, 2]],
            _c[Obstacles.ramp_5] = [[0, 1, 2]],
            _c[Obstacles.gate_0] = [[-2], [2]],
            _c[Obstacles.gate_1] = [[-2], [2]],
            _c[Obstacles.gate_2] = [[-2], [2]],
            _c[Obstacles.L_0] = [[-2, -1]],
            _c[Obstacles.L_2] = [[-2, -1]],
            _c[Obstacles.L_3] = [[-2, -1]],
            _c);
        this.Gap = 5;
        this._z = 0;
        this._obstacles = [];
        this._protectCount = 5;
        this._currentCfg = [];
        this._currentCfgIndex = 0;
        this.BoosterGen = 5;
        ObjectPool.inst.register(ObsBox, 20);
        ObjectPool.inst.register(ObsSlope, 5);
        var _a, _b, _c;
    }
    ObstacleCtr.prototype.getObstacleParts = function (t) {
        // t = Obstacles.T_1;
        var ret = [];
        var cfgs = this.compound[t];
        cfgs.forEach(function (cfg) {
            var pos = cfg[0], isSlope = cfg[1];
            var box = ObjectPool.inst.get(isSlope ? ObsSlope : ObsBox);
            box.reset();
            box.mesh.position.x = (pos % 5) * 2;
            box.mesh.position.y = Math.floor(pos / 5) * 2;
            ret.push(box);
        });
        return ret;
    };
    ObstacleCtr.getObsX = function (i) {
        var n = i = i < 0 ? 0 : i > 4 ? 4 : i;
        return 2 * n - 4;
    };
    ObstacleCtr.prototype.reset = function () {
        this._z = 0;
        egret.log("obs dispose", this._obstacles.length);
        this._obstacles.forEach(function (o) {
            o.dispose();
        });
        this._obstacles.length = 0;
        this._obstaclesMap = {};
        this._protectCount = 5;
        this._currentCfg.length = 0;
        this._currentCfgIndex = 0;
        this._boosterGen = this.BoosterGen;
        if (Game.inst.player.group.position.z < 0)
            egret.error("reset Player first");
        this.update(1);
    };
    ObstacleCtr.prototype.update = function (dt) {
        var z = Game.inst.player.group.position.z;
        // while (this._z > z - this.Gap * 20 && this._z - this.Gap > -GameConstant.TrackLength) {
        while (this._z > z - this.Gap * 20) {
            this._z -= this.Gap;
            this.createOne(this._z);
        }
        for (var i = 0; i < this._obstacles.length; ++i) {
            var obs = this._obstacles[i];
            if (obs.update(dt)) {
                obs.dispose();
                this._obstacles.splice(i--, 1);
            }
        }
    };
    ObstacleCtr.prototype.getObstaclePage = function (z) {
        return Math.floor(z / this.Gap);
    };
    ObstacleCtr.prototype.getObstacleByPage = function (page) {
        return this._obstaclesMap[page];
    };
    ObstacleCtr.prototype.deleteObstacleOfPage = function (page) {
        delete this._obstaclesMap[page];
    };
    ObstacleCtr.prototype.getNextObstacleType = function () {
        var weight = Game.inst.lvlCfg.weight;
        var sum = 0;
        weight.forEach(function (n) { return sum += n; });
        var rand = Math.random() * sum;
        var t = weight.findIndex(function (n) {
            return (rand -= n) < 0;
        });
        // console.log("weight t:", t, ObstacleType.max);
        return t;
        // return Utils.randomInt(0, ObstacleType.max);
    };
    ObstacleCtr.prototype.createARandomGroup = function () {
        var r = [];
        for (var t = Utils.randomInt(1, 3); t >= 0; t--) {
            r.push(null);
            if (Math.random() < .5) {
                r.push([Obstacles.box, Utils.randomInt(0, 5)]);
            }
            else {
                r.push([Obstacles.box, Math.round(Math.random()), Math.round(Math.random())]);
            }
        }
        return r;
    };
    ObstacleCtr.prototype.createOne = function (z) {
        if (this._protectCount > 0) {
            this._protectCount--;
            if (this._protectCount == 1)
                this.createBooster(z);
            return;
        }
        this._protectCount = 4;
        if (!this._currentCfg.length || this._currentCfgIndex >= this._currentCfg.length) {
            var type = this.getNextObstacleType();
            this._currentCfg = type == ObstacleType.random ? this.createARandomGroup() : Utils.randomInArr(this.groups[type]);
            this._currentCfgIndex = 0;
        }
        var cfg = this._currentCfg[this._currentCfgIndex++];
        if (!cfg)
            return;
        var obs = ObjectPool.inst.get(Obstacle);
        this._obstaclesMap[(z / this.Gap) | 0] = obs;
        this._obstacles.push(obs);
        var t = cfg[0];
        var x;
        var flip = false;
        var collisions;
        var moving = cfg.length > 2;
        var slope = false;
        if (t == Obstacles.ramp_0) {
            t = Utils.randomInt(Obstacles.ramp_0, Obstacles.ramp_5 + 1);
            x = ObstacleCtr.getObsX(0);
            slope = true;
        }
        else if (t == Obstacles.box) {
            collisions = [[(cfg[1] || 0) - 2]];
            x = ObstacleCtr.getObsX(cfg[1] || 0);
        }
        else {
            flip = !!cfg[1] || true;
            x = ObstacleCtr.getObsX(flip ? 4 : 0);
        }
        var boxes = this.getObstacleParts(t);
        obs.reset(boxes, z, x, flip, collisions || this.collisions[t] || [[-2]]);
        moving && obs.startMoving(cfg[1], !!cfg[2]);
        obs.slope = slope;
        obs.lowGate = (t == Obstacles.gate_0) || (t == Obstacles.gateL_2);
    };
    ObstacleCtr.prototype.createBooster = function (z) {
        if (--this._boosterGen > 0) {
            return;
        }
        this._boosterGen = this.BoosterGen;
        var i = ObjectPool.inst.get(Booster);
        i.reset(z);
        this._obstaclesMap[(z / this.Gap) | 0] = i;
        this._obstacles.push(i);
    };
    return ObstacleCtr;
}());
__reflect(ObstacleCtr.prototype, "ObstacleCtr");
var ObsPart = (function (_super) {
    __extends(ObsPart, _super);
    function ObsPart() {
        return _super.call(this) || this;
    }
    ObsPart.prototype.reset = function () {
    };
    ObsPart.prototype.name = function () {
        return "ObsPart";
    };
    ObsPart.size = 1.8;
    return ObsPart;
}(PoolObject));
__reflect(ObsPart.prototype, "ObsPart");
var ObsBox = (function (_super) {
    __extends(ObsBox, _super);
    function ObsBox() {
        var _this = _super.call(this) || this;
        _this.mesh = new tr.Mesh(Obstacle.geoBox, Obstacle.mtl);
        _this.mesh.scale.setScalar(GameConstant.ObsScale);
        _this.mesh.rotation.x = -Math.PI * .5;
        return _this;
    }
    ObsBox.prototype.reset = function () {
        this.mesh.geometry = Obstacle.geoBox;
    };
    ObsBox.prototype.name = function () {
        return "ObsBox";
    };
    return ObsBox;
}(ObsPart));
__reflect(ObsBox.prototype, "ObsBox");
var ObsSlope = (function (_super) {
    __extends(ObsSlope, _super);
    function ObsSlope() {
        var _this = _super.call(this) || this;
        _this.mesh = new tr.Mesh(Obstacle.geoSlope, Obstacle.mtl);
        _this.mesh.scale.setScalar(GameConstant.ObsScale);
        _this.mesh.rotation.x = -Math.PI * .5;
        return _this;
    }
    ObsSlope.prototype.reset = function () {
        this.mesh.geometry = Obstacle.geoSlope;
    };
    ObsSlope.prototype.name = function () {
        return "ObsSlope";
    };
    return ObsSlope;
}(ObsPart));
__reflect(ObsSlope.prototype, "ObsSlope");
//# sourceMappingURL=ObstacleCtr.js.map