var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkinItemData = (function () {
    function SkinItemData() {
        /** 皮肤价格 type:0-默认 1-广告 2-经验 3-邀请好友 */
        this.price = {
            type: 0,
            num: 0
        };
    }
    return SkinItemData;
}());
__reflect(SkinItemData.prototype, "SkinItemData");
var skinDB2SkinData = function () {
    var arr = [];
    var idx = 1;
    while (true) {
        var skinDBItem = DB_skin.get(idx);
        if (!skinDBItem) {
            break;
        }
        var skinItem = new SkinItemData();
        skinItem.id = skinDBItem.id;
        skinItem.order = skinDBItem.order;
        skinItem.fbx = skinDBItem.fbx;
        skinItem.tex = skinDBItem.tex;
        skinItem.thumb = skinDBItem.thumb;
        skinItem.weight = skinDBItem.weight;
        if (skinDBItem.price) {
            var arr_1 = skinDBItem.price.split(':');
            skinItem.price.type = parseInt(arr_1[0]);
            skinItem.price.num = parseInt(arr_1[1]);
        }
        idx++;
        arr.push(skinItem);
    }
    /*for(var i=0;i<4;i++){
        var skinItem = new SkinItemData();
        skinItem.id =idx++;
        skinItem.order = 100+i;
        skinItem.fbx = "dsddsd";
        skinItem.tex = "dsddsd";
        skinItem.thumb =  arr[i].thumb;
        skinItem.weight = arr[i].weight;
        skinItem.price.type = 2;
        skinItem.price.num = 1007;
        arr.push(skinItem);
    }*/
    return arr;
};
//# sourceMappingURL=SkinItemData.js.map