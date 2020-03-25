class InvitePortraitItemRender extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}

	img_portrait_mask: eui.Image;
	img_portrait: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventListener("touchTap", this.onTapInvite, this)

		this.img_portrait.mask = this.img_portrait_mask;
	}

	protected dataChanged() {
		super.dataChanged();
		if (!this.data) return;
		this.removeEventListener("touchTap", this.onTapInvite, this);


		this.img_portrait.source = this.data;

	}
	async onTapInvite() {
		egret.log("sendGenericUpdate");
		ShareHelper.sendGenericUpdate(true, {
			invite_skin_data: { playerId: app.platform.id(), skinId: 0 }
		});
	}
}