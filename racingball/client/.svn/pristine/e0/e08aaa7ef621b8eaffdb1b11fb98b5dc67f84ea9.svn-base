var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TextPlane = (function () {
    function TextPlane(height, fontSize, color) {
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.cxt = this.canvas.getContext('2d');
        this.texture = new tr.Texture(this.canvas);
        this.texture.wrapS = tr.RepeatWrapping;
        this.canvas.width = 1024;
        this.canvas.height = fontSize;
        this.cxt.font = fontSize + "px GameFont";
        this.cxt.fillStyle = "#" + color.toString(16);
        this.mesh = new tr.Mesh(new tr.PlaneGeometry(1, 1), new tr.MeshBasicMaterial({ transparent: true, map: this.texture }));
        this.mesh.scale.set(height, height, 1);
    }
    Object.defineProperty(TextPlane.prototype, "text", {
        set: function (v) {
            this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.cxt.fillText(v, 0, this.canvas.height);
            var w = this.cxt.measureText(v).width;
            this.mesh.scale.x = w / this.canvas.height * this.mesh.scale.y;
            this.texture.repeat.x = w / this.canvas.width;
            this.texture.needsUpdate = true;
        },
        enumerable: true,
        configurable: true
    });
    return TextPlane;
}());
__reflect(TextPlane.prototype, "TextPlane");
//# sourceMappingURL=TextPlane.js.map