var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Ticker = (function () {
    function Ticker(cb_, target_, interval_, realTime_) {
        if (interval_ === void 0) { interval_ = 0; }
        if (realTime_ === void 0) { realTime_ = false; }
        this.cb_ = cb_;
        this.target_ = target_;
        this.interval_ = interval_;
        this.realTime_ = realTime_;
        this.ticking_ = false;
        this.elapsed_ = 0;
    }
    Object.defineProperty(Ticker.prototype, "ticking", {
        get: function () { return this.ticking_; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ticker.prototype, "interval", {
        set: function (v) { this.interval_ = v; },
        enumerable: true,
        configurable: true
    });
    Ticker.prototype.start = function () {
        if (!this.ticking_) {
            this.ticking_ = true;
            this.time_ = egret.getTimer();
            Context.stage.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
            // egret.startTick(this.tick, this);
        }
    };
    Ticker.prototype.tick = function () {
        var time = egret.getTimer();
        var dt = time - this.time_;
        if (!this.realTime_)
            dt = Math.min(dt, 60);
        this.time_ = time;
        if (this.interval_ === 0) {
            this.cb_.call(this.target_, dt);
        }
        else {
            this.elapsed_ += dt;
            if (this.elapsed_ >= this.interval_) {
                this.elapsed_ -= this.interval_;
                this.cb_.call(this.target_, this.interval_);
            }
        }
        return false;
    };
    Ticker.prototype.stop = function () {
        if (this.ticking_) {
            this.ticking_ = false;
            Context.stage.removeEventListener(egret.Event.ENTER_FRAME, this.tick, this);
            // egret.stopTick(this.tick, this);
        }
    };
    return Ticker;
}());
__reflect(Ticker.prototype, "Ticker");
//# sourceMappingURL=Ticker.js.map