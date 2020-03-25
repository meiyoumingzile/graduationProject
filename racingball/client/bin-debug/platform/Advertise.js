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
// /**
//  * Author:terran
//  * Email:terran.tian@foxmail.com
//  * 
//  * Time:上午9:56 2016年12月17日
//  **/
var ad;
(function (ad) {
    var Advertise = (function (_super) {
        __extends(Advertise, _super);
        function Advertise(ids, autoPreload) {
            if (autoPreload === void 0) { autoPreload = true; }
            var _this = _super.call(this) || this;
            _this.ids = ids;
            _this._adInstance = null;
            _this._isStart = false;
            _this._watch_count = 0;
            _this.suportAD() && autoPreload && (_this.preloadAD());
            return _this;
        }
        Advertise.prototype.suportAD = function () { throw "should be implemented in subclass!"; };
        Advertise.prototype.getName = function () { throw "should be implemented in subclass!"; };
        Advertise.prototype.getADInstanceAsync = function (placementId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // throw "should be implemented in subclass!"
                    return [2 /*return*/, null];
                });
            });
        };
        Advertise.prototype.hasAD = function () { return !!this._adInstance; };
        Advertise.prototype.preloadAD = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var lastError, arr, i, _tmp_inst, index, reloadCount, e_1, e_2, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._isStart)
                                return [2 /*return*/];
                            this._isStart = true;
                            lastError = "";
                            arr = this.ids.concat();
                            i = 0;
                            _tmp_inst = null;
                            _a.label = 1;
                        case 1:
                            if (!!_tmp_inst) return [3 /*break*/, 24];
                            index = i++ % arr.length;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 22, , 23]);
                            return [4 /*yield*/, this.getADInstanceAsync(arr[index])];
                        case 3:
                            _tmp_inst = _a.sent();
                            lastError = "";
                            console.log(this.getName() + " create suc:" + index);
                            reloadCount = 0;
                            _a.label = 4;
                        case 4:
                            if (!(!this._adInstance && _tmp_inst)) return [3 /*break*/, 21];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 14, , 20]);
                            return [4 /*yield*/, _tmp_inst.loadAsync()];
                        case 6:
                            _a.sent();
                            lastError = "";
                            this._adInstance = _tmp_inst;
                            this.emit("ad_ready");
                            console.log(this.getName() + " load suc");
                            _a.label = 7;
                        case 7:
                            if (!true) return [3 /*break*/, 13];
                            return [4 /*yield*/, new Promise(function (resolve, reject) { return _this.once("show_ad", resolve); })];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            _a.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this._adInstance.showAsync()];
                        case 10:
                            _a.sent();
                            lastError = "";
                            console.log(this.getName() + " show suc");
                            this.emit("show_result", { result: true, level: index });
                            //重新获取广告位
                            i = 0;
                            this._adInstance = null;
                            _tmp_inst = null;
                            return [3 /*break*/, 13];
                        case 11:
                            e_1 = _a.sent();
                            console.log(this.getName() + " show failed," + e_1.code + "," + e_1.message);
                            this.emit("ad_failed", { type: this.getName(), phase: 2, code: e_1.code, msg: e_1.message, lastError: lastError });
                            lastError = e_1.code + ":2";
                            this.emit("show_result", { result: false, err: e_1, level: index });
                            if (e_1.code == "ADS_NOT_LOADED") {
                                //重新加载
                                this._adInstance = null;
                                //重置加载计数
                                reloadCount = 0;
                                // await wait(30 * 1000)
                                return [3 /*break*/, 13];
                            }
                            else if (e_1.code == "PENDING_REQUEST" || e_1.code == "UNKNOWN" || e_1.code == "RATE_LIMITED" /*Can not show ads immediately after the game starts.*/) {
                                //do nothing,pennding show this instance next time;
                            }
                            else {
                                //重新获取广告位
                                this._adInstance = null;
                                _tmp_inst = null;
                                return [3 /*break*/, 13];
                            }
                            return [3 /*break*/, 12];
                        case 12: return [3 /*break*/, 7];
                        case 13: return [3 /*break*/, 20];
                        case 14:
                            e_2 = _a.sent();
                            console.log(this.getName() + " load failed," + e_2.code + "," + e_2.message);
                            this.emit("ad_failed", { type: this.getName(), phase: 1, code: e_2.code, msg: e_2.message, lastError: lastError });
                            lastError = e_2.code + ":1";
                            if (!(e_2.code == "ADS_FREQUENT_LOAD")) return [3 /*break*/, 16];
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 30 * 60 * 1000); })];
                        case 15:
                            _a.sent();
                            return [3 /*break*/, 21];
                        case 16:
                            if (!(e_2.code == "INVALID_PARAM")) return [3 /*break*/, 17];
                            //重新获取广告位
                            _tmp_inst = null;
                            return [3 /*break*/, 21];
                        case 17: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 31 * 1000); })];
                        case 18:
                            _a.sent();
                            _a.label = 19;
                        case 19: return [3 /*break*/, 20];
                        case 20: return [3 /*break*/, 4];
                        case 21: return [3 /*break*/, 23];
                        case 22:
                            e_3 = _a.sent();
                            console.log(this.getName() + " create failed," + e_3.code + "," + index);
                            this.emit("ad_failed", { type: this.getName(), phase: 0, code: e_3.code, msg: e_3.message, lastError: lastError });
                            lastError = e_3.code + ":0";
                            if (e_3.code == "CLIENT_UNSUPPORTED_OPERATION" || e_3.code == "ADS_TOO_MANY_INSTANCES") {
                                //不在获取广告
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 23];
                        case 23: return [3 /*break*/, 1];
                        case 24: return [2 /*return*/];
                    }
                });
            });
        };
        Advertise.prototype.showAD = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var bo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.hasAD()) {
                                throw "no ad ready";
                            }
                            bo = this.emit("show_ad");
                            if (!bo)
                                return [2 /*return*/];
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    _this.once("show_result", function (data) {
                                        _this.emit("ad_show", { type: _this.getName(), result: ++_this._watch_count, level: data.level });
                                        data.result ? resolve() : reject(data.err);
                                        // resolve();
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Advertise;
    }(Emiter));
    __reflect(Advertise.prototype, "Advertise");
    var InterstitialAD = (function (_super) {
        __extends(InterstitialAD, _super);
        function InterstitialAD() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterstitialAD.prototype.getName = function () {
            return "iad";
        };
        InterstitialAD.prototype.suportAD = function () {
            var apis = FBInstant.getSupportedAPIs();
            return apis.indexOf("getInterstitialAdAsync") > -1;
        };
        InterstitialAD.prototype.getADInstanceAsync = function (placementId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, FBInstant.getInterstitialAdAsync(placementId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return InterstitialAD;
    }(Advertise));
    ad.InterstitialAD = InterstitialAD;
    __reflect(InterstitialAD.prototype, "ad.InterstitialAD");
    var RewardedVideoAD = (function (_super) {
        __extends(RewardedVideoAD, _super);
        function RewardedVideoAD() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RewardedVideoAD.prototype.getName = function () {
            return "rad";
        };
        RewardedVideoAD.prototype.suportAD = function () {
            var apis = FBInstant.getSupportedAPIs();
            return apis.indexOf("getRewardedVideoAsync") > -1;
        };
        RewardedVideoAD.prototype.getADInstanceAsync = function (placementId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, FBInstant.getRewardedVideoAsync(placementId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return RewardedVideoAD;
    }(Advertise));
    ad.RewardedVideoAD = RewardedVideoAD;
    __reflect(RewardedVideoAD.prototype, "ad.RewardedVideoAD");
})(ad || (ad = {}));
//# sourceMappingURL=Advertise.js.map