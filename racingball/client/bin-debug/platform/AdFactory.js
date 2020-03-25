var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ADFactory = (function () {
    function ADFactory() {
    }
    ADFactory.create = function () {
        var ad;
        if (!!window["FBInstant"]) {
            var _a = [
                "578524932929486_578527119595934",
                "578524932929486_578526956262617",
            ], iad_high = _a[0], //small
            rad_high = _a[1];
            ad = new AdvertiseFB([iad_high], [rad_high]);
        }
        else {
            ad = new AdvertiseDev();
        }
        return ad;
    };
    return ADFactory;
}());
__reflect(ADFactory.prototype, "ADFactory");
//# sourceMappingURL=AdFactory.js.map