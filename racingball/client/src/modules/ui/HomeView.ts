class HomeView extends BasePopup {
	public constructor() {
		super();
	}
	modalAlpha = .4;
	vconsole_switcher: eui.Rect;

	img_logo: eui.Image;
	txt_star_amount: eui.Label;
	btn_audio: eui.Button;
	btn_game: eui.Button;
	btn_single: eui.Button;
	btn_friendly: eui.Button;
	btn_rank: eui.Button;
	btn_skin: eui.Button;
	btn_rare: eui.Button;
	gp_btns: eui.Group;
	gp_game: eui.Group;
	// img_game: eui.Image;
	// img_game_mask: eui.Image;
	btn_clear: eui.Button;
 	gp_dev_tools: eui.Group;
	txt_level: eui.TextInput;
	txt_go: eui.Label;
	gp_notify_skin: eui.Group;
	txt_notify_skin: eui.Label;
	gp_notify_invite: eui.Group;
	txt_notify_invite: eui.Label;
	bestGrade: eui.Label;
	ticker: number;
	timeCnt: number;

	gp_friends:eui.Group;
	gp_play:eui.Group;
	sc_friends:eui.Scroller;
	dg_friends:eui.DataGroup;

	protected async childrenCreated(){
		super.childrenCreated();
		//app.pp.cleanData();
		//app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
		
		this.bestGrade.text="BEST\n"+Math.round(app.pp.starCount);
		var tw = egret.Tween.get( this.btn_friendly, { loop:true} );
		tw.to( 0, 0 ).call( function(){ this.scaleX= 1; this.scaleY= 1;} ).wait(2000 );
		var sc:number[]=[-0.1,0.05,-0.03,0.05,-0.03];
		for(var i=0;i<5;i++){
			tw.to( {scaleX: 1.0+sc[i], scaleY: 1.0-sc[i]}, 100-i*10 )
				.to({scaleX: 1, scaleY: 1}, 55)
		}
		let friendRankList: FBInstant.LeaderboardEntry[] = app.status.friendRankList || await app.platform.getFriendRankList();
		let arr: RankPlayerVO[] = [];
		friendRankList.map((value) => {
			var player=RankPlayerVO.createFromLeaderBoardEntry(value)
			if(player.id!=app.platform.id())
				arr.push(player);
		})
		GameView.sortByScore(arr,0,arr.length-1,(a,b)=>{
			return a.score>b.score;
		});
		this.dg_friends.dataProvider = new eui.ArrayCollection(arr);
		/*this.dg_friends.dataProvider = new eui.ArrayCollection([
			{name:"fuck1",photo:"default_portrait.png"},
			{name:"fuck2",photo:"default_portrait.png"},
			{name:"fuck3",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
			{name:"fuck4",photo:"default_portrait.png"},
		])*/

		let loadingView = app.ui.getPopup(LoadingView);
		loadingView && app.ui.rmPopup(loadingView);

		this.gp_dev_tools.visible = app.storager.get('vconsole') === 'show';
		this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			app.pp.cleanData();
		}, this)
		this.txt_go.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			let level = parseInt(this.txt_level.text);//将字符串转化为整数
			if (level < 1 || isNaN(level)) {
				egret.log("Invalid parameter!");
				return;
			}
			app.pp.currentLevel = level;
			app.pp.pushData();
			Game.inst.resetLevel(level);
		}, this)


		//this.refreshNotify();//刷新界面，是否有新皮肤或者新邀请
		//filter()返回满足回调函数中指定条件的数组元素
		let skins_star = app.status.skinItemData.filter(v => v.price.type === 2).map(i => i.id);
		let index = 1;
		const time = 800;
		Utils.makeArrayRandom(skins_star);
		this.btn_rare.icon = app.status.skinItemData[skins_star[0] - 1].thumb;

		this.ticker = egret.setInterval(() => {
			if (index === skins_star.length) {
				Utils.makeArrayRandom(skins_star);
				index = 0;
			}
			this.btn_rare.icon = app.status.skinItemData[skins_star[index] - 1].thumb;
			index++;
		}, this, time);

		this.txt_star_amount.text = app.pp.starCount + "";
		// this.img_game.mask = this.img_game_mask;
		// this.img_game.source = "bump.jpg";

		this.img_logo.scale = Constant.FullWidthScale;
		this.gp_play.scale = Constant.FullWidthScale;
		this.gp_btns.scale=Constant.FullWidthScale;
		(this.gp_btns.layout as eui.HorizontalLayout).gap = (this.stage.stageWidth - this.btn_rank.width * this.gp_btns.numChildren) / this.gp_btns.numChildren;

		this.btn_single.addEventListener("touchTap", () => {
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnPlay" });
			this.close();
			// app.ui.addPopup(new MatchView);
			//Game.inst.start();
			app.notify(AppConstant.Notify.enter_game);
		}, this);
		
		this.btn_friendly.addEventListener("touchTap", () => {
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnPlay" });
			Common.invite().then(() => {
				this.close();
				// app.ui.addPopup(new MatchView);
				app.notify(AppConstant.Notify.enter_game);
			})
		}, this);

		// this.gp_game.addEventListener("touchTap", () => {
		// 	app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 0 });
		// 	app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnOtherGame" });
		// 	let bo = app.platform.switchGame("274629043216304");
		// 	if (bo) {
		// 		app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 1 });
		// 	} else {
		// 		app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 2 });
		// 	}
		// }, this);

		this.btn_rank.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new RankView);
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnRank" });
		}, this);

		this.btn_skin.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new SkinView);
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnSkin" });
		}, this);

		this.btn_rare.addEventListener("touchTap", () => {
			/*this.close();
			app.ui.addPopup(new InviteView);
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnInviteSkin" });
			*/
			this.onTapShare();
		}, this);

		this.btn_audio.addEventListener("touchTap", () => {
			AudioPlayer.setMute(!AudioPlayer.isMute());
			this.updateAudioBtn();
		}, this);
		this.updateAudioBtn();

		//判断是否移动端环境,移动声音按钮位置
		if (!egret.Capabilities.isMobile) {
			this.btn_audio.top = 40;
		}

		Game.inst.complete && Game.inst.resetLevel(app.pp.currentLevel);

		// Context.isFB && RES.getResByUrl(FBInstant.player.getPhoto()) //缓存头像

		/** vConsole */
		this.vconsole_switcher.touchEnabled = true;
		let tapped = 0;
		this.vconsole_switcher.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (++tapped > 9) {
				tapped = 0;
				if (app.storager.get('vconsole') !== 'show') {
					app.storager.set('vconsole', 'show');
					window['vconsole'].showSwitch();
					Utils.recoverLog();
					this.gp_dev_tools.visible = true;
				} else {
					app.storager.rm('vconsole');
					window['vconsole'].hideSwitch();
					Utils.removeLog();
					this.gp_dev_tools.visible = false;
				}
			}
		}, this);
	}

	private updateAudioBtn() {
		(this.btn_audio.getChildAt(0) as eui.Image).source = !AudioPlayer.isMute() ? "home-btn-audio-off.png" : "home-btn-audio-on.png";
	}

	listResponse(): number[] {
		return [AppConstant.Notify.refresh_invite_count];
	}

	doResponse(name: number, data?: any) {//有新的皮肤或者邀请时点击的话提示消失
		if (name === AppConstant.Notify.refresh_invite_count) {
			this.refreshNotify();
		}
	}
	refreshNotify() {
		if (app.pp.newStarSkinAmount) {
			this.gp_notify_skin.visible = true;
			this.txt_notify_skin.text = app.pp.newStarSkinAmount + "";
		}
		if (app.pp.checkNewInviteSkin()) {
			this.gp_notify_invite.visible = true;
			this.txt_notify_invite.text = app.pp.newInviteSkinAmount + "";
		}
	}

	
	onExit() {
		super.onExit();
		egret.Tween.removeAllTweens();
		egret.clearInterval(this.ticker);
	}

	/*private _timeLine:.TimeLine;
    private startShake(){
		
        if(!this._timeLine){
			var timeLine:egret.Timer = new egret.Timer(500,1);
            timeLine
            .addLabel("shake0", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 2000)
            .addLabel("shake", 0).to(this.owner, {scaleX: 0.9, scaleY: 1.1}, 100)
            .addLabel("shake1", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 55)
            .addLabel("shake2", 0).to(this.owner, {scaleX: 1.05, scaleY: 0.95}, 80)
            .addLabel("shake3", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 55)
            .addLabel("shake4", 0).to(this.owner, {scaleX: 0.97, scaleY: 1.02}, 60)
            .addLabel("shake5", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)
            .addLabel("shake6", 0).to(this.owner, {scaleX: 1.05, scaleY: 0.95}, 50)
            .addLabel("shake7", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)
            .addLabel("shake8", 0).to(this.owner, {scaleX: 0.97, scaleY: 1.03}, 40)
            .addLabel("shake9", 0).to(this.owner, {scaleX: 1, scaleY: 1}, 40)


            this._timeLine = timeLine;
        }

        // this._timeLine.offAllCaller(this);
        // this._timeLine.once(Laya.Event.COMPLETE, this, ()=>{
        //     Laya.timer.once(2500,this,()=>{
        //         this.startShake();
        //     })
        // })
        this._timeLine.play(0,true);
    }*/

	async onTapShare() {
		await ShareHelper.sendGenericUpdate(true);
		app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnShare" });
	}
}