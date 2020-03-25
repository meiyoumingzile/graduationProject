
class Director {
    noticeLayer: egret.Sprite;
    popupLayer: eui.UILayer;

    stage: egret.Stage;

    private modelMask_: egret.Sprite;
    constructor(stage: egret.Stage) {
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
        this.modelMask_.addEventListener(egret.TouchEvent.TOUCH_TAP, e => {
            for (let i = this.popupLayer.numChildren - 1; i >= 0; --i) {
                let pnl = this.popupLayer.getChildAt(i);
                if (pnl instanceof BasePopup && pnl.autoClose) {
                    this.rmPopup(pnl);
                    break;
                }
            }
        }, null);
        this.onResize();

        this.popupLayer.addChild(this.modelMask_);
    }

    private onResize() {
        this.modelMask_.graphics.clear();
        this.modelMask_.graphics.beginFill(0, 1);
        this.modelMask_.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.modelMask_.alpha = .7;
    }

    private updateModal() {
        let findModal = false;
        this.modelMask_.removeFromParent();
        for (let i = this.popupLayer.numChildren - 1; i >= 0; --i) {
            let p = this.popupLayer.getChildAt(i) as BasePopup;
            if (p.modal) {
                this.modelMask_.alpha = p.modalAlpha;
                this.popupLayer.addChildAt(this.modelMask_, i);
                findModal = true;
                break;
            }
        }
        this.modelMask_.visible = findModal;
    }

    public _popUpCache = {};
    addPopup(inst: BasePopup): BasePopup {
        if (this._popUpCache[inst.hashCode]) return;
        this._popUpCache[inst.hashCode] = inst;
        if (inst.fullscreen) {
            inst.height = this.stage.stageHeight;
            inst.width = this.stage.stageWidth
        };
        this.popupLayer.addChild(inst);

        inst.modal && this.updateModal();
        inst.center && this.centerPopup(inst);

        inst.once(egret.Event.CLOSE, (e: egret.Event) => {
            delete this._popUpCache[inst.hashCode];
            inst.removeAllEventListeners();
            inst.removeFromParent();
            inst.onExit();
            inst.modal && this.updateModal();
        }, this)

        inst.onEnter();
        if (!inst.animateIn) {
            inst.onReady();
        } else {
            inst.visible = false;
            egret.setTimeout(() => {
                inst.visible = true;
                inst.fadeIn().call(() => {
                    inst.onReady();
                })
            }, this, 0)
        }

        return inst;
    }

    rmPopup(inst: BasePopup) {
        inst.close();
    }

    rmAllPopup() {
        let keys = Object.keys(this._popUpCache);
        while (keys.length > 0) {
            let inst = this._popUpCache[keys.pop()];
            this.rmPopup(inst);
        }
    }

    getPopup<T>(cls: new (...args) => T) {
        let target: T = null;
        for (let k in this._popUpCache) {
            let pnl = this._popUpCache[k]
            if (pnl instanceof cls) {
                return pnl;
            }
        }
        return null;
    }

    private centerPopup(inst: egret.DisplayObject) {
        let x = (this.stage.stageWidth - inst.width) * .5
        let y = (this.stage.stageHeight - inst.height) * .5

        inst.x = x - inst.anchorOffsetX
        inst.y = y - inst.anchorOffsetY
    }

    private _busyCount = 0;
    private _busyInst: BusyIndicator;
    private _busy_timer = 0;
    busy() {
        egret.clearTimeout(this._busy_timer);
        egret.setTimeout(this.busyTimerOut, this, 20000);
        if (this._busyCount++ == 0) {
            this._busyInst = new BusyIndicator();
            this.addPopup(this._busyInst);
        }
    }
    rmBusy() {
        if (--this._busyCount <= 0 && this._busyInst) {
            this.rmPopup(this._busyInst);
            this._busyInst = null
        }
    }

    private busyTimerOut() {
        this._busyCount = 0;
        if (this._busyInst) {
            this.rmPopup(this._busyInst);
            this._busyInst = null
        }
    }

    toast(text: string, duration: number = 1000, distance: number = 200) {
        const txt = new Toast(text);
        Context.stage.addChild(txt);
        txt.x = (Context.stage.stageWidth - txt.width) >> 1
        txt.y = (Context.stage.stageHeight - txt.height) >> 1

        egret.Tween.get(txt)
            .to({ y: txt.y - distance / 2, alpha: 1 }, duration >> 1, egret.Ease.quadOut)
            .to({ alpha: 0, y: txt.y - distance }, duration >> 1, egret.Ease.quadIn)
            .call(
            () => txt.removeFromParent()
            );
    }
}