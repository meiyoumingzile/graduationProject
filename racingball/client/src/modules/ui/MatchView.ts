class MatchView extends BasePopup {
	public constructor() {
		super();
	}

	modalAlpha = .4;
	currentAmount = 0
	totalAmount = 12;
	gp: eui.Group;
	_done = false;

	protected childrenCreated(): void {
		super.childrenCreated();

		// app.ui.addPopup(new GameView);
		// LocalRobotData.getRobotsInfo().then(arr => {
		// 	app.status.localRobotData = arr;
		// 	Game.inst.start();
		// })

		LocalRobotData.getRobotsInfo().then(arr => {
			let robotData = app.status.localRobotData = arr;
			robotData = robotData.concat();//组合两个或多个数组
			if (Context.isFB) {
				let player = {
					id: FBInstant.player.getID(),
					name: FBInstant.player.getName(),
					photo: FBInstant.player.getPhoto(),
					me: true,
				}
				robotData.splice(Utils.randomInt(0, robotData.length), 0, player);//从xx开始，删除0个数据，插入数据player
			}
			this.totalAmount = robotData.length;
			robotData.forEach(item => {
				this.gp.addChild(new MatchItemRender(item))
			})
		})

		if (!Context.isFB) {
			setTimeout(() => {
				this.close();
				app.ui.addPopup(new GameView);
				Game.inst.start();
			}, 500)//0.5s之后执行
			return;
		};

		this.addEventListener("LoadingDone", () => {
			this.currentAmount++;
			Utils.clamp(this.currentAmount, 0, this.totalAmount);
			let percent = this.currentAmount / this.totalAmount;
			if (percent >= 1 && !this._done) {
				this._done = true;
				this.setProgress(1);
				setTimeout(() => {
					this.close();
					app.ui.addPopup(new GameView);
					Game.inst.start();
				}, 500)
			} else {
				this.setProgress(percent);
			}
		}, this);

		this.initGraphics();
	}
	img_progressbar_yellow: eui.Image;
	rect_mask: eui.Rect;
	txt_progress: eui.Label;
	initGraphics() {
		this.validateNow();

		let rect = this.rect_mask;

		this.img_progressbar_yellow.mask = rect;
	}

	/**progress from 0-1 */
	setProgress(percentage: number) {
		if (percentage < 0 || percentage > 1) {
			console.warn("parameters error");
			return;
		}
		this.txt_progress.text = "Matching  " + this.currentAmount + "/" + this.totalAmount;
		this.rect_mask.scaleX = percentage;
	}

}