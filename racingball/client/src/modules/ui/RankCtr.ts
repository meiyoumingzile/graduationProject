class RankCtr {
    constructor() {
        this.init();
    }
    init(){

    }
    static async loadLeaderBoardAsync(){
		//开始获取排行榜
		egret.log("Load leaderboard.")
		app.status.friendRankList = await app.platform.getFriendRankList();
		app.status.worldRankList = await app.platform.getWorldRankList();
		egret.log("Leaderboard loaded success.")
    }
}