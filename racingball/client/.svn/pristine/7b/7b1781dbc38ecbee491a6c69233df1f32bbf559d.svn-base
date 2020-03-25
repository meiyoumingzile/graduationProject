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
/*
* terran;
*/
var HttpService = (function () {
    function HttpService() {
        this.game_id = 61;
        this.host = "https://fb-api.capjoy.com";
        this._server = new HttpServer();
    }
    Object.defineProperty(HttpService.prototype, "server", {
        get: function () { return this._server; },
        enumerable: true,
        configurable: true
    });
    // async reportSwitchGame(){
    // 	if(app.platform.switchGameInfo && app.platform.isNewPlayer){
    // 		// bapi/v0/ads/report/fromAppId/toAppId/playerId
    // 		await this._server.post(`${this.host}/fbapi/v0/ads/report/${platform.switchGameInfo.appId}/${platform.appId}/${platform.getPlayerId()}`,{v:$T_GAME_VERSION}).catch(e=>console.log(e));
    // 	}
    // }
    HttpService.prototype.checkSuper = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.host + "/fbapi/v0/testCase_" + this.game_id;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this._server.post(url, {
                                nickname: app.platform.name(),
                                locale: app.platform instanceof PlatformFB ? FBInstant.getLocale() : "en_US",
                                timezoneOffset: new Date().getTimezoneOffset(),
                                playerId: app.platform.id(),
                                appId: "274629043216304"
                            })];
                    case 2:
                        result = _b.apply(_a, [_c.sent()]);
                        if (result.error == 0) {
                            Context.gameModel.isSuper = +result.data == 1;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.log("check super failed");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async getRecommendGames(){
    // 	let url = `${this.host}/fbapi/v0/getRecommendGames`;
    // 	let pdata = {
    // 		playerId:platform.userInfo.id,
    // 		nickname:platform.userInfo.name,
    // 		appId:platform.appId,//"198982457542294",
    // 		locale:platform instanceof PlatformFB ? FBInstant.getLocale() : "en_US",
    // 		deviceOS:platform instanceof PlatformFB ? FBInstant.getPlatform():"IOS",
    // 		timezoneOffset:new Date().getTimezoneOffset() //minutes
    // 	}
    // 	let result:IHTTP_GetRecommendGames = JSON.parse(await this._server.post(url,pdata));
    // 	if(result.error == 0){
    // 		app.model.recommendGames = result.data && result.data.ads || null
    // 		app.event.emit("game_recommend_ready");
    // 	}else{
    // 		console.log("getRecommendGames  error:",result.msg);
    // 	}
    // }	
    HttpService.prototype.reportIfFromSkinShare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Context.gameModel.invite_skin_data && app.status.playerType === 'new_player')) return [3 /*break*/, 2];
                        url = this.host + "/api/game/v0/shareUpdate_" + this.game_id;
                        return [4 /*yield*/, this._server.post(url, {
                                v: $T_GAME_VERSION,
                                playerId: app.platform.id(),
                                sharePlayerId: Context.gameModel.invite_skin_data.playerId,
                                type: "share"
                            })
                                .catch(function (e) { return console.log(e); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    HttpService.prototype.getSkinShareCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, IDs, url, str, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        IDs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = this.host + "/api/game/v0/shareGet_" + this.game_id;
                        return [4 /*yield*/, this._server.post(url, {
                                v: $T_GAME_VERSION,
                                playerId: app.platform.id(),
                                type: "share"
                            })];
                    case 2:
                        str = _a.sent();
                        result = JSON.parse(str);
                        count = +result.data.count || 0;
                        IDs = result.data.pids || [];
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 4];
                    case 4:
                        IDs.forEach(function (value) {
                            if (app.pp.invitedGuys.indexOf(value) < 0) {
                                app.pp.invitedGuys.push(value);
                            }
                        });
                        app.pp.pushData();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpService.prototype.getSkinShareInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, friendIDs, IDs, infos, url, str, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        friendIDs = app.status.friendList.map(function (v) { return v.getID(); });
                        IDs = [];
                        infos = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        url = this.host + "/api/game/v0/shareGetInfo_" + this.game_id;
                        return [4 /*yield*/, this._server.post(url, {
                                v: $T_GAME_VERSION,
                                playerId: app.platform.id(),
                                type: "share",
                                friends: friendIDs
                            })];
                    case 2:
                        str = _a.sent();
                        result = JSON.parse(str);
                        IDs = result.data.pids || [];
                        infos = result.data.infos || {};
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        egret.log(e_3);
                        return [3 /*break*/, 4];
                    case 4:
                        IDs.forEach(function (value) {
                            if (app.pp.invitedGuys.indexOf(value) < 0) {
                                app.pp.invitedGuys.push(value);
                            }
                        });
                        app.pp.invitedGuys = app.pp.invitedGuys;
                        app.pp.pushData();
                        Context.gameModel.skinInviteInfo = infos;
                        app.notify(AppConstant.Notify.refresh_invite_count);
                        egret.log("IDs", IDs);
                        egret.log("infos", infos);
                        return [2 /*return*/];
                }
            });
        });
    };
    return HttpService;
}());
__reflect(HttpService.prototype, "HttpService");
//# sourceMappingURL=HttpService.js.map