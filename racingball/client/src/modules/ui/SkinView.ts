interface ISkinRenderData {
	thumb: string,
	id: number
}
class SkinView extends BasePopup {
	public constructor() {
		super();
	}
	show_ex:eui.Group;
	lb_ex:eui.Label;
	nowimg:eui.Image;
	img_skin:eui.Image;
	nowimg_notice:eui.Label;
	btn_home: eui.Button;
	btn_ad: eui.Button;
	btn_play: eui.Button;
	btn_friends: eui.Button;
	btn_video: eui.Button;
	btn_star: eui.Button;
	btn_star_count: eui.Button;

	pageViewContr: PagesViewController;
	pages: ISkinRenderData[][] = [];
	gp_skin: eui.Group;
	private _selected_item: ISkinRenderData;
	list_page_indicator: eui.List;
	sc_skins: eui.Scroller;

	protected childrenCreated(): void {
		super.childrenCreated();
		app.pp.newStarSkinAmount = 0;
		app.pp.pushData();
		app.pp.checkNewSkin();
		this.gp_skin.scale= Constant.FullWidthScale;
		this.img_skin.scale= Constant.FullWidthScale;
		this.btn_home.addEventListener("touchTap", this.onTapHome, this);
		this.btn_video.addEventListener("touchTap", this.onTapVideo, this);
		this.btn_star.addEventListener("touchTap", this.onTapStar, this);
		this.btn_play.addEventListener("touchTap", () => {
			// Common.invite().then(() => {
			// 	this.close();
			// 	app.ui.addPopup(new MatchView);
			// });
			this.close();
			// app.ui.addPopup(new MatchView);
			app.notify(AppConstant.Notify.enter_game);
		}, this);
		this.btn_ad.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			Common.showRAD('adSkin', this.successInBuySkin.bind(this));
		}, this);
		this.btn_friends.addEventListener("touchTap", this.onTapShare, this);
		let skins = app.status.skinItemData.filter(v => v.price.type <3).sort((a, b) => (a.order - b.order)).map(i => i.id);
		let skins_star = app.status.skinItemData.filter(v => v.price.type === 3).sort((a, b) => (a.order - b.order)).map(i => i.id);

		
		skins = skins.concat(skins_star);
		const skinRenderData: ISkinRenderData[] = skins.map(id => ({id,
			thumb: app.status.skinItemData[id - 1].thumb
		}));

		const skinsNum = skins.length;
		const pagesNum = Math.ceil(skinsNum / 9);
		for (let i = 0; i < skinsNum; i++) {
			let idx = Math.floor(i / 9);
			this.pages[idx] || (this.pages[idx] = []);
			this.pages[idx].push(skinRenderData[i]);
		}

		for (let page of this.pages) {
			let list = this.createSkinList(page);
			list.allowMultipleSelection = false;
			list.width = this.gp_skin.width;
			list.height = this.gp_skin.height;
			list.addEventListener(egret.Event.CHANGING, (e: egret.Event) => {
				let item = list.selectedItem;
				let ac = list.dataProvider as eui.ArrayCollection;
				ac.itemUpdated(item);
				ac.itemUpdated(this._selected_item);
				this.onSkinSelected(item);

			}, this)
			this.gp_skin.addChild(list);
		}

		this.list_page_indicator.dataProvider = new eui.ArrayCollection(this.pages);

		this.pageViewContr = new PagesViewController(this.sc_skins, (index: number) => {
			this.onPageChanged(index);
		})
		const idx = skins.indexOf(app.pp.currentSkinID);
		this._selected_item = skinRenderData[idx];
		this.btn_play.visible = true;
		this.btn_ad.visible = false;
		this.btn_friends.visible=false;
		this.show_ex.visible=false;
		this.nowimg_notice.text="";
		this.nowimg.source=skinRenderData[idx].thumb;
		// this.refreshInviteSkinProgress();
		this.refreshView();

		this.gp_skin.validateNow();
	}

	private createSkinList(arr: ISkinRenderData[]) {
		let list = new eui.List();
		let layout = new eui.TileLayout();
		layout.requestedColumnCount = 3;
		layout.requestedRowCount = 3;
		layout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_GAP;
		layout.verticalGap = 46;
		layout.paddingLeft = layout.paddingRight = 20;
		list.layout = layout;

		list.itemRenderer = SkinItemRender;

		list.dataProvider = new eui.ArrayCollection(arr);
		return list;
	}

	_current_page: number = 0;
	private onPageChanged(index: number) {
		this._current_page = index;
		if (this._current_page === 0 || this._current_page === 1) {
			this.img_tab_star.visible = false;
			this.img_tab_video.visible = true;
		} else {
			this.img_tab_star.visible = true;
			this.img_tab_video.visible = false;
		}
		this.refreshView();
	}

	private onSkinSelected(skin: ISkinRenderData) {
		this._selected_item = skin;
		this.nowimg.source=skin.thumb;
		if (app.pp.havingSkinIDs.includes(skin.id)) {
			app.pp.currentSkinID = skin.id;
			// this.nowimg.source=skin.thumb;
			this.nowimg_notice.text="";
			app.pp.pushData();
			Game.inst.player.setSkin(skin.id);
		}
		this.refreshView();
	}
	/**更新上方显示,底部按钮,selectIndex */
	private refreshView() {
		const skin = this._selected_item;
		if (!skin) return;
		let skinType = app.status.skinItemData[skin.id - 1].price.type;
		let progress = app.pp.skinProgressData[skin.id] || 0;
		const needNum = app.status.skinItemData[skin.id - 1].price.num;
		
		if (skinType == 0 || app.pp.havingSkinIDs.includes(skin.id)) {//已经有了显示play
			this.btn_play.visible = true;
			this.btn_ad.visible = false;
			this.btn_friends.visible=false;
			this.show_ex.visible=false;
			this.nowimg_notice.text="";
			
		} else if (skinType == 1) {//需要看广告才能得到
			this.btn_play.visible = false;
			this.btn_ad.visible = true;
			this.btn_friends.visible=false;
			this.show_ex.visible=false;
			this.nowimg_notice.text="WATCH "+needNum+" VIDEO"+(needNum<=1?"":"S");
			this.btn_ad.label = `${progress}/${needNum}`;
		} else if (skinType == 2) {//需要分享好友才能得到,
			this.btn_play.visible = false;
			this.btn_ad.visible = false;
			this.btn_friends.visible=true;
			this.show_ex.visible=false;
			this.nowimg_notice.text="SHARE TO "+needNum+" FRIEND"+(needNum<=1?"":"S");
			
			this.btn_friends.label = `${progress}/${needNum}`;
		}else if (skinType == 3) {//满足一定经验才能得到
			this.btn_play.visible = false
			this.btn_ad.visible = false;
			this.btn_friends.visible=false;
			this.show_ex.visible=true;
			this.nowimg_notice.text="unlock with get "+needNum+" points";
			this.lb_ex.text=Math.round(app.pp.starCount)+"/"+needNum;
			// progress = app.pp.starCount;
			// this.btn_star_count.label = `${progress}/${needNum}`;
		}


		for (let i = 0; i < this.gp_skin.numChildren; i++) {
			let list = this.gp_skin.getChildAt(i) as eui.List;
			let ac = list.dataProvider as eui.ArrayCollection;
			list.selectedIndex = ac.getItemIndex(skin);
			ac.itemUpdated(skin)
		}

		this.list_page_indicator.selectedIndex = this._current_page;

		// egret.log(this._selected_item.id);
	}
	private successInBuySkin() {
		const skin = this._selected_item;
		const id = skin.id;
		const res = app.pp.tryBuySkin(id);
		if (res) {
			app.pp.currentSkinID = id;
			app.pp.pushData();
			Game.inst.player.setSkin(id);
		}
		this.refreshView();
	}

	onTapHome() {
		this.close();
		app.ui.addPopup(new HomeView);
	}
	img_tab_star: eui.Image;
	img_tab_video: eui.Image;
	onTapVideo() {
		//if (this._current_page === 0 || this._current_page === 1) {
			//do nothing
		//} else {
			AudioPlayer.playSound("click.mp3");
			this.pageViewContr.scrollToPage(0);
			this.img_tab_star.visible = false;
			this.img_tab_video.visible = true;
	//	}
	}

	onTapStar() {
		if (this._current_page === 0 || this._current_page === 1) {
			AudioPlayer.playSound("click.mp3");
			this.pageViewContr.scrollToPage(2);
			this.img_tab_star.visible = true;
			this.img_tab_video.visible = false;
		} else {
			// do nothing
		}
	}
	async onTapShare() {
		await ShareHelper.sendGenericUpdate(true);
		// app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnShare" });
	}
}