class Game extends egret.EventDispatcher {
    constructor() {
        super();
        Game.inst = this;
        this.init();
    }
    static inst: Game;

    world: World;
    scene: tr.Scene;
    ticker: Ticker;
    cameraCtr: CameraCtr;
    materialCtr: MaterialCtr;
    obstacleCtr: ObstacleCtr;
    robotCtr: RobotCtr;
    player: Player;
    lvlCfg = CfgLevel.data[0];
    finishLine: tr.Mesh;
    cameraPos: tr.Vector3;
    nowPlayerCount:number;
    
    init() {
        this.world = new World();
        this.nowPlayerCount=GameConstant.PlayersCount;
        ObjectPool.init();
        RoadSegment.init();
        GroundSegment.init();
        Trail.init();
        Tree.init();
        WindLine.init();
        Obstacle.init();//障碍物
        Booster.init();//助推器
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

        let finishTex = Res3DManager.createTexture("finish.png", GameConstant.Anisotropy);
        finishTex.wrapS = tr.RepeatWrapping;
        finishTex.repeat.x = 5;
        this.finishLine = new tr.Mesh(new tr.PlaneGeometry(10, 2), new tr.MeshBasicMaterial({ map: finishTex }))
        this.finishLine.rotateX(Math.PI * -.5)
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
        this.materialCtr.add(this.finishLine.material as tr.Material);
        this.materialCtr.add(this.player.ball.material as tr.Material);
        this.materialCtr.addMulti(this.robotCtr.getRobotsMtls());

        this.setupTouch();
        this.initRoad();
        this.initTrees();
        this.initTheme();
    }

    setupTouch() {
        let stage = Context.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    }

    tickObjects: { update: (dt: number) => void, dispose: () => void }[] = []
    updateTickObjects(dt: number) {
        for (let i = 0; i < this.tickObjects.length; ++i) {
            let rm = this.tickObjects[i].update(dt)
            if (rm) {
                this.tickObjects[i].dispose();
                this.tickObjects.splice(i--, 1);
            }
        }
    }

    addTickObject(o: { update: (dt: number) => void, dispose: () => void }) {
        this.tickObjects.push(o);
    }

