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
var PlatformFB = (function () {
    function PlatformFB() {
        this.leaderboardName = "rank";
        this.invite_skin_data = null;
        this._isPaymentsReady = false;
    }
    PlatformFB.prototype.getCatalogAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var catalog, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._catalog)
                            return [2 /*return*/, this._catalog];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, FBInstant.payments.getCatalogAsync()];
                    case 2:
                        catalog = _a.sent();
                        this._catalog = catalog;
                        egret.log(catalog);
                        return [2 /*return*/, this._catalog];
                    case 3:
                        e_1 = _a.sent();
                        egret.log("getCatalogAsync error:" + e_1.code || e_1.message || e_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.purchaseAsync = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var config, product, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isPaymentsReady) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        config = {};
                        config.productID = productId;
                        return [4 /*yield*/, FBInstant.payments.purchaseAsync(config)];
                    case 2:
                        product = _a.sent();
                        return [4 /*yield*/, FBInstant.payments.consumePurchaseAsync(product.purchaseToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        e_2 = _a.sent();
                        egret.log("purchaseAsync error:" + e_2.code || e_2.message || e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    PlatformFB.prototype.checkPurchaseAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var purchases, len, result, i, purchase, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isPaymentsReady) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, FBInstant.payments.getPurchasesAsync()];
                    case 2:
                        purchases = _a.sent();
                        len = purchases.length;
                        result = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < len)) return [3 /*break*/, 6];
                        purchase = purchases[i];
                        result.push(purchase);
                        return [4 /*yield*/, FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, result];
                    case 7:
                        e_3 = _a.sent();
                        egret.log("checkPurchase error:" + e_3.code || e_3.message || e_3);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, null];
                }
            });
        });
    };
    PlatformFB.prototype.onPaymentsReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var platform;
            return __generator(this, function (_a) {
                platform = FBInstant.getPlatform();
                if (platform != "IOS") {
                    try {
                        FBInstant.payments.onReady(function () {
                            _this._isPaymentsReady = true;
                        });
                    }
                    catch (e) {
                        egret.log("paymentsReady error:" + e.code || e.message || e);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(PlatformFB.prototype, "isIOS", {
        get: function () {
            var platform = FBInstant.getPlatform();
            return platform == "IOS";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformFB.prototype, "isPaymentsReady", {
        get: function () {
            return this._isPaymentsReady;
        },
        enumerable: true,
        configurable: true
    });
    PlatformFB.prototype.setLoadingProgress = function (value) {
        FBInstant.setLoadingProgress(value);
    };
    PlatformFB.prototype.getPlayerData = function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FBInstant.player.getDataAsync(keys)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlatformFB.prototype.setPlayerData = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, FBInstant.player.setDataAsync(obj)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        egret.log("set data error", JSON.stringify(e_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.choose = function (opt, place) {
        if (opt === void 0) { opt = {}; }
        if (place === void 0) { place = "any"; }
        return __awaiter(this, void 0, void 0, function () {
            var bo, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bo = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, FBInstant.context.chooseAsync(opt)];
                    case 2:
                        _a.sent();
                        Common.onContextChanged();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        if (e_5.code != "SAME_CONTEXT") {
                            bo = false;
                        }
                        console.log("auto choose failed:", e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, bo];
                }
            });
        });
    };
    PlatformFB.prototype.switchContext = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FBInstant.context.switchAsync(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PlatformFB.prototype.getContextID = function () {
        return FBInstant.context.getID();
    };
    PlatformFB.prototype.name = function () {
        return FBInstant.player.getName();
    };
    PlatformFB.prototype.photo = function () {
        return FBInstant.player.getPhoto();
    };
    PlatformFB.prototype.id = function () {
        return FBInstant.player.getID();
    };
    PlatformFB.prototype.entryData = function () {
        return FBInstant.getEntryPointData();
    };
    PlatformFB.prototype.getLocale = function () {
        return FBInstant.getLocale();
    };
    PlatformFB.prototype.switchGame = function (appId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var bo, origin, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bo = true;
                        origin = {
                            switchGameInfo: { appId: AppConstant.APP_ID, appName: AppConstant.APP_NAME },
                            type: AppConstant.APP_NAME
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, FBInstant.switchGameAsync(appId, Object.assign(origin, data))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        bo = false;
                        console.log("switch game error", JSON.stringify(error_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, bo];
                }
            });
        });
    };
    PlatformFB.prototype.share = function (msg) {
        if (msg === void 0) { msg = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var img, intent, text, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        img = msg.img, intent = msg.intent, text = msg.text, data = msg.data;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, FBInstant.shareAsync({
                                intent: intent || "INVITE",
                                image: img,
                                text: text,
                                data: data
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        egret.log("share error", JSON.stringify(error_2));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.updateStatus = function (info) {
        if (info === void 0) { info = {}; }
        return FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: info.cta || 'Play now',
            image: info.image || '',
            text: info.text || 'This game is awesome! You should try it! 😆',
            template: info.template || 'SHOPPING_INVITE',
            data: info.data,
            strategy: info.strategy || 'IMMEDIATE',
            notification: info.notification || 'NO_PUSH'
        });
    };
    PlatformFB.prototype.getFriendRankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 9]);
                        _a = this;
                        _b = this.leaderboard_;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, FBInstant.getLeaderboardAsync(this.leaderboardName)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.leaderboard_ = _b;
                        return [4 /*yield*/, this.leaderboard_.getConnectedPlayerEntriesAsync(100, 0)];
                    case 3:
                        ret = _c.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        err_1 = _c.sent();
                        if (!(err_1.code == Constant.ErrorCode.RATE_LIMITED || err_1.code == Constant.ErrorCode.NETWORK_FAILURE)) return [3 /*break*/, 7];
                        egret.log("getFriendRankList ", err_1.code);
                        return [4 /*yield*/, Utils.wait(2000)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.getFriendRankList()];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        egret.log("getFriendRankList error", err_1);
                        _c.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9:
                        egret.log("getFriendRankList ok");
                        return [2 /*return*/, ret || []];
                }
            });
        });
    };
    PlatformFB.prototype.getWorldRankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, _a, _b, count, entry, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 11]);
                        _a = this;
                        _b = this.leaderboard_;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, FBInstant.getLeaderboardAsync(this.leaderboardName)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.leaderboard_ = _b;
                        return [4 /*yield*/, this.leaderboard_.getEntryCountAsync()];
                    case 3:
                        count = _c.sent();
                        console.log("worldRankCount:", count);
                        if (count == 0)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, this.leaderboard_.getEntriesAsync(Math.min(100, count), 0)];
                    case 4:
                        ret = _c.sent();
                        return [4 /*yield*/, this.leaderboard_.getPlayerEntryAsync()];
                    case 5:
                        entry = _c.sent();
                        console.log("Player entry: ", entry);
                        this._world_selfEntry = entry ? RankPlayerVO.createFromLeaderBoardEntry(entry) : null;
                        return [3 /*break*/, 11];
                    case 6:
                        err_2 = _c.sent();
                        if (!(err_2.code == Constant.ErrorCode.RATE_LIMITED || err_2.code == Constant.ErrorCode.NETWORK_FAILURE)) return [3 /*break*/, 9];
                        egret.log("getWorldRankList ", err_2.code);
                        return [4 /*yield*/, Utils.wait(2000)];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, this.getWorldRankList()];
                    case 8: return [2 /*return*/, _c.sent()];
                    case 9:
                        egret.log("getWorldRankList error", err_2);
                        _c.label = 10;
                    case 10: return [3 /*break*/, 11];
                    case 11:
                        egret.log("getWorldRankList ok");
                        return [2 /*return*/, ret || []];
                }
            });
        });
    };
    PlatformFB.prototype.getConnectedFriendList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, err_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = this;
                        _b = this.friends_;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, FBInstant.player.getConnectedPlayersAsync()];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.friends_ = _b;
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _c.sent();
                        egret.log("get connected friends error", JSON.stringify(err_3));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.friends_.concat() || []];
                }
            });
        });
    };
    PlatformFB.prototype.updateScore = function (score, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, _a, _b, err_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        ret = null;
                        _a = this;
                        _b = this.leaderboard_;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, FBInstant.getLeaderboardAsync(this.leaderboardName)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a.leaderboard_ = _b;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 9]);
                        return [4 /*yield*/, this.leaderboard_.setScoreAsync(score, extraData)];
                    case 4:
                        ret = _c.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        err_4 = _c.sent();
                        if (!(err_4.code == Constant.ErrorCode.RATE_LIMITED || err_4.code == Constant.ErrorCode.NETWORK_FAILURE)) return [3 /*break*/, 8];
                        // console.log("updateScore ", err.code);
                        return [4 /*yield*/, Utils.wait(2000)];
                    case 6:
                        // console.log("updateScore ", err.code);
                        _c.sent();
                        return [4 /*yield*/, this.updateScore(score, extraData)];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8: return [3 /*break*/, 9];
                    case 9: 
                    // console.log("updateScore ok", score, extraData);
                    return [2 /*return*/, ret];
                }
            });
        });
    };
    PlatformFB.prototype.createCtx = function (playerId) {
        return __awaiter(this, void 0, void 0, function () {
            var bo, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bo = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // this.logEvent("create_detail", { phase: -1 })
                        return [4 /*yield*/, FBInstant.context.createAsync(playerId)];
                    case 2:
                        // this.logEvent("create_detail", { phase: -1 })
                        _a.sent();
                        Common.onContextChanged();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        if (e_6.code != "SAME_CONTEXT") {
                            bo = false;
                        }
                        return [3 /*break*/, 4];
                    case 4: 
                    // this.logEvent("create_detail", { phase: bo ? 1 : -1 });
                    return [2 /*return*/, bo];
                }
            });
        });
    };
    PlatformFB.prototype.canCreateShortcutAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, FBInstant.canCreateShortcutAsync()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_7 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.createShortcutAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, FBInstant.createShortcutAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { ok: true, code: undefined }];
                    case 2:
                        e_8 = _a.sent();
                        return [2 /*return*/, { ok: false, code: e_8.code }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.logEvent = function (name, data, valueSum) {
        if (valueSum === void 0) { valueSum = 1; }
        //   egret.log("name", name, "data", JSON.stringify(data));
        FBInstant.logEvent(name, valueSum, data);
    };
    PlatformFB.prototype.setSessionData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        egret.log('setSessionData', data);
                        return [4 /*yield*/, FBInstant.setSessionData(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_9 = _a.sent();
                        egret.log(e_9);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // async checkBotSubscribe() {
    //     let can = false;
    //     try {
    //         can = await FBInstant.player.canSubscribeBotAsync();
    //     } catch (e) {
    //         egret.log("can bot e", e);
    //     }
    //     can && await new Promise<void>(resolve => {
    //         let view = new BotSubscribeView;
    //         app.ui.addPopup(view);
    //         view.btn_turn_on.once(egret.TouchEvent.TOUCH_TAP, async () => {
    //             try {
    //                 this.logEvent("bot_subscribe", { result: -1 })
    //                 await FBInstant.player.subscribeBotAsync();
    //                 this.logEvent("bot_subscribe", { result: 1 })
    //             } catch (e) {
    //                 this.logEvent("bot_subscribe", { result: 0 })
    //                 egret.log("bot e", e);
    //             }
    //             view.close()
    //             resolve()
    //         }, null);
    //         view.btn_not_now.once(egret.TouchEvent.TOUCH_TAP, () => { view.close(), resolve() }, null);
    // 	    this.logEvent(Log.EventType.LoadDetail, { type: "botPage" })
    //     })
    // }
    PlatformFB.prototype.checkBotSubscribe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bo, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, FBInstant.player.canSubscribeBotAsync()];
                    case 1:
                        bo = _a.sent();
                        if (!bo) return [3 /*break*/, 3];
                        this.logEvent("bot_subscribe", { result: -1 });
                        return [4 /*yield*/, FBInstant.player.subscribeBotAsync()];
                    case 2:
                        _a.sent();
                        this.logEvent("bot_subscribe", { result: 1 });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_10 = _a.sent();
                        this.logEvent("bot_subscribe", { result: 0 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.tryCreateShortcut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pp, support, rst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pp = app.pp;
                        return [4 /*yield*/, this.canCreateShortcutAsync()];
                    case 1:
                        support = _a.sent();
                        egret.log("shortcut:", pp.shortcutClaimed, !support, pp.shortcutRefused >= 2);
                        if (pp.shortcutClaimed || !support || pp.shortcutRefused >= 2)
                            return [2 /*return*/];
                        app.platform.logEvent(Log.EventType.SaveDetail, { type: app.status.playerType, result: 2 });
                        return [4 /*yield*/, this.createShortcutAsync()];
                    case 2:
                        rst = _a.sent();
                        if (rst.ok) {
                            app.platform.logEvent(Log.EventType.SaveDetail, { type: app.status.playerType, result: 1 });
                            pp.shortcutClaimed = true;
                        }
                        else {
                            app.platform.logEvent(Log.EventType.SaveDetail, { type: app.status.playerType, result: 0 });
                            pp.shortcutRefused++;
                        }
                        pp.pushData();
                        return [2 /*return*/];
                }
            });
        });
    };
    PlatformFB.prototype.getWorldSelfEntry = function () {
        return this._world_selfEntry;
    };
    return PlatformFB;
}());
__reflect(PlatformFB.prototype, "PlatformFB");
//# sourceMappingURL=PlatformFB.js.map