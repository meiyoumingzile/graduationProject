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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assetAdapter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.createChildren.call(this);
                        //app.pp.cleanData();
                        //app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
                        egret.ImageLoader.crossOrigin = "anonymous";
                        egret.TextField.default_fontFamily = "GameFont";
                        RES.setMaxLoadingThread(5);
                        RES.setMaxRetryTimes(3);
                        egret.lifecycle.addLifecycleListener(function (context) {
                            // custom lifecycle plugin
                        });
                        egret.lifecycle.onPause = function () {
                            egret.ticker.pause();
                            AudioPlayer.pauseMusic();
                        };
                        egret.lifecycle.onResume = function () {
                            egret.ticker.resume();
                            AudioPlayer.resumeMusic();
                        };
                        assetAdapter = new AssetAdapter();
                        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
                        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
                        Context.stage = this.stage;
                        Context.gameModel = new GameModel();
                        Constant.FullWidthScale = Utils.clamp(this.stage.stageWidth / 640, 0.5, 1);
                        this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
                        return [4 /*yield*/, App.startup()];
                    case 1:
                        _a.sent();
                        app.pp.checkNewSkin();
                        this.runGame();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, App.onGameReady()];
                    case 2:
                        _a.sent();
                        app.notify(AppConstant.Notify.game_ready);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Main.prototype, "progress", {
        set: function (v) {
            // window["fbProgress"] = v;
            $T_PROGRESS = v;
            // console.log("progress", v);
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var progress1_1, progress2_1, updateProgress_1, promise1, assets, promise2, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        this.progress = 1;
                        progress1_1 = 0;
                        progress2_1 = 0;
                        updateProgress_1 = function () {
                            _this.progress = progress1_1 * .5 + progress2_1 * .5;
                        };
                        RES.createGroup("_gp1", ['home', 'common', 'game']);
                        promise1 = RES.loadGroup("_gp1", 0, {
                            onProgress: function (current, total) {
                                progress1_1 = current / total;
                                updateProgress_1();
                            }
                        });
                        GameConstant.Map = app.status.playerType == "new_player" ? "chushi" : Utils.randomInArr(GameConstant.Maps);
                        Res3DManager.init();
                        assets = [
                            "tex/fx-die1.png",
                            "tex/fx-die2.png",
                            "tex/finish.png",
                            "tex/lane_" + GameConstant.Map + ".jpg",
                            "fbx/" + GameConstant.Map + ".fbx",
                            "fbx/ball.fbx",
                            "tex/player-trail.png",
                            "tex/wind-trail.png",
                            "tex/shadow.png",
                            "tex/fx-boost.png",
                            "tex/fx-die1.png",
                            "tex/fx-die2.png",
                            "skin/ball.jpg",
                            "skin/tietu_fuhuoqiu.jpg",
                        ];
                        promise2 = Res3DManager.preload.apply(Res3DManager, [function (progress) {
                                progress2_1 = progress;
                                updateProgress_1();
                            }].concat(assets));
                        return [4 /*yield*/, Promise.all([promise1, promise2])];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, resolve, _this);
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map