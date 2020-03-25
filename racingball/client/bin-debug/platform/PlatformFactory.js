var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlatformFactory = (function () {
    function PlatformFactory() {
    }
    PlatformFactory.create = function () {
        if (!!window["FBInstant"]) {
            return new PlatformFB();
        }
        else {
            return new PlatformDev();
        }
    };
    return PlatformFactory;
}());
__reflect(PlatformFactory.prototype, "PlatformFactory");
//# sourceMappingURL=PlatformFactory.js.map