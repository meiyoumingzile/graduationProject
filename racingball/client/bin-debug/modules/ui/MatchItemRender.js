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
var MatchItemRender = (function (_super) {
    __extends(MatchItemRender, _super);
    function MatchItemRender(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this._min_waiting_time = 500;
        return _this;
    }
    MatchItemRender.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.img_portrait.mask = this.img_portrait_mask;
        this.img_portrait.visible = false;
        this.img_loading.visible = true;
        this.img_portrait.source = "";
        Promise.race([
            Promise.all([
                Utils.wait(this.data && this.data["me"] ? 50 : Utils.randomRange(this._min_waiting_time, Constant.MatchingTime)),
                new Promise(function (resolve) {
                    _this.img_portrait.once(egret.Event.COMPLETE, resolve, _this);
                }),
            ]),
            Utils.wait(Constant.MatchingTime)
        ]).then(function () {
            _this.img_loading.visible = false;
            _this.img_portrait.visible = true;
            _this.ticker.stop();
            _this.dispatchEventWith("LoadingDone", true);
        });
        this.img_portrait.source = this.data.photo;
        this.ticker = new Ticker(this.update, this, 150);
        this.ticker.start();
    };
    MatchItemRender.prototype.update = function () {
        this.img_loading.rotation += 45;
    };
    return MatchItemRender;
}(eui.ItemRenderer));
__reflect(MatchItemRender.prototype, "MatchItemRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MatchItemRender.js.map