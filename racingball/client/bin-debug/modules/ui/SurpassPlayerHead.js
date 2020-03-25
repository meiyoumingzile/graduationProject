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
var SurpassPlayerHead = (function (_super) {
    __extends(SurpassPlayerHead, _super);
    function SurpassPlayerHead(pos, beginspeedy, photo, score) {
        var _this = _super.call(this) || this;
        _this.x = pos.x;
        _this.y = pos.y;
        _this.beginspeedy = _this.speedy = beginspeedy;
        _this.accy = 1;
        _this.now_surpassPlayer_head.source = photo;
        _this.lb_friendDis.text = score;
        return _this;
    }
    SurpassPlayerHead.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.alpha = 1;
        this.scale = Constant.FullWidthScale;
        this.ticker = new Ticker(this.update, this);
    };
    SurpassPlayerHead.prototype.update = function (dt) {
        this.y += this.speedy;
        this.speedy += this.accy;
        if (this.speedy >= 0) {
            this.removeFromParent();
        }
        this.alpha = this.speedy / this.beginspeedy;
    };
    return SurpassPlayerHead;
}(BasePopup));
__reflect(SurpassPlayerHead.prototype, "SurpassPlayerHead");
//# sourceMappingURL=SurpassPlayerHead.js.map