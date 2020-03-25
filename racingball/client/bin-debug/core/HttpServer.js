var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @terran
**/
var HttpServer = (function () {
    function HttpServer() {
    }
    HttpServer.prototype.encodeValue = function (key, value) {
        if (value instanceof Array) {
            return this.encodeArray(key, value);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    HttpServer.prototype.encodeArray = function (key, value) {
        if (!key)
            return "";
        if (value.length == 0) {
            return encodeURIComponent(key) + "=";
        }
        return value.map(function (v) { return encodeURIComponent(key) + "=" + encodeURIComponent(v); }).join("&");
    };
    HttpServer.prototype.toString = function (data) {
        if (!data) {
            return "";
        }
        var stringArray = [];
        for (var key in data) {
            stringArray.push(this.encodeValue(key, data[key]));
        }
        return stringArray.join("&");
    };
    HttpServer.prototype.request = function (param) {
        var http = new XMLHttpRequest();
        http.responseType = param.responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.timeout = param.timeout || 0;
        http.onerror = function (e) {
            console.log("[http][" + param.method + "][error] [" + http.status + ":" + http.statusText + "] " + param.url);
            param.onerror && param.onerror(e);
        };
        http.onabort = function (e) {
            console.log("[http][" + param.method + "][abort] " + param.url);
            param.onabort && param.onabort();
        };
        http.onprogress = function (e) {
            if (e && e.lengthComputable && param.onprogress)
                param.onprogress(e.loaded / e.total);
        };
        http.onload = function (e) {
            var status = http.status !== undefined ? http.status : 200;
            if (status === 200 || status === 204 || status === 0) {
                var result = http.response || http.responseText;
                console.log("[http][" + param.method + "][loaded] " + param.url + ":" + result);
                param.onload(result);
            }
            else {
                console.log("[http][" + param.method + "][error] [" + http.status + ":" + http.statusText + "] " + param.url);
                param.onerror && param.onerror(e);
            }
        };
        var payload = this.toString(param.data);
        var reUrl = param.url;
        if (param.method == "GET" && payload) {
            reUrl = param.url + "?" + payload;
            payload = null;
        }
        http.open(param.method, reUrl, true);
        if (param.method == "POST") {
            // http.setRequestHeader('Content-Encoding', "gzip");
            if (param.rawData) {
                http.setRequestHeader("Content-Type", "application/json");
                payload = JSON.stringify(param.rawData);
            }
            else {
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
        }
        if (param.headers) {
            for (var i = 0; i < param.headers.length; i++) {
                http.setRequestHeader(param.headers[i++], param.headers[i]);
            }
        }
        http.send(payload);
        console.log("[http][" + param.method + "] " + param.url + ":" + JSON.stringify(param.data));
        return http;
    };
    HttpServer.prototype.post = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.request({
                url: url, data: data,
                method: "POST",
                onload: resolve,
                onerror: reject,
                ontimeout: reject
            });
        });
    };
    HttpServer.prototype.get = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.request({
                url: url, data: data,
                method: "GET",
                onload: resolve,
                onerror: reject,
                ontimeout: reject
            });
        });
    };
    return HttpServer;
}());
__reflect(HttpServer.prototype, "HttpServer");
//# sourceMappingURL=HttpServer.js.map