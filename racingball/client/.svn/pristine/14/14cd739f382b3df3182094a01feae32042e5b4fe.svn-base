class AdvertiseFB extends Emiter {
	private rad: ad.RewardedVideoAD;
	private iad: ad.InterstitialAD;

	constructor(iad_ids: string[], rad_ids: string[]) {
		super()

		if (FBInstant.getPlatform().indexOf("WEB") == -1) {
			this.iad = new ad.InterstitialAD(iad_ids, true);
			this.iad.on("ad_failed", d => this.log("ad_failed", d))
			this.iad.on("ad_show", d => this.log("iad_times", d))

			this.rad = new ad.RewardedVideoAD(rad_ids, true);
			this.rad.on("ad_failed", d => this.log("ad_failed", d))
			this.rad.on("ad_show", d => this.log("rad_times", d))
		} else {
			console.log("WEB & MOBILE_WEB ad skiped!");
		}
	}

	hasRAD() {
		return this.rad && this.rad.hasAD();
	}

	async showRAD() {
		this.rad && await this.rad.showAD();
		app.status.lastPlayADTime = Date.now();
		app.status.lastPlayRADTime = Date.now();
	}

	hasIAD() {
		return this.iad && this.iad.hasAD();
	}

	async showIAD() {
		this.iad && await this.iad.showAD();
		app.status.lastPlayADTime = Date.now();
	}

	log(name: string, data?: any, valueSum: number = 1) {
		app.platform.logEvent(name, data, valueSum);
	}

	private suportAD_: boolean;
	suportAD() {
		if (this.suportAD_ === undefined) {
			let apis = FBInstant.getSupportedAPIs();
			this.suportAD_ = apis.indexOf("getRewardedVideoAsync") > -1 && apis.indexOf("getInterstitialAdAsync") > -1
		}
		return this.suportAD_;
	}
}