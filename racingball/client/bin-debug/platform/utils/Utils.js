var Utils;
(function (Utils) {
    function clamp(v, min, max) {
        return v > max ? max : v < min ? min : v;
    }
    Utils.clamp = clamp;
    function lerp(v, from, to) {
        return from + (to - from) * v;
    }
    Utils.lerp = lerp;
    function mod(v, m) {
        if (v < 0)
            v += m;
        return v % m;
    }
    Utils.mod = mod;
    function randomInt(min, max) {
        return (Math.random() * (max - min) | 0) + min;
    }
    Utils.randomInt = randomInt;
    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    Utils.randomRange = randomRange;
    function randomInArr(arr, weightArr) {
        // if (!weightArr) {
        return arr[randomInt(0, arr.length)];
        // } else {
        // 	if (arr.length !== weightArr.length) {
        // 		console.log("Unequal length!");
        // 		return;
        // 	}
        // 	let item;
        // 	let sum = 0;
        // 	weightArr.forEach(function (value) {
        // 		sum += value;
        // 	})
        // 	let randomFloat = Math.random() * sum;
        // 	sum = 0;
        // 	for (let i = 0; i < weightArr.length; i++) {
        // 		sum += weightArr[i];
        // 		if (randomFloat < sum) {
        // 			item = arr[i];
        // 			break;
        // 		}
        // 	}
        // 	return item;
        // }
    }
    Utils.randomInArr = randomInArr;
    function makeArrayRandom(arr) {
        for (var i = 0; i < arr.length; ++i) {
            var j = (arr.length * Math.random()) | 0;
            if (i != j)
                _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
        }
        return arr;
        var _a;
    }
    Utils.makeArrayRandom = makeArrayRandom;
    function isInRange(v, min, max) {
        return v >= min && v <= max;
    }
    Utils.isInRange = isInRange;
    /**世界坐标转屏幕坐标 */
    function worldToScreen(worldP, screenP, camera) {
        if (screenP === void 0) { screenP = new tr.Vector2(); }
        if (camera === void 0) { camera = Game.inst.world.camera; }
        var vector = worldP.project(camera);
        var halfWidth = Context.stage.stageWidth / 2;
        var halfHeight = Context.stage.stageHeight / 2;
        screenP.x = vector.x * halfWidth + halfWidth;
        screenP.y = -vector.y * halfHeight + halfHeight;
        return screenP;
    }
    Utils.worldToScreen = worldToScreen;
    function setColorMatrix(colorMatrix, hex) {
        var result = Utils.hexToRGB(hex);
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        return colorMatrix;
    }
    Utils.setColorMatrix = setColorMatrix;
    function newColorMatrix(hex) {
        var c = Utils.hexToRGB(hex);
        return [
            c.r / 255, 0, 0, 0, 0,
            0, c.g / 255, 0, 0, 0,
            0, 0, c.b / 255, 0, 0,
            0, 0, 0, 1, 0,
        ];
    }
    Utils.newColorMatrix = newColorMatrix;
    function hexToRGB(hex) {
        return {
            b: hex & 0xff,
            g: hex >> 8 & 0xff,
            r: hex >> 16 & 0xff
        };
    }
    Utils.hexToRGB = hexToRGB;
    function pad(num, n) {
        return (Array(n).join("0") + num).slice(-n);
    }
    Utils.pad = pad;
    function vector3From2(v, z) {
        return new tr.Vector3(v.x, v.y, z || 0);
    }
    Utils.vector3From2 = vector3From2;
    function cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    Utils.cross = cross;
    Utils.deepClone = function (obj) { return JSON.parse(JSON.stringify(obj)); };
    function wait(duration, callBack) {
        return new Promise(function (resolve, reject) {
            egret.setTimeout(function () {
                if (callBack)
                    callBack();
                resolve();
            }, null, duration);
        });
    }
    Utils.wait = wait;
    function callLater(callback, time) {
        if (time === void 0) { time = 0; }
        egret.setTimeout(callback, null, time);
    }
    Utils.callLater = callLater;
    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    Utils.removeByValue = removeByValue;
    function removeLog() {
        // egret.Logger.logLevel = egret.Logger.OFF
        egret.log = function () { };
    }
    Utils.removeLog = removeLog;
    function recoverLog() {
        // egret.Logger.logLevel = egret.Logger.ALL;
        egret.log = console.log;
    }
    Utils.recoverLog = recoverLog;
    function closure(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return method.apply(null, args.concat(params));
        };
    }
    Utils.closure = closure;
    function toImageBase64(sprite, rect) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            sprite.once("ready_2_draw", function () {
                var text = new egret.RenderTexture();
                text.drawToTexture(sprite);
                sprite.removeFromParent();
                var imageData = text.toDataURL("image/png");
                text.dispose();
                resolve(imageData);
                if (!Context.isFB) {
                    var image_1 = new Image(sprite.width, sprite.height);
                    image_1.src = imageData;
                    image_1.style.position = "absolute";
                    image_1.style.left = "10px";
                    image_1.style.top = "10px";
                    document.body.appendChild(image_1);
                    setTimeout(function () {
                        image_1.remove();
                    }, 2000);
                }
            }, _this);
            Context.stage.addChildAt(sprite, 0);
            sprite.y = Context.stage.stageHeight + 10;
        });
    }
    Utils.toImageBase64 = toImageBase64;
    function getRankNumberText(n) {
        return n + (n == 1 ? " st" : n == 2 ? " nd" : n == 3 ? " rd" : " th");
    }
    Utils.getRankNumberText = getRankNumberText;
})(Utils || (Utils = {}));
//# sourceMappingURL=Utils.js.map