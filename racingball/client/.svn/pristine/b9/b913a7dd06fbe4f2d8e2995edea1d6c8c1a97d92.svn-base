class Trail {
    mesh: tr.Mesh;
    geo: tr.BufferGeometry;

    private attrPosition: tr.BufferAttribute;
    private attrUV: tr.BufferAttribute;

    private bufferPosition: Float32Array;
    private bufferUV: Float32Array;

    constructor(public fragments = 8, public hW = .25) {
        this.geo = new tr.BufferGeometry();

        let points = this.fragments * 2;
        this.bufferPosition = new Float32Array(points * 3);
        this.attrPosition = new tr.BufferAttribute(this.bufferPosition, 3);
        this.bufferUV = new Float32Array(points * 2);
        this.attrUV = new tr.BufferAttribute(this.bufferUV, 2);

        this.geo = new tr.BufferGeometry();
        this.geo.addAttribute('position', this.attrPosition);
        this.geo.addAttribute('uv', this.attrUV);

        let index: number[] = [];
        for (let i = 0; i < points - 2; i += 2) {
            index.push(i, i + 2, i + 1);
            index.push(i + 1, i + 2, i + 3);
        }
        this.geo.setIndex(index)

        this.mesh = new tr.Mesh(this.geo, Trail.mtl);
    }

    static mtl: tr.MeshBasicMaterial;
    static init() {
        this.mtl = new tr.MeshBasicMaterial({ transparent: true, map: Res3DManager.createTexture("player-trail.png") });
    }

    _postions: tr.Vector3[] = [];

    reset() {
        this._postions.length = 0;
        this.bufferPosition.forEach((v, i, arr) => { arr[i] = 0 });
        this.bufferUV.forEach((v, i, arr) => { arr[i] = 0 });
        this.attrPosition.needsUpdate = true;
        this.attrUV.needsUpdate = true;
    }

    update() {
        let wp = this.mesh.localToWorld(new tr.Vector3);
        this._postions.unshift(wp);
        while (this._postions.length > this.fragments) {
            this._postions.pop();
        }

        let len = this._postions.length;
        this._postions.forEach((p, i) => {
            let x = p.x - wp.x
            let y = p.y - wp.y
            let z = p.z - wp.z
            let j = i * 2, k = i * 2 + 1;

            this.bufferPosition[j * 3] = x - this.hW;
            this.bufferPosition[j * 3 + 1] = y;
            this.bufferPosition[j * 3 + 2] = z;

            this.bufferPosition[k * 3] = x + this.hW;
            this.bufferPosition[k * 3 + 1] = y;
            this.bufferPosition[k * 3 + 2] = z;

            this.bufferUV[j * 2] = 0
            this.bufferUV[j * 2 + 1] = 1 - i / (len - 1)

            this.bufferUV[k * 2] = 1
            this.bufferUV[k * 2 + 1] = 1 - i / (len - 1)
        })

        this.attrPosition.needsUpdate = true;
        this.attrUV.needsUpdate = true;
    }
}