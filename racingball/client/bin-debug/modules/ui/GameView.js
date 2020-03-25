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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.friendRankEntries = [];
        _this._slideDistance = 428;
        _this.modal = false;
        return _this;
    }
    GameView.prototype.childrenCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var img, i;
            return __generator(this, function (_a) {
                _super.prototype.childrenCreated.call(this);
                this.gpPassPos = new egret.Point(440, 224);
                // let loadingView = app.ui.getPopup(LoadingView);
                // loadingView && app.ui.rmPopup(loadingView);
                Game.inst.nowPlayerCount = GameConstant.PlayersCount;
                this.gp_dev_tools.visible = app.storager.get('vconsole') === 'show';
                this.btn_gameover.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    GameConstant.TrackLength = 200; //
                }, this);
                this.dieRot.addEventListener("touchTap", function () {
                    //this.
                }, this);
                // let skins = app.status.skinItemData.filter(v => (v.price.type === 3 || v.price.type === 1) && app.pp.havingSkinIDs.indexOf(v.id) < 0);
                // // console.log(skins);
                // let randomSkin = Utils.randomInArr(skins);
                // this.img_recommend_ball.source = randomSkin.thumb;
                // this.btn_try.addEventListener("touchTap", () => {
                // 	Common.showRAD('adSkin', () => { Game.inst.player.setSkin(randomSkin.id); });
                // }, this);
                // this.img_recommend_ball.addEventListener("touchTap", () => {
                // 	Common.showRAD('adSkin', () => { Game.inst.player.setSkin(randomSkin.id); });
                // }, this);
                // this.stage.addEventListener("touchBegin", (e: egret.TouchEvent) => {
                // 	if (e.target !== this.btn_try) {
                // 		this.group_swipe.removeFromParent();
                // 		this.gp_recommend.removeFromParent();
                // 	}
                // }, this);
                // this.btn_close.addEventListener("touchBegin", (e: egret.TouchEvent) => {
                // 	this.group_swipe.removeFromParent();
                // 	this.gp_recommend.removeFromParent();
                // }, this);
                // if (!app.ad.hasRAD() || !app.ad.suportAD()) {
                // 	console.log("ad not ready");
                // 	this.gp_recommend.removeFromParent();
                // }
                this.stage.addEventListener("touchBegin", function () {
                    _this.group_swipe.removeFromParent();
                    _this.img_notice.visible = false;
                }, this);
                this.txt_current_level.text = "CurrentLevel: " + app.pp.currentLevel;
                egret.Tween.get(this.img_finger, { loop: true }).to({ x: 401 }, 1000, egret.Ease.sineInOut).to({ x: 0 }, 1000, egret.Ease.sineInOut);
                egret.Tween.get(this.img_wheel, { loop: true }).to({ rotation: 360 }, 1500);
                this.initGraphics();
                Game.inst.onProgressUpdate = this.setProgress.bind(this);
                RES.loadGroup('end');
                //以下是对好友排序，然后得到自己前面的人。
                this.friendRankEntries = Array(10);
                img = ["game-icon-try-down.png", "game-icon-close-down.png", "game_begin1.png",
                    "game_begin2.png"];
                for (i = 0; i < 10; i++) {
                    this.friendRankEntries[i] = new RankPlayerVO();
                    this.friendRankEntries[i].name = "hh" + i;
                    this.friendRankEntries[i].photo = img[i % 4];
                    this.friendRankEntries[i].score = 1200 - i * 100 + 100;
                    this.friendRankEntries[i].id = i + 2 + "";
                }
                /*let friendRankList: FBInstant.LeaderboardEntry[] = app.status.friendRankList || await app.platform.getFriendRankList();
                friendRankList.map((value) => {
                    this.friendRankEntries.push(RankPlayerVO.createFromLeaderBoardEntry(value));
                })*/
                this.nowrank = this.friendRankEntries.length - 1;
                GameView.sortByScore(this.friendRankEntries, 0, this.nowrank, function (a, b) {
                    return a.score > b.score;
                });
                return [2 /*return*/];
            });
        });
    };
    GameView.prototype.initGraphics = function () {
        this.validateNow(); //验证并更新此对象的属性和布局，如果需要的话重绘对象
        var rect = this.rect = new egret.Shape();
        // rect.x = this.group_progressbar.x - this.group_progressbar.width;
        // rect.y = this.group_progressbar.y;
        rect.graphics.clear();
        rect.graphics.beginFill(0x00ffff, 1);
        // rect.graphics.drawRect(0, 0, this.group_progressbar.width, this.group_progressbar.height);
        this.addChild(rect);
        // this.img_progressbar_yellow.mask = rect;
    };
    /**progress from 0-1 */
    GameView.prototype.setProgress = function (distance) {
        // if (percentage < 0 || percentage > 1) {
        // 	console.warn("parameters error");
        // 	return;
        // }
        // this.rect.x = this.group_progressbar.x - this.group_progressbar.width + this._slideDistance * percentage;
        // this.img_wheel.x = this._slideDistance * percentage;
        this.label_distance.text = Math.round(distance) + "";
        app.pp.starCount = Math.max(distance, app.pp.starCount);
        //以下是超越的人
        if (~this.nowrank && this.friendRankEntries[this.nowrank].score < distance) {
            var sur = new SurpassPlayerHead(this.gpPassPos, -100, this.friendRankEntries[this.nowrank].photo, this.friendRankEntries[this.nowrank].score + "");
            this.addChild(sur);
            this.nowrank--;
        }
    };
    GameView.sortByScore = function (arr, l, r, cmp) {
        var i = l, j = r;
        var k = (l + r) >> 1;
        while (i <= j) {
            while (cmp(arr[i], arr[k]))
                i++;
            while (cmp(arr[k], arr[j]))
                j--;
            if (i <= j) {
                var t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
                i++;
                j--;
            }
        }
        if (i < r)
            GameView.sortByScore(arr, i, r, cmp);
        if (j > l)
            GameView.sortByScore(arr, l, j, cmp);
    };
    return GameView;
}(BasePopup));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map