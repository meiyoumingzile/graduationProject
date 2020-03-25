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
var InviteView = (function (_super) {
    __extends(InviteView, _super);
    function InviteView() {
        var _this = _super.call(this) || this;
        _this.pages = [];
        _this.invitedList = [];
        _this._gp_width = 0;
        _this._current_page = 0;
        _this.scrollH = 0;
        _this.centerH = 0;
        _this.inviteAmountArr = [];
        return _this;
    }
    InviteView.prototype.childrenCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var skins, temp, dataFriends, _a, entries, invitedIDs, invitedInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _super.prototype.childrenCreated.call(this);
                        app.pp.newInviteSkinAmount = 0;
                        app.pp.pushData();
                        this.btn_home.addEventListener("touchTap", this.onTapHome, this);
                        this.btn_invite.addEventListener("touchTap", this.onTapInvite, this);
                        this.btn_play.addEventListener("touchTap", function () {
                            var id = _this.skinRenderData[_this._current_page].id;
                            if (app.pp.havingSkinIDs.includes(id)) {
                                app.pp.currentSkinID = id;
                                app.pp.pushData();
                                Game.inst.player.setSkin(id);
                            }
                            _this.close();
                            //app.ui.addPopup(new MatchView);
                            app.notify(AppConstant.Notify.enter_game);
                        }, this);
                        skins = app.status.skinItemData.filter(function (v) { return v.price.type === 2; }).sort(function (a, b) { return (a.order - b.order); }).map(function (i) { return i.id; });
                        this.skinRenderData = skins.map(function (id) { return ({
                            id: id,
                            thumb: app.status.skinItemData[id - 1].thumb
                        }); });
                        this.gp_skin.addChild(this.createSkinGroup("", true));
                        this.skinRenderData.forEach(function (value) {
                            var group = _this.createSkinGroup(value.thumb);
                            _this.inviteAmountArr.push(app.status.skinItemData[value.id - 1].price.num);
                            _this.gp_skin.addChild(group);
                        });
                        this.gp_skin.addChild(this.createSkinGroup("", true));
                        this.validateNow();
                        this.sc_skins.addEventListener(egret.Event.CHANGE, function () {
                            if (_this.sc_skins.viewport.scrollH < 0)
                                return;
                            if (_this.sc_skins.viewport.scrollH > _this.sc_skins.viewport.contentWidth - _this.sc_skins.width)
                                return;
                            _this.scrollH = _this.sc_skins.viewport.scrollH;
                            _this.centerH = _this.scrollH + .5 * _this.stage.stageWidth;
                            var currentPage = Math.floor(_this.centerH / _this._gp_width) - 1;
                            if (currentPage !== _this._current_page) {
                                _this.onPageChanged(currentPage);
                            }
                            _this.refreshSkinList();
                        }, this);
                        temp = this.sc_skins;
                        this._onTouchEndOld = temp.onTouchEnd;
                        temp.onTouchEnd = this.touchEndEvent.bind(this);
                        _a = app.status.friendList;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, app.platform.getConnectedFriendList()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        dataFriends = _a;
                        entries = [];
                        invitedIDs = app.pp.invitedGuys;
                        invitedInfo = Context.gameModel.skinInviteInfo;
                        this.invitedList = [];
                        dataFriends && dataFriends.forEach(function (value) {
                            entries.push(RankPlayerVO.createFromContextPlayer(value));
                        });
                        egret.log("invitedIDs", invitedIDs);
                        egret.log("陌生人信息", invitedInfo);
                        invitedIDs.forEach(function (value) {
                            var index = entries.findIndex(function (v) { return v.id === value; });
                            if (index >= 0) {
                                _this.invitedList.push(entries[index].photo);
                            }
                            else if (invitedInfo[value] && invitedInfo[value].head) {
                                _this.invitedList.push(invitedInfo[value].head);
                            }
                            else {
                                _this.invitedList.push("default_portrait.png");
                            }
                        });
                        this.sc_skins.dispatchEventWith(egret.Event.CHANGE);
                        this.refreshSkinList();
                        this.refreshPortraitList();
                        this.refreshAmount();
                        return [2 /*return*/];
                }
            });
        });
    };
    InviteView.prototype.createSkinGroup = function (source, placeholder) {
        if (placeholder === void 0) { placeholder = false; }
        var width = this.stage.stageWidth;
        var group = new eui.Group;
        this._gp_width = group.width = width / 3;
        var img = new eui.Image;
        var mask = new eui.Image;
        group.addChild(img);
        img.horizontalCenter = img.verticalCenter = 0;
        group.addChild(mask);
        mask.horizontalCenter = mask.verticalCenter = 0;
        img.source = placeholder ? "" : source;
        mask.source = placeholder ? "" : "invite-mask-ball.png";
        mask.alpha = .3;
        return group;
    };
    InviteView.prototype.onPageChanged = function (index) {
        this._current_page = index;
        this.refreshPortraitList();
        this.refreshAmount();
    };
    InviteView.prototype.refreshAmount = function () {
        var shouldInviteAmount = this.inviteAmountArr[this._current_page];
        var hasInviteAmount = app.pp.invitedGuys.length;
        this.txt_refer.text = (shouldInviteAmount === 1 ? "Refer one Friend" : "Refer " + shouldInviteAmount + " Friends");
        if (hasInviteAmount < shouldInviteAmount) {
            this.btn_play.visible = false;
            this.btn_invite.visible = true;
            this.btn_invite.label = hasInviteAmount + "/" + shouldInviteAmount;
        }
        else {
            this.btn_play.visible = true;
            this.btn_invite.visible = false;
            // this.btn_invite.label = shouldInviteAmount + "/" + shouldInviteAmount;
        }
    };
    InviteView.prototype.refreshPortraitList = function () {
        var shouldInviteAmount = this.inviteAmountArr[this._current_page];
        var showList = this.invitedList.slice(0, shouldInviteAmount);
        while (showList.length < shouldInviteAmount) {
            showList.push("");
        }
        this.list_invite.dataProvider = new eui.ArrayCollection(showList);
        this.gp_portrait.layout.horizontalAlign = this.list_invite.width < this.stage.stageWidth ? "center" : "left";
    };
    InviteView.prototype.refreshSkinList = function () {
        var scrollH = this.scrollH;
        for (var i = 0; i < this.gp_skin.numChildren - 2; i++) {
            var img = this.gp_skin.getChildAt(i + 1).$children[0];
            var mask = this.gp_skin.getChildAt(i + 1).$children[1];
            var distance = Math.abs(this.centerH - (1.5 + i) * this._gp_width);
            if (distance < this._gp_width) {
                var scale = 1.4 - (distance / this._gp_width) * 0.4;
                img.scale = scale;
                mask.scale = scale;
                mask.alpha = (distance / this._gp_width) * 0.3;
            }
            else {
                img.scale = 1;
                mask.alpha = .3;
            }
        }
    };
    InviteView.prototype.scrollToPage = function (index) {
        var _this = this;
        if (this.sc_skins.viewport.scrollH < 0)
            return;
        if (this.sc_skins.viewport.scrollH > this.sc_skins.viewport.contentWidth - this.sc_skins.width)
            return;
        var timeInSecond = 300;
        var x = index * this._gp_width;
        this.sc_skins.stopAnimation();
        egret.Tween.removeTweens(this.sc_skins.viewport);
        // 滚动动画
        egret.Tween.get(this.sc_skins.viewport, {
            onChange: function () {
                _this.sc_skins.dispatchEventWith(eui.UIEvent.CHANGE);
            }
        }).to({ scrollH: x }, timeInSecond)
            .call(function () {
            // egret.log("over");
        });
    };
    InviteView.prototype.touchEndEvent = function (event) {
        this._onTouchEndOld.call(this.sc_skins, event);
        if (!event.$isPropagationStopped) {
            this.scrollToPage(this._current_page);
        }
    };
    InviteView.prototype.onTapHome = function () {
        this.close();
        app.ui.addPopup(new HomeView);
    };
    InviteView.prototype.onTapInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                app.platform.logEvent(Log.EventType.InviteGetSkin, { type: app.status.playerType, result: 0 });
                ShareHelper.sendGenericUpdate(true, {
                    invite_skin_data: { playerId: app.platform.id(), skinId: 0 }
                });
                return [2 /*return*/];
            });
        });
    };
    InviteView.prototype.listResponse = function () {
        return [AppConstant.Notify.refresh_invite_count];
    };
    InviteView.prototype.doResponse = function (name, data) {
        if (name === AppConstant.Notify.refresh_invite_count) {
            this.refreshAvator();
        }
    };
    InviteView.prototype.refreshAvator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dataFriends, _a, entries, invitedIDs, invitedInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = app.status.friendList;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, app.platform.getConnectedFriendList()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        dataFriends = _a;
                        entries = [];
                        invitedIDs = app.pp.invitedGuys;
                        invitedInfo = Context.gameModel.skinInviteInfo;
                        this.invitedList = [];
                        dataFriends && dataFriends.forEach(function (value) {
                            entries.push(RankPlayerVO.createFromContextPlayer(value));
                        });
                        egret.log("invitedIDs", invitedIDs);
                        egret.log("陌生人信息", invitedInfo);
                        invitedIDs.forEach(function (value) {
                            var index = entries.findIndex(function (v) { return v.id === value; });
                            if (index >= 0) {
                                _this.invitedList.push(entries[index].photo);
                            }
                            else if (invitedInfo[value] && invitedInfo[value].head) {
                                _this.invitedList.push(invitedInfo[value].head);
                            }
                            else {
                                _this.invitedList.push("default_portrait.png");
                            }
                        });
                        this.refreshPortraitList();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InviteView;
}(BasePopup));
__reflect(InviteView.prototype, "InviteView");
//# sourceMappingURL=InviteView.js.map