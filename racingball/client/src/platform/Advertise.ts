// /**
//  * Author:terran
//  * Email:terran.tian@foxmail.com
//  * 
//  * Time:上午9:56 2016年12月17日
//  **/
namespace ad {
    class Advertise extends Emiter {
        constructor(private ids: string[], autoPreload = true) {
            super();
            this.suportAD() && autoPreload && (this.preloadAD());
        }

        suportAD(): boolean { throw "should be implemented in subclass!" }
        getName() { throw "should be implemented in subclass!" }

        protected async getADInstanceAsync(placementId: string) {
            // throw "should be implemented in subclass!"
            return null
        }

        private _adInstance: FBInstant.AdInstance = null;
        hasAD() { return !!this._adInstance }

        private _isStart = false;
        async preloadAD() {
            if (this._isStart) return;
            this._isStart = true;

            let lastError = "";
            let arr = this.ids.concat()
            let i = 0;
            let _tmp_inst: FBInstant.AdInstance = null
            while (!_tmp_inst) {
                let index = i++ % arr.length;
                try {
                    _tmp_inst = await this.getADInstanceAsync(arr[index]);
                    lastError = "";
                    console.log(`${this.getName()} create suc:${index}`);
                    let reloadCount = 0;
                    while (!this._adInstance && _tmp_inst) {
                        try {
                            await _tmp_inst.loadAsync()
                            lastError = "";
                            this._adInstance = _tmp_inst;
                            this.emit("ad_ready");
                            console.log(`${this.getName()} load suc`);
                            while (true) {
                                await new Promise((resolve, reject) => this.once("show_ad", resolve))
                                try {
                                    await this._adInstance.showAsync();
                                    lastError = "";
                                    console.log(`${this.getName()} show suc`);
                                    this.emit("show_result", { result: true, level: index });
                                    //重新获取广告位
                                    i = 0
                                    this._adInstance = null;
                                    _tmp_inst = null;
                                    break;
                                } catch (e) {
                                    console.log(`${this.getName()} show failed,${e.code},${e.message}`);
                                    this.emit("ad_failed", { type: this.getName(), phase: 2, code: e.code, msg: e.message, lastError });
                                    lastError = `${e.code}:2`;
                                    this.emit("show_result", { result: false, err: e, level: index });
                                    if (e.code == "ADS_NOT_LOADED") {
                                        //重新加载
                                        this._adInstance = null;

                                        //重置加载计数
                                        reloadCount = 0;
                                        // await wait(30 * 1000)
                                        break;
                                    } else if (e.code == "PENDING_REQUEST" || e.code == "UNKNOWN" || e.code == "RATE_LIMITED"/*Can not show ads immediately after the game starts.*/) {
                                        //do nothing,pennding show this instance next time;
                                    }
                                    else {
                                        //重新获取广告位
                                        this._adInstance = null;
                                        _tmp_inst = null;
                                        break;
                                    }
                                }
                            }
                        } catch (e) {
                            console.log(`${this.getName()} load failed,${e.code},${e.message}`);
                            this.emit("ad_failed", { type: this.getName(), phase: 1, code: e.code, msg: e.message, lastError });
                            lastError = `${e.code}:1`;
                            if (e.code == "ADS_FREQUENT_LOAD") {
                                await new Promise(resolve => setTimeout(resolve, 30 * 60 * 1000));
                                break;
                            }
                            else if (e.code == "INVALID_PARAM") {
                                //重新获取广告位
                                _tmp_inst = null;
                                break;
                            }
                            else {
                                await new Promise(resolve => setTimeout(resolve, 31 * 1000));
                            }
                        }
                    }
                } catch (e) {
                    console.log(`${this.getName()} create failed,${e.code},${index}`);
                    this.emit("ad_failed", { type: this.getName(), phase: 0, code: e.code, msg: e.message, lastError });
                    lastError = `${e.code}:0`;
                    if (e.code == "CLIENT_UNSUPPORTED_OPERATION" || e.code == "ADS_TOO_MANY_INSTANCES") {
                        //不在获取广告
                        return;
                    }
                }
            }
        }

        private _watch_count = 0;
        async showAD() {
            if (!this.hasAD()) {
                throw "no ad ready";
            }
            let bo = this.emit("show_ad");
            if (!bo) return;

            await new Promise((resolve, reject) => {
                this.once("show_result", (data: { result: boolean, err: { code: string, message: string }, level: number }) => {
                    this.emit("ad_show", { type: this.getName(), result: ++this._watch_count, level: data.level });
                    data.result ? resolve() : reject(data.err);
                    // resolve();
                })
            })
        }
    }


    export class InterstitialAD extends Advertise {
        getName() {
            return "iad"
        }
        suportAD() {
            let apis = FBInstant.getSupportedAPIs();
            return apis.indexOf("getInterstitialAdAsync") > -1
        }

        protected async getADInstanceAsync(placementId: string) {
            return await FBInstant.getInterstitialAdAsync(placementId);
        }
    }

    export class RewardedVideoAD extends Advertise {
        getName() {
            return "rad"
        }
        suportAD() {
            let apis = FBInstant.getSupportedAPIs();
            return apis.indexOf("getRewardedVideoAsync") > -1
        }

        protected async getADInstanceAsync(placementId: string) {
            return await FBInstant.getRewardedVideoAsync(placementId);
        }
    }
}