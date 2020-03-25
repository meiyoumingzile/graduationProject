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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(toastText) {
        var _this = _super.call(this) || this;
        _this.toastText = toastText;
        return _this;
    }
    Toast.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.text_node.text = this.toastText;
        this.width = Context.stage.stageWidth;
    };
    return Toast;
}(eui.Component));
__reflect(Toast.prototype, "Toast", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Toast.js.map