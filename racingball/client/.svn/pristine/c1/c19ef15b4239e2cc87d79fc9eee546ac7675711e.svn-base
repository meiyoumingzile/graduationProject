
class ObjectPool {
	static inst: ObjectPool;

	private dictObj_: { [k: string]: PoolObject[] } = {};
	private dictInfo_: Map<new () => PoolObject, string> = new Map();
	constructor() {
	}

	static init() {
		this.inst || (this.inst = new ObjectPool());
	}

	//initCount should be greater than 0
	register(cls: new () => PoolObject, initCount: number) {
		let arr: PoolObject[] = [];
		for (let i = 0; i < initCount; ++i) {
			arr.push(new cls);
		}
		let name = arr[0].name();
		this.dictInfo_.set(cls, name);
		this.dictObj_[name] && console.log("ObjectPool name dumplicate:", name);
		this.dictObj_[name] = arr;
	}

	get<T extends PoolObject>(cls: new () => T) {
		let name = this.dictInfo_.get(cls);
		let arr = this.dictObj_[name];
		let ret: T;
		if (arr.length === 0) {
			ret = new cls();
			// console.log("pool new ", name);
		} else {
			ret = arr.pop() as T;
		}
		return ret as T;
	}

	_collect<T extends PoolObject>(obj: T) {
		this.dictObj_[obj.name()].push(obj);
	}
}

abstract class PoolObject {
	abstract name(): string;
	dispose() {
		ObjectPool.inst._collect(this);
	}
}