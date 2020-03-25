var AppConstant;
(function (AppConstant) {
    AppConstant.APP_ID = '312887595914462';
    AppConstant.APP_NAME = 'Balls Rush 3D';
    var Notify;
    (function (Notify) {
        Notify[Notify["startup"] = 0] = "startup";
        Notify[Notify["game_ready"] = 1] = "game_ready";
        Notify[Notify["game_over"] = 2] = "game_over";
        Notify[Notify["enter_game"] = 3] = "enter_game";
        Notify[Notify["refresh_invite_count"] = 4] = "refresh_invite_count";
    })(Notify = AppConstant.Notify || (AppConstant.Notify = {}));
    AppConstant.ContextTemplate = {
        result: "result",
    };
    AppConstant.ONE_DAY = 24 * 60 * 60 * 1000;
    AppConstant.AD_INTERVAL_TIME = 60 * 1000;
    AppConstant.RAD_INTERVAL_TIME = 120 * 1000;
    // export const AD_INTERVAL_PLAY_TIMES = 3;
})(AppConstant || (AppConstant = {}));
var Log;
(function (Log) {
    Log.EventType = {
        HomeClick: "HomeClick",
        ChangeGame: "ChangeGame",
        RankClick: "RankClick",
        ReviveClick: "ReviveClick",
        SettlementClick: "SettlementClick",
        AD: "AD",
        InviteGetSkin: "InviteGetSkin",
        PlayTimes: "PlayTimes",
        LevelOverTimes: "LevelOverTimes",
        GameOver: "GameOver",
        LevelRank: "LevelRank",
        LoadDetail: "LoadDetail",
        SaveDetail: "SaveDetail",
        BotDetail: "BotDetail",
    };
    // export const HomeClickSource = {
    //     btnPlay: "btnPlay",
    //     btnRank: "btnRank"
    // }
    // export const RankClickSource = {
    //     btnAddheart: "btnAddheart",
    //     btnAddhearts: "btnAddhearts",
    //     btnShare: "btnShare",
    //     btnInvite: "btnInvite",
    // }
    // export const ReviveClickSource = {
    //     btnRevive: "btnRevive",
    //     btnNoThanks: "btnNoThanks"
    // }
    // export const ADType = {
    //     video: "video",
    //     cover: "cover"
    // }
    // export const ADSource = {
    //     adContinue: "adContinue",
    //     adRevive: "adRevive"
    // }
    // export const InviteGetSkinResult = {
    //     choose: 0,
    //     friend: 1,
    //     group: 2,
    //     fail: 3
    // }
    // export const LoadDetailType = {
    //     init: "init",
    //     ready: "ready"
    // }
    // export const SaveDetailResult = {
    //     fail: 0,
    //     success: 1,
    // }
    // export const MessageDetailSort = {
    //     rankSelfShare: 'rankSelfShare',
    //     getskinShare: 'getskinShare',
    //     sendheartMessage: 'sendheartMessage',
    //     settlementChallengeMessage: 'settlementChallengeMessage',
    //     settlementVsMessage: 'settlementVsMessage',
    //     settlementGroupRankMessage: 'settlementGroupRankMessage'
    // }
    // export const EntryDetailEntry = {
    //     normal: 'normal',
    //     commonMessage: 'commonMessage',
    //     switchGame: 'switchGame',
    //     bot: 'bot',
    //     rankSelfShare: 'rankSelfShare',
    //     getskinShare: 'getskinShare',
    //     sendheartMessage: 'sendheartMessage',
    //     settlementChallengeMessage: 'settlementChallengeMessage',
    //     settlementVsMessage: 'settlementVsMessage',
    //     settlementGroupRankMessage: 'settlementGroupRankMessage'
    // }
    // export const NoobDetailSource = {
    //     noobChoose: 'noobChoose',
    //     noobEnter: 'noobEnter',
    //     noobBtnPlay: 'noobBtnPlay',
    //     noobEnterBattle: 'noobEnterBattle',
    //     noobGameOver: 'noobGameOver',
    //     noobContinue: 'noobContinue'
    // }
    // export const SettlementClickSource = {
    //     btnContinue: "btnContinue",
    //     btnShare: "btnShare",
    //     btnSendHeart: "btnSendHeart"
    // }
})(Log || (Log = {}));
//# sourceMappingURL=AppConstant.js.map