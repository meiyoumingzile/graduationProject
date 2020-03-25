var Http;
(function (Http) {
    function encodeValue(key, value) {
        if (value instanceof Array) {
            return encodeArray(key, value);
        }
        else {
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    }
    function encodeArray(key, value) {
        return value.map(function (v) { return encodeURIComponent(key) + "=" + encodeURIComponent(v); }).join("&");
    }
    function toString(data) {
        if (!data) {
            return "";
        }
        var arr = [];
        for (var key in data) {
            arr.push(encodeValue(key, data[key]));
        }
        return arr.join("&");
    }
    function request(url, data, method, timeout) {
        if (timeout === void 0) { timeout = 10; }
        return new Promise(function (resolve, reject) {
            var content = toString(data);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve(xmlHttp.responseText);
            };
            var reUrl = url;
            if (method == "GET") {
                reUrl = url + "?" + content;
            }
            var sendData = null;
            xmlHttp.open(method, reUrl, true); // true for asynchronous
            if (method == "POST") {
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                sendData = content;
            }
            xmlHttp.timeout = timeout * 1000;
            xmlHttp.ontimeout = reject;
            xmlHttp.onerror = reject;
            xmlHttp.send(sendData);
        });
    }
    Http.request = request;
    function post(url, data, timeout) {
        if (timeout === void 0) { timeout = 10; }
        return request(url, data, "POST", timeout);
    }
    Http.post = post;
    function get(url, data, timeout) {
        if (timeout === void 0) { timeout = 10; }
        return request(url, data, "POST", timeout);
    }
    Http.get = get;
})(Http || (Http = {}));
//# sourceMappingURL=Http.js.map