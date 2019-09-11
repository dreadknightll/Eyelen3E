/***********************************************************
* /src/UI/scenes/other/loadingUI_Eint_V2.ts
* 程序启动时的资源加载界面。
* 使用方法：创建对象 —> setWinSize —> create 。
*
************************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI_Eint_V2 = (function (_super) {
    __extends(LoadingUI_Eint_V2, _super);
    function LoadingUI_Eint_V2() {
        // 注意：new前要把全局变量g_winWidth和g_winHeight填写好，并且logo预加载完成。
        return _super.call(this) || this;
    }
    LoadingUI_Eint_V2.prototype.create = function () {
        this.width = this.m_winWidth;
        this.height = this.m_winHeight;
        this.createView();
        this.m_tchTimer = new egret.Timer(1000, 1);
        this.m_tchTimer.addEventListener(egret.TimerEvent.TIMER, this.onTchTimer, this);
        this.m_flashCnt = 0;
        this.m_flashTimer = new egret.Timer(300, 0);
        this.m_flashTimer.addEventListener(egret.TimerEvent.TIMER, this.onFlashTimer, this);
    };
    LoadingUI_Eint_V2.prototype.createView = function () {
        this.m_bg = new egret.Shape();
        this.m_bg.width = this.width;
        this.m_bg.height = this.height;
        this.m_bg.graphics.beginFill(0xFFFFFF);
        this.m_bg.graphics.drawRect(0, 0, this.m_bg.width, this.m_bg.height);
        this.m_bg.graphics.endFill();
        this.m_procra = new egret.TextField();
        this.m_procra.x = this.width / 2 - 200;
        this.m_procra.y = this.height * 0.2;
        this.m_procra.size = 56;
        this.m_procra.textColor = 0x000000;
        this.m_procra.text = "卓越是为了奉献";
        this.m_logo = new egret.Bitmap();
        this.m_logo.x = this.width / 2 - 60;
        this.m_logo.y = this.height * 0.3;
        this.m_logo.width = 240;
        this.m_logo.height = 128;
        this.m_logo.texture = RES.getRes("eint_logo_png");
        this.m_progress = new egret.TextField();
        this.m_progress.x = this.width / 2 - 90;
        this.m_progress.y = this.height * 0.6;
        this.m_progress.textColor = 0x000000;
        this.m_progress.textAlign = "center";
        this.m_p2c = new egret.TextField();
        this.m_p2c.x = this.width / 2 - 80;
        this.m_p2c.y = this.height * 0.7;
        this.m_p2c.textColor = 0x000000;
        this.m_p2c.text = "触摸屏幕继续";
        this.m_p2c.visible = false;
        this.addChild(this.m_bg);
        this.addChild(this.m_procra);
        this.addChild(this.m_logo);
        this.addChild(this.m_progress);
        this.addChild(this.m_p2c);
    };
    LoadingUI_Eint_V2.prototype.onTchTimer = function (evt) {
        this.m_p2c.visible = true; // and flash
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.m_flashTimer.start();
    };
    LoadingUI_Eint_V2.prototype.onFlashTimer = function (evt) {
        ++this.m_flashCnt;
        if (0 == this.m_flashCnt % 3) {
            this.m_p2c.visible = false;
        }
        else {
            this.m_p2c.visible = true;
        }
    };
    LoadingUI_Eint_V2.prototype.onTouch = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.m_flashTimer.stop();
        this.m_p2c.visible = true;
        this.visible = false;
    };
    LoadingUI_Eint_V2.prototype.setProgress = function (current, total) {
        this.m_progress.text = "准备中..." + (current / total * 100).toString().substr(0, 4) + "%";
        if (current == total) {
            this.m_tchTimer.start();
        }
    };
    LoadingUI_Eint_V2.prototype.setWinSize = function (wid, hei) {
        this.m_winWidth = wid;
        this.m_winHeight = hei;
    };
    /*
        接口方法。在加载进度增加时自动触发。
    */
    LoadingUI_Eint_V2.prototype.onProgress = function (current, total) {
        //        this.textField.text = `Loading...${current}/${total}`;
        this.setProgress(current, total);
    };
    return LoadingUI_Eint_V2;
}(egret.Sprite));
__reflect(LoadingUI_Eint_V2.prototype, "LoadingUI_Eint_V2", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI_Eint_V2.js.map