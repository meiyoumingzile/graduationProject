namespace ShareHelper {
    // export async function sendHeartUpdate(score: number, data: { photo: string }) {
    //     egret.log("send love update");
    //     let payload = {
    //         heart_data: { id: FBInstant.player.getID(), count: 1, timestamp: Date.now() },
    //         type: AppConstant.context_template.heart,
    //         entryLog: Log.EntryDetailEntry.sendheartMessage,
    //         entryCommonType: -1
    //     };

    //     try {
    //         // let spri = new HeartShareUI(
    //         //     { score: +score.toFixed(2), head: FBInstant.player.getPhoto() },
    //         //     { head: data.photo, score: 1 })
    //         // let img = await Utils.toImageBase64(spri);
    //         // await app.platform.updateStatues({
    //         //     text: "{name} just gave you a heart!".substitute({ name: FBInstant.player.getName() }),
    //         //     image: img,
    //         //     cta: "Play",
    //         //     template: AppConstant.context_template.heart,
    //         //     data: payload
    //         // }
    //         // )
    //         // app.platform.logEvent(Log.EventType.MessageDetail, { type: app.status.playerType, commonType: -1, sort: Log.MessageDetailSort.sendheartMessage });
    //     }
    //     catch (e) {
    //         egret.log("update Failed" + JSON.stringify(e));
    //     }
    // }

    // export async function challengeShare(score: number, friendName: string = "") {
    //     egret.log("enter challegnge share..")
    //     let info = {
    //         photo: FBInstant.player.getPhoto(),
    //         playerId: FBInstant.player.getID(),
    //         name: FBInstant.player.getName(),
    //         skin: app.pp.currentSkinID,
    //         score
    //     }
    //     const target = friendName ? `Hey, ${friendName}, I` : 'I'
    //     const text = `${target} have passed level ${score}! Can you make it?`

    //     let spr = new ChallengeShareUI({
    //         head: info.photo,
    //         score: score
    //     })
    //     egret.log("make img");
    //     let img = await Utils.toImageBase64(spr, new egret.Rectangle(0, 0, 600, 314));
    //     egret.log("make img done");
    //     let bo = await app.platform.share({
    //         img: img,
    //         text: text,
    //         data: Object.assign({ type: "challenge_share" }, { opponent_info: info }, {
    //             entryLog: Log.EntryDetailEntry.settlementChallengeMessage,
    //             entryCommonType: -1
    //         }),
    //     });
    //     app.platform.logEvent(Log.EventType.MessageDetail, { type: app.status.playerType, commonType: -1, sort: Log.MessageDetailSort.settlementChallengeMessage });

    //     // challenge_info.opponents.forEach(v=>{delete v.photo;delete v.name});
    //     // let bo = await platform.share({
    //     //     img:img,
    //     //     text:`[Level ${level}] ${text}`,
    //     //     cta:"CHALLENGE",
    //     //     data:Object.assign({ type: "challenge" },{challenge_info:challenge_info})
    //     // })
    // }


    // async function challengeUpdate(score: number, friendName: string) {
    //     let info = {
    //         photo: FBInstant.player.getPhoto(),
    //         playerId: FBInstant.player.getID(),
    //         name: FBInstant.player.getName(),
    //         skin: app.pp.currentSkinID,
    //         score
    //     }
    //     const target = friendName ? `Hey, ${friendName}, I` : 'I'
    //     const text = `${target} have passed level ${score}! Can you make it?`

    //     let spr = new ChallengeShareUI({
    //         head: info.photo,
    //         score: score
    //     })
    //     let img = await Utils.toImageBase64(spr, new egret.Rectangle(0, 0, 600, 314));
    //     await app.platform.updateStatus({
    //         image: img,
    //         text: text,
    //         template: "challenge",
    //         cta: "CHALLENGE",
    //         data: Object.assign({ type: "challenge" }, { opponent_info: info }, {
    //             entryLog: Log.EntryDetailEntry.settlementChallengeMessage,
    //             entryCommonType: -1
    //         }),
    //     });
    //     app.platform.logEvent(Log.EventType.MessageDetail, { type: app.status.playerType, commonType: -1, sort: Log.MessageDetailSort.settlementChallengeMessage });
    // }

    // async function challengeResultUpdate(score: number, friendName: string, opponent_info: { photo: string, playerId: string, score: number, skin: number }) {
    //     let info = {
    //         photo: FBInstant.player.getPhoto(),
    //         playerId: FBInstant.player.getID(),
    //         name: FBInstant.player.getName(),
    //         skin: app.pp.currentSkinID,
    //         score
    //     }

    //     let opponentName = friendName || 'you'
    //     let who = opponentName == "you" ? "you" : "they"
    //     let text = `${info.name} has challenged ${opponentName}, ${who} are neck and neck!`;
    //     if (info.score < opponent_info.score) {
    //         text = `${info.name} has failed to challenge ${opponentName},${opponentName} win!`;
    //     } else if (info.score > opponent_info.score) {
    //         text = `${info.name} has succeeded in passing ${opponentName}.Come and challenge ${info.name}`
    //     }

    //     let spr = new ChallengeResultUI({
    //         head: info.photo,
    //         score: score
    //     },
    //         {
    //             head: opponent_info.photo,
    //             score: opponent_info.score
    //         }
    //     )
    //     let img = await Utils.toImageBase64(spr);
    //     await app.platform.updateStatus({
    //         image: img,
    //         text: text,
    //         cta: "Start New Match",
    //         template: "challenge_result",
    //         data: Object.assign({ type: "challenge" }, { opponent_info: info }, {
    //             entryLog: Log.EntryDetailEntry.settlementVsMessage,
    //             entryCommonType: -1
    //         })
    //     });
    //     app.platform.logEvent(Log.EventType.MessageDetail, { type: app.status.playerType, commonType: -1, sort: Log.MessageDetailSort.settlementVsMessage });
    // }

    // async function doChallengePost(score: number) {
    //     if (!(app.platform instanceof PlatformFB)) return;
    //     if (FBInstant.context.getType() == "SOLO") return;

    //     let model = Context.gameModel;


    //     let players = (await FBInstant.context.getPlayersAsync()) || []
    //     players = players.filter((v) => v.getID() != FBInstant.player.getID())

    //     let result = FBInstant.context.isSizeBetween(3, null)
    //     let isGroup = result && result.answer

    //     // let isHigher = false;
    //     // let realScore = Math.floor(score*100);
    //     // let rankName = `context1.${FBInstant.context.getID()}`
    //     // try {
    //     //     let leaderboard = await FBInstant.getLeaderboardAsync(rankName)
    //     //     let self = await leaderboard.getPlayerEntryAsync();
    //     //     let newSelf = await leaderboard.setScoreAsync(realScore, '')
    //     //     isHigher = self && newSelf.getScore()> self.getScore()
    //     // } catch (e) {
    //     //     // platform.log('leaderboard_err', { type: 'context.setScore', code: e.code })
    //     // }
    //     if (players.length >= 2 || model.opponent_info) {
    //         model.opponent_info = null
    //         // let text = !isHigher?`${FBInstant.player.getName()} scored ${realScore}`:undefined;
    //         await FBInstant.updateAsync({ action: 'LEADERBOARD', name: "rank" })
    //     }
    //     else {
    //         // if(model.opponent_info){
    //         //     let friendName = isGroup?model.opponent_info.name:""
    //         //     await challengeResultUpdate(score,friendName,model.opponent_info);
    //         //     model.opponent_info = null
    //         // }else{
    //         let friendName = ''
    //         if (!isGroup && players.length > 0) {
    //             friendName = players[0].getName()
    //         }
    //         await challengeUpdate(score, friendName);
    //         // }
    //     }
    // }

    // export async function challengePost(score: number) {
    //     let toast = new eui.Group
    //     let img = new eui.Image("bg_tips_png");
    //     img.scale9Grid = new egret.Rectangle(27, 50, 5, 5)//'27,50,27,50,0'
    //     let txt = new eui.Label('SENDING SCORE')
    //     txt.size = 30
    //     txt.textColor = 0xFFFFFF
    //     // txt.font = 'fireballfont'
    //     txt.horizontalCenter = img.left = img.right = img.top = img.bottom = 0
    //     txt.verticalCenter = -2;
    //     toast.width = 250;
    //     toast.height = 55;
    //     toast.anchorOffsetX = toast.width >> 1
    //     toast.anchorOffsetY = toast.height >> 1

    //     toast.addChild(img)
    //     toast.addChild(txt)
    //     Context.stage.addChild(toast)
    //     toast.x = Context.stage.stageWidth >> 1;
    //     toast.y = 50//(app.stage.stageHeight>>1) - 100;
    //     egret.Tween.get(toast)
    //         .set({ scaleX: 0.3, scaleY: 0.3 }, )
    //         .to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut)
    //     await Promise.race([
    //         Promise.all([
    //             new Promise((resolve) => setTimeout(resolve, 3000)),
    //             doChallengePost(score)
    //         ]),
    //         new Promise((resolve) => setTimeout(resolve, 6000)),
    //     ])
    //     txt.text = 'SCORE SENT'
    //     egret.Tween.get(toast)
    //         .wait(1000)
    //         .to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.backIn)
    //         .call(() => {
    //             toast.removeFromParent()
    //         })
    // }

    export async function sendResultUpdate(rank: number) {
        if (!app.platform.getContextID() || Context.isFB && FBInstant.context.isSizeBetween(3, null).answer) { egret.log("skip result update"); return};
        egret.log("send result update")
        let texts = [
            `${app.platform.name()} is The Best, Everyone Else is Trash, Do You Agree?`,
            `${app.platform.name()} has challenged you in Balls Rush 3D. come and beat ${app.platform.name()}`,
        ]
        let spr = new CommonShareUI({ photo: app.platform.photo(), rank: Utils.getRankNumberText(rank) })
        spr.skinName = "ResultShareUISkin";
        let img = await Utils.toImageBase64(spr);
        try {
            await app.platform.updateStatus({
                text: texts.random(),
                image: img,
                cta: "Play",
                template: AppConstant.ContextTemplate.result,
                // data: payload
            })
        } catch (e) {
            egret.log("send result update", e);
        }
    }

    export async function sendGenericUpdate(useShare = false, payload?: any) {
        let bgs = [
            "common-share1.jpg",
            "common-share2.jpg",
            "common-share3.jpg",
        ]
        let texts = [
            "Let's find some fun! Come play with me.",
            "It's time for a true display of skills. Take a try!",
            "This game is awesome! You should try it!"
        ]
        let spr = new CommonShareUI({ bg: bgs.random(), photo: app.platform.photo() })
        let img = await Utils.toImageBase64(spr);
        if (!useShare) {
            try {
                await app.platform.updateStatus({
                    text: texts.random(),
                    image: img,
                    cta: "Play",
                    // template: template,
                    data: payload
                })
            } catch (e) {
                egret.log("send generic update", e);
            }
        } else {
            app.ui.busy();
            await app.platform.share({
                img: img,
                text: texts.random(),
                data: payload
            })
            app.ui.rmBusy();
        }
    }

    // export async function sendSkinUpdate(template: string, skinID: number) {
    //     let text = "Aha, I need your help to get this ball!";
    //     try {
    //         let spri = new SkinShareUI(skinID);
    //         let img = await Utils.toImageBase64(spri);
    //         // egret.log(img);
    //         await app.platform.updateStatus({
    //             text: text,
    //             image: img,
    //             cta: "Play",
    //             template: template,
    //             data: { type: template, entryLog: Log.EntryDetailEntry.getskinShare }
    //         })
    //         // app.platform.logEvent(Log.EventType.MessageDetail, { type: app.status.playerType, sort: template, entryCommonType: -1 });
    //     } catch (e) {
    //         egret.log("update Failed" + JSON.stringify(e));
    //     }
    // }
}