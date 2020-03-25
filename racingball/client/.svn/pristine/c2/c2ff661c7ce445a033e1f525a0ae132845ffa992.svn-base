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
var GameReadyCmd = (function () {
    function GameReadyCmd() {
        // async showChoose(){
        //     if(app.platform instanceof PlatformFB && !FBInstant.context.getID()){
        //         egret.log("auto choose")
        //         app.ui.busy();
        //         try{
        //             let bo = await app.platform.choose({filters:["NEW_CONTEXT_ONLY"]},"auto_choose")
        //             if(bo){
        //                 if (app.status.playerType === "new_player") {
        //                     app.platform.logEvent(Log.EventType.NoobDetail, {source: Log.NoobDetailSource.noobChoose});
        //                 }
        //                 egret.log("auto choose update");
        //                 ShareHelper.sendGenericUpdate(AppConstant.context_template.auto_choose)
        //                 .catch(e=>{
        //                     egret.log("update auto_choose failed:",e)
        //                 })
        //             }
        //         }catch(e){
        //             egret.log("auto choose err:",e)
        //         }
        //         app.ui.rmBusy();
        //     }
        // }
        this._lastContextId = null;
        this._contextLeaderBoard = null;
    }
    GameReadyCmd.prototype.excute = function (data, name) {
        return __awaiter(this, void 0, void 0, function () {
            var model, entryData, opponent_info, invite_skin_data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        egret.log("enter GameReadyCmd");
                        if (app.platform instanceof PlatformFB) {
                            this.watchContextIfChanged();
                        }
                        model = Context.gameModel;
                        entryData = app.platform.entryData();
                        opponent_info = entryData && entryData["opponent_info"];
                        if (opponent_info && opponent_info.playerId == FBInstant.player.getID()) {
                            opponent_info = null;
                        }
                        model.opponent_info = opponent_info;
                        invite_skin_data = entryData && entryData["invite_skin_data"];
                        if (invite_skin_data && invite_skin_data.playerId == FBInstant.player.getID()) {
                            invite_skin_data = null;
                        }
                        model.invite_skin_data = invite_skin_data;
                        egret.log("entryData", entryData);
                        // let heartInfo:{id:string,count:number,timestamp:number} = entryData && entryData["heart_data"] || null
                        // if(heartInfo && app.pp.recievedLoveGuys.indexOf(heartInfo.id) ==-1 && heartInfo.id != FBInstant.player.getID()){
                        //     let timestamp = heartInfo.timestamp || 0;
                        //     if(Date.now() - timestamp > 24 * 3600 * 1000){
                        //         app.ui.toast("The ❤️ has expired.");
                        //         return;
                        //     }
                        //     app.pp.recievedLoveGuys.push(heartInfo.id);
                        //     app.pp.recievedLoveGuys = app.pp.recievedLoveGuys
                        //     app.pp.loveNum+=heartInfo.count;
                        // 	app.pp.pushData();
                        //     app.stage.addChild(new GetLoveAni());
                        // }
                        // let entryLog = entryData && (entryData["entryLog"] || entryData["type"]) || 'normal';
                        // let entryCommonType = entryData && entryData["entryCommonType"] || -1;
                        // app.platform.logEvent(Log.EventType.EntryDetail, {entry: entryLog, commonType: entryCommonType, type: app.status.playerType});
                        app.http.reportIfFromSkinShare().catch(function (e) { });
                        // 开始获取好友列表
                        console.log("Load FriendList.");
                        _a = app.status;
                        return [4 /*yield*/, app.platform.getConnectedFriendList()];
                    case 1:
                        _a.friendList = _b.sent();
                        console.log("FriendList loaded success.");
                        app.http.getSkinShareInfo().catch(function (e) { });
                        return [2 /*return*/];
                }
            });
        });
    };
    GameReadyCmd.prototype.watchContextIfChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var playerName, model, contextId, rankName, _a, e_1, curScore, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        playerName = FBInstant.player.getName();
                        model = Context.gameModel;
                        _b.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 14];
                        contextId = FBInstant.context.getID();
                        if (!contextId) return [3 /*break*/, 12];
                        rankName = 'rank' //`context1.${contextId}`
                        ;
                        if (!(contextId != this._lastContextId)) return [3 /*break*/, 8];
                        egret.log("context changes detected");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 7]);
                        this._lastContextId = contextId;
                        _a = this;
                        return [4 /*yield*/, FBInstant.getLeaderboardAsync(rankName)];
                    case 3:
                        _a._contextLeaderBoard = _b.sent();
                        // egret.log("seting score ...");
                        return [4 /*yield*/, this._contextLeaderBoard.setScoreAsync(model.lastContextualScore, "")];
                    case 4:
                        // egret.log("seting score ...");
                        _b.sent();
                        // egret.log("sending update ...");
                        return [4 /*yield*/, FBInstant.updateAsync({ action: 'LEADERBOARD', name: rankName, text: playerName + " joined this game" })];
                    case 5:
                        // egret.log("sending update ...");
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        egret.log("rank msg failed:", e_1);
                        return [3 /*break*/, 7];
                    case 7:
                        egret.log("all done!");
                        _b.label = 8;
                    case 8:
                        curScore = model.score //Math.floor(Context.gameModel.playerAreaPercent*100);
                        ;
                        if (!(curScore > model.lastContextualScore)) return [3 /*break*/, 12];
                        _b.label = 9;
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        egret.log("score changed!");
                        model.lastContextualScore = curScore;
                        // egret.log("seting score ...");
                        // await this._contextLeaderBoard.setScoreAsync(model.lastContextualScore,"");
                        // egret.log("sending update ...");
                        return [4 /*yield*/, FBInstant.updateAsync({ action: 'LEADERBOARD', name: rankName, text: playerName + " scored " + curScore })];
                    case 10:
                        // egret.log("seting score ...");
                        // await this._contextLeaderBoard.setScoreAsync(model.lastContextualScore,"");
                        // egret.log("sending update ...");
                        _b.sent();
                        egret.log("all done!");
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _b.sent();
                        egret.log("score changed update failed:", e_2);
                        return [3 /*break*/, 12];
                    case 12: return [4 /*yield*/, Utils.wait(3000)];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 1];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return GameReadyCmd;
}());
__reflect(GameReadyCmd.prototype, "GameReadyCmd", ["ICommand"]);
//# sourceMappingURL=GameReadyCmd.js.map