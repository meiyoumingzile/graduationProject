var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImgOfTargetToSurpass = (function () {
    function ImgOfTargetToSurpass() {
        this._loader = new tr.ImageLoader();
        this._tex = new tr.Texture();
        this._mesh = new tr.Mesh(new tr.PlaneGeometry(1, 1), new tr.MeshBasicMaterial({ transparent: true, map: this._tex }));
        this._mesh.position.y = 1.2;
    }
    ImgOfTargetToSurpass.prototype.loadImage = function (url) {
        var _this = this;
        this._mesh.visible = false;
        url && this._loader.load(url, function (img) {
            _this._mesh.visible = true;
            var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0; // || name.search( /^data\:image\/jpeg/ ) === 0;
            _this._tex.image = img;
            _this._tex.format = isJPEG ? tr.RGBFormat : tr.RGBAFormat;
            _this._tex.needsUpdate = true;
            _this._tex.anisotropy = 4;
        }, undefined, function (e) {
        });
    };
    ImgOfTargetToSurpass.prototype.setTarget = function (robot) {
        if (robot == this._target)
            return;
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
    };
    ImgOfTargetToSurpass.prototype.update = function () {
    };
    return ImgOfTargetToSurpass;
}());
__reflect(ImgOfTargetToSurpass.prototype, "ImgOfTargetToSurpass");
//# sourceMappingURL=ImgOfTargetToSurpass.js.map