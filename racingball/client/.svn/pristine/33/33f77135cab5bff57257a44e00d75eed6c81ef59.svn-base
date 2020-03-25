// TypeScript file
declare namespace egret {
	interface TextField {
		htmlText: string;
	}
}

Object.defineProperty(egret.TextField.prototype, "htmlText", {
	get: function () {
		return this._htmlText;
	},
	set: function (value) {
		if (this.__htmlText == value) return;

		this._htmlText = value;
		try {
			this.textFlow = new egret.HtmlTextParser().parse(value);
		} catch (error) {
			this.text = value;
		}
	},
	enumerable: true,
	configurable: true
});

Float32Array.prototype.forEach = Float32Array.prototype.forEach || function (callback) {
	for (let i = 0; i < this.length; ++i) {
		callback(this[i], i, this);
	}
}

declare namespace egret {
	interface DisplayObject {
		removeFromParent(): void;
		$_silence: boolean;
		scale: number;
	}
}

egret.DisplayObject.prototype.removeFromParent = function () {
	this.parent && this.parent.removeChild(this);
}

Object.defineProperty(egret.DisplayObject.prototype, "scale", {
	get: function () {
		return this.scaleX;
	},
	set: function (value) {
		this.scaleX = this.scaleY = value;
	},
	enumerable: true,
	configurable: true
});

declare namespace egret {
	interface EventDispatcher {
		removeAllEventListeners: () => void
		removeEventListenerOfType: (string) => void
	}
}

const enum Keys {
	eventTarget,
	eventsMap,
	captureEventsMap,
	notifyLevel
}

egret.EventDispatcher.prototype.removeAllEventListeners = function () {
	let values = this.$EventDispatcher;
	let eventMaps = [values[Keys.captureEventsMap], values[Keys.eventsMap]]
	eventMaps.forEach(eventMap => {
		for (var type in eventMap) {
			let list: egret.sys.EventBin[] = eventMap[type];
			if (list)
				eventMap[type] = null;
			// if (values[Keys.notifyLevel] !== 0) {
			// 	eventMap[type] = list = list.concat();
			// }
		}
	})
}

egret.EventDispatcher.prototype.removeEventListenerOfType = function (type: string) {
	let values = this.$EventDispatcher;
	let eventMaps = [values[Keys.captureEventsMap], values[Keys.eventsMap]]
	eventMaps.forEach(eventMap => {
		delete eventMap[type]
	})
}

//hack eui BasicLayout;
Object.defineProperty(eui.BasicLayout.prototype, "useVirtualLayout", {
	get: function () {
		return this.$useVirtualLayout;
	},
	set: function (value) {
		this.$useVirtualLayout = false;
	},
	enumerable: true,
	configurable: true
});

declare interface ObjectConstructor {
	assign(...objects: Object[]): Object;
}

if (typeof Object.assign != 'function') {
	Object.assign = function (target, varArgs) { // .length of function is 2
		'use strict';
		if (target == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
}

interface Date {
	format(fmt: string): string;
	formatUTC(fmt: string): string;
}
Date.prototype.format = function (fmt) {
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

Date.prototype.formatUTC = function (fmt) {
	var o = {
		"M+": this.getUTCMonth() + 1, //月份 
		"d+": this.getUTCDate(), //日 
		"h+": this.getUTCHours(), //小时 
		"m+": this.getUTCMinutes(), //分 
		"s+": this.getUTCSeconds(), //秒 
		"q+": Math.floor((this.getUTCMonth() + 3) / 3), //季度 
		"S": this.getUTCMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

declare namespace egret {
	namespace web {
		class WebImageLoader {
			public static crossOrigin: string;
		}
	}
}

let _isNaN = isNaN;
window["isNaN"] = (v: any) => v === null || _isNaN(v);

//@terran
interface String {
	substitute(data: any);
}
String.prototype.substitute = function (data: any) {
	return this.replace(/\{(.+?)\}/ig, (match, name) => data[name]);
}
interface DateConstructor {
	week(offset?: number): number;
	days(offset?: number): number
}

Date.week = function (offset = 2521) {
	// start from 1527151462527
	let timeZone = -7 * 3600 * 1000;
	let week = ~~((Date.now() + timeZone + 1 * 24 * 3600 * 1000) / (24 * 7 * 3600 * 1000)) - offset - 1;
	return week;
}

Date.days = function (offset = 0) {
	let timeZone = -7 * 3600 * 1000;
	let days = ~~((Date.now() + timeZone + 1 * 24 * 3600 * 1000) / (24 * 3600 * 1000)) - offset - 1;
	return days;
}
interface Array<T> {
	random(rm?: boolean): T;
	choice(fun?: (v: T) => number): T
	unique(): this;
	sorton(field: string, ascending?: boolean): this;
	shuffle(): this;
	rm(item: T | Function): boolean;
	next(): T
}
Array.prototype.random = function (rm: boolean = false) {
	if (this.length == 0) return null;
	let index = Math.floor(this.length * Math.random());
	let item = this[index];
	if (rm) this.splice(index, 1);
	return item;
}
Array.prototype.choice = function (fun) {
	if (this.length == 0) return null;
	if (fun == void 0) fun = (v) => v;
	let sum = this.reduce((a, b) => a + fun(b), 0) * Math.random();
	let len = this.length;
	for (let i = 0; i < len; i++) {
		let w = fun(this[i])
		if (sum < w) return this[i];
		sum -= w
	}
	return this[len - 1]
}


Array.prototype.unique = function () {
	let arr = [];
	let i = 0;
	while (i < this.length) {
		let item = this[i];
		if (arr.indexOf(this[i]) >= 0) {
			this.splice(i, 1);
		} else {
			arr.push(this[i++]);
		}
	}
	return this;
}

Array.prototype.sorton = function (field: string, ascending: boolean = true) {
	return this.sort((a, b) => {
		let ascore = a[field] || 0;
		let bscore = b[field] || 0;
		let result = ascore > bscore ? 1 : ascore < bscore ? -1 : 0
		ascending || (result *= -1)
		return result
	})
}
Array.prototype.shuffle = function () {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
}
Array.prototype.rm = function (item: any) {
	let fun = typeof item == "function" ? item : v => v == item;
	let index = 0;
	while (index < this.length) {
		let item = this[index];
		if (fun(item)) {
			this.splice(index, 1)
			return true
		} else { index++; }
	}

	return false;
}

Array.prototype.next = function () {
	if (this._iter_index == void 0 || this._iter_index >= this.length) {
		this._iter_index = 0;
	}
	return this[this._iter_index++];
}