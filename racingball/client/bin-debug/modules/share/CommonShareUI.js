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
var CommonShareUI = (function (_super) {
    __extends(CommonShareUI, _super);
    function CommonShareUI(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    CommonShareUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onReady();
        this.data.bg && (this.img_bg.source = "");
        this.img_bg.once(egret.Event.COMPLETE, this.onReady, this);
        this.data.bg && (this.img_bg.source = this.data.bg);
        if (this.img_head) {
            this.img_head.mask = this.img_mask;
            this.img_head.source = "";
            this.img_head.once(egret.Event.COMPLETE, this.onReady, this);
            this.img_head.source = this.data.photo;
        }
        if (this.lbl_rank) {
            this.lbl_rank.text = this.data.rank;
        }
    };
    CommonShareUI.prototype.onReady = function () {
        var _this = this;
        egret.setTimeout(function () {
            if (_this.img_bg && !_this.img_bg.texture)
                return;
            if (_this.img_head && !_this.img_head.texture)
                return;
            _this.dispatchEventWith("ready_2_draw");
        }, null, 50);
    };
    return CommonShareUI;
}(eui.Component));
__reflect(CommonShareUI.prototype, "CommonShareUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonShareUI.js.map