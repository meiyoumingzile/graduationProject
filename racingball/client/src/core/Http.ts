namespace Http {
    function encodeValue(key: string, value: any) {
        if (value instanceof Array) {
            return encodeArray(key, value);
        }
        else {
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    }

    function encodeArray(key: string, value: string[]) {
        return value.map(v => encodeURIComponent(key) + "=" + encodeURIComponent(v)).join("&");
    }

    function toString(data: { [k: string]: string | string[] }): string {
        if (!data) {
            return "";
        }
        let arr: string[] = [];
        for (let key in data) {
            arr.push(encodeValue(key, data[key]));
        }
        return arr.join("&");
    }

    export function request(url: string, data: { [k: string]: string | string[] }, method: "GET" | "POST", timeout = 10) {
        return new Promise((resolve, reject) => {
            let content = toString(data);

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    resolve(xmlHttp.responseText);
            }
            let reUrl = url;
            if (method == "GET") {
                reUrl = url + "?" + content;
            }
            let sendData = null;
            xmlHttp.open(method, reUrl, true); // true for asynchronous
            if (method == "POST") {
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                sendData = content;
            }
            xmlHttp.timeout = timeout * 1000;
            xmlHttp.ontimeout = reject;
            xmlHttp.onerror = reject;
            xmlHttp.send(sendData);
        })
    }

    export function post(url: string, data: { [k: string]: string | string[] }, timeout = 10) {
        return request(url, data, "POST", timeout)
    }

    export function get(url: string, data: { [k: string]: string | string[] }, timeout = 10) {
        return request(url, data, "POST", timeout)
    }
}