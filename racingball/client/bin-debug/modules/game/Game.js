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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.lvlCfg = CfgLevel.data[0];
        _this.tickObjects = [];
        _this.complete = false;
        _this.running = false;
        _this.revived = 0;
        _this._levelCompleteTimes = 0;
        _this.roadSegments = [];
        _this.groundSegments = [];
        _this.treePairs = 5;
        _this.trees = [];
        _this.treesZL = 0;
        _this.treesZR = 0;
        _this._windTime = 0;
        /** TOUCH EVENTS */
        _this.startX = 0;
        _this.touchID = NaN;
        Game.inst = _this;
        _this.init();
        return _this;
    }
    Game.prototype.init = function () {
        this.world = new World();
        this.nowPlayerCount = GameConstant.PlayersCount;
        ObjectPool.init();
        RoadSegment.init();
        GroundSegment.init();
        Trail.init();
        Tree.init();
        WindLine.init();
        Obstacle.init(); //障碍物
        Booster.init(); //助推器
        PlayerBoostSprite.init();
        PlayerDieFx.init();
        PlayerInvincibleFx.init();
        this.cameraPos = this.world.camera.position;
        this.scene = this.world.scene;
        this.scene.fog = new tr.Fog(0xff0000, 40, 100);
        this.ticker = new Ticker(this.update, this);
        this.cameraCtr = new CameraCtr(this.world.camera);
        this.obstacleCtr = new ObstacleCtr();
        this.player = new Player();
        this.robotCtr = new RobotCtr();
        this.cameraCtr.setTarget(this.player);
        this.cameraCtr.setAngleY(-10 * GameConstant.ToRadian);
        this.cameraCtr.updateCameraTrans();
        var finishTex = Res3DManager.createTexture("finish.png", GameConstant.Anisotropy);
        finishTex.wrapS = tr.RepeatWrapping;
        finishTex.repeat.x = 5;
        this.finishLine = new tr.Mesh(new tr.PlaneGeometry(10, 2), new tr.MeshBasicMaterial({ map: finishTex }));
        this.finishLine.rotateX(Math.PI * -.5);
        this.finishLine.position.y = .05 - GameConstant.BallR;
        // this.scene.add(this.finishLine);
        this.materialCtr = new MaterialCtr();
        this.materialCtr.add(RoadSegment.mtl);
        GroundSegment.mtl && this.materialCtr.add(GroundSegment.mtl);
        this.materialCtr.add(Trail.mtl);
        this.materialCtr.add(WindLine.mtl);
        this.materialCtr.add(Tree.mtl);
        this.materialCtr.add(Obstacle.mtl);
        this.materialCtr.add(PlayerBase.shadowMtl);
        this.materialCtr.add(PlayerInvincibleFx.mtl);
        this.materialCtr.add(this.finishLine.material);
        this.materialCtr.add(this.player.ball.material);
        this.materialCtr.addMulti(this.robotCtr.getRobotsMtls());
        this.setupTouch();
        this.initRoad();
        this.initTrees();
        this.initTheme();
    };
    Game.prototype.setupTouch = function () {
        var stage = Context.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    };
    Game.prototype.updateTickObjects = function (dt) {
        for (var i = 0; i < this.tickObjects.length; ++i) {
            var rm = this.tickObjects[i].update(dt);
            if (rm) {
                this.tickObjects[i].dispose();
                this.tickObjects.splice(i--, 1);
            }
        }
    };
    Game.prototype.addTickObject = function (o) {
        this.tickObjects.push(o);
    };
    Game.prototype.update = function (dt) {
        dt *= .001;
        var dead = this.player.dead;
        this.player.update(dt);
        this.cameraCtr.update(dt);
        this.updateRoad();
        this.updateTrees();
        this.updateWind(dt);
        this.updateTickObjects(dt);
        this.obstacleCtr.update(dt);
        this.robotCtr.update(dt);
        this.world.render();
        this.materialCtr.setup();
        dead || this.materialCtr.update(dt);
        /* if ((this.nowPlayerCount<=1)&&!this.complete) {//-GameConstant.TrackLength
             GameConstant.TrackLength=GameConstant.TrackLength;
             this.player._speed=0;
             this.finish();
         }*/
        if (!this.complete) {
            // this.onProgressUpdate && this.onProgressUpdate(this.currentProgress);
            this.onProgressUpdate && this.onProgressUpdate(-this.player.group.position.z);
        }
        else {
            this.onProgressUpdate && this.onProgressUpdate(1);
        }
    };
    Object.defineProperty(Game.prototype, "currentProgress", {
        get: function () {
            return Math.min(-this.player.group.position.z / GameConstant.TrackLength, 1);
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.ticking = function () {
        return this.ticker.ticking;
    };
    Game.prototype.start = function () {
        this.running = true;
        this.robotCtr.reset();
        this.world.render();
        app.platform.logEvent(Log.EventType.PlayTimes, { type: app.status.playerType, result: ++app.status.playTimes });
    };
    Game.prototype.stop = function () {
        AudioPlayer.stopMusic();
        this.ticker.stop();
        this.running = false;
    };
    Game.prototype.resetLevel = function (lv) {
        this.player.setSkin(app.pp.currentSkinID);
        this.complete && this.switchTheme();
        this.complete = false;
        this.revived = 0;
        this.lvlCfg = CfgLevel.data[lv - 1] || CfgLevel.data[CfgLevel.data.length - 1];
        //GameConstant["TrackLength"] = Context.isFB ? 3000 : 3000;
        GameConstant.TrackLength = GameConstant.TrackLength;
        this.resetRoad();
        this.resetTrees();
        this.resetWind();
        this.finishLine.position.z = -100;
        this.player.reset(); //first
        this.obstacleCtr.reset();
        // this.robotCtr.reset();
        this.world.render();
    };
    Game.prototype.switchTheme = function () {
        var i = Utils.randomInt(0, GameConstant.Maps.length);
        GameConstant.Map == GameConstant.Maps[i] && (i = (i + 1) % GameConstant.Maps.length);
        var map = GameConstant.Maps[i];
        if (Res3DManager.getFBX(map + ".fbx") && Res3DManager.getImage("lane_" + map + ".jpg")) {
            GameConstant.Map = GameConstant.Maps[i];
            this.resetTheme();
        }
    };
    Game.prototype.fail = function () {
        this._levelCompleteTimes = 0;
    };
    Game.prototype.finish = function () {
        var _this = this;
        app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(function () { RankCtr.loadLeaderBoardAsync(); });
        //更新服务器的score数据
        AudioPlayer.stopMusic();
        this.complete = true;
        //app.pp.starCount += Constant.starAmount[this.player.rank + 1];
        app.pp.checkNewSkin();
        var lvl = app.pp.currentLevel;
        if (app.pp.currentLevel < 10 || ++this._levelCompleteTimes >= 2) {
            this._levelCompleteTimes = 0;
            app.pp.currentLevel++;
            app.pp.pushData();
        }
        this.player.slowDown();
        this.robotCtr.allSlowDown();
        egret.setTimeout(function () {
            //  app.platform.updateScore(app.pp.starCount, JSON.stringify({ skin: app.pp.currentSkinID })).then(() => { RankCtr.loadLeaderBoardAsync() });
            _this.stop();
            GameView != null && app.ui.getPopup(GameView).close();
            app.ui.addPopup(new EndView());
            /* if (app.status.playerType == "new_player" && lvl <= 2 || !Common.shouldPlayAD()) {
                 app.ui.addPopup(new BeforeEndView);
             } else {
                 Common.tryPlayAD().then(() => {
                     app.ui.addPopup(new EndView());
                 })
             }*/
        }, this, Constant.CompleteDelay);
        app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: lvl, result: 3 });
        app.platform.logEvent(Log.EventType.LevelRank, { type: app.status.playerType, level: lvl, rank: this.player.rank + 1 });
        app.platform.logEvent(Log.EventType.LevelOverTimes, { type: app.status.playerType, result: ++app.status.finishTimes });
    };
    Game.prototype.initTheme = function () {
        var c = GameConstant.MapColor[GameConstant.Map];
        this.world.renderer.setClearColor(c);
        this.scene.fog && this.scene.fog.color.setHex(c);
        var assets = [];
        GameConstant.Maps.forEach(function (map) {
            if (map != GameConstant.Map) {
                assets.push("tex/lane_" + map + ".jpg");
                assets.push("fbx/" + map + ".fbx");
            }
        });
        Res3DManager.preload.apply(Res3DManager, [null].concat(assets));
    };
    Game.prototype.resetTheme = function () {
        this.initTheme();
        var tex = Res3DManager.createTexture("lane_" + GameConstant.Map + ".jpg", GameConstant.Anisotropy);
        if (!this.world.renderer.getMaxAnisotropy() && GameConstant.Map == "shamo") {
            tex.magFilter = tex.minFilter = tr.NearestFilter;
        }
        RoadSegment.mtl.map = tex;
        Tree.init();
        Obstacle.init4Theme();
        GroundSegment.init4Theme(this.groundSegments);
    };
    Game.prototype.initRoad = function () {
        for (var i = 0; i < 2; ++i) {
            var g = new GroundSegment();
            g.mesh.scale.setScalar(GameConstant.FBXScale);
            g.mesh.rotation.x = -Math.PI * .5;
            g.mesh.position.y = 0;
            g.mesh.position.z = GroundSegment.height * -i - GroundSegment.height * .5 + GameConstant.CameraFollowDist;
            this.groundSegments.push(g);
        }
    };
    Game.prototype.resetRoad = function () {
        this.roadSegments.forEach(function (g) { return g.dispose(); });
        this.roadSegments.length = 0;
        this.roadIndex = -2;
        while (this.roadIndex <= 15) {
            var segment = ObjectPool.inst.get(RoadSegment);
            this.roadSegments.push(segment);
            segment.reset(this.roadIndex++ * -segment.height);
        }
        for (var i = 0; i < this.groundSegments.length; ++i) {
            var g = this.groundSegments[i];
            g.mesh.position.z = GroundSegment.height * -i - GroundSegment.height * .5 + GameConstant.CameraFollowDist;
            g.mesh.parent && g.mesh.parent.remove(g.mesh);
            GroundSegment.geo && this.scene.add(g.mesh);
        }
    };
    Game.prototype.updateRoad = function () {
        while (this.roadSegments[0].mesh.position.z > this.cameraPos.z + RoadSegment.height + GameConstant.ReviveBackDist) {
            var segment = this.roadSegments.shift();
            this.roadSegments.push(segment);
            segment.mesh.position.z = this.roadIndex++ * -segment.height;
        }
        if (GroundSegment.geo) {
            var g = this.groundSegments[0];
            if (g.mesh.position.z - GroundSegment.height * .5 > this.cameraPos.z) {
                g.mesh.position.z -= GroundSegment.height * this.groundSegments.length;
                this.groundSegments.push(this.groundSegments.shift());
            }
        }
    };
    Game.prototype.initTrees = function () {
        for (var i = 0; i < this.treePairs; ++i) {
            this.trees.push(new Tree("l"), new Tree("r"));
        }
    };
    Game.prototype._getTreeGap = function () {
        return GameConstant.Map != "shamo" ? 25 : Utils.randomRange(25, 40);
    };
    Game.prototype.resetTrees = function () {
        this.treesZL = 0;
        this.treesZR = 0;
        for (var i = 0; i < this.treePairs; ++i) {
            var distL = this._getTreeGap();
            var distR = this._getTreeGap();
            this.trees[i * 2].reset(this.treesZL -= distL);
            this.trees[i * 2 + 1].reset(this.treesZR -= distR);
        }
    };
    Game.prototype.updateTrees = function () {
        var _this = this;
        var deadZ = this.cameraPos.z + 5;
        this.trees.forEach(function (tree) {
            if (tree.mesh.position.z > deadZ) {
                var dist = _this._getTreeGap();
                if (tree.side == "l") {
                    dist = _this.treesZL -= dist;
                }
                else {
                    dist = _this.treesZR -= dist;
                }
                tree.reset(dist);
            }
        });
    };
    Game.prototype.resetWind = function () {
        this._windTime = 0;
    };
    Game.prototype.updateWind = function (dt) {
        if (this.player.boost <= 0)
            return;
        this._windTime += 4 * Game.inst.player.boostLevel * dt;
        if (this._windTime > 1) {
            this._windTime = 0;
            ObjectPool.inst.get(WindLine).reset();
        }
    };
    Game.prototype.revive = function () {
        // egret.Tween.get(this.player.group.position, {
        //     onChange: () => {
        //         this.player.cameraDirty = true;
        //     }
        // }).to({ x: 0, z: this.player.group.position.z + GameConstant.ReviveBackDist }, 1000).call(() => {
        this.player.dead = false;
        this.player.group.visible = true;
        // })
        this.player.invincible = true;
        AudioPlayer.resumeMusic();
        this.ticker.start();
    };
    Game.prototype.touchBegin = function (evt) {
        if (app.ui.getPopup(GameView) && evt.target === app.ui.getPopup(GameView).btn_try)
            return;
        if (!isNaN(this.touchID) || !this.running || this.player.dead)
            return;
        this.touchID = evt.touchPointID;
        if (!this.ticking()) {
            this.ticker.start();
            AudioPlayer.playMusic();
        }
        this.startX = evt.stageX;
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
    };
    Game.prototype.touchMove = function (evt) {
        if (evt.touchPointID != this.touchID || !this.ticking)
            return;
        var dx = evt.stageX - this.startX;
        this.startX = evt.stageX;
        this.player.moveX(dx);
    };
    Game.prototype.touchEnd = function (evt) {
        if (evt.touchPointID != this.touchID)
            return;
        this.touchID = NaN;
        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
    };
    return Game;
}(egret.EventDispatcher));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map