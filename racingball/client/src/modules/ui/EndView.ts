class EndView extends BasePopup {
	public constructor() {
		super();
	}
	modalAlpha = .4;

	btn_home: eui.Button;
	txt_star_amount: eui.Label;

	txt_rank1: eui.Label;
	img_rank1_mask: eui.Image;
	img_rank1: eui.Image;
	txt_rank2: eui.Label;
	img_rank2_mask: eui.Image;
	img_rank2: eui.Image;
	txt_rank3: eui.Label;
	img_rank3_mask: eui.Image;
	img_rank3: eui.Image;

	txt_rank: eui.Label;
	txt_star_plus: eui.Label;
	lb_scores_end: eui.Label;

	btn_play: eui.Button;
	btn_rank: eui.Button;
	btn_rare: eui.Button;
	btn_skin: eui.Button;
	btn_friendly_end: eui.Button;
	btn_home_end: eui.Button;
	btn_skin_end: eui.Button;
	// img_game: eui.Image;
	// img_game_mask: eui.Image;
	gp_notify_skin: eui.Group;
	txt_notify_skin: eui.Label;
	gp_notify_invite: eui.Group;
	txt_notify_invite: eui.Label;
	gp_btns: eui.Group;
	gp_play: eui.Group;
	dg_friends:eui.DataGroup;
	gp_friends:eui.Group;
	
	rankCells: {
		lbl: eui.Label;
		img: eui.Image;
	}[]
	ticker: number;
	rank: number;

	protected async childrenCreated() {
		super.childrenCreated();
		this.gp_play.scale = Constant.FullWidthScale;
		this.gp_friends.scale= Constant.FullWidthScale;
		var tw = egret.Tween.get( this.btn_friendly_end, { loop:true} );
		tw.to( 0, 0 ).call( function(){ this.scaleX= 1; this.scaleY= 1;} ).wait(2000 );
		var sc:number[]=[-0.1,0.05,-0.03,0.05,-0.03];
		for(var i=0;i<5;i++){
			tw.to( {scaleX: 1.0+sc[i], scaleY: 1.0-sc[i]}, 100-i*10 )
				.to({scaleX: 1, scaleY: 1}, 55)
		}
		this.lb_scores_end.text=Math.round(Math.abs(Game.inst.player.group.position.z))+"";
		let friendRankList: FBInstant.LeaderboardEntry[] = app.status.friendRankList || await app.platform.getFriendRankList();
		let arr: RankPlayerVO[] = [];
		friendRankList.map((value) => {
			arr.push(RankPlayerVO.createFromLeaderBoardEntry(value));
		})
		GameView.sortByScore(arr,0,arr.length-1,(a,b)=>{
			return a.score>b.score;
		});
		this.dg_friends.dataProvider = new eui.ArrayCollection(arr);

	//	(this.gp_btns.layout as eui.HorizontalLayout).gap = (this.stage.stageWidth - this.btn_rank.width * this.gp_btns.numChildren) / this.gp_btns.numChildren;

	//	this.playAnimate();

		/*//let skins_star = app.status.skinItemData.filter(v => v.price.type === 2).map(i => i.id);
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
		*/
		//this.img_rank1.mask = this.img_rank1_mask;
		//this.img_rank2.mask = this.img_rank2_mask;
		//this.img_rank3.mask = this.img_rank3_mask;

	/*	this.rankCells = [{
			lbl: this.txt_rank1,
			img: this.img_rank1,
		}, {
			lbl: this.txt_rank2,
			img: this.img_rank2,
		}]
		let players = Game.inst.robotCtr.ranks;
		this.rankCells.forEach((cell, i) => {
			let info = players[i];
			if (info instanceof Player) {
				cell.lbl.text = app.platform.name();
				cell.img.source = app.platform.photo();
			} else {
				cell.lbl.text = (info as Robot).robotInfo.name;
				cell.img.source = (info as Robot).robotInfo.photo;
			}
		});
		this.rank = Game.inst.player.rank + 1;

		// this.img_game.mask = this.img_game_mask;
		// this.img_game.source = "bump.jpg";

		this.txt_star_amount.text = app.pp.starCount + "";

		this.txt_rank.text = Utils.getRankNumberText(this.rank);
		if (this.rank < Constant.starAmount.length) {
			this.txt_star_amount.text = app.pp.starCount - Constant.starAmount[this.rank] + "";
			this.txt_star_plus.text = "+" + Constant.starAmount[this.rank];
		} else {
			this.txt_star_plus.text = "+0";
		}

		// this.gp_game.addEventListener("touchTap", () => {
		// 	app.platform.logEvent(Log.EventType.ChangeGame, { type: app.status.playerType, result: 0 });
		// 	app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnOtherGame" });
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
			app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnRank" });
		}, this);

		this.btn_rare.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new InviteView);
			app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnInviteSkin" });
		}, this);

		this.btn_skin.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new SkinView);
			app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnSkin" });
		}, this);

		this.btn_play.addEventListener("touchTap", () => {
			app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnPlay" });
			// Common.invite().then(() => {
			// 	this.close();
			// 	app.ui.addPopup(new MatchView);
			// });
			this.close();
			// app.ui.addPopup(new MatchView);
			// app.notify(AppConstant.Notify.enter_game);
			app.notify(AppConstant.Notify.enter_game);

			//choose friend
		}, this);
		*/

		this.btn_home_end.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new HomeView);
			app.platform.logEvent(Log.EventType.SettlementClick, { type: app.status.playerType, source: "btnHome" });
		}, this);
		this.btn_skin_end.addEventListener("touchTap", () => {
			this.close();
			app.ui.addPopup(new SkinView);
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnSkin" });
		}, this);
		this.btn_friendly_end.addEventListener("touchTap", () => {
			app.platform.logEvent(Log.EventType.HomeClick, { type: app.status.playerType, source: "btnPlay" });
			Common.invite().then(() => {
				this.close();
				// app.ui.addPopup(new MatchView);
				app.notify(AppConstant.Notify.enter_game);
			})
		}, this);

	//	ShareHelper.sendResultUpdate(this.rank);
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
		Game.inst.resetLevel(app.pp.currentLevel);
	}
	img_podium: eui.Image;
	gp_rank1_portrait: eui.Group;
	gp_rank2_portrait: eui.Group;
	gp_rank3_portrait: eui.Group;
	img_crown: eui.Image;
	// gp_game: eui.Group;
	gp_rank: eui.Group;
	gp_star: eui.Group;
	gp_star_amount: eui.Group;
	playAnimate() {
		egret.Tween.get(this.img_podium).wait(100).to({ scale: 1.3 }, 167).to(({ scale: 0.8 }), 120).to(({ scale: 1.2 }), 120).to(({ scale: 1 }), 120);

		egret.Tween.get(this.gp_rank3_portrait).wait(750).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);
		egret.Tween.get(this.txt_rank3).wait(750).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);
		egret.Tween.get(this.gp_rank2_portrait).wait(833).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);
		egret.Tween.get(this.txt_rank2).wait(833).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);
		egret.Tween.get(this.gp_rank1_portrait).wait(917).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);
		egret.Tween.get(this.txt_rank1).wait(917).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);

		egret.Tween.get(this.img_crown).wait(1333).to({ alpha: 1, y: -30 }, 500);

		egret.Tween.get(this.btn_play).wait(2000).to({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 167).to({ scale: 0.9 }, 167).to({ scale: 1 }, 167);

		// egret.Tween.get(this.gp_game).wait(2500).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 83).to({ scale: 0.9 }, 83).to({ scale: 1 }, 83);
		egret.Tween.get(this.btn_rank).wait(2667).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 83).to({ scale: 0.9 }, 83).to({ scale: 1 }, 83);
		egret.Tween.get(this.btn_skin).wait(2833).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 83).to({ scale: 0.9 }, 83).to({ scale: 1 }, 83);
		egret.Tween.get(this.btn_rare).wait(3000).set({ alpha: 1, scale: 0.1 }).to({ scale: 1.1 }, 83).to({ scale: 0.9 }, 83).to({ scale: 1 }, 83)
			.call(this.refreshNotify, this);

		egret.Tween.get(this.gp_rank).wait(3167).to({ scale: 1, alpha: 1 }, 180).call(this.playStarAnimation, this);

	}
	image: eui.Image;
	image0: eui.Image;
	image1: eui.Image;
	image2: eui.Image;
	image3: eui.Image;
	image4: eui.Image;
	image5: eui.Image;
	image6: eui.Image;
	image7: eui.Image;
	image8: eui.Image;
	gp_star_animation: eui.Group;
	destination: number[] = [];
	playStarAnimation() {
		this.gp_star_animation.alpha = 1;
		this.validateNow();
		this.gp_star_animation.x = (this.stage.stageWidth - this.gp_star_animation.width) / 2;
		this.destination.push(this.gp_star_amount.x - this.gp_star_animation.x, this.gp_star_amount.y - this.gp_star_animation.y);

		let vg = { v: app.pp.starCount - Constant.starAmount[this.rank] };
		egret.Tween.get(vg, {
			onChange: () => {
				this.txt_star_amount.text = Math.round(vg.v) + "";
			}
		}).wait(700).to({
			v: app.pp.starCount
		}, 200);

		egret.Tween.get(this.image).to({ x: 21, y: 86 }, 150).to({ x: 32, y: 25 }, 350).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image0).to({ x: 29, y: 45 }, 150).to({ x: 45, y: 14 }, 200).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image1).to({ x: 62, y: 39 }, 150).to({ x: 77, y: 5 }, 450).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 300);
		egret.Tween.get(this.image2).to({ x: 31, y: 106 }, 150).to({ x: 53, y: 42 }, 600).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image3).to({ x: 39, y: 64 }, 150).to({ x: 52, y: 17 }, 850).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image4).to({ x: 38, y: -27 }, 150).to({ x: 50, y: -47 }, 200).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image5).to({ x: 30, y: -39 }, 150).to({ x: 55, y: -74 }, 350).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image6).to({ x: 30, y: -55 }, 150).to({ x: 75, y: 35 }, 450).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.image7).to({ x: 42, y: -52 }, 150).to({ x: 60, y: -76 }, 800).to({ x: this.destination[0], y: this.destination[1], alpha: 0 }, 250);
		egret.Tween.get(this.gp_star).to({ scale: 1.2, alpha: 1 }, 150).to({ scale: 1 }, 100).wait(1250).to({ alpha: 0 }, 150);


	}
}