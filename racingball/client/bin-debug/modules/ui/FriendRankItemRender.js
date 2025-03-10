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
var FriendRankItemRender = (function (_super) {
    __extends(FriendRankItemRender, _super);
    function FriendRankItemRender() {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        return _this;
    }
    FriendRankItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initialized = true;
    };
    FriendRankItemRender.prototype.dataChanged = function () {
        var _this = this;
        if (!this.initialized)
            return;
        if (!this.data)
            return;
        var data = this.data;
        //改变头像
        //this.img_head=this.data.iconDisplay;
        //#
        //this.img_bar.width = Constant.FullWidthScale * 581;
        var rank = this.itemIndex + 1;
        if (rank > 0) {
            this.img_bar.source = "rank_bg_" + (rank < 4 ? rank : 4) + ".png";
            this.img_headmerge.source = "rank_hmerge_" + (rank < 4 ? rank : 4) + ".png";
            this.lb_rank.text = rank + "";
            this.img_head.source = data.photo;
            this.lb_name.text = data.name;
            this.img_skin.source = app.status.skinItemData[data.skin - 1].thumb;
            ;
            this.lb_score.$setText(data.score + "");
            this.img_head.mask = this.img_head_mask; //设置遮掩
            this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.onTapPlay();
            }, this);
            this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.onTapShare();
            }, this);
            //this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
            // let skin = app.status.skinItemData[this.data.skin - 1].thumb;
            // skin && (this.img_skin.source = `resource/assets/skin/${skin}`);
        }
        /*if (this.data["bg"]) {
            this.img_bar.source = this.data["bg"];
        }
        if (this.data["name_color"]) {
            this.lb_name.textColor = this.data["name_color"];
        }
        */
        // 是自己的这条数据，play=>share
        if (this.data.id === app.platform.id()) {
            this.btn_play.visible = false;
            this.btn_share.visible = true;
        }
    };
    FriendRankItemRender.prototype.onTapPlay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.platform.createCtx(this.data.id)];
                    case 1:
                        bo = _a.sent();
                        bo && this.dispatchEventWith('PlayWithFriend', true);
                        return [2 /*return*/];
                }
            });
        });
    };
    FriendRankItemRender.prototype.onTapShare = function () {
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
    return FriendRankItemRender;
}(eui.ItemRenderer));
__reflect(FriendRankItemRender.prototype, "FriendRankItemRender", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FriendRankItemRender.js.map