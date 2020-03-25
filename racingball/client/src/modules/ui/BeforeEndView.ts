class BeforeEndView extends BasePopup {
	public constructor() {
		super();
		this.autoClose = true;
		this.fullscreen = false;
		this.modalAlpha = .6;
	}
	btn_close: eui.Button;
	btn_invite: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();

		// this.stage.addEventListener("touchBegin", (e: egret.TouchEvent) => {
		// 	if (e.target !== this.btn_invite) {
		// 		this.close();
		// 		app.ui.addPopup(new EndView(Game.inst.player.rank));
		// 	}
		// }, this);

		this.btn_invite.addEventListener("touchTap", this.onTapInvite, this);
	}
	async onTapInvite() {
		console.log("onTapInvite");
		// app.platform.logEvent(Log.EventType.InviteGetSkin, { type: app.status.playerType, result: 0 });
		await ShareHelper.sendGenericUpdate(true, {
			invite_skin_data: { playerId: app.platform.id(), skinId: 0 }
		});
		await Utils.wait(200);
		this.close();
		// app.ui.addPopup(new EndView(Game.inst.player.rank));
	}
	onExit() {
		app.ui.addPopup(new EndView());
	}

}