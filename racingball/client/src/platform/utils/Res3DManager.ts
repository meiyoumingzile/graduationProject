class Res3DManager {
	private static imgLoader_: tr.ImageLoader;
	private static fbxLoader_: tr.FBXLoader;
	private static loadImage(url: string) {
		let name = url.match(/[\w-_]+\.\w+/)[0];
		return new Promise<void>(resolve => {
			this.imgLoader_.load(url, img => {
				this.textures_[name] = img;
				resolve(null);
			}, undefined, e => {
				egret.log("Res3DManager load tex error", e);
				resolve(null);
			})
		});
	}

	private static loadFBX(url: string) {
		let name = url.match(/[\w-_]+\.\w+/)[0];
		return new Promise<void>(resolve => {
			this.fbxLoader_.load(url, group => {
				this.fbxs_[name] = group;
				resolve(null);
			}, undefined, e => {
				egret.log("Res3DManager load fbx error", e);
				resolve(null);
			})
		});
	}

	private static textures_: { [k: string]: HTMLImageElement };
	private static fbxs_: { [k: string]: tr.Group };
	static init() {
		this.textures_ = {};
		this.fbxs_ = {};
		this.imgLoader_ = new tr.ImageLoader();
		this.fbxLoader_ = new tr.FBXLoader();
	}

	static root = "resource/assets/";
	static preload(onProgress: (n: number) => void, ...urls: string[]) {
		let promise = Promise.resolve();
		let count = urls.length;
		urls.forEach((url: string, index: number) => {
			promise = promise.then(() => {
				onProgress && onProgress(index / count);
				return url.slice(url.length - 4) === ".fbx" ? this.loadFBX(this.root + url) : this.loadImage(this.root + url)
			});
		})
		return promise.then(resolve => {
			onProgress && onProgress(1);
		});
	}

	static getImage(name: string): HTMLImageElement {
		return this.textures_[name];
	}

	static getFBX(name: string) {
		return this.fbxs_[name];
	}

	static getMeshFromFBX(name: string, fbx: string) {
		return this.getFBX(fbx).children.find(m => m.name == name) as tr.Mesh;
	}

	static async getFBXAsync(name: string) {
		egret.log("waiting fbx:", name);
		while (!this.fbxs_[name]) {
			await Utils.wait(300);
		}
		egret.log("fbx ok:", name);
		return this.fbxs_[name];
	}

	static createTexture(name: string, anisotropy = 1): tr.Texture {
		let img = this.textures_[name];
		if (!img) egret.log("doesn't find tex:", name);
		let tex = new tr.Texture(img);
		var isJPEG = name.search(/\.(jpg|jpeg)$/) > 0;// || name.search( /^data\:image\/jpeg/ ) === 0;
		tex.format = isJPEG ? tr.RGBFormat : tr.RGBAFormat;
		tex.needsUpdate = true;
		tex.anisotropy = anisotropy;
		return tex;
	}

	static async createTextureAsync(name: string) {
		while (!this.textures_[name]) {
			await Utils.wait(200);
		}
		return this.createTexture(name);
	}
}