class Storager {
	constructor(private id: string = "g") {
	}

	set(key: string, value: any) {
		if (typeof (value) == "object") {
			value = JSON.stringify(value)
		}
		egret.localStorage.setItem(`${this.id}_${key}`, value);
	}

	get(key: string, defalutValue?: any): string {
		return egret.localStorage.getItem(`${this.id}_${key}`) || defalutValue
	}

	rm(key: string) {
		egret.localStorage.removeItem(`${this.id}_${key}`);
	}

	json(key: string, defalutValue = null) {
		let value = egret.localStorage.getItem(`${this.id}_${key}`);
		let obj;
		try {
			obj = JSON.parse(value);
		} catch (e) {
			// $dev && egret.log("json failed")
		}
		return obj || defalutValue
	}

	static clear() {
		egret.localStorage.clear()
	}
}