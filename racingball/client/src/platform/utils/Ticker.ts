class Ticker {
	constructor(private cb_:Function, private target_:any, private interval_=0, private realTime_=false) {

	}

	private ticking_ = false;
	get ticking() { return this.ticking_; }
	set interval(v:number) { this.interval_ = v; }
	private time_:number;
	private elapsed_ = 0;
	public start() {
		if (!this.ticking_) {
			this.ticking_ = true;
			this.time_ = egret.getTimer();
			Context.stage.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
			// egret.startTick(this.tick, this);
		}
	}

	private tick() {
		let time = egret.getTimer();
		let dt = time - this.time_;
		if (!this.realTime_) dt = Math.min(dt, 60)
		this.time_ = time;
		if (this.interval_ === 0) {
			this.cb_.call(this.target_, dt)
		} else {
			this.elapsed_ += dt;
			if (this.elapsed_ >= this.interval_) {
				this.elapsed_ -= this.interval_;
				this.cb_.call(this.target_, this.interval_)
			}
		}
		return false;
	}

	public stop() {
		if (this.ticking_) {
			this.ticking_ = false;
			Context.stage.removeEventListener(egret.Event.ENTER_FRAME, this.tick, this);
			// egret.stopTick(this.tick, this);
		}
	}

}