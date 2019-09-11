/**
 *
 * 长度比较对话框控件。困难难度用。
 * 本控件只直接显示用户填入的数据。不进行横竖校准等计算。
 *
 */
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
function anyObj() {
}
var eyelen3E;
(function (eyelen3E) {
    var CCmpLenDlg = (function (_super) {
        __extends(CCmpLenDlg, _super);
        function CCmpLenDlg() {
            var _this = _super.call(this) || this;
            _this.m2_cc = false;
            _this.m_trueWidth = 0;
            _this.m_trueHeight = 0;
            _this.m_childrenCreated = false;
            _this.m_nextBtnEventCache = new anyObj();
            _this.m_flagsArr = new Array();
            var i;
            for (i = 0; i < 3; ++i) {
                _this.m_flagsArr[i] = new egret.Bitmap();
            }
            _this.m_flagsArr[0].texture = RES.getRes("score_flag_png");
            _this.m_flagsArr[1].texture = RES.getRes("score_dot_png");
            _this.m_flagsArr[2].texture = RES.getRes("score_flag_png");
            _this.m_flagsContainer = new egret.DisplayObjectContainer();
            var i;
            for (i = 0; i < 3; ++i) {
                _this.m_flagsArr[i].width = 35;
                _this.m_flagsArr[i].height = 45;
                _this.m_flagsArr[i].x = i * 45;
                _this.m_flagsArr[i].y = 0;
                _this.m_flagsContainer.addChild(_this.m_flagsArr[i]);
            }
            _this.m_correLenShape = new egret.Shape();
            _this.m_userLenShape = new egret.Shape();
            _this.m2_cc = true;
            if (_this.m_trueWidth > 0) {
                _this.width = _this.m_trueWidth;
            }
            if (_this.m_trueHeight > 0) {
                _this.height = _this.m_trueHeight;
            }
            return _this;
        }
        CCmpLenDlg.prototype.readjustUI = function () {
            if (this.m_trueHeight < 350) {
                // 高度小于350时，子元素保持原有大小和坐标。
            }
            else {
                this.nextBtn.x = this.m_trueWidth / 2 - 32;
                this.nextBtn.y = this.m_trueHeight * 240 / 350;
                this.scoreValue.y = this.m_trueHeight * 20 / 350;
                this.correLenIcon.y = this.m_trueHeight * 135 / 350;
                this.correLen.y = this.m_trueHeight * 139 / 350;
                this.userLenIcon.y = this.m_trueHeight * 190 / 350;
                this.userLen.y = this.m_trueHeight * 195 / 350;
                this.scoreFlags.y = this.m_trueHeight * 70 / 350;
                this.scoreValue.x = this.m_trueWidth / 2 - this.scoreValue.width / 2;
                this.scoreFlags.x = this.m_trueWidth * 0.5 - 50;
            }
        };
        CCmpLenDlg.prototype.childrenCreated = function () {
            this.m_childrenCreated = true;
            // Do the actions planed to do after children created.
            if (this.m_nextBtnEventCache.type) {
                this._onNextBtnEvent(this.m_nextBtnEventCache.type, this.m_nextBtnEventCache.listener, this.m_nextBtnEventCache.thisObject);
            }
            this._setScore(this.m2_tmpScore);
            this._setCorreLen(this.m2_tmpCorreLen);
            this._setUserLen(this.m2_tmpUserLen);
            this.scoreFlags.addChild(this.m_flagsContainer);
            this.userLen.addChild(this.m_userLenShape);
            this.correLen.addChild(this.m_correLenShape);
        };
        CCmpLenDlg.prototype.setTrueWidth = function (w) {
            this.m_trueWidth = w;
            if (this.m2_cc) {
                this.width = w;
            }
        };
        CCmpLenDlg.prototype.setTrueHeight = function (h) {
            this.m_trueHeight = h;
            if (this.m2_cc) {
                this.height = h;
            }
        };
        /*
        * 设置界面上的得分。请勿直接调用本函数，应当调用 setScore函数 。
        */
        CCmpLenDlg.prototype._setScore = function (v) {
            var i;
            this.scoreValue.text = "+" + v;
            for (i = 0; i * 10 < v; i++) {
                this.m_flagsArr[i].texture = RES.getRes("score_flag_png");
            }
            for (; i < 3; i++) {
                this.m_flagsArr[i].texture = RES.getRes("score_cross_png");
            }
        };
        /*
        * 设置界面上的正确长度。请勿直接调用本函数，应当调用 setCorreLen函数。
        */
        CCmpLenDlg.prototype._setCorreLen = function (v) {
            if (!isNaN(v)) {
                this.m_correLenShape.graphics.clear();
                this.m_correLenShape.graphics.beginFill(0x55CCAA);
                this.m_correLenShape.graphics.drawRect(0, 0, v, this.correLen.height);
                this.m_correLenShape.graphics.endFill();
            }
        };
        /*
        * 设置界面上的用户长度。请勿直接调用本函数，应当调用 setUserLen函数。
        */
        CCmpLenDlg.prototype._setUserLen = function (v) {
            if (!isNaN(v)) {
                this.m_userLenShape.graphics.clear();
                this.m_userLenShape.graphics.beginFill(0x55CCAA);
                this.m_userLenShape.graphics.drawRect(0, 0, v, this.userLen.height);
                this.m_userLenShape.graphics.endFill();
            }
        };
        CCmpLenDlg.prototype._onNextBtnEvent = function (type, listener, thisObject) {
            this.nextBtn.addEventListener(type, listener, thisObject);
        };
        CCmpLenDlg.prototype.setScore = function (v) {
            this.m2_tmpScore = v; //Save to temp and show it after children created.
            if (this.m_childrenCreated) {
                this._setScore(v);
            }
            else {
                //If children not created yet, left to childrenCreated() to continue the remaining job.
            }
        };
        CCmpLenDlg.prototype.setCorreLen = function (v) {
            this.m2_tmpCorreLen = v;
            if (this.m_childrenCreated) {
                this._setCorreLen(v);
            }
            else {
            }
        };
        CCmpLenDlg.prototype.setUserLen = function (v) {
            this.m2_tmpUserLen = v;
            if (this.m_childrenCreated) {
                this._setUserLen(v);
            }
            else {
            }
        };
        CCmpLenDlg.prototype.onNextBtnEvent = function (type, listener, thisObject) {
            if (this.m_childrenCreated) {
                this._onNextBtnEvent(type, listener, thisObject);
            }
            else {
                // Save the parms into cache and plan to do it when ready.
                this.m_nextBtnEventCache.type = type;
                this.m_nextBtnEventCache.listener = listener;
                this.m_nextBtnEventCache.thisObject = thisObject;
            }
        };
        return CCmpLenDlg;
    }(eui.Component));
    eyelen3E.CCmpLenDlg = CCmpLenDlg;
    __reflect(CCmpLenDlg.prototype, "eyelen3E.CCmpLenDlg");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CCmpLenDlg.js.map