class WorldRankItemRender extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}



	txt_rank: eui.Label;
	txt_name: eui.Label;
	img_bar: eui.Image;
	img_skin: eui.Image;

	img_portrait: eui.Image;
	img_portrait_mask: eui.Image;
	img_portrait_bg: eui.Image;
	img_rank_bg: eui.Image;
	txt_score: eui.Label;

	data: RankPlayerVO;

	private initialized = false;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.initialized = true;

		this.img_portrait.mask = this.img_portrait_mask;
	}

	protected dataChanged() {
		if (!this.initialized) return;
		if (!this.data) return;

		this.img_bar.width = Constant.FullWidthScale * 581;

		let rank = this.itemIndex + 1;
		this.txt_rank.text = this.data.originalRank + "";


		if (rank === 1) {
			this.img_bar.source = "rank-bar-champion.png";
			this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
			this.img_rank_bg.source = "rank-rank" + rank + ".png";
			this.txt_name.textColor = 0xffffff;
			this.txt_score.stroke = 2;
			this.txt_score.strokeColor = 0xFFB701;
		}

		if (rank === 2) {
			this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
			this.img_rank_bg.source = "rank-rank" + rank + ".png";
			this.txt_score.stroke = 2;
			this.txt_score.strokeColor = 0xEF8033;
		}

		if (rank === 3) {
			this.img_portrait_bg.source = "rank-portrait-rank" + rank + ".png";
			this.img_rank_bg.source = "rank-rank" + rank + ".png";
			this.txt_score.stroke = 2;
			this.txt_score.strokeColor = 0xEF492F;
		}

		if (this.data["bg"]) {
			this.img_bar.source = this.data["bg"];
		}
		if (this.data["name_color"]) {
			this.txt_name.textColor = this.data["name_color"];
		}

		this.img_portrait.source = this.data.photo;
		this.txt_name.text = this.data.name;
		this.txt_score.text = this.data.score + "";

		let skin = app.status.skinItemData[this.data.skin - 1].thumb;
		skin && (this.img_skin.source = `resource/assets/skin/${skin}`);

		// // 是自己的这条数据，play=>share
		// if (this.data.id === app.platform.id()) {
		// 	this.btn_play.visible = false;
		// 	this.btn_share.visible = true;
		// }

		// this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
		// 	this.onTapPlay();
		// }, this)
		// this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
		// 	this.onTapShare();
		// }, this)
	}

}