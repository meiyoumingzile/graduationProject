class GameReadyCmd implements ICommand {
    async excute(data, name?) {
        egret.log("enter GameReadyCmd")

        if (app.platform instanceof PlatformFB) {
            this.watchContextIfChanged()
        }

        let model = Context.gameModel;
        let entryData = app.platform.entryData();
        let opponent_info = entryData && entryData["opponent_info"];
        if (opponent_info && opponent_info.playerId == FBInstant.player.getID()) {
            opponent_info = null;
        }
        model.opponent_info = opponent_info;


        let invite_skin_data = entryData && entryData["invite_skin_data"];
        if (invite_skin_data && invite_skin_data.playerId == FBInstant.player.getID()) {
            invite_skin_data = null;
        }
        model.invite_skin_data = invite_skin_data;

        egret.log("entryData",entryData)

        // let heartInfo:{id:string,count:number,timestamp:number} = entryData && entryData["heart_data"] || null
        // if(heartInfo && app.pp.recievedLoveGuys.indexOf(heartInfo.id) ==-1 && heartInfo.id != FBInstant.player.getID()){
        //     let timestamp = heartInfo.timestamp || 0;
        //     if(Date.now() - timestamp > 24 * 3600 * 1000){
        //         app.ui.toast("The ❤️ has expired.");
        //         return;
        //     }
        //     app.pp.recievedLoveGuys.push(heartInfo.id);
        //     app.pp.recievedLoveGuys = app.pp.recievedLoveGuys
        //     app.pp.loveNum+=heartInfo.count;
        // 	app.pp.pushData();

        //     app.stage.addChild(new GetLoveAni());
        // }
        // let entryLog = entryData && (entryData["entryLog"] || entryData["type"]) || 'normal';
        // let entryCommonType = entryData && entryData["entryCommonType"] || -1;
        // app.platform.logEvent(Log.EventType.EntryDetail, {entry: entryLog, commonType: entryCommonType, type: app.status.playerType});


        app.http.reportIfFromSkinShare().catch(e => { });
        // 开始获取好友列表
        console.log("Load FriendList.")
        app.status.friendList = await app.platform.getConnectedFriendList();
        console.log("FriendList loaded success.")
        app.http.getSkinShareInfo().catch(e => { });
        // try{
        //     await app.http.checkSuper()
        // }catch(e){
        //     console.log("check super error");
        // }

        // if(Context.gameModel.isSuper){
        //     this.showChoose();
        // }
    }

    // async showChoose(){
    //     if(app.platform instanceof PlatformFB && !FBInstant.context.getID()){
    //         egret.log("auto choose")
    //         app.ui.busy();
    //         try{
    //             let bo = await app.platform.choose({filters:["NEW_CONTEXT_ONLY"]},"auto_choose")
    //             if(bo){
    //                 if (app.status.playerType === "new_player") {
    //                     app.platform.logEvent(Log.EventType.NoobDetail, {source: Log.NoobDetailSource.noobChoose});
    //                 }
    //                 egret.log("auto choose update");
    //                 ShareHelper.sendGenericUpdate(AppConstant.context_template.auto_choose)
    //                 .catch(e=>{
    //                     egret.log("update auto_choose failed:",e)
    //                 })
    //             }
    //         }catch(e){
    //             egret.log("auto choose err:",e)
    //         }
    //         app.ui.rmBusy();
    //     }
    // }

    private _lastContextId = null;
    private _contextLeaderBoard: FBInstant.Leaderboard = null;
    async watchContextIfChanged() {
        let playerName = FBInstant.player.getName();
        let model = Context.gameModel;
        while (true) {
            let contextId = FBInstant.context.getID();
            if (contextId) {
                let rankName = 'rank'//`context1.${contextId}`
                if (contextId != this._lastContextId) {
                    egret.log("context changes detected");
                    try {
                        this._lastContextId = contextId;
                        this._contextLeaderBoard = await FBInstant.getLeaderboardAsync(rankName);
                        // egret.log("seting score ...");
                        await this._contextLeaderBoard.setScoreAsync(model.lastContextualScore, "");
                        // egret.log("sending update ...");
                        await FBInstant.updateAsync({ action: 'LEADERBOARD', name: rankName, text: `${playerName} joined this game` });
                    } catch (e) {
                        egret.log("rank msg failed:", e);
                    }
                    egret.log("all done!");
                }

                let curScore = model.score //Math.floor(Context.gameModel.playerAreaPercent*100);
                if (curScore > model.lastContextualScore) {
                    try {
                        egret.log("score changed!")
                        model.lastContextualScore = curScore;
                        // egret.log("seting score ...");
                        // await this._contextLeaderBoard.setScoreAsync(model.lastContextualScore,"");
                        // egret.log("sending update ...");
                        await FBInstant.updateAsync({ action: 'LEADERBOARD', name: rankName, text: `${playerName} scored ${curScore}` });
                        egret.log("all done!");
                    } catch (e) {
                        egret.log("score changed update failed:", e);
                    }
                }
            }


            await Utils.wait(3000);
        }
    }
}