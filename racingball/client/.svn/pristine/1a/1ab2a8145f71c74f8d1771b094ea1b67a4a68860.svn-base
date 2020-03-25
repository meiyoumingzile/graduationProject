/**
 * Author:terran
 * Email:terran.tian@foxmail.com
 * 
 * Time:上午10:25 2016年12月17日
**/

class DB {
    private keys: any;
    private data: any;
    private key_index_map: any;
    private cache: any;
    constructor(keys, data) {
        if (typeof keys === "string") {
            keys = JSON.parse(keys);
        }
        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        this.keys = keys;
        this.data = data;

        this.key_index_map = {};
        for (let index in this.keys) {
            let name = this.keys[index];
            this.key_index_map[name] = index;
        }

        this.cache = {};
    }

    get(...args) {
        let key = args.join("_")
        let obj = this.cache[key];
        if (obj) return obj;

        if (!this.data[key]) return null;

        obj = { "_data": this.data[key] };

        let self = this;
        for (let index = 0; index < this.keys.length; index++) {
            let name = this.keys[index];
            Object.defineProperty(obj, name, {
                get: function () {
                    let index = self.key_index_map[name]
                    return obj._data[index];
                }
            })
        }
        this.cache[key] = obj;

        return obj;
    }

    getall() {
        return this.data;
    }
}