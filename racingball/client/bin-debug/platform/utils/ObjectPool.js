var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    function ObjectPool() {
        this.dictObj_ = {};
        this.dictInfo_ = new Map();
    }
    ObjectPool.init = function () {
        this.inst || (this.inst = new ObjectPool());
    };
    //initCount should be greater than 0
    ObjectPool.prototype.register = function (cls, initCount) {
        var arr = [];
        for (var i = 0; i < initCount; ++i) {
            arr.push(new cls);
        }
        var name = arr[0].name();
        this.dictInfo_.set(cls, name);
        this.dictObj_[name] && console.log("ObjectPool name dumplicate:", name);
        this.dictObj_[name] = arr;
    };
    ObjectPool.prototype.get = function (cls) {
        var name = this.dictInfo_.get(cls);
        var arr = this.dictObj_[name];
        var ret;
        if (arr.length === 0) {
            ret = new cls();
            // console.log("pool new ", name);
        }
        else {
            ret = arr.pop();
        }
        return ret;
    };
    ObjectPool.prototype._collect = function (obj) {
        this.dictObj_[obj.name()].push(obj);
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
var PoolObject = (function () {
    function PoolObject() {
    }
    PoolObject.prototype.dispose = function () {
        ObjectPool.inst._collect(this);
    };
    return PoolObject;
}());
__reflect(PoolObject.prototype, "PoolObject");
//# sourceMappingURL=ObjectPool.js.map