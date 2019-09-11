/**************************************************
 * UI/scenes/CMainMenu.ts
 *
 * 主菜单画面。
 *
**************************************************/
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
var eyelen3E;
(function (eyelen3E) {
    var CMainMenu = (function (_super) {
        __extends(CMainMenu, _super);
        function CMainMenu() {
            var _this = _super.call(this) || this;
            _this.m_trueWidth = 480;
            _this.m_trueHeight = 744;
            _this.m2_cc = false;
            _this.m_startTimer = new egret.Timer(5000, 1);
            _this.m_startTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.startDifficult, _this);
            return _this;
        }
        CMainMenu.prototype.childrenCreated = function () {
            this.startEasyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startEasy, this);
            this.startEasyBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startEasy, this);
            this.startDifficultBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startDifficult, this);
            this.startDifficultBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startDifficult, this);
            this.m2_cc = true;
            this.rearrangeUI();
        };
        CMainMenu.prototype.setTrueWidth = function (w) {
            this.m_trueWidth = w;
            if (this.m2_cc) {
                this.rearrangeUI();
            }
        };
        CMainMenu.prototype.setTrueHeight = function (h) {
            this.m_trueHeight = h;
            if (this.m2_cc) {
                this.rearrangeUI();
            }
        };
        CMainMenu.prototype.rearrangeUI = function () {
            var scale, scale1, scale2;
            var leftGap = 0;
            scale1 = this.m_trueWidth / 400;
            scale2 = this.m_trueHeight / 744;
            if (scale1 < scale2) {
                scale = scale1;
                leftGap = 0;
            }
            else {
                scale = scale2;
                leftGap = (this.m_trueWidth / scale - 400) / 2;
            }
            this.menuGrp.left = 50.0 / 400 * this.m_trueWidth + leftGap;
            this.menuGrp.scaleX = scale;
            this.menuGrp.scaleY = scale;
        };
        CMainMenu.prototype.run = function () {
            this.m_startTimer.start();
        };
        /*
        * 开始简单练习。
        */
        CMainMenu.prototype.startEasy = function () {
            g_level = 1;
            /*        g_welcomeScene.visible = false;
                    this.visible = false;
    
                    g_praEasyScene.startNewPra();
                    g_praEasyScene.visible = true;
                    this.m_startTimer.stop();*/
            g_praEasyContainer.startNewPra();
            g_praEasyContainer.saveVisibleStates();
            g_pageJumper.gotoPage("PraEasyScene", null);
            this.m_startTimer.stop();
        };
        CMainMenu.prototype.startNormal = function () {
            g_level = 2;
        };
        /*
        * 开始困难练习。
        */
        CMainMenu.prototype.startDifficult = function () {
            g_level = 3;
            g_praDifficultContainer.startNewPra();
            //        先显示翻页动画 （未完成）
            g_praDifficultContainer.saveVisibleStates();
            g_pageJumper.gotoPage("PraDifficultScene", null);
            this.m_startTimer.stop();
        };
        /*
        * 回到欢迎屏幕。
        */
        CMainMenu.prototype.goBack = function () {
        };
        return CMainMenu;
    }(eui.Panel));
    eyelen3E.CMainMenu = CMainMenu;
    __reflect(CMainMenu.prototype, "eyelen3E.CMainMenu");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CMainMenu.js.map