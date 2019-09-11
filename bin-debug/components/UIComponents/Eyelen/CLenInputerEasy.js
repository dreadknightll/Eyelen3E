/**
 *
 * 简单难度的长度输入控件。用户通过选择格子数量来确定要输入的长度。
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
//var g_caRat:number = 1; //To del later
var eyelen3E;
(function (eyelen3E) {
    var CLenInputerEasy = (function (_super) {
        __extends(CLenInputerEasy, _super);
        function CLenInputerEasy() {
            var _this = _super.call(this) || this;
            _this.m_gridWidth = 30;
            _this.m_loadedCellCnt = 0; //已加载的格子个数。
            _this.m_totalGridCnt = 12;
            _this.m_rulerBodyCellContainer = new egret.DisplayObjectContainer();
            _this.m_cells = new Array();
            _this.drawEmptyCells(_this.m_totalGridCnt);
            return _this;
        }
        CLenInputerEasy.prototype.drawEmptyCells = function (cellCnt) {
            var i;
            //1、加载未加载的格子：
            if (this.m_loadedCellCnt < cellCnt) {
                for (i = this.m_loadedCellCnt; i < cellCnt; ++i) {
                    this.m_cells[i] = new CRulerEasyBodyCell();
                    this.m_cells[i].m_tag = i;
                    this.m_cells[i].texture = RES.getRes("rulerBodyCell_gif");
                    this.m_cells[i].x = i * this.m_gridWidth;
                    this.m_cells[i].width = this.m_gridWidth;
                    this.m_cells[i].height = 60;
                    this.m_rulerBodyCellContainer.addChild(this.m_cells[i]);
                }
                this.m_loadedCellCnt = cellCnt;
            }
            //2、重新调整格子的尺寸和位置并显示：
            for (i = 0; i < cellCnt; ++i) {
                this.m_cells[i].x = i * this.m_gridWidth;
                this.m_cells[i].width = this.m_gridWidth;
                this.m_cells[i].visible = true;
            }
            //3、隐藏不显示的格子：
            for (; i < cellCnt; this.m_loadedCellCnt) {
                this.m_cells[i].visible = false;
            }
        };
        CLenInputerEasy.prototype.childrenCreated = function () {
            this.m_isDraging = false;
            this.m_firstDraged = false;
            this.okBtn.enabled = false;
            this.m_dragerBaseX = this.ruler_head.x + this.ruler_head.width;
            this.ruler_body_rect.width = 0;
            this.ruler_body_rect.height = 60;
            this.ruler_body_cells.addChild(this.m_rulerBodyCellContainer);
            var dragerShape;
            var innerBmp;
            var innerBg; // The size of it determines the dragable area.
            dragerShape = new egret.DisplayObjectContainer();
            innerBmp = new egret.Bitmap();
            innerBg = new egret.Shape();
            innerBmp.texture = RES.getRes("ruler_drager_png");
            innerBmp.width = 60;
            innerBmp.height = 80;
            innerBg.graphics.beginFill(0x000000, 0);
            innerBg.graphics.drawRect(0, 0, 90, 80);
            innerBg.graphics.endFill();
            dragerShape.addChild(innerBg);
            dragerShape.addChild(innerBmp);
            dragerShape.width = 200;
            this.m_rulerBodyCellContainer.touchEnabled = true;
            this.m_rulerBodyCellContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRulerTouch, this);
            this.ruler_body_rect.touchEnabled = true;
            this.ruler_body_rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRulerTouch, this);
        };
        /*
        * 用户触摸格子时触发。选定从尺盒出口到用户触摸处的所有格子。
        */
        CLenInputerEasy.prototype.onRulerTouch = function (evt) {
            if (this.m_isLocked) {
                return;
            }
            var cellEndTag = Math.floor(evt.localX / (this.m_gridWidth));
            if (cellEndTag >= this.m_totalGridCnt) {
                return;
            }
            playBtnSnd();
            this.m_userGridCnt = cellEndTag + 1;
            var i;
            for (i = 0; i < cellEndTag; ++i) {
                this.m_cells[i].check();
            }
            for (; i < this.m_totalGridCnt; ++i) {
                this.m_cells[i].uncheck();
            }
            var tmpWid = (Math.floor(cellEndTag) + 1) * this.m_gridWidth;
            this.ruler_body_rect.width = tmpWid;
            this.m_firstDraged = true;
            this.okBtn.enabled = true;
        };
        /*
        * 设置控件的宽度。参数wid为新宽度。通常根据屏幕宽度来设置。
        * 格子总数也需随着改变。
        */
        CLenInputerEasy.prototype.setWidth = function (wid) {
            this.width = wid;
            this.okBtn.x = wid - this.okBtn.width - 20;
            this.m_totalGridCnt = Math.floor((wid - 112) / this.m_gridWidth) - 2;
            this.drawEmptyCells(this.m_totalGridCnt);
        };
        CLenInputerEasy.prototype.getGridWidth = function () {
            return this.m_gridWidth;
        };
        CLenInputerEasy.prototype.getTotalGridCnt = function () {
            return this.m_totalGridCnt;
        };
        /*
        * 获取用户输入的格子数。
        */
        CLenInputerEasy.prototype.getUserGridCnt = function () {
            return this.m_userGridCnt;
        };
        /*
        * 清空用户输入。
        */
        CLenInputerEasy.prototype.clearLen = function () {
            this.ruler_body_rect.width = 0;
            this.m_firstDraged = false;
            this.okBtn.enabled = false;
        };
        CLenInputerEasy.prototype.lock = function () {
            this.m_isLocked = true;
            this.okBtn.enabled = false;
        };
        CLenInputerEasy.prototype.unlock = function () {
            this.m_isLocked = false;
            if (this.m_firstDraged) {
                this.okBtn.enabled = true;
            }
        };
        /*
        * 设置单个各自的宽度。格子越小难度越高。
        */
        CLenInputerEasy.prototype.setGridWidth = function (wid) {
            this.m_gridWidth = wid;
            var i;
            for (i = 0; i < this.m_totalGridCnt; ++i) {
                this.m_cells[i].m_tag = i;
                this.m_cells[i].texture = RES.getRes("rulerBodyCell_gif");
                this.m_cells[i].x = i * this.m_gridWidth;
                this.m_cells[i].width = this.m_gridWidth;
                this.m_cells[i].height = 60;
            }
        };
        return CLenInputerEasy;
    }(CLenInputerBase));
    eyelen3E.CLenInputerEasy = CLenInputerEasy;
    __reflect(CLenInputerEasy.prototype, "eyelen3E.CLenInputerEasy");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CLenInputerEasy.js.map