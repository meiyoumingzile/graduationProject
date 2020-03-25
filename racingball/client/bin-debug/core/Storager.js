var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Storager = (function () {
    function Storager(id) {
        if (id === void 0) { id = "g"; }
        this.id = id;
    }
    Storager.prototype.set = function (key, value) {
        if (typeof (value) == "object") {
            value = JSON.stringify(value);
        }
        egret.localStorage.setItem(this.id + "_" + key, value);
    };
    Storager.prototype.get = function (key, defalutValue) {
        return egret.localStorage.getItem(this.id + "_" + key) || defalutValue;
    };
    Storager.prototype.rm = function (key) {
        egret.localStorage.removeItem(this.id + "_" + key);
    };
    Storager.prototype.json = function (key, defalutValue) {
        if (defalutValue === void 0) { defalutValue = null; }
        var value = egret.localStorage.getItem(this.id + "_" + key);
        var obj;
        try {
            obj = JSON.parse(value);
        }
        catch (e) {
            // $dev && egret.log("json failed")
        }
        return obj || defalutValue;
    };
    Storager.clear = function () {
        egret.localStorage.clear();
    };
    return Storager;
}());
__reflect(Storager.prototype, "Storager");
//# sourceMappingURL=Storager.js.map