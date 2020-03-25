Object.defineProperty(egret.TextField.prototype, "htmlText", {
    get: function () {
        return this._htmlText;
    },
    set: function (value) {
        if (this.__htmlText == value)
            return;
        this._htmlText = value;
        try {
            this.textFlow = new egret.HtmlTextParser().parse(value);
        }
        catch (error) {
            this.text = value;
        }
    },
    enumerable: true,
    configurable: true
});
Float32Array.prototype.forEach = Float32Array.prototype.forEach || function (callback) {
    for (var i = 0; i < this.length; ++i) {
        callback(this[i], i, this);
    }
};
egret.DisplayObject.prototype.removeFromParent = function () {
    this.parent && this.parent.removeChild(this);
};
Object.defineProperty(egret.DisplayObject.prototype, "scale", {
    get: function () {
        return this.scaleX;
    },
    set: function (value) {
        this.scaleX = this.scaleY = value;
    },
    enumerable: true,
    configurable: true
});
egret.EventDispatcher.prototype.removeAllEventListeners = function () {
    var values = this.$EventDispatcher;
    var eventMaps = [values[2 /* captureEventsMap */], values[1 /* eventsMap */]];
    eventMaps.forEach(function (eventMap) {
        for (var type in eventMap) {
            var list = eventMap[type];
            if (list)
                eventMap[type] = null;
            // if (values[Keys.notifyLevel] !== 0) {
            // 	eventMap[type] = list = list.concat();
            // }
        }
    });
};
egret.EventDispatcher.prototype.removeEventListenerOfType = function (type) {
    var values = this.$EventDispatcher;
    var eventMaps = [values[2 /* captureEventsMap */], values[1 /* eventsMap */]];
    eventMaps.forEach(function (eventMap) {
        delete eventMap[type];
    });
};
//hack eui BasicLayout;
Object.defineProperty(eui.BasicLayout.prototype, "useVirtualLayout", {
    get: function () {
        return this.$useVirtualLayout;
    },
    set: function (value) {
        this.$useVirtualLayout = false;
    },
    enumerable: true,
    configurable: true
});
if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null) {
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
Date.prototype.format = function (fmt) {
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.formatUTC = function (fmt) {
    var o = {
        "M+": this.getUTCMonth() + 1,
        "d+": this.getUTCDate(),
        "h+": this.getUTCHours(),
        "m+": this.getUTCMinutes(),
        "s+": this.getUTCSeconds(),
        "q+": Math.floor((this.getUTCMonth() + 3) / 3),
        "S": this.getUTCMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var _isNaN = isNaN;
window["isNaN"] = function (v) { return v === null || _isNaN(v); };
String.prototype.substitute = function (data) {
    return this.replace(/\{(.+?)\}/ig, function (match, name) { return data[name]; });
};
Date.week = function (offset) {
    if (offset === void 0) { offset = 2521; }
    // start from 1527151462527
    var timeZone = -7 * 3600 * 1000;
    var week = ~~((Date.now() + timeZone + 1 * 24 * 3600 * 1000) / (24 * 7 * 3600 * 1000)) - offset - 1;
    return week;
};
Date.days = function (offset) {
    if (offset === void 0) { offset = 0; }
    var timeZone = -7 * 3600 * 1000;
    var days = ~~((Date.now() + timeZone + 1 * 24 * 3600 * 1000) / (24 * 3600 * 1000)) - offset - 1;
    return days;
};
Array.prototype.random = function (rm) {
    if (rm === void 0) { rm = false; }
    if (this.length == 0)
        return null;
    var index = Math.floor(this.length * Math.random());
    var item = this[index];
    if (rm)
        this.splice(index, 1);
    return item;
};
Array.prototype.choice = function (fun) {
    if (this.length == 0)
        return null;
    if (fun == void 0)
        fun = function (v) { return v; };
    var sum = this.reduce(function (a, b) { return a + fun(b); }, 0) * Math.random();
    var len = this.length;
    for (var i = 0; i < len; i++) {
        var w = fun(this[i]);
        if (sum < w)
            return this[i];
        sum -= w;
    }
    return this[len - 1];
};
Array.prototype.unique = function () {
    var arr = [];
    var i = 0;
    while (i < this.length) {
        var item = this[i];
        if (arr.indexOf(this[i]) >= 0) {
            this.splice(i, 1);
        }
        else {
            arr.push(this[i++]);
        }
    }
    return this;
};
Array.prototype.sorton = function (field, ascending) {
    if (ascending === void 0) { ascending = true; }
    return this.sort(function (a, b) {
        var ascore = a[field] || 0;
        var bscore = b[field] || 0;
        var result = ascore > bscore ? 1 : ascore < bscore ? -1 : 0;
        ascending || (result *= -1);
        return result;
    });
};
Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        _a = [this[j], this[i]], this[i] = _a[0], this[j] = _a[1];
    }
    return this;
    var _a;
};
Array.prototype.rm = function (item) {
    var fun = typeof item == "function" ? item : function (v) { return v == item; };
    var index = 0;
    while (index < this.length) {
        var item_1 = this[index];
        if (fun(item_1)) {
            this.splice(index, 1);
            return true;
        }
        else {
            index++;
        }
    }
    return false;
};
Array.prototype.next = function () {
    if (this._iter_index == void 0 || this._iter_index >= this.length) {
        this._iter_index = 0;
    }
    return this[this._iter_index++];
};
//# sourceMappingURL=EgretHack.js.map