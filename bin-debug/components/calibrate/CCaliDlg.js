/**********************************************************
 * /src/components/calibrate/CCaliDlg.ts
 * 横竖校准对话框。（2016-09-29版）
 * 若屏幕输出的宽高比不是 1:1 ，则需要用户进行横竖校准，否则会严重影响练习效果。
 *
 **********************************************************/
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
var g2_pcnt = 0;
var g2_mcnt = 0;
var eyelen3E;
(function (eyelen3E) {
    var CCaliDlg = (function (_super) {
        __extends(CCaliDlg, _super);
        function CCaliDlg() {
            var _this = _super.call(this) || this;
            _this.m_caliImgTag = 1;
            _this.m_caRate = 1.0; //校准系数初始为1.0。
            _this.m_autoUpdateFromCaliField = true;
            _this.m_caliPresenter = new CCaliPresenterAdapter();
            _this.m_caliPresenter.setInitA1(_this.m_caRate);
            return _this;
        }
        CCaliDlg.prototype._setParentContainer = function (c) {
            this.m_parentContainer = c;
            this._getParentContainer().getDlgLayer().addChild(CDispObj2EgretDOAdapter.from(this));
        };
        CCaliDlg.prototype._getParentContainer = function () {
            return this.m_parentContainer;
        };
        CCaliDlg.prototype._setCloseListener = function (closeListener) {
            this.m_closeListener = closeListener;
        };
        CCaliDlg.prototype._closeDlg = function () {
            this.visible = false;
            if (this.m_closeListener) {
                this.m_closeListener(false); // 从外部关闭，认为是取消。
            }
        };
        CCaliDlg.prototype.setSceneRect = function (x, y, wid, hei) {
            //设置父场景大小和坐标偏移量，以便确定确认框的显示位置。
            this.x = x + (wid - 400) / 2;
            this.y = y + (hei - 580) / 5 * 2;
        };
        CCaliDlg.prototype.childrenCreated = function () {
            this.OKBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOK, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPlusTchBegin, this);
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onPlusTchEnd, this);
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onPlusTchEnd, this); //避免释放后继续自动增大。
            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMinusTchBegin, this);
            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onMinusTchEnd, this);
            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMinusTchEnd, this); //避免释放后继续自动减小。
            this.undoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUndo, this);
            this.redoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRedo, this);
            this.caliRateField.addEventListener(egret.Event.CHANGE, this.onCaliRateFieldChange, this);
            this.caliSquareCover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCaliSquareCoverTap, this);
            this.chCaliImgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCaliImgBtnTap, this);
            this.lockCB.addEventListener(egret.Event.CHANGE, this.onlockCBChanged, this);
            this.refreshCaRateField();
            this.m_plusTimer = new egret.Timer(200, 0);
            this.m_minusTimer = new egret.Timer(200, 0);
        };
        /*
        * 获取对话框设定的横竖校准系数值。
        */
        CCaliDlg.prototype.getCaliRat = function () {
            return this.m_caRate;
        };
        CCaliDlg.prototype.getSquareWidth = function () {
            return this.m_squareWidth;
        };
        CCaliDlg.prototype.setSquareWidth = function (w) {
            //Set the width of caliSquare and other relevant components.
            this.m_squareWidth = w;
            this.caliSquare.width = w;
            this.caliImg.width = w;
        };
        /*
        * 根据内存里的系数值刷新界面。
        */
        CCaliDlg.prototype.refreshCaRateField = function () {
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = this.m_caRate.toString();
            this.m_autoUpdateFromCaliField = true;
            this.setSquareWidth(this.caliSquare.height * this.m_caRate);
        };
        /*
        * 以触摸方式输入校准系数时触发。
        */
        CCaliDlg.prototype.onCaliSquareCoverTap = function (evt) {
            if (this.m_locked) {
                return;
            }
            this.setSquareWidth(evt.stageX - (this.caliSquareCover.x + this.x)); //Be careful if a parent added!
            this.m_caRate = this.caliSquare.width / this.caliSquare.height;
            this.caliRateField.text = this.m_caRate.toString();
            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();
        };
        /*
        * 在文本框里输入校准系数时触发。
        */
        CCaliDlg.prototype.onCaliRateFieldChange = function (evt) {
            if (this.m_autoUpdateFromCaliField) {
                if (gdeint.EintValidators.CaRatValidator.validate(evt.target.text)) {
                    var tmpCaRate = gdeint.EintParsers.CaRatParser.parseFloat(evt.target.text);
                    if (tmpCaRate > 1.8) {
                        tmpCaRate = 1.8;
                    }
                    this.m_caliPresenter.inputA1(tmpCaRate);
                    if (Math.abs(this.m_caRate - this.m_caliPresenter.getA1()) > 0.000001) {
                        this.m_caliPresenter.recA1();
                    }
                    this.m_caRate = tmpCaRate;
                    this.setSquareWidth(this.caliSquare.height * tmpCaRate);
                }
                else {
                }
            }
        };
        /*
        * 锁定复选框触摸时触发。锁定输入以便用户进行尺寸测量。
        */
        CCaliDlg.prototype.onlockCBChanged = function (evt) {
            if (evt.target.selected) {
                this.m_locked = true;
                this.caliRateField.enabled = false;
            }
            else {
                this.m_locked = false;
                this.caliRateField.enabled = true;
            }
        };
        CCaliDlg.prototype.onCaliImgBtnTap = function (evt) {
            this.m_caliImgTag = this.m_caliImgTag % 3 + 1;
            this.caliImg.source = "square" + this.m_caliImgTag + "_png";
            playBtnSnd();
        };
        /*
        * 点击确定按钮时触发。
        */
        CCaliDlg.prototype.onOK = function () {
            this.visible = false;
            this._getParentContainer().setCaRat(this.getCaliRat());
            var argArr = new Array(); // apply是javascript方法所以要用javascript对象。
            argArr[0] = true;
            this._getParentContainer().applyFunc(this.m_closeListener, argArr);
        };
        /*
        * 右上角关闭按钮触摸时触发。
        */
        CCaliDlg.prototype.onClose = function () {
            this.visible = false;
            var argArr = new Array(); // apply是javascript方法所以要用javascript对象。
            argArr[0] = false;
            this._getParentContainer().applyFunc(this.m_closeListener, argArr);
        };
        /*
        * 增大按钮长按时触发。
        */
        CCaliDlg.prototype.onPlusTimer = function () {
            if (this.m_caRate >= 1.8) {
                return;
            }
            this.m_caRate += 0.01; //Global var should be used!!
            g2_pcnt++;
            if (g2_pcnt > 10) {
                this.m_caRate += 0.09; //Totally 0.1
            }
            this.refreshCaRateField();
            if (3 == g2_pcnt % 5) {
                this.m_caliPresenter.inputA1(this.m_caRate);
                this.m_caliPresenter.recA1();
            }
        };
        /*
        * 增大按钮释放时（包括单击和长按）触发。
        */
        CCaliDlg.prototype.onPlusTchEnd = function () {
            g2_pcnt = 0;
            this.m_plusTimer.stop();
            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();
        };
        /*
        * 增大按钮开始触摸（包括单击和长按）时触发。
        */
        CCaliDlg.prototype.onPlusTchBegin = function () {
            if (this.m_locked) {
                return;
            }
            if (this.m_caRate >= 1.8) {
                return;
            }
            this.m_caRate += 0.01; //Global var should be used!!
            g2_pcnt++;
            this.refreshCaRateField();
            this.m_plusTimer.stop();
            this.m_plusTimer.addEventListener(egret.TimerEvent.TIMER, this.onPlusTimer, this);
            this.m_plusTimer.start();
        };
        /*
        * 减小按钮长按时触发。
        */
        CCaliDlg.prototype.onMinusTimer = function () {
            this.m_caRate -= 0.01; //Global var should be used!!
            g2_mcnt++;
            if (g2_mcnt > 10) {
                this.m_caRate -= 0.09; //Totally 0.1
            }
            if (this.m_caRate < 0) {
                this.m_caRate = 0.00001;
            }
            this.refreshCaRateField();
            if (3 == g2_pcnt % 5) {
                this.m_caliPresenter.inputA1(this.m_caRate);
                this.m_caliPresenter.recA1();
            }
        };
        /*
        * 减小按钮开始触摸（包括单击和长按）时触发。
        */
        CCaliDlg.prototype.onMinusTchBegin = function () {
            if (this.m_locked) {
                return;
            }
            this.m_caRate -= 0.01; //Global var should be used!!
            g2_mcnt++;
            if (this.m_caRate < 0) {
                this.m_caRate = 0.00001;
            }
            this.refreshCaRateField();
            this.m_minusTimer.stop();
            this.m_minusTimer.addEventListener(egret.TimerEvent.TIMER, this.onMinusTimer, this);
            this.m_minusTimer.start();
        };
        /*
        * 减小按钮释放（包括单击和长按）时触发。
        */
        CCaliDlg.prototype.onMinusTchEnd = function () {
            g2_mcnt = 0;
            this.m_minusTimer.stop();
            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();
        };
        /*
        * 撤销按钮点击时触发。
        */
        CCaliDlg.prototype.onUndo = function () {
            this.m_caliPresenter.undoA1();
            var newA1 = this.m_caliPresenter.getA1();
            this.m_caRate = newA1;
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = newA1.toString();
            this.m_autoUpdateFromCaliField = true;
            this.setSquareWidth(this.caliSquare.height * newA1);
        };
        /*
        * 重做按钮点击时触发。
        */
        CCaliDlg.prototype.onRedo = function () {
            this.m_caliPresenter.redoA1();
            var newA1 = this.m_caliPresenter.getA1();
            this.m_caRate = newA1;
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = newA1.toString();
            this.m_autoUpdateFromCaliField = true;
            this.setSquareWidth(this.caliSquare.height * newA1);
        };
        CCaliDlg.prototype.show = function () {
            this.visible = true;
        };
        CCaliDlg.prototype.hide = function () {
            this.visible = false;
        };
        CCaliDlg.prototype.isVisible = function () {
            return this.visible;
        };
        return CCaliDlg;
    }(eui.Component));
    eyelen3E.CCaliDlg = CCaliDlg;
    __reflect(CCaliDlg.prototype, "eyelen3E.CCaliDlg", ["ICaliDlgPlugin", "ICaliDlg", "gdeint.IHidable", "IContainerPlugin"]);
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CCaliDlg.js.map