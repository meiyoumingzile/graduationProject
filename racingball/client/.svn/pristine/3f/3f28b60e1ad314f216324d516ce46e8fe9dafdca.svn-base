class MatchItemRender extends eui.ItemRenderer implements eui.UIComponent {
	public constructor(public data: RobotInfo) {
		super();
	}
	// private _imgReady = false;
	ticker: Ticker;
	img_loading: eui.Image;
	img_portrait: eui.Image;
	img_portrait_mask: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.img_portrait.mask = this.img_portrait_mask;
		this.img_portrait.visible = false;
		this.img_loading.visible = true;

		this.img_portrait.source = "";
		Promise.race([
			Promise.all([
				Utils.wait(this.data && this.data["me"] ? 50 : Utils.randomRange(this._min_waiting_time, Constant.MatchingTime)),
				new Promise(resolve => {
					this.img_portrait.once(egret.Event.COMPLETE, resolve, this);
				}),
			]),
			Utils.wait(Constant.MatchingTime)
		]).then(() => {
			this.img_loading.visible = false;
			this.img_portrait.visible = true;
			this.ticker.stop();
			this.dispatchEventWith("LoadingDone", true);
		})

		this.img_portrait.source = this.data.photo;

		this.ticker = new Ticker(this.update, this, 150);
		this.ticker.start();
	}

	private _min_waiting_time = 500;
	update() {
		this.img_loading.rotation += 45;
	}
}