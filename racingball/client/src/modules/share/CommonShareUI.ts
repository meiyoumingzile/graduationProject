class CommonShareUI extends eui.Component implements eui.UIComponent {
	public constructor(private data: { bg?: string, photo?: string, rank?: string }) {
		super();
	}

	img_bg: eui.Image;
	img_head: eui.Image;
	img_mask: eui.Image;
	lbl_rank: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.onReady();

		this.data.bg && (this.img_bg.source = "");
		this.img_bg.once(egret.Event.COMPLETE, this.onReady, this)
		this.data.bg && (this.img_bg.source = this.data.bg);

		if (this.img_head) {
			this.img_head.mask = this.img_mask;
			this.img_head.source = ""
			this.img_head.once(egret.Event.COMPLETE, this.onReady, this)
			this.img_head.source = this.data.photo;
		}

		if (this.lbl_rank) {
			this.lbl_rank.text = this.data.rank;
		}
	}

	private onReady() {
		egret.setTimeout(() => {
			if (this.img_bg && !this.img_bg.texture) return;
			if (this.img_head && !this.img_head.texture) return;

			this.dispatchEventWith("ready_2_draw");

		}, null, 50);
	}
}