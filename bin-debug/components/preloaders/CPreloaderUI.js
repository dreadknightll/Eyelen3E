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
/**
 *
 * @author
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CPreloaderUI = (function (_super) {
        __extends(CPreloaderUI, _super);
        function CPreloaderUI() {
            var _this = _super.call(this) || this;
            _this.m_noUIPreloaderUI = new CNoUIPreloaderUI();
            _this.m_noUIPreloaderUI.setProgressListener(_this.onProgressListener, _this);
            _this.x = 0;
            _this.y = 0;
            _this.m_nextActTimer = new egret.Timer(2000, 1);
            return _this;
        }
        CPreloaderUI.prototype.setPreloader = function (preloader) {
            this.m_noUIPreloaderUI.setPreloader(preloader);
        };
        CPreloaderUI.prototype.setCompleteListener = function (listener, thisObj) {
            this.m_cmplListener = listener;
            this.m_cmplThisObj = thisObj;
            this.m_noUIPreloaderUI.setCompleteListener(this.onPreloadComplete, this);
        };
        CPreloaderUI.prototype.onPreloadComplete = function () {
            if (this.m_noUIPreloaderUI.m_proporFinished >= 100) {
                this.readyLabel.visible = true;
                this.m_nextActTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onNextActTimer, this);
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onScrTch, this);
                this.m_nextActTimer.start();
            }
            else {
                //No task left case. No action here.
            }
            this.m_cmplListener.apply(this.m_cmplThisObj);
        };
        CPreloaderUI.prototype.takeNextAct = function () {
            this.m_nextActListener.apply(this.m_nextActThisObj);
            this.m_nextActTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onNextActTimer, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onScrTch, this);
        };
        CPreloaderUI.prototype.onNextActTimer = function (evt) {
            this.takeNextAct();
        };
        CPreloaderUI.prototype.onScrTch = function (evt) {
            this.takeNextAct();
        };
        CPreloaderUI.prototype.setNextActListener = function (listener, thisObj) {
            this.m_nextActListener = listener;
            this.m_nextActThisObj = thisObj;
        };
        CPreloaderUI.prototype._setParentContainer = function (c) {
            this.m_noUIPreloaderUI._setParentContainer(c);
        };
        CPreloaderUI.prototype._getParentContainer = function () {
            return this.m_noUIPreloaderUI._getParentContainer();
        };
        CPreloaderUI.prototype.addTask = function (task) {
            this.m_noUIPreloaderUI.addTask(task);
        };
        CPreloaderUI.prototype.setNoTaskLeft = function (ntl) {
            this.m_noUIPreloaderUI.setNoTaskLeft(ntl);
        };
        CPreloaderUI.prototype.setSceneRect = function (x, y, wid, hei) {
            this.x = x + (wid - 400) / 2;
            this.y = y + (hei - 300) / 5 * 2;
        };
        CPreloaderUI.prototype.startPreload = function () {
            this.m_noUIPreloaderUI.startPreload();
        };
        CPreloaderUI.prototype.clearProgress = function () {
            this.m_noUIPreloaderUI.clearProgress();
            this.readyLabel.visible = false;
            this.cmplPropor.text = "0.0%";
        };
        CPreloaderUI.prototype.onProgressListener = function () {
            this.cmplPropor.text = this.m_noUIPreloaderUI.m_proporFinished + "%";
        };
        CPreloaderUI.prototype.show = function () {
            this.visible = true;
        };
        CPreloaderUI.prototype.hide = function () {
            this.visible = false;
        };
        CPreloaderUI.prototype.isVisible = function () {
            return this.visible;
        };
        return CPreloaderUI;
    }(eui.Component));
    eyelen3E.CPreloaderUI = CPreloaderUI;
    __reflect(CPreloaderUI.prototype, "eyelen3E.CPreloaderUI", ["IPreloaderUI", "IContainerPlugin", "gdeint.IHidable"]);
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CPreloaderUI.js.map