
class PlatformDev {
    oppenentData: {
        head: string,
        playerId: string,
        score: number,
        name: string
    } = null;

    isPaymentsReady: boolean = false
    setLoadingProgress(value) {
        return;
    }
    async purchaseAsync(productId: string) {
        return true;
    }
    async checkPurchaseAsync() {
        return [];
    }
    async onPaymentsReady() { }

    async getCatalogAsync() { }

    async getPlayerData(keys: string[]) {
        return Promise.resolve({});
    }

    async getConnectedFriendList() {
        return [];
    }

    async setPlayerData(obj: Object) {
        return Promise.resolve();
    }

    async choose(obj: any = {}, place: string = "any") {
        return Promise.resolve();
    }
    async switchContext(id: string) {
        return Promise.resolve();
    }
    async canCreateShortcutAsync() {
        return true;
    }

    getContextID() {
        return "";
    }
    name() {
        return "Si Xing";
    }
    photo() {
        return "share-common-head-bg.png";
    }
    id() {
        return '';
    }
    getLocale() {
        return 'zh_CN'
    }
    entryData() { // DEBUG
        return {
            // helpType: HelpType.QUESTION,
            // levelNum: 2,
            // name: 'Platform.name()',
            // photo: 'Platform.photo()',
            // id: 'Platform.id()',

            // helpType: HelpType.ANSWER,
            // levelNum: 2,
            // pointsArr: 'NrDeCIA9wLgWgIwE4BMAacBPWBWA7AL5oTTwIAc6WuhxUsiAbORtjPkSQwji9e7S5kALAAZWuAMyd6ZFEgkxhSGaUTJFw4au6jGm0TvjkciyQiNw8VNikaWcC-ikN01yxT0vCEiwbLhJU344cktzRTgUaTcGFGC2QP81BH0QjliycRDrB0jKI2zE1CNJSIRRbUyEG24vaqdEmpQjFD4myRbM4QTuYWTcdu4ce0y8XxDUqqFyCaa8GKEkIu5yVyW8cvIBmArhcqRRoQQKyJccIxP9kJR6440b+MuUa8To6dka17ie582bjLHIJnRgfUgIYRlG54dafHBQt54bQAXWRQA',
            // helpSeekerId: ''

            // type: "bot_gain_coin",
            // giftCode: "5",

            // switchGameInfo: {
            //     appId:"110"
            // }
        }
    }

    async switchGame(appId: string, data?: any) {
        return Promise.resolve();
    }

    async updateStatus(info: any = {}) {
        return Promise.resolve();
    }

    async share(msg: { img?: string, text?: string, data?: any, intent?: string } = {}) {
        return Promise.resolve();
    }
    getFriendRankList = async () => [];
    getWorldRankList = async () => [];
    getFriendWeekRankList = async () => [];
    getWorldSelfEntry = () => new RankPlayerVO;

    async updateScore(score: number, extraData?: string) {
        return Promise.resolve();
    }

    async updateWeekScore(score: number, extraData?: string) {
        return Promise.resolve();
    }
    async createCtx(playerId: string, place: string = "any") {
        return true;
    }

    logEvent(name: string, data?: any, valueSum: number = 1) {
        egret.log("name", name, "data", JSON.stringify(data));
    }
    async setSessionData(data) {
        return true;
    }

    async checkBotSubscribe() {
    }

    async tryCreateShortcut() {
    }
}