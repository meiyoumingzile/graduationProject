/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 *
 * Time:上午9:56 2016年12月17日
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Emiter = (function () {
    function Emiter() {
        this.maps = {};
        this.uid = 0;
        this._duringEmit = false;
    }
    Emiter.prototype.add = function (name, handler, thisObject, priority, isOnce) {
        thisObject = thisObject || null;
        priority = priority || 0;
        var queue_id = this.uid++;
        var item = this.maps[name] || [];
        item.push([queue_id, handler, thisObject, priority, isOnce]);
        this.maps[name] = item;
        //倒序
        item.sort(function (a, b) { return a[3] < b[3]; });
        return queue_id;
    };
    Emiter.prototype.on = function (name, handler, thisObject, priority) { return this.add(name, handler, thisObject, priority, false); };
    Emiter.prototype.once = function (name, handler, thisObject, priority) { return this.add(name, handler, thisObject, priority, true); };
    Emiter.prototype.race = function (names, handler, thisObject, priority) {
        var _this = this;
        var events = [];
        var hasDone = false;
        var call = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            hasDone = true;
            //    $dev&&egret.log(events);
            events.forEach(function (item) { return _this.rm(item[0], item[1]); });
            handler.apply(thisObject, [name].concat(args));
        };
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            if (hasDone)
                break;
            events.push([this.once(name_1, Utils.closure(call, name_1), thisObject, priority), name_1]);
        }
    };
    Emiter.prototype.rm = function (id, name) {
        var names = name ? [name] : Object.keys(this.maps);
        for (var _i = 0, names_2 = names; _i < names_2.length; _i++) {
            var name_2 = names_2[_i];
            var handlers = this.maps[name_2];
            if (!handlers)
                continue;
            if (this._duringEmit) {
                this.maps[name_2] = handlers = handlers.concat();
            }
            var index = 0;
            while (index < handlers.length) {
                var _a = handlers[index], queue_id = _a[0], handler = _a[1], thisObject = _a[2], priority = _a[3], isOnce = _a[4];
                if (queue_id == id) {
                    handlers.splice(index, 1);
                    return true;
                }
                else {
                    index++;
                }
            }
        }
        return false;
    };
    Emiter.prototype.rmall = function (name) {
        if (name == undefined)
            this.maps = {};
        else
            delete this.maps[name];
    };
    Emiter.prototype.emit = function (name, data) {
        var handlers = this.maps[name];
        if (handlers && handlers.length > 0) {
            var index = 0;
            while (index < handlers.length) {
                var _a = handlers[index], queue_id = _a[0], handler = _a[1], thisObject = _a[2], priority = _a[3], isOnce = _a[4];
                isOnce ? handlers.splice(index, 1) : index++;
                this._duringEmit = true;
                var result = handler.call(thisObject, data);
                this._duringEmit = false;
                if (result == Emiter.CONST.break)
                    break;
            }
            return true;
        }
        return false;
    };
    Emiter.CONST = { break: {} };
    return Emiter;
}());
__reflect(Emiter.prototype, "Emiter");
//# sourceMappingURL=Emiter.js.map