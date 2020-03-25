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
var BusyIndicator = (function (_super) {
    __extends(BusyIndicator, _super);
    function BusyIndicator() {
        var _this = _super.call(this) || this;
        _this.animateIn = false;
        _this.fullscreen = false;
        var texture = RES.getRes("loading.png");
        _this._bmp = new egret.Bitmap(texture);
        _this._bmp.anchorOffsetX = texture.textureWidth * .5;
        _this._bmp.anchorOffsetY = texture.textureHeight * .5;
        _this.addChild(_this._bmp);
        _this.width = _this.height = 0;
        return _this;
    }
    BusyIndicator.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this._bmp.alpha = 0;
        egret.Tween.get(this._bmp).to({ alpha: 1 }, 100);
        egret.Tween.get(this._bmp, { loop: true })
            .to({ rotation: 180 }, 1000)
            .to({ rotation: 360 }, 1000);
    };
    BusyIndicator.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        egret.Tween.removeTweens(this._bmp);
    };
    return BusyIndicator;
}(BasePopup));
__reflect(BusyIndicator.prototype, "BusyIndicator");
//# sourceMappingURL=BusyIndicator.js.map