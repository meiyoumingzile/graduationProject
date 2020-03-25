var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RankPlayerVO = (function () {
    function RankPlayerVO() {
        this.name = "";
        this.photo = "";
        this.id = "";
        this.score = 0;
        //for exceed effect purpose!
        this.tip = "";
        this.originalRank = 1;
    }
    Object.defineProperty(RankPlayerVO.prototype, "skin", {
        get: function () {
            return this.extraData && this.extraData.skin || 1;
        },
        enumerable: true,
        configurable: true
    });
    RankPlayerVO.prototype.toJSON = function () {
        return {
            id: this.id,
            score: this.score,
            extraData: this.extraData
        };
    };
    RankPlayerVO.createFromJSON = function (data) {
        var vo = new RankPlayerVO();
        vo.id = data.id;
        vo.score = data.score;
        if (typeof data.extraData == "string") {
            try {
                vo.extraData = JSON.parse(data.extraData);
            }
            catch (e) { }
        }
        else {
            vo.extraData = data.extraData;
        }
        return vo;
    };
    /**从排行榜中的一项创建数据 */
    RankPlayerVO.createFromLeaderBoardEntry = function (data) {
        var p = data.getPlayer();
        var vo = new RankPlayerVO();
        vo.name = p.getName();
        vo.photo = p.getPhoto();
        vo.id = p.getID();
        vo.score = data.getScore();
        vo.originalRank = data.getRank();
        var extraDataStr = data.getExtraData();
        vo.extraData = extraDataStr ? JSON.parse(extraDataStr) : {};
        return vo;
    };
    RankPlayerVO.createFromContextPlayer = function (data) {
        var vo = new RankPlayerVO();
        vo.name = data.getName();
        vo.photo = data.getPhoto();
        vo.id = data.getID();
        return vo;
    };
    return RankPlayerVO;
}());
__reflect(RankPlayerVO.prototype, "RankPlayerVO");
//# sourceMappingURL=RankPlayerVO.js.map