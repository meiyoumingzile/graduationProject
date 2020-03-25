class StartupCmd implements ICommand {
	excute(data,name?){
		egret.log("enter StartupCmd");
		// app.registCommand(AppConstant.Notify.game_over,GameOverCmd);
		app.registCommand(AppConstant.Notify.game_ready,GameReadyCmd);
		app.registCommand(AppConstant.Notify.enter_game,EnterGameCmd);
	}
}