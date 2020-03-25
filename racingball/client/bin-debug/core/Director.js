var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Director = (function () {
    function Director(stage) {
        var _this = this;
        this._popUpCache = {};
        this._busyCount = 0;
        this._busy_timer = 0;
        this.noticeLayer = new egret.Sprite();
        this.popupLayer = new eui.UILayer();
        stage.addChild(this.popupLayer);
        stage.addChild(this.noticeLayer);
        this.stage = stage;
        // $dev && this.stage.addChild(new FPSDisplay());
        this.popupLayer.touchThrough = true;
        this.modelMask_ = new egret.Sprite();
        this.modelMask_.visible = false;
        this.modelMask_.touchEnabled = true;
        this.modelMask_.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            for (var i = _this.popupLayer.numChildren - 1; i >= 0; --i) {
                var pnl = _this.popupLayer.getChildAt(i);
                if (pnl instanceof BasePopup && pnl.autoClose) {
                    _this.rmPopup(pnl);
                    break;
                }
            }
        }, null);
        this.onResize();
        this.popupLayer.addChild(this.modelMask_);
    }
    Director.prototype.onResize = function () {
        this.modelMask_.graphics.clear();
        this.modelMask_.graphics.beginFill(0, 1);
        this.modelMask_.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.modelMask_.alpha = .7;
    };
    Director.prototype.updateModal = function () {
        var findModal = false;
        this.modelMask_.removeFromParent();
        for (var i = this.popupLayer.numChildren - 1; i >= 0; --i) {
            var p = this.popupLayer.getChildAt(i);
            if (p.modal) {
                this.modelMask_.alpha = p.modalAlpha;
                this.popupLayer.addChildAt(this.modelMask_, i);
                findModal = true;
                break;
            }
        }
        this.modelMask_.visible = findModal;
    };
    Director.prototype.addPopup = function (inst) {
        var _this = this;
        if (this._popUpCache[inst.hashCode])
            return;
        this._popUpCache[inst.hashCode] = inst;
        if (inst.fullscreen) {
            inst.height = this.stage.stageHeight;
            inst.width = this.stage.stageWidth;
        }
        ;
        this.popupLayer.addChild(inst);
        inst.modal && this.updateModal();
        inst.center && this.centerPopup(inst);
        inst.once(egret.Event.CLOSE, function (e) {
            delete _this._popUpCache[inst.hashCode];
            inst.removeAllEventListeners();
            inst.removeFromParent();
            inst.onExit();
            inst.modal && _this.updateModal();
        }, this);
        inst.onEnter();
        if (!inst.animateIn) {
            inst.onReady();
        }
        else {
            inst.visible = false;
            egret.setTimeout(function () {
                inst.visible = true;
                inst.fadeIn().call(function () {
                    inst.onReady();
                });
            }, this, 0);
        }
        return inst;
    };
    Director.prototype.rmPopup = function (inst) {
        inst.close();
    };
    Director.prototype.rmAllPopup = function () {
        var keys = Object.keys(this._popUpCache);
        while (keys.length > 0) {
            var inst = this._popUpCache[keys.pop()];
            this.rmPopup(inst);
        }
    };
    Director.prototype.getPopup = function (cls) {
        var target = null;
        for (var k in this._popUpCache) {
            var pnl = this._popUpCache[k];
            if (pnl instanceof cls) {
                return pnl;
            }
        }
        return null;
    };
    Director.prototype.centerPopup = function (inst) {
        var x = (this.stage.stageWidth - inst.width) * .5;
        var y = (this.stage.stageHeight - inst.height) * .5;
        inst.x = x - inst.anchorOffsetX;
        inst.y = y - inst.anchorOffsetY;
    };
    Director.prototype.busy = function () {
        egret.clearTimeout(this._busy_timer);
        egret.setTimeout(this.busyTimerOut, this, 20000);
        if (this._busyCount++ == 0) {
            this._busyInst = new BusyIndicator();
            this.addPopup(this._busyInst);
        }
    };
    Director.prototype.rmBusy = function () {
        if (--this._busyCount <= 0 && this._busyInst) {
            this.rmPopup(this._busyInst);
            this._busyInst = null;
        }
    };
    Director.prototype.busyTimerOut = function () {
        this._busyCount = 0;
        if (this._busyInst) {
            this.rmPopup(this._busyInst);
            this._busyInst = null;
        }
    };
    Director.prototype.toast = function (text, duration, distance) {
        if (duration === void 0) { duration = 1000; }
        if (distance === void 0) { distance = 200; }
        var txt = new Toast(text);
        Context.stage.addChild(txt);
        txt.x = (Context.stage.stageWidth - txt.width) >> 1;
        txt.y = (Context.stage.stageHeight - txt.height) >> 1;
        egret.Tween.get(txt)
            .to({ y: txt.y - distance / 2, alpha: 1 }, duration >> 1, egret.Ease.quadOut)
            .to({ alpha: 0, y: txt.y - distance }, duration >> 1, egret.Ease.quadIn)
            .call(function () { return txt.removeFromParent(); });
    };
    return Director;
}());
__reflect(Director.prototype, "Director");
//# sourceMappingURL=Director.js.map