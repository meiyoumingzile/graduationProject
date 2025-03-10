var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var PlayerPersistent = (function () {
    function PlayerPersistent() {
        this.Data = {
            v: 0,
            newInviteSkinAmount: 0,
            newStarSkinAmount: 0,
            startCount: 0,
            currentLevel: 1,
            currentSkinID: 1,
            havingSkinIDs: [1],
            invitedGuys: [],
            recievedLoveGuys: [],
            skinProgressData: {},
            lastPlayTimestamp: 0,
            continuousPlayDays: 0,
            shortcutRefused: 0,
            shortcutClaimed: false,
        };
        this.Keys = [
            "v",
            'newInviteSkinAmount',
            'newStarSkinAmount',
            'startCount',
            'currentLevel',
            'currentSkinID',
            'havingSkinIDs',
            'invitedGuys',
            'recievedLoveGuys',
            'skinProgressData',
            'lastPlayTimestamp',
            'continuousPlayDays',
            'shortcutRefused',
            'shortcutClaimed',
        ];
        this.dirtyKeys_ = [];
        this.DataO = Utils.deepClone(this.Data);
    }
    Object.defineProperty(PlayerPersistent.prototype, "newInviteSkinAmount", {
        get: function () { return this.get("newInviteSkinAmount"); },
        set: function (v) { this.set("newInviteSkinAmount", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "newStarSkinAmount", {
        get: function () { return this.get("newStarSkinAmount"); },
        set: function (v) { this.set("newStarSkinAmount", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "starCount", {
        get: function () { return this.get("startCount"); },
        set: function (v) { this.set("startCount", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "currentLevel", {
        get: function () { return this.get("currentLevel"); },
        set: function (v) { this.set("currentLevel", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "currentSkinID", {
        /** 当前皮肤ID */
        get: function () { return this.get("currentSkinID"); },
        set: function (v) { this.set("currentSkinID", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "havingSkinIDs", {
        /** 拥有皮肤ID所组成的数组 */
        get: function () { return this.get("havingSkinIDs"); },
        set: function (v) { this.set("havingSkinIDs", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "skinProgressData", {
        /** 皮肤获取进度数据 */
        get: function () { return this.get('skinProgressData'); },
        set: function (v) { this.set('skinProgressData', v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "invitedGuys", {
        /** 每天邀请过某个人的唯一字符串标识 */
        get: function () { return this.get("invitedGuys"); },
        set: function (v) { this.set("invitedGuys", v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "lastPlayTimestamp", {
        /** 最后一次登陆的时间戳 */
        get: function () { return this.get('lastPlayTimestamp'); },
        set: function (v) { this.set('lastPlayTimestamp', v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "continuousPlayDays", {
        /** 连续登陆天数 */
        get: function () { return this.get('continuousPlayDays'); },
        set: function (v) { this.set('continuousPlayDays', v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "shortcutRefused", {
        /** 拒绝创建桌面图标的次数 */
        get: function () { return this.get('shortcutRefused'); },
        set: function (v) { this.set('shortcutRefused', v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(PlayerPersistent.prototype, "shortcutClaimed", {
        /** 是否成功创建桌面图标 */
        get: function () { return this.get('shortcutClaimed'); },
        set: function (v) { this.set('shortcutClaimed', v); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    PlayerPersistent.prototype.get = function (k) {
        return this.Data[k];
    };
    PlayerPersistent.prototype.set = function (k, v) {
        this.Data[k] = v;
        this.dirtyKeys_.push(k);
        this.Data["v"] = Date.now();
    };
    Object.defineProperty(PlayerPersistent.prototype, "dirty", {
        get: function () { return this.dirtyKeys_.length > 0; },
        enumerable: true,
        configurable: true
    });
    PlayerPersistent.prototype.getDirtyData = function () {
        var _this = this;
        var ret = {};
        this.dirtyKeys_.push("v");
        this.dirtyKeys_.forEach(function (k) {
            ret[k] = _this.Data[k];
        });
        this.dirtyKeys_.splice(0);
        return ret;
    };
    PlayerPersistent.prototype.pullData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1, dataL, v, vL, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(app.platform instanceof PlatformFB)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, app.platform.getPlayerData(this.Keys)];
                    case 2:
                        data = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        data = {};
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        data = {};
                        _a.label = 6;
                    case 6:
                        dataL = JSON.parse(localStorage.getItem('pData' + app.platform.id())) || {};
                        v = data["v"], vL = dataL["v"];
                        if (!v && vL || v && vL && vL > v) {
                            egret.log("pData:LOCAL", vL, v);
                            data = dataL;
                            app.platform instanceof PlatformFB && app.platform.setPlayerData(this.Data); //一般是由于上一次远程存储失败了,补上
                        }
                        else {
                            egret.log("pData:REMOTE");
                        }
                        for (k in data) {
                            this.Data[k] = data[k];
                        }
                        if (!this.lastPlayTimestamp) {
                            app.status.playerType = "new_player";
                        }
                        else {
                            app.status.playerType = "old_player";
                        }
                        this.pushData();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlayerPersistent.prototype.pushData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dirty) return [3 /*break*/, 2];
                        localStorage.setItem('pData' + app.platform.id(), JSON.stringify(this.Data));
                        return [4 /*yield*/, app.platform.setPlayerData(this.getDirtyData())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PlayerPersistent.prototype.cleanData = function () {
        var _this = this;
        app.ui.toast("local clear");
        localStorage.removeItem('pData' + app.platform.id());
        app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
        app.pp.starCount = 0;
        if (app.platform instanceof PlatformFB) {
            app.platform.setPlayerData(this.DataO).then(function () {
                _this.pushData();
            }).catch(function () {
                app.ui.toast("remote clear failed");
            });
        }
    };
    PlayerPersistent.prototype.tryBuySkin = function (id) {
        if (!this.skinProgressData[id])
            this.skinProgressData[id] = 0;
        this.skinProgressData[id]++;
        this.skinProgressData = this.skinProgressData;
        var progress = this.skinProgressData[id];
        if (progress >= app.status.skinItemData[id - 1].price.num) {
            !this.havingSkinIDs.includes(id) && this.havingSkinIDs.push(id);
            this.havingSkinIDs = this.havingSkinIDs;
            this.pushData();
            // app.ui.toast("New skin unlocked")
            Game.inst.player.setSkin(id);
            return true;
        }
        this.pushData();
        return false;
    };
    PlayerPersistent.prototype.checkNewSkin = function () {
        var _this = this;
        var skins_star = app.status.skinItemData.filter(function (v) { return v.price.type === 3; }).sort(function (a, b) { return (a.order - b.order); }).map(function (i) { return i.id; });
        skins_star.forEach(function (id) {
            var amount = app.pp.starCount;
            if (amount >= app.status.skinItemData[id - 1].price.num) {
                if (app.pp.havingSkinIDs.includes(id))
                    return;
                _this.newStarSkinAmount++;
                app.pp.havingSkinIDs.push(id);
                app.pp.havingSkinIDs = app.pp.havingSkinIDs;
                app.pp.pushData();
                // Game.inst.player.setSkin(id);
            }
        });
        return !!this.newStarSkinAmount;
    };
    PlayerPersistent.prototype.checkNewInviteSkin = function () {
        var _this = this;
        var skins_invite = app.status.skinItemData.filter(function (v) { return v.price.type === 2; }).sort(function (a, b) { return (a.order - b.order); }).map(function (i) { return i.id; });
        skins_invite.forEach(function (id) {
            var amount = app.pp.invitedGuys.length;
            if (amount >= app.status.skinItemData[id - 1].price.num) {
                if (app.pp.havingSkinIDs.includes(id))
                    return;
                _this.newInviteSkinAmount++;
                app.pp.havingSkinIDs.push(id);
                app.pp.havingSkinIDs = app.pp.havingSkinIDs;
                app.pp.pushData();
            }
        });
        egret.log("this.newInviteSkinAmount", this.newInviteSkinAmount);
        return !!this.newInviteSkinAmount;
    };
    return PlayerPersistent;
}());
__reflect(PlayerPersistent.prototype, "PlayerPersistent");
//# sourceMappingURL=PlayerPersistent.js.map