    update(dt: number) {
        dt *= .001;

        let dead = this.player.dead;
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
            this.onProgressUpdate && this.onProgressUpdate(-this.player.group.position.z );
        } else {
            this.onProgressUpdate && this.onProgressUpdate(1);
        }
    }
    
    get currentProgress() {
        return Math.min(-this.player.group.position.z / GameConstant.TrackLength, 1);
    }

    onProgressUpdate: (p: number) => void

    ticking() {
        return this.ticker.ticking;
    }
    complete = false;
    running = false;
    revived = 0;
    start() {
        this.running = true;
        this.robotCtr.reset();
        this.world.render();
        app.platform.logEvent(Log.EventType.PlayTimes, { type: app.status.playerType, result: ++app.status.playTimes })
    }

    stop() {
        AudioPlayer.stopMusic();
        this.ticker.stop();
        this.running = false;
    }

    resetLevel(lv: number) {
        this.player.setSkin(app.pp.currentSkinID);
        this.complete && this.switchTheme();
        this.complete = false;
        this.revived = 0;
        this.lvlCfg = CfgLevel.data[lv - 1] || CfgLevel.data[CfgLevel.data.length - 1];
        //GameConstant["TrackLength"] = Context.isFB ? 3000 : 3000;
        GameConstant.TrackLength=GameConstant.TrackLength;
        this.resetRoad();
        this.resetTrees();
        this.resetWind();
        this.finishLine.position.z = -100;
        this.player.reset(); //first
        this.obstacleCtr.reset();
        // this.robotCtr.reset();
        this.world.render();
    }

    switchTheme() {
        let i = Utils.randomInt(0, GameConstant.Maps.length);
        GameConstant.Map == GameConstant.Maps[i] && (i = (i + 1) % GameConstant.Maps.length);
        let map = GameConstant.Maps[i];
        if (Res3DManager.getFBX(map + ".fbx") && Res3DManager.getImage(`lane_${map}.jpg`)) {
            GameConstant.Map = GameConstant.Maps[i];
            this.resetTheme();
        }
    }

    _levelCompleteTimes = 0;
    fail() {
        this._levelCompleteTimes = 0;
    }

    finish() {
        app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(() => { RankCtr.loadLeaderBoardAsync() });
       //更新服务器的score数据
       
        AudioPlayer.stopMusic();
        this.complete = true;
        //app.pp.starCount += Constant.starAmount[this.player.rank + 1];
        app.pp.checkNewSkin();
        let lvl = app.pp.currentLevel;
        if (app.pp.currentLevel < 10 || ++this._levelCompleteTimes >= 2) {
            this._levelCompleteTimes = 0;
            app.pp.currentLevel++;
            app.pp.pushData();
        }
        this.player.slowDown();
        this.robotCtr.allSlowDown();
        egret.setTimeout(() => {
          //  app.platform.updateScore(app.pp.starCount, JSON.stringify({ skin: app.pp.currentSkinID })).then(() => { RankCtr.loadLeaderBoardAsync() });

            this.stop();
            GameView!=null&&app.ui.getPopup(GameView).close();
            app.ui.addPopup(new EndView());
           /* if (app.status.playerType == "new_player" && lvl <= 2 || !Common.shouldPlayAD()) {
                app.ui.addPopup(new BeforeEndView);
            } else {
                Common.tryPlayAD().then(() => {
                    app.ui.addPopup(new EndView());
                })
            }*/
        }, this, Constant.CompleteDelay);

        app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: lvl, result: 3 })
        app.platform.logEvent(Log.EventType.LevelRank, { type: app.status.playerType, level: lvl, rank: this.player.rank + 1 })
        app.platform.logEvent(Log.EventType.LevelOverTimes, { type: app.status.playerType, result: ++app.status.finishTimes })
    }

    initTheme() {
        let c = GameConstant.MapColor[GameConstant.Map];
        this.world.renderer.setClearColor(c)
        this.scene.fog && this.scene.fog.color.setHex(c);

        let assets: string[] = [];
        GameConstant.Maps.forEach(map => {
            if (map != GameConstant.Map) {
                assets.push(`tex/lane_${map}.jpg`)
                assets.push(`fbx/${map}.fbx`)
            }
        })
        Res3DManager.preload(null, ...assets);
    }

    resetTheme() {
        this.initTheme();

        let tex = Res3DManager.createTexture(`lane_${GameConstant.Map}.jpg`, GameConstant.Anisotropy);
        if (!this.world.renderer.getMaxAnisotropy() && GameConstant.Map == "shamo") {
            tex.magFilter = tex.minFilter = tr.NearestFilter;
        }
        RoadSegment.mtl.map = tex;
        Tree.init();
        Obstacle.init4Theme();
        GroundSegment.init4Theme(this.groundSegments);
    }

    initRoad() {
        for (let i = 0; i < 2; ++i) {
            let g = new GroundSegment();
            g.mesh.scale.setScalar(GameConstant.FBXScale);
            g.mesh.rotation.x = -Math.PI * .5;
            g.mesh.position.y = 0;
            g.mesh.position.z = GroundSegment.height * -i - GroundSegment.height * .5 + GameConstant.CameraFollowDist;
            this.groundSegments.push(g);
        }
    }

    roadIndex: number;
    roadSegments: RoadSegment[] = [];
    groundSegments: GroundSegment[] = [];
    resetRoad() {
        this.roadSegments.forEach(g => g.dispose());
        this.roadSegments.length = 0;
        this.roadIndex = -2;
        while (this.roadIndex <= 15) {
            let segment = ObjectPool.inst.get(RoadSegment);
            this.roadSegments.push(segment);
            segment.reset(this.roadIndex++ * -segment.height)
        }

        for (let i = 0; i < this.groundSegments.length; ++i) {
            let g = this.groundSegments[i];
            g.mesh.position.z = GroundSegment.height * -i - GroundSegment.height * .5 + GameConstant.CameraFollowDist;

            g.mesh.parent && g.mesh.parent.remove(g.mesh);
            GroundSegment.geo && this.scene.add(g.mesh);
        }
    }

    updateRoad() {
        while (this.roadSegments[0].mesh.position.z > this.cameraPos.z + RoadSegment.height + GameConstant.ReviveBackDist) {
            let segment = this.roadSegments.shift();
            this.roadSegments.push(segment);
            segment.mesh.position.z = this.roadIndex++ * -segment.height
        }

        if (GroundSegment.geo) {
            let g = this.groundSegments[0];
            if (g.mesh.position.z - GroundSegment.height * .5 > this.cameraPos.z) {
                g.mesh.position.z -= GroundSegment.height * this.groundSegments.length;
                this.groundSegments.push(this.groundSegments.shift())
            }
        }
    }

    treePairs = 5;
    trees: Tree[] = [];
    treesZL = 0;
    treesZR = 0;
    initTrees() {
        for (let i = 0; i < this.treePairs; ++i) {
            this.trees.push(new Tree("l"), new Tree("r"));
        }
    }

    _getTreeGap() {
        return GameConstant.Map != "shamo" ? 25 : Utils.randomRange(25, 40);
    }

    resetTrees() {
        this.treesZL = 0;
        this.treesZR = 0;
        for (let i = 0; i < this.treePairs; ++i) {
            let distL = this._getTreeGap();
            let distR = this._getTreeGap();
            this.trees[i * 2].reset(this.treesZL -= distL);
            this.trees[i * 2 + 1].reset(this.treesZR -= distR);
        }
    }

    updateTrees() {
        let deadZ = this.cameraPos.z + 5;
        this.trees.forEach(tree => {
            if (tree.mesh.position.z > deadZ) {
                let dist = this._getTreeGap();
                if (tree.side == "l") {
                    dist = this.treesZL -= dist;
                } else {
                    dist = this.treesZR -= dist;
                }
                tree.reset(dist);
            }
        })
    }

    _windTime = 0;
    resetWind() {
        this._windTime = 0;
    }

    updateWind(dt: number) {
        if (this.player.boost <= 0) return;
        this._windTime += 4 * Game.inst.player.boostLevel * dt;
        if (this._windTime > 1) {
            this._windTime = 0;
            ObjectPool.inst.get(WindLine).reset();
        }
    }

    revive() {
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
    }

    /** TOUCH EVENTS */
    private startX = 0;
    private touchID = NaN;
    private touchBegin(evt: egret.TouchEvent) {
        if (app.ui.getPopup(GameView) && evt.target === app.ui.getPopup(GameView).btn_try) return;
        if (!isNaN(this.touchID) || !this.running || this.player.dead) return;
        this.touchID = evt.touchPointID;
        if (!this.ticking()) {
            this.ticker.start();
            AudioPlayer.playMusic()
        }
        this.startX = evt.stageX;
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        Context.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
    }

    private touchMove(evt: egret.TouchEvent) {
        if (evt.touchPointID != this.touchID || !this.ticking) return;
        let dx = evt.stageX - this.startX;
        this.startX = evt.stageX;
        this.player.moveX(dx);
    }

    private touchEnd(evt: egret.TouchEvent) {
        if (evt.touchPointID != this.touchID) return;
        this.touchID = NaN;

        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        Context.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
    }
}