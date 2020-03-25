/*
* terran;
*/
class HttpService {
    private _server: HttpServer;
    public constructor() {
        this._server = new HttpServer();
    }

    get server() { return this._server }

    private game_id: number = 61;
    private host = "https://fb-api.capjoy.com";


    // async reportSwitchGame(){
    // 	if(app.platform.switchGameInfo && app.platform.isNewPlayer){
    // 		// bapi/v0/ads/report/fromAppId/toAppId/playerId
    // 		await this._server.post(`${this.host}/fbapi/v0/ads/report/${platform.switchGameInfo.appId}/${platform.appId}/${platform.getPlayerId()}`,{v:$T_GAME_VERSION}).catch(e=>console.log(e));
    // 	}
    // }

    async checkSuper() {
        let url = `${this.host}/fbapi/v0/testCase_${this.game_id}`;
        try {
            let result = JSON.parse(await this._server.post(url, {
                nickname: app.platform.name(),
                locale: app.platform instanceof PlatformFB ? FBInstant.getLocale() : "en_US",
                timezoneOffset: new Date().getTimezoneOffset(), //minutes
                playerId: app.platform.id(),
                appId: "274629043216304"
            }));
            if (result.error == 0) {
                Context.gameModel.isSuper = +result.data == 1;
            }
        } catch (e) {
            console.log("check super failed");
        }
    }

    // async getRecommendGames(){
    // 	let url = `${this.host}/fbapi/v0/getRecommendGames`;
    // 	let pdata = {
    // 		playerId:platform.userInfo.id,
    // 		nickname:platform.userInfo.name,
    // 		appId:platform.appId,//"198982457542294",
    // 		locale:platform instanceof PlatformFB ? FBInstant.getLocale() : "en_US",
    // 		deviceOS:platform instanceof PlatformFB ? FBInstant.getPlatform():"IOS",
    // 		timezoneOffset:new Date().getTimezoneOffset() //minutes
    // 	}
    // 	let result:IHTTP_GetRecommendGames = JSON.parse(await this._server.post(url,pdata));
    // 	if(result.error == 0){
    // 		app.model.recommendGames = result.data && result.data.ads || null
    // 		app.event.emit("game_recommend_ready");
    // 	}else{
    // 		console.log("getRecommendGames  error:",result.msg);
    // 	}
    // }	

    async reportIfFromSkinShare() {
        // https://fb-api.capjoy.com/api/game/v0/shareUpdate_{gameId}
        if (Context.gameModel.invite_skin_data && app.status.playerType === 'new_player') {
            let url = `${this.host}/api/game/v0/shareUpdate_${this.game_id}`;
            await this._server.post(url, {
                v: $T_GAME_VERSION,
                playerId: app.platform.id(),
                sharePlayerId: Context.gameModel.invite_skin_data.playerId,
                type: "share"
            })
                .catch(e => console.log(e));
        }
    }

    async getSkinShareCount() {
        let count = 0;
        let IDs = [];
        try {
            let url = `${this.host}/api/game/v0/shareGet_${this.game_id}`;
            let str = await this._server.post(url, {
                v: $T_GAME_VERSION,
                playerId: app.platform.id(),
                type: "share"
            })
            let result = JSON.parse(str);
            count = +result.data.count || 0;
            IDs = result.data.pids || [];
        }
        catch (e) {
            console.log(e);
        }
        IDs.forEach((value) => {
            if (app.pp.invitedGuys.indexOf(value) < 0) {
                app.pp.invitedGuys.push(value);
            }
        })
        app.pp.pushData();
    }
    async getSkinShareInfo() {
        let count = 0;
        let friendIDs: string[] = app.status.friendList.map(v => v.getID());
        let IDs: string[] = [];
        let infos = {};
        try {
            let url = `${this.host}/api/game/v0/shareGetInfo_${this.game_id}`;
            let str = await this._server.post(url, {
                v: $T_GAME_VERSION,
                playerId: app.platform.id(),
                type: "share",
                friends: friendIDs
            })
            let result = JSON.parse(str);
            IDs = result.data.pids || [];
            infos = result.data.infos || {};
        }
        catch (e) {
            egret.log(e);
        }

        IDs.forEach((value) => {
            if (app.pp.invitedGuys.indexOf(value) < 0) {
                app.pp.invitedGuys.push(value);
            }
        })
        app.pp.invitedGuys = app.pp.invitedGuys;
        app.pp.pushData();
        Context.gameModel.skinInviteInfo = infos;
        app.notify(AppConstant.Notify.refresh_invite_count);
        egret.log("IDs", IDs);
        egret.log("infos", infos);

    }



}