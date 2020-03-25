
class Obstacle extends PoolObject {

    static mtl: tr.Material;
    static geoBox: tr.Geometry;
    static geoSlope: tr.Geometry;
    static geoBooster: tr.Geometry;

    static init() {
        this.init4Theme();
        ObjectPool.inst.register(Obstacle, 5);
    }

    static init4Theme() {
        let fbxs = Res3DManager.getFBX(`${GameConstant.Map}.fbx`).children;
        let fbxBox = fbxs.find(i => i.name == "xiangzi") as tr.Mesh;
        let fbxSlope = fbxs.find(i => i.name == "tantiao") as tr.Mesh;
        let fbxBooster = fbxs.find(i => i.name == "jiasu") as tr.Mesh;
        this.geoBox = fbxBox.geometry as tr.Geometry;
        this.geoSlope = fbxSlope.geometry as tr.Geometry;
        this.geoBooster = fbxBooster.geometry as tr.Geometry;

        this.mtl = this.mtl || fbxBox.material as tr.Material;
        (this.mtl as tr.MeshPhongMaterial).map.anisotropy = GameConstant.Anisotropy;
    }

    constructor() {
        super();
        this.group.position.y = -GameConstant.BallR;
        this.position = this.group.position;
    }

    name() {
        return "Obstacle"
    }

    group: tr.Group = new tr.Group();
    position: tr.Vector3;
    boxes: ObsPart[];
    collisions: number[][];
    moving = false;
    slope = false;
    lowGate = false;
    reset(arr: ObsPart[], z: number, x: number, flip: boolean, collisions: number[][]) {
        this.boxes = arr;
        this.boxes.forEach(i => {
            this.group.add(i.mesh);
        });
        this.group.position.z = z;
        this.group.position.x = x;
        this.group.rotation.y = flip ? Math.PI : 0;
        this.collisions = collisions.map(ar => ar.map(v => flip ? -v : v));
        Game.inst.scene.add(this.group);

        this.moving && (egret.Tween.removeTweens(this.position), this.moving = false);
        this.slope = false;
        this.lowGate = false;
    }

    startMoving(t: number, flip: boolean) {
        this.moving = true;
        let movePath = this._movePath = t == 0 ? flip ? [-1, 2, -2, 2] : [1, -2, 2, -2] : flip ? [2, -2] : [-2, 2];
        this.group.position.x = movePath[0] * 2;

        let tween = egret.Tween.get(this.position, { loop: true });
        let speed = Utils.randomRange(Game.inst.lvlCfg.cubeSpMin, Game.inst.lvlCfg.cubeSpMax);
        this._moveInterval = 1000 / speed;
        this._moveIndex = 0;
        this._moveIndexTime = egret.getTimer();
        for (let i = 0; i < movePath.length; ++i) {
            let pos = movePath[(i + 1) % movePath.length] * 2;
            tween = tween.call(() => {
                this._moveIndex = i;
                this._moveIndexTime = egret.getTimer();
            }).to({ x: pos }, this._moveInterval, egret.Ease.quadInOut)
        }
    }
    _movePath: number[];
    _moveInterval: number;
    _moveIndexTime = 0;
    _moveIndex = 0;

    getEstimatedPos(dt: number) {
        let passed = egret.getTimer() - this._moveIndexTime
        let percent = Utils.clamp(passed / this._moveInterval, 0, 1);
        let percentT = dt * 1000 / this._moveInterval + percent;
        percent = percentT % 1;
        let i = (this._moveIndex + (percentT | 0)) % this._movePath.length;
        let pCrt = this._movePath[i] * 2;
        let pTgt = this._movePath[(i + 1) % this._movePath.length] * 2;

        percent = egret.Ease.getPowInOut(2)(percent);
        let p = (pTgt - pCrt) * percent + pCrt;
        
        return p;
    }

    dispose() {
        this.boxes.forEach(i => {
            this.group.remove(i.mesh);
            i.dispose();
        })
        Game.inst.scene.remove(this.group)
        super.dispose();
    }

    update(dt: number) {
        return this.group.position.z > Game.inst.cameraPos.z - 1
    }
}