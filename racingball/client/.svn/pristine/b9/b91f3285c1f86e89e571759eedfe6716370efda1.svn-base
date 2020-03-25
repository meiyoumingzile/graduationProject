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
var WorldRankItemRender = (function (_super) {
    __extends(WorldRankItemRender, _super);
    function WorldRankItemRender() {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        return _this;
    }
    WorldRankItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initialized = true;
        this.img_portrait.mask = this.img_portrait_mask;
    };
    WorldRankItemRender.prototype.dataChanged = function () {
        if (!this.initialized)
            return;
        if (!this.data)
            return;
        this.img_bar.width = Constant.FullWidthScale * 581;
        var rank = this.itemIndex + 1;
        this.txt_rank.text = this.data.originalRank + "";
        if (rank === 1) {
            this.img_bar.source = "rank-bar-champion.png";
            this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
            this.img_rank_bg.source = "rank-rank" + rank + ".png";
            this.txt_name.textColor = 0xffffff;
            this.txt_score.stroke = 2;
            this.txt_score.strokeColor = 0xFFB701;
        }
        if (rank === 2) {
            this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
            this.img_rank_bg.source = "rank-rank" + rank + ".png";
            this.txt_score.stroke = 2;
            this.txt_score.strokeColor = 0xEF8033;
        }
        if (rank === 3) {
            this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
            this.img_rank_bg.source = "rank-rank" + rank + ".png";
            this.txt_score.stroke = 2;
            this.txt_score.strokeColor = 0xEF492F;
        }
        if (this.data["bg"]) {
            this.img_bar.source = this.data["bg"];
        }
        if (this.data["name_color"]) {
            this.txt_name.textColor = this.data["name_color"];
        }
        this.img_portrait.source = this.data.photo;
        this.txt_name.text = this.data.name;
        this.txt_score.text = this.data.score + "";
        var skin = app.status.skinItemData[this.data.skin - 1].thumb;
        skin && (this.img_skin.source = "resource/assets/skin/" + skin);
        // // 是自己的这条数据，play=>share
        // if (this.data.id === app.platform.id()) {
        // 	this.btn_play.visible = false;
        // 	this.btn_share.visible = true;
        // }
        // this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        // 	this.onTapPlay();
        // }, this)
        // this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        // 	this.onTapShare();
        // }, this)
    };
    return WorldRankItemRender;
}(eui.ItemRenderer));
__reflect(WorldRankItemRender.prototype, "WorldRankItemRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=WorldRankItemRender.js.map