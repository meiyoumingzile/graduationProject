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
var Common;
(function (Common) {
    // export async function share(
    //     successFunc = () => { },
    //     failedFunc = () => { },
    //     getInfo = async (): Promise<{ img?: string, text?: string, data?: any, intent?: string }> => null
    // ) {
    //     const info = await getInfo();
    //     try {
    //         await app.platform.share(info);
    //         successFunc();
    //     } catch (e) {
    //         egret.log("share err", e);
    //         failedFunc();
    //     }
    // }
    var _contextID = ""; //场景的ID
    function onContextChanged() {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = app.platform.getContextID();
                if (_contextID != id) {
                    _contextID = id;
                    sendRankUpdate();
                }
                return [2 /*return*/];
            });
        });
    }
    Common.onContextChanged = onContextChanged;
    var _leaderboard; //排行榜
    function sendRankUpdate() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = _leaderboard;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, FBInstant.getLeaderboardAsync("rank")];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _leaderboard = _a; //获取这款小游戏中的特有排行榜。
                        return [4 /*yield*/, _leaderboard.setScoreAsync(1, "")];
                    case 3:
                        _b.sent(); //更新玩家的分数
                        return [4 /*yield*/, FBInstant.updateAsync({ action: 'LEADERBOARD', name: "rank", text: app.platform.name() + " joined this game" })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        egret.log("sendScoreUpdate failed:", e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    Common.sendRankUpdate = sendRankUpdate;
    function invite(successFunc, failedFunc, template) {
        return __awaiter(this, void 0, void 0, function () {
            var bo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app.ui.busy();
                        return [4 /*yield*/, app.platform.choose({ filters: ['NEW_CONTEXT_ONLY'] })];
                    case 1:
                        bo = _a.sent();
                        app.ui.rmBusy();
                        if (!bo) {
                            failedFunc && failedFunc();
                        }
                        else {
                            successFunc && successFunc();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    Common.invite = invite;
    function showRAD(source, successFunc, failedFunc) {
        if (successFunc === void 0) { successFunc = function () { }; }
        if (failedFunc === void 0) { failedFunc = function () { }; }
        if (!Context.isFB) {
            successFunc();
            return;
        }
        var onFail = function () {
            failedFunc();
            app.ui.toast("Ads not ready");
        };
        if (!app.ad.hasRAD() || !app.ad.suportAD()) {
            return onFail();
        }
        // app.platform.logEvent(Log.EventType.AD, { type: "video", source });
        app.ad.showRAD().then(successFunc, onFail);
    }
    Common.showRAD = showRAD;
    // export function showIAD(
    //     source: "adSkin" | "adRevive",
    //     successFunc = () => { },
    //     failedFunc = () => { },
    // ) {
    //     if (!window['FBInstant']) {
    //         successFunc();
    //         return;
    //     }
    //     let onFail = () => {
    //         failedFunc();
    //         app.ui.toast("Ads not ready");
    //     }
    //     if (!app.ad.hasIAD() || !app.ad.suportAD()) {
    //         return onFail();
    //     }
    //     app.platform.logEvent(Log.EventType.AD, { type: "video", source });
    //     app.ad.showIAD().then(successFunc, onFail);
    // }
    function shouldPlayAD() {
        var ad = app.ad;
        if (!ad.suportAD())
            return false;
        if (!ad.hasIAD() && !ad.hasRAD())
            return false;
        if (Date.now() - app.status.lastPlayADTime < AppConstant.AD_INTERVAL_TIME)
            return false;
        return true;
    }
    Common.shouldPlayAD = shouldPlayAD;
    function shouldPlayRAD() {
        var ad = app.ad;
        if (!ad.suportAD())
            return false;
        if (!ad.hasRAD())
            return false;
        if (Date.now() - app.status.lastPlayRADTime < AppConstant.RAD_INTERVAL_TIME)
            return false;
        return true;
    }
    function tryPlayAD() {
        return __awaiter(this, void 0, void 0, function () {
            var rad, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!shouldPlayAD()) return [3 /*break*/, 4];
                        rad = shouldPlayRAD();
                        app.platform.logEvent(Log.EventType.AD, { type: rad ? "video" : "cover", source: "adNextLevel" });
                        if (!rad) return [3 /*break*/, 2];
                        return [4 /*yield*/, app.ad.showRAD()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, app.ad.showIAD()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    Common.tryPlayAD = tryPlayAD;
})(Common || (Common = {}));
//# sourceMappingURL=Common.js.map