class EnterGameCmd implements ICommand {
	excute(data,name?){
		egret.log("enter EnterGameCmd");
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
			app.ui.addPopup(new GameView);
			Game.inst.start();
		})
	}
}