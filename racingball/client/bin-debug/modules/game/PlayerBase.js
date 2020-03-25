var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerBase = (function () {
    function PlayerBase() {
        this.oldFBXs = ['3', '5', '6'];
        this._invincible = false;
        this.BoostFXInterval = .15;
        this.boostFXInterval = 0;
        this.BoostTime = 1.5;
        this.boostTime = 0;
        this.boost = 0;
        this.boostLevel = 0;
        this._slowdown = false;
        this._jumpUpTime = 0;
        this._speedY = 0;
        this._jumping = false;
        this.dead = false;
        var fbx = Res3DManager.getMeshFromFBX("ball_1", "ball.fbx");
        var ballGeo = fbx.geometry;
        var ballMtl = new tr.MeshPhongMaterial({ map: Res3DManager.createTexture("ball.jpg") });
        this.ball = new tr.Mesh(ballGeo, ballMtl);
        this.ball.scale.setScalar(GameConstant.FBXScale);
        this.group = new tr.Group();
        Game.inst.scene.add(this.group);
        this.group2 = new tr.Group();
        this.group.add(this.group2);
        this.group2.add(this.ball);
        this.trail = new Trail();
        this.trail.mesh.position.y = -GameConstant.BallR + .05;
        this.trail.mesh.position.z = -.3;
        this.group2.add(this.trail.mesh);
        !PlayerBase.shadowGeo && (PlayerBase.shadowGeo = new tr.PlaneGeometry(1, 1));
        !PlayerBase.shadowMtl && (PlayerBase.shadowMtl = new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("shadow.png") }));
        var shadow = new tr.Mesh(PlayerBase.shadowGeo, PlayerBase.shadowMtl);
        shadow.position.y = -GameConstant.BallR + .1;
        shadow.rotation.x = -Math.PI * .5;
        this.group.add(shadow);
        this.reset();
    }
    PlayerBase.prototype.setSkin = function (id, render) {
        var _this = this;
        if (render === void 0) { render = true; }
        var cfg = DB_skin.get(id);
        var fbx = Res3DManager.getMeshFromFBX("ball_" + cfg.fbx, "ball.fbx");
        this.ball.geometry = fbx.geometry;
        this.ball.scale.setScalar(this.oldFBXs.includes(cfg.fbx) ? GameConstant.FBXScale * 5.5 / 8 : GameConstant.FBXScale);
        this.ball.rotation.y = 0;
        Res3DManager.getImage(cfg.tex) || Res3DManager.preload(null, "skin/" + cfg.tex);
        Res3DManager.createTextureAsync(cfg.tex).then(function (tex) {
            _this.ball.material.map = tex;
            render && Game.inst.world.render();
        });
    };
    PlayerBase.prototype.reset = function () {
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
    };
    PlayerBase.prototype.onBoostChange = function () {
        this.boost > 1 && (this.boost = 1);
        this.boostTime = this.boost > 0 ? this.BoostTime : 0;
    };
    PlayerBase.prototype.onHitBoost = function () {
    };
    PlayerBase.prototype.updateBoost = function (dt) {
        if (this.boost > 0 && (this.boostFXInterval -= dt) <= 0) {
            this.boostFXInterval = this.BoostFXInterval;
            var spr = ObjectPool.inst.get(PlayerBoostSprite);
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
    };
    PlayerBase.prototype.slowDown = function () {
        this._slowdown = true;
    };
    PlayerBase.prototype.update = function (dt) {
        this.updateZ(dt);
        this.updateBoost(dt);
        this.checkCollision();
        this.updateJump(dt);
        this.trail.update();
    };
    PlayerBase.prototype.updateZ = function (dt) {
        var moved = dt * this.currentSpeed;
        this._slowdown && this._speed > 0 && (this._speed -= 30 * dt, this._speed < 0 && (this._speed = 0));
        this.group.position.z -= moved;
        this.ball.rotation.x -= moved * .5;
    };
    Object.defineProperty(PlayerBase.prototype, "currentSpeed", {
        get: function () {
            return this._speed + this.boostLevel * GameConstant.PlayerBoostLevelSpeed;
        },
        enumerable: true,
        configurable: true
    });
    PlayerBase.prototype.jump = function () {
        var spd = this.currentSpeed;
        this._jumpUpTime = 2 / spd;
        this._speedY = spd / 2;
        this._jumping = true;
    };
    PlayerBase.prototype.updateJump = function (dt) {
        if (!this._jumping)
            return;
        if (this._jumpUpTime > 0) {
            this._jumpUpTime -= dt;
        }
        else {
            this._speedY -= 300 * dt;
        }
        this.group2.position.y += this._speedY * dt;
        if (this.group2.position.y < 0) {
            this.group2.position.y = 0;
            this._speedY *= -.6;
            if (this._speedY < 10) {
                this._speedY = 0;
                this._jumping = false;
            }
        }
    };
    PlayerBase.prototype.die = function (noAnim) {
        if (noAnim === void 0) { noAnim = false; }
        if (this.dead)
            return false;
        this.dead = true;
        this._jumping = false;
        this.group.visible = false;
        this.boost = this.boostLevel = 0;
        noAnim || this._obsCrt && ObjectPool.inst.get(PlayerDieFx).reset(this.group.position.x, this._obsCrt.position.z + 1.1);
        return true;
    };
    PlayerBase.prototype.checkCollision = function () {
        var pos = this.group.position;
        var page = Game.inst.obstacleCtr.getObstaclePage(pos.z);
        if (this._obsPage > page) {
            this._obsCrt && this.hitTestX(); //跳过了没检测到，补上
            this._obsCrt = Game.inst.obstacleCtr.getObstacleByPage(page);
            this._obsPage = page;
        }
        if (this._obsCrt) {
            var zOffset = Math.abs(this._obsCrt.position.z - pos.z);
            if (zOffset > GameConstant.BallR + GameConstant.ObsSize * .5 + .5)
                return; //适当扩大检测范围
            this.hitTestX();
            this._obsCrt = null;
        }
        if (this.dead) {
            this._obsCrt = null;
            this._obsPage += 2;
        }
    };
    PlayerBase.prototype.hitTestX = function () {
        var ranges = this.getCollisionXRange(this._obsCrt.collisions);
        if (this._obsCrt instanceof Booster) {
            var x_1 = this.group.position.x;
            var hit = ranges.some(function (range) {
                return x_1 > range.min && x_1 < range.max;
            });
            if (hit) {
                this.boost++;
                this.onBoostChange();
                this.onHitBoost();
            }
        }
        else {
            var xL_1 = this.group.position.x - GameConstant.BallR;
            var xR_1 = this.group.position.x + GameConstant.BallR;
            this._obsCrt.moving && (ranges = [{
                    min: this._obsCrt.position.x - 1,
                    max: this._obsCrt.position.x + 1
                }]);
            var hit = ranges.some(function (range) {
                return xL_1 > range.min && xL_1 < range.max || xR_1 > range.min && xR_1 < range.max;
            });
            if (hit) {
                this._invincible || this.die();
            }
            else if (this._obsCrt.slope) {
                this.jump();
            }
        }
    };
    // -2, 2
    PlayerBase.prototype.getCollisionXRange = function (arr) {
        var ret = [];
        arr.forEach(function (ar) {
            var min = Infinity, max = -Infinity;
            ar.forEach(function (n) {
                var x0 = n * 2 - 1;
                var x1 = n * 2 + 1;
                x0 < min && (min = x0);
                x1 > max && (max = x1);
            });
            ret.push({ min: min, max: max });
        });
        return ret;
    };
    return PlayerBase;
}());
__reflect(PlayerBase.prototype, "PlayerBase");
//# sourceMappingURL=PlayerBase.js.map