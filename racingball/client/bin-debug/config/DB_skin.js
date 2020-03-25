var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DB_skin = (function () {
    function DB_skin() {
    }
    DB_skin.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = DB_skin.getDB()).get.apply(_a, args);
        var _a;
    };
    DB_skin.getall = function () { return DB_skin.getDB().getall(); };
    DB_skin.getDB = function () {
        if (DB_skin._db)
            return DB_skin._db;
        var _keys = ["id", "order", "fbx", "tex", "thumb", "price", "weight",];
        var _datas = {
            "1": [1, 1, "1", "ball.jpg", "thumb_baiqiu.png", "0:0", 0],
            "3": [3, 2, "1", "tietu_zhangyuqiu_1.jpg", "thumb_zhangyuqiu.png", "1:1", 70],
            "4": [4, 3, "1", "tietu_yuanquanqiu_1.jpg", "thumb_yuanquanqiu.png", "1:1", 80],
            "9": [9, 4, "4", "tietu_maoqiu_4.jpg", "thumb_maoqiu.png", "2:1", 80],
            "13": [13, 5, "4", "tietu_gouqiu_4.jpg", "thumb_gouqiu.png", "2:2", 80],
            "6": [6, 6, "4", "tietu_xiaojiqiu_4.jpg", "thumb_xiaojiqiu.png", "2:3", 60],
            "14": [14, 7, "2", "tietu_gaoerfuqiu_2.jpg", "thumb_gaoerfuqiu.png", "3:10000", 10],
            "16": [16, 8, "6", "tietu_zuqiu_6.jpg", "thumb_zuqiu.png", "3:15000", 5],
            "24": [24, 9, "7", "tietu_lv6_7.jpg", "thumb_lv6.png", "3:20000", 5],
            "5": [5, 10, "1", "tietu_xiaolianqiu_1.jpg", "thumb_xiaolianqiu.png", "1:2", 80],
            "7": [7, 11, "2", "tietu_xianqiu_2.jpg", "thumb_xianqiu.png", "1:2", 50],
            "10": [10, 12, "1", "tietu_langxianqiu_1.jpg", "thumb_langxianqiu.png", "1:2", 80],
            "2": [2, 13, "4", "tietu_zhuqiu_4.jpg", "thumb_zhuqiu.png", "2:5", 90],
            "8": [8, 14, "4", "tietu_qieqiu_4.jpg", "thumb_qieqiu.png", "2:5", 70],
            "12": [12, 15, "4", "tietu_hetunqiu_4.jpg", "thumb_hetunqiu.png", "2:5", 30],
            "17": [17, 16, "7", "tietu_lanqiu_7.jpg", "thumb_lanqiu.png", "3:30000", 5],
            "27": [27, 17, "7", "tietu_hei8qiu_7.jpg", "thumb_hei8qiu.png", "3:50000", 5],
            "18": [18, 18, "7", "tietu_bangqiu_7.jpg", "thumb_bangqiu.png", "3:80000", 5],
            "11": [11, 19, "1", "tietu_huabanqiu_1.jpg", "thumb_huabanqiu.png", "1:2", 80],
            "15": [15, 20, "1", "ball_jinqiaqiu_1.jpg", "thumb_jinqiaqiu.png", "1:3", 5],
            "33": [33, 21, "2", "tietu_shandianqiu_2.jpg", "thumb_shandianqiu.png", "1:3", 5],
            "25": [25, 22, "7", "tietu_zi12qiu_7.jpg", "thumb_zi12qiu.png", "3:100000", 5],
            "19": [19, 23, "7", "tietu_wangqiu_7.jpg", "thumb_wangqiu.png", "3:150000", 5],
            "20": [20, 24, "5", "tietu_paiqiu_5.jpg", "thumb_paiqiu.png", "3:200000", 5],
            "22": [22, 25, "3", "tietu_dituqiu_3.jpg", "thumb_dituqiu.png", "1:3", 5],
            "23": [23, 26, "7", "tietu_jinglingqiu_7.jpg", "thumb_jinglingqiu.png", "1:3", 5],
            "26": [26, 27, "7", "tietu_fenhuaqiu_7.jpg", "thumb_fenhuaqiu.png", "1:3", 5],
            "28": [28, 28, "7", "tietu_caihuaqiu_7.jpg", "thumb_caihuaqiu.png", "1:3", 5],
            "29": [29, 29, "7", "tietu_tiaowenqiu_7.jpg", "thumb_tiaowenqiu.png", "1:3", 5],
            "30": [30, 30, "7", "tietu_faguoqiu_7.jpg", "thumb_faguoqiu.png", "1:3", 5],
            "31": [31, 31, "7", "tietu_yingguoqiu_7.jpg", "thumb_yingguoqiu.png", "1:3", 5],
            "32": [32, 32, "6", "tietu_guoqijiheqiu_6.jpg", "thumb_guoqijiheqiu.png", "1:3", 5],
            "21": [21, 33, "7", "tietu_xiguaqiu_7.jpg", "thumb_xiguaqiu.png", "1:3", 5]
        };
        DB_skin._db = new DB(_keys, _datas);
        return DB_skin._db;
    };
    return DB_skin;
}());
__reflect(DB_skin.prototype, "DB_skin");
//# sourceMappingURL=DB_skin.js.map