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
var BasePopup = (function (_super) {
    __extends(BasePopup, _super);
    function BasePopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = false; //自动关闭
        _this.modal = true; //黑色背景
        _this.modalAlpha = .6;
        _this.animateIn = true; //切换动画
        _this.fullscreen = true;
        _this.center = true;
        return _this;
    }
    BasePopup.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.btn_close) {
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        }
    };
    BasePopup.prototype.fadeIn = function () {
        // this.y = -1440;
        // this.btn_play.horizontalCenter = -640;
        // this.btn_close.horizontalCenter = 640;
        // egret.setTimeout(()=>{
        // 	egret.Tween.get(this.btn_play).to({ horizontalCenter: 0}, 400, egret.Ease.quadIn);
        // 	egret.Tween.get(this.btn_close).to({ horizontalCenter: 0}, 400, egret.Ease.quadIn);
        // }, null, 200);
        this.alpha = 0;
        return egret.Tween.get(this).to({
            alpha: 1
        }, 400, egret.Ease.quadOut);
    };
    BasePopup.prototype.close = function () {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return BasePopup;
}(BaseUI));
__reflect(BasePopup.prototype, "BasePopup");
//# sourceMappingURL=BasePopup.js.map