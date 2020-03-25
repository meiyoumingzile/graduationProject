class BasePopup extends BaseUI {

	autoClose = false;//自动关闭
	modal = true;//黑色背景
	modalAlpha = .6;
	animateIn = true;//切换动画
	fullscreen = true;
	center = true;
	
	btn_close: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();

		if (this.btn_close) {
			this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		}
	}

	fadeIn() {
		// this.y = -1440;

		// this.btn_play.horizontalCenter = -640;
		// this.btn_close.horizontalCenter = 640;

		// egret.setTimeout(()=>{
		// 	egret.Tween.get(this.btn_play).to({ horizontalCenter: 0}, 400, egret.Ease.quadIn);
		// 	egret.Tween.get(this.btn_close).to({ horizontalCenter: 0}, 400, egret.Ease.quadIn);
		// }, null, 200);

		this.alpha = 0;
		return egret.Tween.get(this).to({
			alpha:1
		}, 400, egret.Ease.quadOut)
	}

	close() {
		this.dispatchEventWith(egret.Event.CLOSE);
	}
}