/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 *
 * Time:下午4:50 2016年12月29日
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Facade = (function () {
    function Facade() {
        this._responders = [];
        this._commands = {};
        // if(Facade.inst) throw "singleton error";
        Facade.inst = this;
        this.emiter = new Emiter();
    }
    Facade.prototype.registResponser = function (res) {
        if (this._responders.some(function (item) { return item.res == res; }))
            throw "this responser has been registed already!";
        var arr = res.listResponse();
        var ids = [];
        var _loop_1 = function (name_1) {
            var id = this_1.emiter.on(name_1, function (data) {
                res.doResponse(name_1, data);
            });
            ids.push({ name: name_1, id: id });
        };
        var this_1 = this;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var name_1 = arr_1[_i];
            _loop_1(name_1);
        }
        this._responders.push({ res: res, ids: ids });
    };
    Facade.prototype.unregistResponser = function (res) {
        for (var _i = 0, _a = this._responders; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.res == res) {
                var ids = item.ids;
                for (var _b = 0, ids_1 = ids; _b < ids_1.length; _b++) {
                    var value = ids_1[_b];
                    this.emiter.rm(value.id, value.name);
                }
                this._responders.splice(this._responders.indexOf(item), 1);
                break;
            }
        }
    };
    Facade.prototype.registCommand = function (name, cmd) {
        if (this._commands[name])
            throw "cmd has been registed already!!!";
        var id = this.emiter.on(name, function (data) {
            console.log("cmd", name);
            new cmd().excute(data, name);
        });
        this._commands[name] = id;
    };
    Facade.prototype.unregistCommand = function (name) {
        var id = this._commands[name];
        if (id) {
            this.emiter.rm(id, name);
        }
    };
    Facade.prototype.notify = function (name, data) {
        return this.emiter.emit(name, data);
    };
    Facade.prototype.dispose = function () {
        this.emiter.rmall();
        this._responders.length = 0;
    };
    return Facade;
}());
__reflect(Facade.prototype, "Facade");
//# sourceMappingURL=Facade.js.map