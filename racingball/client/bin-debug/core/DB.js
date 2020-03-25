/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 *
 * Time:上午10:25 2016年12月17日
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DB = (function () {
    function DB(keys, data) {
        if (typeof keys === "string") {
            keys = JSON.parse(keys);
        }
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        this.keys = keys;
        this.data = data;
        this.key_index_map = {};
        for (var index in this.keys) {
            var name_1 = this.keys[index];
            this.key_index_map[name_1] = index;
        }
        this.cache = {};
    }
    DB.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = args.join("_");
        var obj = this.cache[key];
        if (obj)
            return obj;
        if (!this.data[key])
            return null;
        obj = { "_data": this.data[key] };
        var self = this;
        var _loop_1 = function (index) {
            var name_2 = this_1.keys[index];
            Object.defineProperty(obj, name_2, {
                get: function () {
                    var index = self.key_index_map[name_2];
                    return obj._data[index];
                }
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.keys.length; index++) {
            _loop_1(index);
        }
        this.cache[key] = obj;
        return obj;
    };
    DB.prototype.getall = function () {
        return this.data;
    };
    return DB;
}());
__reflect(DB.prototype, "DB");
//# sourceMappingURL=DB.js.map