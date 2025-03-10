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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SkinView = (function (_super) {
    __extends(SkinView, _super);
    function SkinView() {
        var _this = _super.call(this) || this;
        _this.pages = [];
        _this._current_page = 0;
        return _this;
    }
    SkinView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        app.pp.newStarSkinAmount = 0;
        app.pp.pushData();
        app.pp.checkNewSkin();
        this.gp_skin.scale = Constant.FullWidthScale;
        this.img_skin.scale = Constant.FullWidthScale;
        this.btn_home.addEventListener("touchTap", this.onTapHome, this);
        this.btn_video.addEventListener("touchTap", this.onTapVideo, this);
        this.btn_star.addEventListener("touchTap", this.onTapStar, this);
        this.btn_play.addEventListener("touchTap", function () {
            // Common.invite().then(() => {
            // 	this.close();
            // 	app.ui.addPopup(new MatchView);
            // });
            _this.close();
            // app.ui.addPopup(new MatchView);
            app.notify(AppConstant.Notify.enter_game);
        }, this);
        this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Common.showRAD('adSkin', _this.successInBuySkin.bind(_this));
        }, this);
        this.btn_friends.addEventListener("touchTap", this.onTapShare, this);
        var skins = app.status.skinItemData.filter(function (v) { return v.price.type < 3; }).sort(function (a, b) { return (a.order - b.order); }).map(function (i) { return i.id; });
        var skins_star = app.status.skinItemData.filter(function (v) { return v.price.type === 3; }).sort(function (a, b) { return (a.order - b.order); }).map(function (i) { return i.id; });
        skins = skins.concat(skins_star);
        var skinRenderData = skins.map(function (id) { return ({ id: id,
            thumb: app.status.skinItemData[id - 1].thumb
        }); });
        var skinsNum = skins.length;
        var pagesNum = Math.ceil(skinsNum / 9);
        for (var i = 0; i < skinsNum; i++) {
            var idx_1 = Math.floor(i / 9);
            this.pages[idx_1] || (this.pages[idx_1] = []);
            this.pages[idx_1].push(skinRenderData[i]);
        }
        var _loop_1 = function (page) {
            var list = this_1.createSkinList(page);
            list.allowMultipleSelection = false;
            list.width = this_1.gp_skin.width;
            list.height = this_1.gp_skin.height;
            list.addEventListener(egret.Event.CHANGING, function (e) {
                var item = list.selectedItem;
                var ac = list.dataProvider;
                ac.itemUpdated(item);
                ac.itemUpdated(_this._selected_item);
                _this.onSkinSelected(item);
            }, this_1);
            this_1.gp_skin.addChild(list);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
            var page = _a[_i];
            _loop_1(page);
        }
        this.list_page_indicator.dataProvider = new eui.ArrayCollection(this.pages);
        this.pageViewContr = new PagesViewController(this.sc_skins, function (index) {
            _this.onPageChanged(index);
        });
        var idx = skins.indexOf(app.pp.currentSkinID);
        this._selected_item = skinRenderData[idx];
        this.btn_play.visible = true;
        this.btn_ad.visible = false;
        this.btn_friends.visible = false;
        this.show_ex.visible = false;
        this.nowimg_notice.text = "";
        this.nowimg.source = skinRenderData[idx].thumb;
        // this.refreshInviteSkinProgress();
        this.refreshView();
        this.gp_skin.validateNow();
    };
    SkinView.prototype.createSkinList = function (arr) {
        var list = new eui.List();
        var layout = new eui.TileLayout();
        layout.requestedColumnCount = 3;
        layout.requestedRowCount = 3;
        layout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_GAP;
        layout.verticalGap = 46;
        layout.paddingLeft = layout.paddingRight = 20;
        list.layout = layout;
        list.itemRenderer = SkinItemRender;
        list.dataProvider = new eui.ArrayCollection(arr);
        return list;
    };
    SkinView.prototype.onPageChanged = function (index) {
        this._current_page = index;
        if (this._current_page === 0 || this._current_page === 1) {
            this.img_tab_star.visible = false;
            this.img_tab_video.visible = true;
        }
        else {
            this.img_tab_star.visible = true;
            this.img_tab_video.visible = false;
        }
        this.refreshView();
    };
    SkinView.prototype.onSkinSelected = function (skin) {
        this._selected_item = skin;
        this.nowimg.source = skin.thumb;
        if (app.pp.havingSkinIDs.includes(skin.id)) {
            app.pp.currentSkinID = skin.id;
            // this.nowimg.source=skin.thumb;
            this.nowimg_notice.text = "";
            app.pp.pushData();
            Game.inst.player.setSkin(skin.id);
        }
        this.refreshView();
    };
    /**更新上方显示,底部按钮,selectIndex */
    SkinView.prototype.refreshView = function () {
        var skin = this._selected_item;
        if (!skin)
            return;
        var skinType = app.status.skinItemData[skin.id - 1].price.type;
        var progress = app.pp.skinProgressData[skin.id] || 0;
        var needNum = app.status.skinItemData[skin.id - 1].price.num;
        if (skinType == 0 || app.pp.havingSkinIDs.includes(skin.id)) {
            this.btn_play.visible = true;
            this.btn_ad.visible = false;
            this.btn_friends.visible = false;
            this.show_ex.visible = false;
            this.nowimg_notice.text = "";
        }
        else if (skinType == 1) {
            this.btn_play.visible = false;
            this.btn_ad.visible = true;
            this.btn_friends.visible = false;
            this.show_ex.visible = false;
            this.nowimg_notice.text = "WATCH " + needNum + " VIDEO" + (needNum <= 1 ? "" : "S");
            this.btn_ad.label = progress + "/" + needNum;
        }
        else if (skinType == 2) {
            this.btn_play.visible = false;
            this.btn_ad.visible = false;
            this.btn_friends.visible = true;
            this.show_ex.visible = false;
            this.nowimg_notice.text = "SHARE TO " + needNum + " FRIEND" + (needNum <= 1 ? "" : "S");
            this.btn_friends.label = progress + "/" + needNum;
        }
        else if (skinType == 3) {
            this.btn_play.visible = false;
            this.btn_ad.visible = false;
            this.btn_friends.visible = false;
            this.show_ex.visible = true;
            this.nowimg_notice.text = "unlock with get " + needNum + " points";
            this.lb_ex.text = Math.round(app.pp.starCount) + "/" + needNum;
            // progress = app.pp.starCount;
            // this.btn_star_count.label = `${progress}/${needNum}`;
        }
        for (var i = 0; i < this.gp_skin.numChildren; i++) {
            var list = this.gp_skin.getChildAt(i);
            var ac = list.dataProvider;
            list.selectedIndex = ac.getItemIndex(skin);
            ac.itemUpdated(skin);
        }
        this.list_page_indicator.selectedIndex = this._current_page;
        // egret.log(this._selected_item.id);
    };
    SkinView.prototype.successInBuySkin = function () {
        var skin = this._selected_item;
        var id = skin.id;
        var res = app.pp.tryBuySkin(id);
        if (res) {
            app.pp.currentSkinID = id;
            app.pp.pushData();
            Game.inst.player.setSkin(id);
        }
        this.refreshView();
    };
    SkinView.prototype.onTapHome = function () {
        this.close();
        app.ui.addPopup(new HomeView);
    };
    SkinView.prototype.onTapVideo = function () {
        //if (this._current_page === 0 || this._current_page === 1) {
        //do nothing
        //} else {
        AudioPlayer.playSound("click.mp3");
        this.pageViewContr.scrollToPage(0);
        this.img_tab_star.visible = false;
        this.img_tab_video.visible = true;
        //	}
    };
    SkinView.prototype.onTapStar = function () {
        if (this._current_page === 0 || this._current_page === 1) {
            AudioPlayer.playSound("click.mp3");
            this.pageViewContr.scrollToPage(2);
            this.img_tab_star.visible = true;
            this.img_tab_video.visible = false;
        }
        else {
            // do nothing
        }
    };
    SkinView.prototype.onTapShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ShareHelper.sendGenericUpdate(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SkinView;
}(BasePopup));
__reflect(SkinView.prototype, "SkinView");
//# sourceMappingURL=SkinView.js.map