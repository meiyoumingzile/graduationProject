type FriendInfo = {
    [k: string]: {
        nickname?: string,
        head?: string
    }
}
class GameModel {
    constructor() {

    }
    invite_skin_data: { playerId: string, skinId: number } = null;

    lastContextualScore = 0;

    // play_times:number = 0;
    // pendingChallengePost = false;

    score: number = 0;

    opponent_info: {
        photo: string,
        playerId: string,
        score: number,
        name: string,
        skin: number
    } = null;

    isSuper: boolean = false;


    //成功邀请进来的人数
    skinInviteInfo: FriendInfo = {};

    async pullSkinInviteCount() {
        app.http.getSkinShareCount().catch(e => { });
    }
}