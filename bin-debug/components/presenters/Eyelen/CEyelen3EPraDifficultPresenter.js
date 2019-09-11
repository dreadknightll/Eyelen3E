var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * /src/components/presenters/CAnglePresenter.ts
 *
 * 练习界面的Presenter。包含待显示元素的坐标计算等。可单元测试。
 *
 */
var CEyelen3EPraDifficultPresenter = (function () {
    function CEyelen3EPraDifficultPresenter() {
        //顶部区域相关常量：
        this.s_thumbAreax = 25; //缩略图区域X坐标。
        this.s_thumbAreay = 0; //缩略图区域Y坐标。
        this.s_thumbAreaWidth = 428 - 250; //缩略图区域宽度。
        this.s_thumbAreaHeight = 160; //缩略图区域高度。
        this.s_thMaxWidth = 150; // 缩略图最大宽度。
        this.s_thMaxHeight = 120; // 缩略图最大高度。
        this.m_visibleStartY = 0; // 中部区域的可视区域起始Y坐标（相对于中部区域）。
        /*    private m_lenEdge1DispRect:gdeint.CRect;
            private m_lenQuestionerDispPt:gdeint.CPoint;
            private m_lenQuestionerFontSize:number;
            private m_lenEdge2DispRect:gdeint.CRect;*/
        this.m_userLen = 0; // 用户输入的长度值。(校准后)
        this.m_pm = new CEyelen3EPraMachineDifficult();
        this.m_itm = new gdeint.ImgThumbModelV2();
        this.m_itm.setThMaxWidth(this.s_thMaxWidth);
        this.m_itm.setThMaxHeight(this.s_thMaxHeight);
        this.m_imgSelRect = new gdeint.CRect();
        this.m_imgSelPtOri = new gdeint.CPoint();
        this.m_renderFilter = new CNoChangeRenderFilter();
        this.m_lenDispPtsRects = new CLenPtsRects();
        /*        this.m_lenEdge1DispRect = new gdeint.CRect();
                this.m_lenQuestionerDispPt = new gdeint.CPoint();
                this.m_lenQuestionerFontSize = -1;
                this.m_lenEdge2DispRect = new gdeint.CRect();*/
        /*        this.m_angleVertexPt = new CPoint();
                this.m_angleVertexDispPt = new CPoint();
                this.m_angleEdge1DispPt = new CPoint();
                this.m_angleEdge2DispPt = new CPoint();*/
    }
    CEyelen3EPraDifficultPresenter.prototype.bindPM = function (pm) {
        this.m_pm = pm;
    };
    CEyelen3EPraDifficultPresenter.prototype.unbindPM = function () {
        this.m_pm = null;
    };
    /*
     * 检验是否所有待填变量都已填好。并不完善，慎用。
     */
    CEyelen3EPraDifficultPresenter.prototype.allFieldsFilled = function () {
        if (isNaN(this.m_winWidth)) {
            return false;
        }
        if (isNaN(this.m_winHeight)) {
            return false;
        }
        if (isNaN(this.m_imgWidth)) {
            return false;
        }
        if (isNaN(this.m_imgHeight)) {
            return false;
        }
        if (null == this.m_imgSelRect) {
            return false;
        }
        else {
            if (isNaN(this.m_imgSelRect.m_left)) {
                return false;
            }
            if (isNaN(this.m_imgSelRect.m_top)) {
                return false;
            }
            if (isNaN(this.m_imgSelRect.m_width)) {
                return false;
            }
            if (isNaN(this.m_imgSelRect.m_height)) {
                return false;
            }
        }
        if (isNaN(this.m_thAreaWidth)) {
            return false;
        }
        if (isNaN(this.m_thAreaHeight)) {
            return false;
        }
        if (isNaN(this.m_score)) {
            return false;
        }
        if (isNaN(this.m_progress)) {
            return false;
        }
        if (null == this.m_len) {
            return false;
        }
        else {
            if (isNaN(this.m_len.m_length)) {
                return false;
            }
            if (isNaN(this.m_len.m_x)) {
                return false;
            }
            if (isNaN(this.m_len.m_y)) {
                return false;
            }
            if (null == this.m_len.m_imgPath) {
                return false;
            }
            if (null == this.m_len.m2_imgResName) {
                return false;
            }
        }
        if (isNaN(this.m_userLen)) {
            return false;
        }
        return true;
    };
    CEyelen3EPraDifficultPresenter.prototype.setITM = function (itm) {
        this.m_itm = itm;
    };
    /*
     * 强行修改缩略图区域X坐标。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThumbAreaX = function (x) {
        this.s_thumbAreax = x;
    };
    /*
     * 强行修改缩略图区域Y坐标。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThumbAreaY = function (y) {
        this.s_thumbAreay = y;
    };
    /*
     * 强行修改缩略图区域宽度。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThumbAreaWidth = function (wid) {
        this.s_thumbAreaWidth = wid;
    };
    /*
     * 强行修改缩略图区域高度。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThumbAreaHeight = function (hei) {
        this.s_thumbAreaHeight = hei;
    };
    /*
     * 强行修改缩略图最大宽度。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThMaxWidth = function (wid) {
        this.s_thMaxWidth = wid;
        this.m_itm.setThMaxWidth(this.s_thMaxWidth);
    };
    /*
     * 强行修改缩略图最大高度。
     */
    CEyelen3EPraDifficultPresenter.prototype.s_setThMaxHeight = function (hei) {
        this.s_thMaxHeight = hei;
        this.m_itm.setThMaxHeight(this.s_thMaxHeight);
    };
    /*
     * 设置所使用的渲染过滤器。
     */
    CEyelen3EPraDifficultPresenter.prototype.setRenderFilter = function (rf) {
        this.m_renderFilter = rf;
        this.m_pm.getLenChecker().setRenderFilter(rf);
    };
    CEyelen3EPraDifficultPresenter.prototype.getRenderFilter = function () {
        return this.m_renderFilter;
    };
    CEyelen3EPraDifficultPresenter.prototype.calcuLenPtsRects = function (l) {
        var ret;
        ret = new CLenPtsRects();
        //Edge1:
        if (l.m_isHor) {
            ret.m_lenEdge1DispRect.m_left = this.m_renderFilter.xOConv(l.m_x) - 5;
            ret.m_lenEdge1DispRect.m_top = l.m_y - 30;
            ret.m_lenEdge1DispRect.m_width = 5;
            ret.m_lenEdge1DispRect.m_height = 60;
        }
        else {
            ret.m_lenEdge1DispRect.m_left = this.m_renderFilter.xOConv(l.m_x) - 30;
            ret.m_lenEdge1DispRect.m_top = l.m_y - 5;
            ret.m_lenEdge1DispRect.m_width = 60;
            ret.m_lenEdge1DispRect.m_height = 5;
        }
        //Edge2:
        if (l.m_isHor) {
            ret.m_lenEdge2DispRect.m_left = this.m_renderFilter.xOConv(l.m_x + l.m_length);
            ret.m_lenEdge2DispRect.m_top = l.m_y;
            ret.m_lenEdge2DispRect.m_width = 5;
            ret.m_lenEdge2DispRect.m_height = 60;
        }
        else {
            ret.m_lenEdge2DispRect.m_left = this.m_renderFilter.xOConv(l.m_x) - 30;
            ret.m_lenEdge2DispRect.m_top = l.m_y + l.m_length;
            ret.m_lenEdge2DispRect.m_width = 60;
            ret.m_lenEdge2DispRect.m_height = 5;
        }
        //Questioner:
        if (l.m_isHor) {
            ret.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(l.m_x) + this.m_renderFilter.xOConv(l.m_length / 2) - 10;
            ret.m_lenQuestionerDispPt.m_y = l.m_y - 20;
        }
        else {
            ret.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(l.m_x) - 10;
            ret.m_lenQuestionerDispPt.m_y = l.m_y + l.m_length / 2 - 20;
        }
        ret.m_lenQuestionerFontSize = 36;
        return ret;
    };
    /*
     * 根据 m_len 刷新当前长度相关的几个区域和坐标变量等。
     */
    CEyelen3EPraDifficultPresenter.prototype.refreshLenPtsRects = function () {
        /*            private m_lenEdge1DispRect:CRect;
            private m_lenQuestionerDispPt:CPoint;
            private m_lenQuestionerFontSize:number;
            private m_lenEdge2DispRect:CRect;*/
        if (!this.m_len) {
            return;
        }
        this.m_lenDispPtsRects = this.calcuLenPtsRects(this.m_len);
        /*        //Edge1:
                if(this.m_len.m_isHor) {
                    this.m_lenEdge1DispRect.m_left = this.m_renderFilter.xOConv(this.m_len.m_x) - 5;
                    this.m_lenEdge1DispRect.m_top = this.m_len.m_y - 30;
                    this.m_lenEdge1DispRect.m_width = 5;
                    this.m_lenEdge1DispRect.m_height = 60;
                }
                else {
                    this.m_lenEdge1DispRect.m_left = this.m_renderFilter.xOConv(this.m_len.m_x) - 30;
                    this.m_lenEdge1DispRect.m_top = this.m_len.m_y - 5;
                    this.m_lenEdge1DispRect.m_width = 60;
                    this.m_lenEdge1DispRect.m_height = 5;
                }
        
                //Edge2:
                if(this.m_len.m_isHor) {
                    this.m_lenEdge2DispRect.m_left = this.m_renderFilter.xOConv(this.m_len.m_x + this.m_len.m_length);
                    this.m_lenEdge2DispRect.m_top = this.m_len.m_y;
                    this.m_lenEdge2DispRect.m_width = 5;
                    this.m_lenEdge2DispRect.m_height = 60;
                }
                else {
                    this.m_lenEdge2DispRect.m_left = this.m_renderFilter.xOConv(this.m_len.m_x) - 30;
                    this.m_lenEdge2DispRect.m_top = this.m_len.m_y + this.m_len.m_length;
                    this.m_lenEdge2DispRect.m_width = 60;
                    this.m_lenEdge2DispRect.m_height = 5;
                }
        
                //Questioner:
                if(this.m_len.m_isHor) {
                    this.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(this.m_len.m_x) + this.m_renderFilter.xOConv(this.m_len.m_length / 2) - 10;
                    this.m_lenQuestionerDispPt.m_y = this.m_len.m_y - 20;
                }
                else {
                    this.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(this.m_len.m_x) - 10;
                    this.m_lenQuestionerDispPt.m_y = this.m_len.m_y + this.m_len.m_length / 2 - 20;
                }
                this.m_lenQuestionerFontSize = 36;*/
    };
    /*
     * 与练习机器同步，获取最新数据。
     */
    CEyelen3EPraDifficultPresenter.prototype.updateFromPM = function () {
        this.m_score = this.m_pm.getCurScore();
        this.m_len = this.m_pm.getCurLen();
        this.refreshLenPtsRects();
    };
    CEyelen3EPraDifficultPresenter.prototype.submitToPM = function () {
    };
    CEyelen3EPraDifficultPresenter.prototype.clearTempData = function () {
    };
    /*
     * 进入下一长度。
     */
    CEyelen3EPraDifficultPresenter.prototype.nextLen = function () {
        this.m_pm.nextLen();
        if (this.getProgress() >= 10) {
            //练习已完成。
            this.setState(2);
        }
        else {
            //练习未完成。
            this.setState(0);
        }
    };
    CEyelen3EPraDifficultPresenter.prototype.fillScore = function (s) {
        this.m_score = s;
    };
    /*
     * 获取当前得分。
     */
    CEyelen3EPraDifficultPresenter.prototype.getScore = function () {
        return this.m_score;
    };
    CEyelen3EPraDifficultPresenter.prototype.fillProgress = function (p) {
        this.m_progress = p;
    };
    /*
     * 获取当前进度。
     */
    CEyelen3EPraDifficultPresenter.prototype.getProgress = function () {
        //        return this.m_pm.getCurProgress() + 1;
        return this.m_progress;
    };
    /*
     * 获取当前长度。
     */
    CEyelen3EPraDifficultPresenter.prototype.getLen = function () {
        return this.m_len;
    };
    /*
     * 获取最近一次目测准确度评定。
     */
    CEyelen3EPraDifficultPresenter.prototype.getCurRank = function () {
        return this.m_curRank;
    };
    /*
     * 设置窗口宽度。
     */
    CEyelen3EPraDifficultPresenter.prototype.setWinWidth = function (ww) {
        this.m_winWidth = ww;
        this.m_imgSelRect.m_width = ww;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    CEyelen3EPraDifficultPresenter.prototype.setWinHeight = function (wh) {
        this.m_winHeight = wh;
    };
    /*
     * 设置图片宽度。参数填原始宽度。
     */
    CEyelen3EPraDifficultPresenter.prototype.setImgWidth = function (w) {
        this.m_imgWidth = w;
        this.m_imgDispWidth = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgWidth(this.m_imgDispWidth);
    };
    /*
     * 获取图片原始宽度。
     */
    CEyelen3EPraDifficultPresenter.prototype.getImgWidth = function () {
        return this.m_imgWidth;
    };
    CEyelen3EPraDifficultPresenter.prototype.setImgHeight = function (h) {
        this.m_imgHeight = h;
        this.m_itm.setImgHeight(h);
    };
    CEyelen3EPraDifficultPresenter.prototype.getImgHeight = function () {
        return this.m_imgHeight;
    };
    /*
     * 设置图片选区位置。（填校准后坐标）
     */
    CEyelen3EPraDifficultPresenter.prototype.inpImgSelPt = function (imgSelPt) {
        var rect = new gdeint.CRect();
        rect.m_left = imgSelPt.m_x;
        rect.m_top = imgSelPt.m_y;
        rect.m_width = this.m_imgSelRect.m_width;
        rect.m_height = this.m_imgSelRect.m_height;
        this.m_imgSelRect = rect;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
        //记录起点坐标（校准前尺寸规格）
        this.m_imgSelPtOri.m_x = imgSelPt.m_x / this.m_renderFilter._getCaRat();
        this.m_imgSelPtOri.m_y = imgSelPt.m_y;
    };
    /*
     * 设置缩略图选区位置。同时影响图片选区位置。
     */
    CEyelen3EPraDifficultPresenter.prototype.inpThSelPt = function (thSelPt) {
        var imgSelPt;
        imgSelPt = this.m_itm.tp2Ip(thSelPt);
        this.inpImgSelPt(imgSelPt);
    };
    /*
     * 设置图片选区宽度（参数填原始宽度）。
     */
    CEyelen3EPraDifficultPresenter.prototype.inpImgSelWidth = function (w) {
        this.m_imgSelRect.m_width = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    CEyelen3EPraDifficultPresenter.prototype.inpImgSelHeight = function (h) {
        this.m_imgSelRect.m_height = h;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    /*
     * 填入用户输入的长度值。（填反横竖校准后的长度）
     */
    CEyelen3EPraDifficultPresenter.prototype.setUserLen = function (l) {
        /*        var tmp:number;
                if(this.m_pm.getCurLen().m_isHor) {
                    tmp = this.getRenderFilter().xIConv(l);
                }
                else {
                    tmp = l;
                }
        
                this.m_userLen = tmp;*/
        this.m_userLen = l;
    };
    /*
     * 提交用户输入的长度给练习机器。
     */
    CEyelen3EPraDifficultPresenter.prototype.submitLen = function () {
        this.m_pm.inpLen(this.m_userLen);
        var lenChecker = (this.m_pm.getLenChecker());
        lenChecker.setCorreOriLen(this.m_len.m_length);
        //        lenChecker.setCorreHor(this.m_len.m_isHor);
        lenChecker.setInputDispLen(this.m_userLen);
        this.m_curRank = lenChecker.checkLen();
        this.fillProgress(this.m_pm.getCmplProgress());
    };
    CEyelen3EPraDifficultPresenter.prototype.syncFromRenderFilter = function () {
        //renderFilter有改动后（例如caRat变更）调用本函数进行同步。
        var caRat = this.m_renderFilter._getCaRat();
        this.m_imgDispWidth = this.m_renderFilter.xOConv(this.m_imgWidth);
        //Update imgThumbModel:
        this.m_itm.setImgWidth(this.m_imgDispWidth);
        //Update selPt:
        var selPt = new gdeint.CPoint();
        selPt.m_x = this.m_imgSelPtOri.m_x * caRat;
        selPt.m_y = this.m_imgSelRect.m_top;
        this.inpImgSelPt(selPt);
        //imgSelWith 不变。
        this.refreshLenPtsRects();
    };
    /*
     * 设置横竖校准系数。
     */
    CEyelen3EPraDifficultPresenter.prototype.setCaRat = function (caRat) {
        this.m_renderFilter.setCaRat(caRat);
        this.syncFromRenderFilter();
    };
    /*
     * 临时显示一个长度，不影响练习机器里的数据。
     */
    CEyelen3EPraDifficultPresenter.prototype.showLen = function (len) {
        this.m_len = len;
        this.refreshLenPtsRects();
        //        Update itm
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    /*
     * 设置练习所用到的长度集合。
     */
    CEyelen3EPraDifficultPresenter.prototype.setLenArr = function (len) {
        this.m_pm.setLenArr(len);
    };
    /*
     * 设置当前状态。
     */
    CEyelen3EPraDifficultPresenter.prototype.setState = function (s) {
        //0:To input 1:checking 2:final
        this.m_state = s;
    };
    /*
     * 重新开始练习。
     */
    CEyelen3EPraDifficultPresenter.prototype.rePra = function () {
        // Start a new pra.
        this.m_curRank = 0;
        this.m_pm.rePra();
    };
    CEyelen3EPraDifficultPresenter.prototype.clearPra = function () {
        // Clear angles,progress and score.
        this.m_pm.clearPra();
        this.rePra();
    };
    /*
     * 获取经渲染过滤器输出后的图片区域。
     */
    CEyelen3EPraDifficultPresenter.prototype.getImgRect = function () {
        var oriRect, ret;
        oriRect = new gdeint.CRect();
        oriRect.m_left = -this.m_imgSelRect.m_left / this.m_renderFilter._getCaRat();
        oriRect.m_top = -this.m_imgSelRect.m_top + this.m_visibleStartY;
        oriRect.m_width = this.m_imgWidth;
        oriRect.m_height = this.m_imgHeight;
        ret = this.m_renderFilter.rectOConv(oriRect);
        return ret;
    };
    /*
     * 获取经渲染过滤器输出后的缩略图区域。
     */
    CEyelen3EPraDifficultPresenter.prototype.getThumbRect = function () {
        console.log("Getting thRect,thWidth:" + this.m_itm.getThWidth());
        this.m_itm.setImgWidth(this.m_renderFilter.xOConv(this.m_imgWidth));
        var ret;
        ret = new gdeint.CRect();
        ret.m_width = this.m_itm.getThWidth();
        ret.m_height = this.m_itm.getThHeight();
        ret.m_left = this.s_thumbAreax + (this.s_thumbAreaWidth - ret.m_width) / 2;
        ret.m_top = this.s_thumbAreay + (this.s_thumbAreaHeight - ret.m_height) / 2;
        return ret;
    };
    /*
     * 获得经渲染过滤器输出后的缩略图选区。
     */
    CEyelen3EPraDifficultPresenter.prototype.getThumbSelRect = function () {
        var ret;
        this.m_itm.setImgWidth(this.m_renderFilter.xOConv(this.m_imgWidth));
        //        var thRect:CRect;
        //        thRect = this.getThumbRect();
        var tsr = this.m_itm.getThSelRect();
        ret = new gdeint.CRect();
        ret.m_left = tsr.m_left;
        ret.m_top = tsr.m_top;
        ret.m_width = tsr.m_width;
        ret.m_height = tsr.m_height;
        return ret;
    };
    /*
     * 获得经渲染过滤器输出的缩略图问号坐标。
     */
    CEyelen3EPraDifficultPresenter.prototype.getThumbQuestionerDispPt = function () {
        var thRect;
        thRect = this.getThumbRect();
        var ret;
        var lenPt;
        //        lenPt = this.m_itm.ip2Tp(this.m_renderFilter.ptOConv(this.m_lenQuestionerDispPt));
        lenPt = this.m_itm.ip2Tp(this.m_lenDispPtsRects.m_lenQuestionerDispPt);
        ret = new gdeint.CPoint();
        ret.m_x = lenPt.m_x - 8;
        ret.m_y = lenPt.m_y - 12;
        return ret;
    };
    CEyelen3EPraDifficultPresenter.prototype.getLenEdge1DispRect = function () {
        return this.m_lenDispPtsRects.m_lenEdge1DispRect;
    };
    CEyelen3EPraDifficultPresenter.prototype.getLenQuestionerDispPt = function () {
        return this.m_lenDispPtsRects.m_lenQuestionerDispPt;
    };
    CEyelen3EPraDifficultPresenter.prototype.getLenQuestionerFontSize = function () {
        return this.m_lenDispPtsRects.m_lenQuestionerFontSize;
    };
    CEyelen3EPraDifficultPresenter.prototype.getLenEdge2DispRect = function () {
        return this.m_lenDispPtsRects.m_lenEdge2DispRect;
    };
    return CEyelen3EPraDifficultPresenter;
}());
__reflect(CEyelen3EPraDifficultPresenter.prototype, "CEyelen3EPraDifficultPresenter", ["IEyelen3EPraDifficultPresenter", "IPraPresenter", "IBindableWithPM", "IPresenterWithThumb", "IPresenterWithCa"]);
//# sourceMappingURL=CEyelen3EPraDifficultPresenter.js.map