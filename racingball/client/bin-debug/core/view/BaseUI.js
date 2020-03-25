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
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        return _super.call(this) || this;
    }
    BaseUI.prototype.onEnter = function () {
        app.registResponser(this);
    };
    BaseUI.prototype.onExit = function () {
        app.unregistResponser(this);
    };
    BaseUI.prototype.onReady = function () {
    };
    BaseUI.prototype.listResponse = function () {
        return [];
    };
    BaseUI.prototype.doResponse = function (name, data) {
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI", ["eui.UIComponent", "egret.DisplayObject", "IResponder"]);
//# sourceMappingURL=BaseUI.js.map