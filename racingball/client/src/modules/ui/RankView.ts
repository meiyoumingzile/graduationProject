
class RankView extends BasePopup {
	public constructor() {
		super();
	}
	lb_champion_name:eui.Label;

	btn_home: eui.Button;
	img_portrait_champion_mask: eui.Image;
	img_portrait_champion: eui.Image;
	txt_champion: eui.Label;

	_current_tab = "world";
	img_tab_world: eui.Image;
	img_tab_friend: eui.Image;
	btn_world: eui.Group;
	btn_friend: eui.Group;
	view_stack: eui.ViewStack;
	list_world: eui.List;
	list_friend: eui.List;
	rect_white_bar: eui.Rect;
	btn_share: eui.Button;

	worldRankEntries: RankPlayerVO[] = [];
	friendRankEntries: RankPlayerVO[] = [];
	myFriendEntry: RankPlayerVO;
	myWorldEntry: RankPlayerVO;
	node_world: WorldRankItemRender;
	node_friend: FriendRankItemRender;

	//列表的控件
	gp_friends:eui.Group;
	sc_friends:eui.Scroller;
	dg_friends:eui.DataGroup;
	//以上是列表的控件

	protected async childrenCreated() {
		super.childrenCreated();
		this.gp_friends.scale=Constant.FullWidthScale;
		this.rect_white_bar.width *= Constant.FullWidthScale;
		this.img_portrait_champion.mask = this.img_portrait_champion_mask;

		this.addEventListener('PlayWithFriend', function () {
			this.close();
			app.ui.addPopup(new GameView);
			Game.inst.start();
		}, this);

		
	/*	let friendRankList:RankPlayerVO[]=Array(10);
		for(var i=0;i<10;i++){
			friendRankList[i]=new RankPlayerVO();
			friendRankList[i].name="hh"+i;
			friendRankList[i].photo="game-icon-try-down.png";
			friendRankList[i].originalRank=997;
			friendRankList[i].score=Math.floor(Math.random()*1e4);
			friendRankList[i].id=i+2+"";
			friendRankList[i].extraData = {skin:Math.floor(Math.random()*10)};
			
			//new RankPlayerVO()的时候只申请了其内部基本数据类型的地址，
			//若是复合数据类型，则要通过{}赋值，否则extraData本身是null
			
		}
		this.friendRankEntries=friendRankList;*/
		
		let friendRankList: FBInstant.LeaderboardEntry[] = app.status.friendRankList || await app.platform.getFriendRankList();
		friendRankList.map((value) => {
			this.friendRankEntries.push(RankPlayerVO.createFromLeaderBoardEntry(value));
		})
		GameView.sortByScore(this.friendRankEntries,0,this.friendRankEntries.length-1,(a,b)=>{
			return a.score>b.score;
		});
		if(this.friendRankEntries.length){
			this.img_portrait_champion.source =this.friendRankEntries[0].photo;
			this.lb_champion_name.text=this.friendRankEntries[0].name;
		}
		this.dg_friends.dataProvider = new eui.ArrayCollection(this.friendRankEntries);


		// let worldRankList: FBInstant.LeaderboardEntry[] = app.status.worldRankList || await app.platform.getWorldRankList();
		 

		
		/*friendRankList.map((value) => {
			this.friendRankEntries.push(value);
		})

		this.myWorldEntry = app.platform.getWorldSelfEntry();
		this.myFriendEntry = this.friendRankEntries.find(value => value.id === app.platform.id());

		egret.log("this.myWorldEntry", this.myWorldEntry);
		let rankPlayerVO = new RankPlayerVO();
		Object.assign(rankPlayerVO, this.myWorldEntry);
		rankPlayerVO["bg"] = "rank-bar-personal.png";
		rankPlayerVO["name_color"] = 0xffffff;
		this.node_world.data = rankPlayerVO;

		rankPlayerVO = new RankPlayerVO();
		Object.assign(rankPlayerVO, this.myFriendEntry);
		rankPlayerVO["bg"] = "rank-bar-personal.png";
		rankPlayerVO["name_color"] = 0xffffff;
		this.node_friend.data = rankPlayerVO;

		this.list_world.dataProvider = new eui.ArrayCollection(friendRankList);
		//this.list_friend.dataProvider = //new eui.ArrayCollection(this.friendRankEntries);
		*/
		
		
		this.btn_home.addEventListener("touchTap", this.onTapHome, this);
		// this.btn_world.addEventListener("touchTap", this.onTapWorld, this);
		// this.btn_friend.addEventListener("touchTap", this.onTapFriend, this);
		// this.btn_share.addEventListener("touchTap", this.onTapShare, this);


	}

	onTapHome() {
		this.close();
		app.ui.addPopup(new HomeView);
	}

	onTapWorld() {
		if (this._current_tab === "world") {
			//do nothing
		} else {
			AudioPlayer.playSound("click.mp3");
			this._current_tab = "world";
			this.img_portrait_champion.source = this.worldRankEntries[0] && this.worldRankEntries[0].photo;
			// this.txt_champion.text = this.worldRankEntries[0] && this.worldRankEntries[0].name;
			this.img_tab_friend.visible = false;
			this.img_tab_world.visible = true;

			this.view_stack.selectedIndex = 0;
		}
	}

	onTapFriend() {
		if (this._current_tab === "world") {
			AudioPlayer.playSound("click.mp3");
			this._current_tab = "friend";
			this.img_portrait_champion.source = this.friendRankEntries[0] && this.friendRankEntries[0].photo;
			// this.txt_champion.text = this.friendRankEntries[0] && this.friendRankEntries[0].name;
			this.img_tab_world.visible = false;
			this.img_tab_friend.visible = true;

			this.view_stack.selectedIndex = 1;
		} else {
			//do nothing
		}
	}
	async onTapShare() {
		await ShareHelper.sendGenericUpdate(true);
		// app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnInvite" });
	}

}