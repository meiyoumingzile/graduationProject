class ReviveView extends BasePopup {
	public constructor(private rank: number, private progress: number) {
		super();
	}
	modalAlpha = .4;

	txt_ranking: eui.Label;
	img_progressbar_black: eui.Image;
	img_progressbar_yellow: eui.Image;
	img_wheel: eui.Image;

	txt_percent: eui.Label;
	img_revive: eui.Image;
	btn_continue: eui.Button;
	group_nothanks: eui.Group;
	nothanksTimer: number;
	group_revive: eui.Group;
	gp_play: eui.Group;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.group_revive.scale=Constant.FullWidthScale;
		this.gp_play.scale=Constant.FullWidthScale;
		this.group_nothanks.touchEnabled = false;
		this.group_nothanks.visible = false;
		this.nothanksTimer = egret.setTimeout(() => {
			this.group_nothanks.visible = true;
			this.group_nothanks.alpha = 0;

			egret.Tween.get(this.group_nothanks)
				.to({ alpha: .6 }, 1000)
				.call(() => {
					this.group_nothanks.touchEnabled = true;
				});

		}, this, 1500)

		this.img_revive.addEventListener("touchTap", this.revive, this);
		this.btn_continue.addEventListener("touchTap", this.revive, this);
		this.group_nothanks.addEventListener("touchTap", () => {
			AudioPlayer.stopMusic();
        	Game.inst.complete = true;
		//	app.pp.starCount += Constant.starAmount[Game.inst.player.rank + 1];
			app.pp.checkNewSkin();
			let lvl = app.pp.currentLevel;
			if (app.pp.currentLevel < 10 || ++Game.inst._levelCompleteTimes >= 2) {
				Game.inst._levelCompleteTimes = 0;
				app.pp.currentLevel++;
				app.pp.pushData();
			}
			Game.inst.player.slowDown();
			Game.inst.robotCtr.allSlowDown();
			
			app.platform.updateScore(Math.round(app.pp.starCount), JSON.stringify({ skin: app.pp.currentSkinID })).then(() => { RankCtr.loadLeaderBoardAsync() });
			//更新服务器的score数据
            Game.inst.stop();
            ReviveView!=null&&app.ui.getPopup(ReviveView).close();
			GameView!=null&&app.ui.getPopup(GameView).close();
			app.ui.addPopup(new EndView());
			//this.goHome();
			//app.platform.logEvent(Log.EventType.ReviveClick, { type: app.status.playerType, source: "btnNoThanks" });
		}, this);

		this.txt_ranking.text = Utils.getRankNumberText(this.rank);
		this.txt_percent.text = Math.floor(this.progress * 100) + "%";

		// egret.Tween.get(this.img_wheel, { loop: true }).to({ rotation: 360 }, 1500);

		this.initGraphics();
		this.changeGraphics();
		this.setProgress(this.progress);
		// let percent = 0;
		// let timer = egret.setInterval(() => {
		// 	this.setProgress(percent);
		// 	percent += .001
		// 	if (percent > 1) {
		// 		egret.clearInterval(timer);
		// 	}
		// }, this, 10)
	}

	_slideDistance: number = 428 * 1.13;
	// group_progressbar: eui.Group;
	gp_revive: eui.Group;
	img_greenbg: eui.Image;
	private _shape: egret.Shape;
	private rect: egret.Shape;
	initGraphics() {
		this.validateNow();

		var shape: egret.Shape = this._shape = new egret.Shape();
		shape.x = this.group_revive.x + this.group_revive.width / 2;
		shape.y = this.group_revive.y + this.group_revive.height / 2;
		this.addChild(shape);

		let rect = this.rect = new egret.Shape();
		// rect.x = this.group_progressbar.x - this.group_progressbar.width;
		// rect.y = this.group_progressbar.y;
		rect.graphics.clear();

		rect.graphics.beginFill(0x00ffff, 1);
		// rect.graphics.drawRect(0, 0, this.group_progressbar.width, this.group_progressbar.height);
		this.addChild(rect);

		this.img_greenbg.mask = shape;
		this.img_progressbar_yellow.mask = rect;
	}

	ticker: Ticker;
	//轻触修改属性
	private changeGraphics(): void {
		let shape: egret.Shape = this._shape;

		let anglePerMillisecond = 360 / Constant.ReviveTime;
		let angle: number = 0;
		this.ticker = new Ticker((dt) => {
			changeGraphics(angle);
			angle += dt * anglePerMillisecond;
			if (angle > 360) {
				this.ticker.stop();
				this.img_greenbg.visible = false;
				this.goHome();
			}
		}, this);
		this.ticker.start();

		function changeGraphics(angle: number): void {
			shape.graphics.clear();

			shape.graphics.beginFill(0x00ffff, 1);
			shape.graphics.moveTo(0, 0);
			shape.graphics.lineTo(200, 0);
			shape.graphics.drawArc(0, 0, 200, -90 * Math.PI / 180, -90 * Math.PI / 180 + angle * Math.PI / 180, true);
			shape.graphics.lineTo(0, 0);
			shape.graphics.endFill();
		}
	}

	/**progress from 0-1 */
	setProgress(percentage: number) {
		if (percentage < 0 || percentage > 1) {
			console.warn("parameters error");
			return;
		}
		// this.rect.x = this.group_progressbar.x - this.group_progressbar.width + this._slideDistance * percentage;
		this.img_wheel.x = this._slideDistance * percentage;
	}

	revive() {
		app.platform.logEvent(Log.EventType.ReviveClick, { type: app.status.playerType, source: "btnContinue" });
		this.ticker.stop();
		if (app.ad.hasRAD()) {
			Common.showRAD('adRevive', () => {
				let gameView = app.ui.getPopup(GameView);
				if (gameView) {
					// gameView.group_progressbar.visible = true;
					gameView.txt_ranking.visible = true;
				}
				this.close();
				Game.inst.revive();
			}, () => { this.ticker.start(); });
		}
	}

	goHome() {
		this.close();
		Game.inst.resetLevel(app.pp.currentLevel);
		Game.inst.stop();
		app.ui.getPopup(GameView).close();
		app.ui.addPopup(new HomeView);
		Common.tryPlayAD();

		app.platform.logEvent(Log.EventType.GameOver, { type: app.status.playerType, level: app.pp.currentLevel, result: 1 })
	}

	onExit() {
		super.onExit();
		egret.Tween.removeAllTweens();
		this.ticker.stop();
		egret.clearTimeout(this.nothanksTimer);
	}
}