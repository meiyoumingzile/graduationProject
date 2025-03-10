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
var SkinItemRender = (function (_super) {
    __extends(SkinItemRender, _super);
    function SkinItemRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkinItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var skinType = app.status.skinItemData[this.data.id - 1].price.type;
        var progress = app.pp.skinProgressData[this.data.id] || 0;
        progress = skinType === 3 ? app.pp.starCount : progress;
        var needNum = app.status.skinItemData[this.data.id - 1].price.num;
        var id = this.data.id;
        var have = app.pp.havingSkinIDs.includes(id);
        console.log("render", skinType, progress, needNum, this.data.id, have);
        if (have) {
            this.mask_rect.scaleY = 0;
        }
        else {
            this.mask_rect.scaleY = 1 - progress / needNum;
        }
        this.img_skin_icon.source = this.data.thumb;
        // this.fixStatus();
    };
    SkinItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.unhave_mask.mask = this.mask_rect;
    };
    return SkinItemRender;
}(eui.ItemRenderer));
__reflect(SkinItemRender.prototype, "SkinItemRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SkinItemRender.js.map