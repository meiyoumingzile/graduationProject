namespace Utils {

	export function clamp(v: number, min: number, max: number) {
		return v > max ? max : v < min ? min : v
	}

	export function lerp(v: number, from: number, to: number) {
		return from + (to - from) * v;
	}

	export function mod(v: number, m: number) {
		if (v < 0) v += m;
		return v % m;
	}

	export function randomInt(min: number, max: number) {
		return (Math.random() * (max - min) | 0) + min;
	}

	export function randomRange(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	export function randomInArr<T>(arr: T[], weightArr?: number[]) {
		// if (!weightArr) {
		return arr[randomInt(0, arr.length)];
		// } else {
		// 	if (arr.length !== weightArr.length) {
		// 		console.log("Unequal length!");
		// 		return;
		// 	}
		// 	let item;
		// 	let sum = 0;
		// 	weightArr.forEach(function (value) {
		// 		sum += value;
		// 	})
		// 	let randomFloat = Math.random() * sum;
		// 	sum = 0;
		// 	for (let i = 0; i < weightArr.length; i++) {
		// 		sum += weightArr[i];
		// 		if (randomFloat < sum) {
		// 			item = arr[i];
		// 			break;
		// 		}
		// 	}
		// 	return item;
		// }
	}

	export function makeArrayRandom(arr: any[]) {
		for (let i = 0; i < arr.length; ++i) {
			let j = (arr.length * Math.random()) | 0;
			if (i != j)
				[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	export function isInRange(v: number, min: number, max: number) {
		return v >= min && v <= max;
	}

	/**世界坐标转屏幕坐标 */
	export function worldToScreen(worldP: tr.Vector3, screenP = new tr.Vector2(), camera = Game.inst.world.camera) {
		let vector = worldP.project(camera);
		let halfWidth = Context.stage.stageWidth / 2;
		let halfHeight = Context.stage.stageHeight / 2;

		screenP.x = vector.x * halfWidth + halfWidth
		screenP.y = -vector.y * halfHeight + halfHeight
		return screenP;
	}

	export function setColorMatrix(colorMatrix: number[], hex: number) {
		let result = Utils.hexToRGB(hex);
		colorMatrix[0] = result.r / 255;
		colorMatrix[6] = result.g / 255;
		colorMatrix[12] = result.b / 255;
		return colorMatrix;
	}

	export function newColorMatrix(hex: number) {
		let c = Utils.hexToRGB(hex);
		return [
			c.r / 255, 0, 0, 0, 0,
			0, c.g / 255, 0, 0, 0,
			0, 0, c.b / 255, 0, 0,
			0, 0, 0, 1, 0,
		];
	}

	export function hexToRGB(hex: number) {
		return {
			b: hex & 0xff,
			g: hex >> 8 & 0xff,
			r: hex >> 16 & 0xff
		}
	}

	export function pad(num, n) {
		return (Array(n).join("0") + num).slice(-n);
	}

	export function vector3From2(v: tr.Vector2, z?: number) {
		return new tr.Vector3(v.x, v.y, z || 0)
	}

	export function cross(v1: tr.Vector2, v2: tr.Vector2) {
		return v1.x * v2.y - v1.y * v2.x;
	}

	export const deepClone = obj => JSON.parse(JSON.stringify(obj));

	export function wait(duration, callBack?) {
		return new Promise((resolve, reject) => {
			egret.setTimeout(() => {
				if (callBack) callBack();
				resolve();
			}, null, duration)
		});
	}

	export function callLater(callback: () => void, time = 0) {
		egret.setTimeout(callback, null, time)
	}

	export function removeByValue(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
	}

	export function removeLog() {
		// egret.Logger.logLevel = egret.Logger.OFF
		egret.log = () => { };
	}
	export function recoverLog() {
		// egret.Logger.logLevel = egret.Logger.ALL;
		egret.log = console.log;
	}

	export function closure(method, ...args) {
		return (...params) => method.apply(null, [...args, ...params]);
	}

	export function toImageBase64(sprite: egret.DisplayObject, rect?: egret.Rectangle) {
		return new Promise<string>((resolve, reject) => {
			sprite.once("ready_2_draw", () => {
				let text = new egret.RenderTexture();
				text.drawToTexture(sprite);
				sprite.removeFromParent();
				let imageData = text.toDataURL("image/png");
				text.dispose()
				resolve(imageData)
				if (!Context.isFB) {
					let image = new Image(sprite.width, sprite.height);
					image.src = imageData;
					image.style.position = "absolute"
					image.style.left = "10px";
					image.style.top = "10px";
					document.body.appendChild(image);
					setTimeout(() => {
						image.remove();
					}, 2000);
				}
			}, this)
			Context.stage.addChildAt(sprite, 0);
			sprite.y = Context.stage.stageHeight + 10;
		})
	}

	export function getRankNumberText(n: number) {
		return n + (n == 1 ? " st" : n == 2 ? " nd" : n == 3 ? " rd" : " th");
	}
}