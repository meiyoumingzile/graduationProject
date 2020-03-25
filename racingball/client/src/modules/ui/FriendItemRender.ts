class FriendItemRender extends eui.ItemRenderer implements eui.UIComponent {
	public constructor() {
		super();
	}
	
	img_func:eui.Image;
	txt_name:eui.Label;
	node_head:eui.Image;
	bt_head:eui.Button;
	btn_play:eui.Button;
	node_head_mask:eui.Image;

	private static cur_friendRander:FriendItemRender = null;
	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private initialized = false;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.initialized = true;
		/*this.addEventListener(egret.TouchEvent.TOUCH_TAP,async()=>{
			app.ui.busy();
			let bo = await platform.createCtx(this.data.id);
			app.ui.rmBusy();
			if(bo){
				app.model.player.incrPlayWithFriendCount();
				app.notify(Constant.Notify.start_game);
				app.ui.toast(app.lang.getString("lab_playWith","Playing with {name}",{name:this.data.name}));
			}
			//platform.log(Constant.LogEvent.create,{type:"home_friend",result:bo?1:0})
			this.onTapPlay();
		},this);*/
	}

	protected dataChanged(){
		if (!this.initialized) return;
		if (!this.data) return;

		let data = this.data
		this.txt_name.text = data.name;
		this.node_head.source = data.photo
		this.node_head.mask=this.node_head_mask;
		this.node_head.touchEnabled = true;
		this.node_head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTapPlay, this);
	}
	async onTapPlay() {
		//console.log(1e9+7);
		let bo = await app.platform.createCtx(this.data.id);
		bo && this.dispatchEventWith('PlayWithFriend', true);
		// app.platform.logEvent(Log.EventType.RankClick, { type: app.status.playerType, source: "btnChallenge" });
	}
}