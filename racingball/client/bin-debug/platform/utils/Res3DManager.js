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
var Res3DManager = (function () {
    function Res3DManager() {
    }
    Res3DManager.loadImage = function (url) {
        var _this = this;
        var name = url.match(/[\w-_]+\.\w+/)[0];
        return new Promise(function (resolve) {
            _this.imgLoader_.load(url, function (img) {
                _this.textures_[name] = img;
                resolve(null);
            }, undefined, function (e) {
                egret.log("Res3DManager load tex error", e);
                resolve(null);
            });
        });
    };
    Res3DManager.loadFBX = function (url) {
        var _this = this;
        var name = url.match(/[\w-_]+\.\w+/)[0];
        return new Promise(function (resolve) {
            _this.fbxLoader_.load(url, function (group) {
                _this.fbxs_[name] = group;
                resolve(null);
            }, undefined, function (e) {
                egret.log("Res3DManager load fbx error", e);
                resolve(null);
            });
        });
    };
    Res3DManager.init = function () {
        this.textures_ = {};
        this.fbxs_ = {};
        this.imgLoader_ = new tr.ImageLoader();
        this.fbxLoader_ = new tr.FBXLoader();
    };
    Res3DManager.preload = function (onProgress) {
        var _this = this;
        var urls = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            urls[_i - 1] = arguments[_i];
        }
        var promise = Promise.resolve();
        var count = urls.length;
        urls.forEach(function (url, index) {
            promise = promise.then(function () {
                onProgress && onProgress(index / count);
                return url.slice(url.length - 4) === ".fbx" ? _this.loadFBX(_this.root + url) : _this.loadImage(_this.root + url);
            });
        });
        return promise.then(function (resolve) {
            onProgress && onProgress(1);
        });
    };
    Res3DManager.getImage = function (name) {
        return this.textures_[name];
    };
    Res3DManager.getFBX = function (name) {
        return this.fbxs_[name];
    };
    Res3DManager.getMeshFromFBX = function (name, fbx) {
        return this.getFBX(fbx).children.find(function (m) { return m.name == name; });
    };
    Res3DManager.getFBXAsync = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.log("waiting fbx:", name);
                        _a.label = 1;
                    case 1:
                        if (!!this.fbxs_[name]) return [3 /*break*/, 3];
                        return [4 /*yield*/, Utils.wait(300)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        egret.log("fbx ok:", name);
                        return [2 /*return*/, this.fbxs_[name]];
                }
            });
        });
    };
    Res3DManager.createTexture = function (name, anisotropy) {
        if (anisotropy === void 0) { anisotropy = 1; }
        var img = this.textures_[name];
        if (!img)
            egret.log("doesn't find tex:", name);
        var tex = new tr.Texture(img);
        var isJPEG = name.search(/\.(jpg|jpeg)$/) > 0; // || name.search( /^data\:image\/jpeg/ ) === 0;
        tex.format = isJPEG ? tr.RGBFormat : tr.RGBAFormat;
        tex.needsUpdate = true;
        tex.anisotropy = anisotropy;
        return tex;
    };
    Res3DManager.createTextureAsync = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.textures_[name]) return [3 /*break*/, 2];
                        return [4 /*yield*/, Utils.wait(200)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/, this.createTexture(name)];
                }
            });
        });
    };
    Res3DManager.root = "resource/assets/";
    return Res3DManager;
}());
__reflect(Res3DManager.prototype, "Res3DManager");
//# sourceMappingURL=Res3DManager.js.map