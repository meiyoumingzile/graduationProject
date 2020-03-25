
class ImgOfTargetToSurpass {

    _loader = new tr.ImageLoader();
    _tex = new tr.Texture();
    _mesh: tr.Mesh;

    constructor() {
        this._mesh = new tr.Mesh(new tr.PlaneGeometry(1, 1), new tr.MeshBasicMaterial({ transparent: true, map: this._tex }));
        this._mesh.position.y = 1.2;
    }

    loadImage(url: string) {
        this._mesh.visible = false;
        url && this._loader.load(url, img => {
            this._mesh.visible = true;
            var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0;// || name.search( /^data\:image\/jpeg/ ) === 0;
            this._tex.image = img;
            this._tex.format = isJPEG ? tr.RGBFormat : tr.RGBAFormat;
            this._tex.needsUpdate = true;
            this._tex.anisotropy = 4;
        }, undefined, e => {
        })
    }

    _target: Robot;
    setTarget(robot: Robot) {
        if (robot == this._target) return;
        if (this._target) {
            this._target._namePlane.mesh.visible = true;
            this._mesh.parent.remove(this._mesh);
        }
        this._target = robot;
        if (this._target) {
            this._target.group2.add(this._mesh);
            this._target._namePlane.mesh.visible = false;
        }
        this.loadImage(robot && robot.robotInfo.photo);
    }

    update() {
    }
}