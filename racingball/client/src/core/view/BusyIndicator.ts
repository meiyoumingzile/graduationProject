
class BusyIndicator extends BasePopup {
	private _bmp: egret.Bitmap;
	public constructor() {
		super();
		this.animateIn = false;
		this.fullscreen = false;

		let texture = RES.getRes("loading.png");
		this._bmp = new egret.Bitmap(texture);
		this._bmp.anchorOffsetX = texture.textureWidth * .5;
		this._bmp.anchorOffsetY = texture.textureHeight * .5;
		this.addChild(this._bmp)

		this.width = this.height = 0;
	}

	$onAddToStage(stage: egret.Stage, nestLevel: number) {
		super.$onAddToStage(stage, nestLevel);
		this._bmp.alpha = 0;
		egret.Tween.get(this._bmp).to({ alpha: 1 }, 100);
		egret.Tween.get(this._bmp, { loop: true })
			.to({ rotation: 180 }, 1000)
			.to({ rotation: 360 }, 1000);
	}

	$onRemoveFromStage() {
		super.$onRemoveFromStage();
		egret.Tween.removeTweens(this._bmp);
	}
}