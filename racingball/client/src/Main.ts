//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare class VConsole {
    showSwitch: Function
    hideSwitch: Function
}

class Main extends eui.UILayer {


    protected async createChildren() {
        super.createChildren();
        //app.pp.cleanData();
		//app.platform.updateScore(Math.round(10), JSON.stringify({ skin: app.pp.currentSkinID }));
		
        egret.ImageLoader.crossOrigin = "anonymous";
        egret.TextField.default_fontFamily = "GameFont";

        RES.setMaxLoadingThread(5);
        RES.setMaxRetryTimes(3);

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            AudioPlayer.pauseMusic();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            AudioPlayer.resumeMusic();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        Context.stage = this.stage;
        Context.gameModel = new GameModel();
        Constant.FullWidthScale = Utils.clamp(this.stage.stageWidth / 640, 0.5, 1);
        this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        await App.startup();
        app.pp.checkNewSkin();
        
        this.runGame()
    }

    private async runGame() {
        await this.loadResource();
        await App.onGameReady();

        app.notify(AppConstant.Notify.game_ready);
    }

    set progress(v: number) {
        // window["fbProgress"] = v;
        $T_PROGRESS = v;
        // console.log("progress", v);
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            this.progress = 1;

            let progress1 = 0;
            let progress2 = 0;
            let updateProgress = () => {
                this.progress = progress1 * .5 + progress2 * .5
            }
            RES.createGroup("_gp1", ['home', 'common', 'game']);
            let promise1 = RES.loadGroup("_gp1", 0, {
                onProgress: (current: number, total) => {
                    progress1 = current / total;
                    updateProgress();
                }
            });

            GameConstant.Map = app.status.playerType == "new_player" ? "chushi" : Utils.randomInArr(GameConstant.Maps);
            Res3DManager.init();
            let assets: string[] = [
                "tex/fx-die1.png",
                "tex/fx-die2.png",
                "tex/finish.png",
                `tex/lane_${GameConstant.Map}.jpg`,
                `fbx/${GameConstant.Map}.fbx`,
                "fbx/ball.fbx",
                "tex/player-trail.png",
                "tex/wind-trail.png",
                "tex/shadow.png",
                "tex/fx-boost.png",
                "tex/fx-die1.png",
                "tex/fx-die2.png",
                "skin/ball.jpg",
                "skin/tietu_fuhuoqiu.jpg",
            ];

            let promise2 = Res3DManager.preload(progress => {
                progress2 = progress;
                updateProgress();
            }, ...assets);
            await Promise.all([promise1, promise2]);
        } catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, resolve, this);
        })
    }
}