class PagesViewController {
    private list: eui.Scroller;
    private _curPageIdx: number;// 当前页
    private _onTouchEndOld;
    protected isHorizontalScroll: boolean = true; // 是否是水平滚动
    protected viewport: any; // 需要渲染的item个数
    protected changePageCallback; // 滚动回调
    private sorollPre: number;// 拖拽回弹比例
    public constructor(plist: eui.Scroller, changePageCallback) {
        this.list = plist;
        this.changePageCallback = changePageCallback;
        this._curPageIdx = 0;

        let temp: any = this.list;
        this._onTouchEndOld = temp.onTouchEnd;
        temp.onTouchEnd = this.touchEndEvent.bind(this);

        this.viewport = temp.viewport;
        // 获取滚动方向
        this.isHorizontalScroll = temp.viewport.layout instanceof eui.HorizontalLayout;

        // 隐藏滚动条
        this.list.horizontalScrollBar.autoVisibility = false;
        this.list.verticalScrollBar.autoVisibility = false;

        this.sorollPre = 8;
    }

    // 获取当前页
    public getCurPage(): number {
        return this._curPageIdx;
    }

    protected checkScroll() {
        // 水平滚动
        if (this.isHorizontalScroll) {
            if (this.list.viewport.scrollH < 0) return;
            if (this.list.viewport.scrollH > this.list.viewport.contentWidth - this.list.width) return;

            // 一页的宽度
            let pageWidth = this.list.viewport.contentWidth / this.viewport.numElements;
            // 计算当前页坐标
            let curPagePos = this._curPageIdx * pageWidth;
            // 拖动距离
            let dis = this.list.viewport.scrollH - curPagePos;
            // 当拖动距离大于页宽度的4分之1，则成功拖动
            if (Math.abs(dis) > pageWidth / this.sorollPre) {
                if (dis > 0) {
                    this.scrollToPage(this._curPageIdx + 1);
                } else if (dis < 0) {
                    this.scrollToPage(this._curPageIdx - 1);
                }
            } else {// 否则归正
                this.scrollToPage(this._curPageIdx);
            }
        } else { // 垂直滚动
            if (this.list.viewport.scrollV < 0) return;
            if (this.list.viewport.scrollV > this.list.viewport.contentHeight - this.list.height) return;
            // 一页的高度
            let pageHeight = this.list.viewport.contentHeight / this.viewport.numElements;
            // 计算当前页坐标
            let curPagePos = this._curPageIdx * pageHeight;
            // 拖动距离
            let dis = this.list.viewport.scrollV - curPagePos;
            // 当拖动距离大于页宽度的4分之1，则成功拖动
            if (Math.abs(dis) > pageHeight / this.sorollPre) {
                if (dis > 0) {
                    this.scrollToPage(this._curPageIdx + 1);
                } else if (dis < 0) {
                    this.scrollToPage(this._curPageIdx - 1);
                }
            } else {// 否则归正
                this.scrollToPage(this._curPageIdx);
            }
        }
    }

    /**
     * !#en Scroll PageView to index.
     * !#zh 滚动到指定页面
     * @method scrollToPage
     * @param {Number} idx index of page.
     * @param {Number} timeInSecond scrolling time
     */
    public scrollToPage(idx, timeInSecond = 300) {
        if (idx < 0) {
            idx = 0;
        } else if (idx > this.viewport.numElements - 1) {
            idx = this.viewport.numElements - 1;
        }
        // if (idx == this._curPageIdx) return;
        this._curPageIdx = idx;
        this.list.stopAnimation();

        egret.Tween.removeTweens(this.list.viewport);
        // 水平滚动
        if (this.isHorizontalScroll) {
            // 计算目标页坐标
            let x = this._curPageIdx * (this.list.viewport.contentWidth / this.viewport.numElements);
            // 滚动动画
            egret.Tween.get(this.list.viewport, { loop: false })
                .to({ scrollH: x }, timeInSecond)
                .call(() => {
                    if (this.changePageCallback) {
                        this.changePageCallback(this._curPageIdx);
                    }
                });
        } else { // 垂直滚动
            // 计算目标页坐标
            let y = this._curPageIdx * (this.list.viewport.contentHeight / this.viewport.numElements);
            // 滚动动画
            egret.Tween.get(this.list.viewport, { loop: false })
                .to({ scrollV: y }, timeInSecond)
                .call(() => {
                    if (this.changePageCallback) {
                        this.changePageCallback(this._curPageIdx);
                    }
                });
        }
    }

    public touchEndEvent(event: egret.TouchEvent) {
        this._onTouchEndOld.call(this.list, event);
        if (!event.$isPropagationStopped) {
            this.checkScroll();
        }
    }
}