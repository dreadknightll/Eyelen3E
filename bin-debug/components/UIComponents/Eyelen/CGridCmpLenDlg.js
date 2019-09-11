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
 * 长度比较对话框格子版。简单难度用。
 * 本控件只直接显示用户填入的数据。不进行横竖校准等计算。
 *
 */
var eyelen3E;
(function (eyelen3E) {
    var CGridCmpLenDlg = (function (_super) {
        __extends(CGridCmpLenDlg, _super);
        function CGridCmpLenDlg() {
            var _this = _super.call(this) || this;
            //    private m_correLenShape: egret.Shape; // 正确长度画板。
            _this.m_userGridWidth = 30;
            _this.m_loadedGridCnt = 0; // 已加载的格子个数。若需要显示更多格子，则加载后增加此变量的值。
            _this.m2_cc = false; // 子界面元素是否已创建。
            _this.m_trueWidth = 0;
            _this.m_trueHeight = 0;
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
            _this.m_userLenGroup = new egret.DisplayObjectContainer();
            _this.m_userLenGridsArr = new Array();
            _this.loadGrids(12); //预加载12个格子，优化性能。
            return _this;
        }
        CGridCmpLenDlg.prototype.readjustUI = function () {
            if (this.m_trueHeight < 350) {
                // 高度小于350时，子元素保持原有大小和坐标。
            }
            else {
                this.nextBtn.x = this.m_trueWidth / 2 - 32;
                this.nextBtn.y = this.m_trueHeight * 240 / 350;
                this.scoreValue.y = this.m_trueHeight * 20 / 350;
                this.correLenIcon.y = this.m_trueHeight * 135 / 350;
                this.correLenRect.y = this.m_trueHeight * 139 / 350;
                this.userLenIcon.y = this.m_trueHeight * 190 / 350;
                this.userLenGrp.y = this.m_trueHeight * 195 / 350;
                this.scoreFlags.y = this.m_trueHeight * 70 / 350;
                this.scoreValue.x = this.m_trueWidth / 2 - this.scoreValue.width / 2;
                this.scoreFlags.x = this.m_trueWidth * 0.5 - 50;
            }
        };
        CGridCmpLenDlg.prototype.setTrueWidth = function (w) {
            this.m_trueWidth = w;
            if (this.m2_cc) {
                if (this.width < w) {
                    this.width = w;
                }
                this.readjustUI();
            }
        };
        CGridCmpLenDlg.prototype.setTrueHeight = function (h) {
            this.m_trueHeight = h;
            if (this.m2_cc) {
                if (this.height < h) {
                    this.height = h;
                }
                this.readjustUI();
            }
        };
        CGridCmpLenDlg.prototype.loadGrids = function (gridCnt) {
            var i;
            for (i = this.m_loadedGridCnt; i < gridCnt; ++i) {
                this.m_userLenGridsArr[i] = new CRulerEasyBodyCell();
                this.m_userLenGridsArr[i].texture = RES.getRes("rulerBodyCell2_gif");
                this.m_userLenGridsArr[i].x = i * this.m_userGridWidth /*30 * g_caRat*/;
                this.m_userLenGridsArr[i].width = this.m_userGridWidth /*30 * g_caRat*/;
                this.m_userLenGridsArr[i].height = 45;
                this.m_userLenGridsArr[i].visible = false;
                this.m_userLenGroup.addChild(this.m_userLenGridsArr[i]);
            }
            this.m_loadedGridCnt = gridCnt;
        };
        CGridCmpLenDlg.prototype.childrenCreated = function () {
            this.m2_cc = true;
            if (this.m_trueWidth > 0) {
                this.width = this.m_trueWidth;
            }
            else {
                this.m_trueWidth = this.width;
            }
            if (this.m_trueHeight > 0) {
                this.height = this.m_trueHeight;
            }
            else {
                this.m_trueWidth = this.width;
            }
            this.readjustUI();
            // Do the actions planed to do after children created.
            if (this.m_nextBtnEventCache.type) {
                this._onNextBtnEvent(this.m_nextBtnEventCache.type, this.m_nextBtnEventCache.listener, this.m_nextBtnEventCache.thisObject);
            }
            this._setScore(this.m2_tmpScore);
            this._setCorreLen(this.m2_tmpCorreLen);
            this._setUserGridCnt(this.m2_tmpUserGridCnt);
            this.scoreFlags.addChild(this.m_flagsContainer);
            //        this.userLen = this.m_userLenGroup;
            this.userLenGrp.addChild(this.m_userLenGroup);
            //        this.correLen = this.m_correLenShape;
        };
        /*
        * 设置得分。请勿直接调用本函数。应当调用 setScore函数。
        */
        CGridCmpLenDlg.prototype._setScore = function (v) {
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
        * 设置正确长度。请勿直接调用本函数。应当调用 setCorreLen函数。
        */
        CGridCmpLenDlg.prototype._setCorreLen = function (v) {
            if (!isNaN(v)) {
                /*            this.m_correLenShape.graphics.clear();
                            this.m_correLenShape.graphics.beginFill(0x55CCAA);
                            this.m_correLenShape.graphics.drawRect(0,0,v,this.correLen.height);
                            this.m_correLenShape.graphics.endFill();*/
                this.correLenRect.width = v;
            }
        };
        CGridCmpLenDlg.prototype._onNextBtnEvent = function (type, listener, thisObject) {
            this.nextBtn.addEventListener(type, listener, thisObject);
        };
        CGridCmpLenDlg.prototype.setScore = function (v) {
            this.m2_tmpScore = v; //Save to temp and show it after children created.
            if (this.m2_cc) {
                this._setScore(v);
            }
            else {
                //If children not created yet, left to childrenCreated() to continue the remaining job.
            }
        };
        CGridCmpLenDlg.prototype.setCorreLen = function (v) {
            this.m2_tmpCorreLen = v;
            if (this.m2_cc) {
                this._setCorreLen(v);
            }
            else {
            }
        };
        /*
        * 设置用户输入的格子数。请勿直接调用本函数，应当调用 setUserGridCnt函数。
        */
        CGridCmpLenDlg.prototype._setUserGridCnt = function (cnt) {
            if (!isNaN(cnt)) {
                if (this.m_loadedGridCnt < cnt) {
                    this.loadGrids(cnt);
                }
                for (i = 0; i < this.m_userLenGridsArr.length /*12*/; ++i) {
                    this.m_userLenGridsArr[i].x = i * this.m_userGridWidth /*30 * g_caRat*/;
                    this.m_userLenGridsArr[i].width = this.m_userGridWidth /*30 * g_caRat*/;
                }
                var i;
                for (i = 0; i < cnt; ++i) {
                    this.m_userLenGridsArr[i].visible = true;
                }
                for (; i < this.m_loadedGridCnt; ++i) {
                    this.m_userLenGridsArr[i].visible = false;
                }
            }
        };
        CGridCmpLenDlg.prototype.setUserGridWidth = function (gWidth) {
            this.m_userGridWidth = gWidth;
        };
        CGridCmpLenDlg.prototype.setUserGridCnt = function (cnt) {
            this.m2_tmpUserGridCnt = cnt;
            if (this.m2_cc) {
                this._setUserGridCnt(cnt);
            }
            else {
            }
        };
        /*
        * 下一长度按钮点击时触发。
        */
        CGridCmpLenDlg.prototype.onNextBtnEvent = function (type, listener, thisObject) {
            if (this.m2_cc) {
                this._onNextBtnEvent(type, listener, thisObject);
            }
            else {
                // Save the parms into cache and plan to do it when ready.
                this.m_nextBtnEventCache.type = type;
                this.m_nextBtnEventCache.listener = listener;
                this.m_nextBtnEventCache.thisObject = thisObject;
            }
        };
        return CGridCmpLenDlg;
    }(eui.Component));
    eyelen3E.CGridCmpLenDlg = CGridCmpLenDlg;
    __reflect(CGridCmpLenDlg.prototype, "eyelen3E.CGridCmpLenDlg");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CGridCmpLenDlg.js.map