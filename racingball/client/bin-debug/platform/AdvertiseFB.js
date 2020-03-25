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
var AdvertiseFB = (function (_super) {
    __extends(AdvertiseFB, _super);
    function AdvertiseFB(iad_ids, rad_ids) {
        var _this = _super.call(this) || this;
        if (FBInstant.getPlatform().indexOf("WEB") == -1) {
            _this.iad = new ad.InterstitialAD(iad_ids, true);
            _this.iad.on("ad_failed", function (d) { return _this.log("ad_failed", d); });
            _this.iad.on("ad_show", function (d) { return _this.log("iad_times", d); });
            _this.rad = new ad.RewardedVideoAD(rad_ids, true);
            _this.rad.on("ad_failed", function (d) { return _this.log("ad_failed", d); });
            _this.rad.on("ad_show", function (d) { return _this.log("rad_times", d); });
        }
        else {
            console.log("WEB & MOBILE_WEB ad skiped!");
        }
        return _this;
    }
    AdvertiseFB.prototype.hasRAD = function () {
        return this.rad && this.rad.hasAD();
    };
    AdvertiseFB.prototype.showRAD = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.rad;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rad.showAD()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        app.status.lastPlayADTime = Date.now();
                        app.status.lastPlayRADTime = Date.now();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvertiseFB.prototype.hasIAD = function () {
        return this.iad && this.iad.hasAD();
    };
    AdvertiseFB.prototype.showIAD = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.iad;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.iad.showAD()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        app.status.lastPlayADTime = Date.now();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvertiseFB.prototype.log = function (name, data, valueSum) {
        if (valueSum === void 0) { valueSum = 1; }
        app.platform.logEvent(name, data, valueSum);
    };
    AdvertiseFB.prototype.suportAD = function () {
        if (this.suportAD_ === undefined) {
            var apis = FBInstant.getSupportedAPIs();
            this.suportAD_ = apis.indexOf("getRewardedVideoAsync") > -1 && apis.indexOf("getInterstitialAdAsync") > -1;
        }
        return this.suportAD_;
    };
    return AdvertiseFB;
}(Emiter));
__reflect(AdvertiseFB.prototype, "AdvertiseFB");
//# sourceMappingURL=AdvertiseFB.js.map