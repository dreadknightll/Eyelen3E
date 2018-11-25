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
var CEyelen3EPraEasyPresenter = (function () {
    function CEyelen3EPraEasyPresenter() {
        //顶部区域相关常量：
        //（480*170）
        this.s_thumbAreax = 25; //缩略图区域X坐标。
        this.s_thumbAreay = 0; //缩略图区域Y坐标。
        this.s_thumbAreaWidth = 428 - 250; //缩略图区域宽度。
        this.s_thumbAreaHeight = 160; //缩略图区域高度。
        this.s_thMaxWidth = 150; // 缩略图最大宽度。
        this.s_thMaxHeight = 120; // 缩略图最大高度。
        this.m_visibleStartY = 0; // 中部区域的可视区域起始Y坐标（相对于中部区域）。
        //    public m_userLen: number = 0; // 用户输入的长度值。(校准后)
        this.m_userGCnt = 0; // 用户输入的格数。
        this.m_pm = new CEyelen3EPraMachineEasy();
        this.m_itm = new gdeint.ImgThumbModelV2();
        this.m_itm.setThMaxWidth(this.s_thMaxWidth);
        this.m_itm.setThMaxHeight(this.s_thMaxHeight);
        this.m_imgSelRect = new gdeint.CRect();
        this.m_imgSelPtOri = new gdeint.CPoint();
        this.m_renderFilter = new CNoChangeRenderFilter();
        this.m_lenEdge1DispRect = new gdeint.CRect();
        this.m_lenQuestionerDispPt = new gdeint.CPoint();
        this.m_lenQuestionerFontSize = -1;
        this.m_lenEdge2DispRect = new gdeint.CRect();
        /*        this.m_angleVertexPt = new CPoint();
                this.m_angleVertexDispPt = new CPoint();
                this.m_angleEdge1DispPt = new CPoint();
                this.m_angleEdge2DispPt = new CPoint();*/
    }
    CEyelen3EPraEasyPresenter.prototype.bindPM = function (pm) {
        this.m_pm = pm;
    };
    CEyelen3EPraEasyPresenter.prototype.unbindPM = function () {
        this.m_pm = null;
    };
    /*
     * 检验是否所有待填变量都已填好。并不完善，慎用。
     */
    CEyelen3EPraEasyPresenter.prototype.allFieldsFilled = function () {
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
        if (isNaN(this.m_userGCnt)) {
            return false;
        }
        return true;
    };
    CEyelen3EPraEasyPresenter.prototype.setITM = function (itm) {
        this.m_itm = itm;
    };
    /*
     * 强行修改缩略图区域X坐标。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThumbAreaX = function (x) {
        this.s_thumbAreax = x;
    };
    /*
     * 强行修改缩略图区域Y坐标。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThumbAreaY = function (y) {
        this.s_thumbAreay = y;
    };
    /*
     * 强行修改缩略图区域宽度。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThumbAreaWidth = function (wid) {
        this.s_thumbAreaWidth = wid;
    };
    /*
     * 强行修改缩略图区域高度。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThumbAreaHeight = function (hei) {
        this.s_thumbAreaHeight = hei;
    };
    /*
     * 强行修改缩略图最大宽度。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThMaxWidth = function (wid) {
        this.s_thMaxWidth = wid;
        this.m_itm.setThMaxWidth(this.s_thMaxWidth);
    };
    /*
     * 强行修改缩略图最大高度。
     */
    CEyelen3EPraEasyPresenter.prototype.s_setThMaxHeight = function (hei) {
        this.s_thMaxHeight = hei;
        this.m_itm.setThMaxHeight(this.s_thMaxHeight);
    };
    /*
     * 设置所使用的渲染过滤器。
     */
    CEyelen3EPraEasyPresenter.prototype.setRenderFilter = function (rf) {
        this.m_renderFilter = rf;
        this.m_pm.getLenChecker().setRenderFilter(rf);
    };
    CEyelen3EPraEasyPresenter.prototype.getRenderFilter = function () {
        return this.m_renderFilter;
    };
    /*
     * 根据 m_len 刷新当前长度相关的几个区域和坐标变量等。
     */
    CEyelen3EPraEasyPresenter.prototype.refreshLenPtsRects = function () {
        /*            private m_lenEdge1DispRect:CRect;
            private m_lenQuestionerDispPt:CPoint;
            private m_lenQuestionerFontSize:number;
            private m_lenEdge2DispRect:CRect;*/
        if (!this.m_len) {
            return;
        }
        //Edge1:
        if (this.m_len.m_isHor) {
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
        if (this.m_len.m_isHor) {
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
        if (this.m_len.m_isHor) {
            this.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(this.m_len.m_x) + this.m_renderFilter.xOConv(this.m_len.m_length / 2) - 10;
            this.m_lenQuestionerDispPt.m_y = this.m_len.m_y - 20;
        }
        else {
            this.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(this.m_len.m_x) - 10;
            this.m_lenQuestionerDispPt.m_y = this.m_len.m_y + this.m_len.m_length / 2 - 20;
        }
        this.m_lenQuestionerFontSize = 36;
    };
    /*
     * 与练习机器同步，获取最新数据。
     */
    CEyelen3EPraEasyPresenter.prototype.updateFromPM = function () {
        this.m_score = this.m_pm.getCurScore();
        this.m_len = this.m_pm.getCurLen();
        this.refreshLenPtsRects();
    };
    CEyelen3EPraEasyPresenter.prototype.submitToPM = function () {
    };
    CEyelen3EPraEasyPresenter.prototype.clearTempData = function () {
    };
    /*
     * 进入下一长度。
     */
    CEyelen3EPraEasyPresenter.prototype.nextLen = function () {
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
    CEyelen3EPraEasyPresenter.prototype.fillScore = function (s) {
        this.m_score = s;
    };
    /*
     * 获取当前得分。
     */
    CEyelen3EPraEasyPresenter.prototype.getScore = function () {
        return this.m_score;
    };
    CEyelen3EPraEasyPresenter.prototype.fillProgress = function (p) {
        this.m_progress = p;
    };
    /*
     * 获取当前进度。
     */
    CEyelen3EPraEasyPresenter.prototype.getProgress = function () {
        //        return this.m_pm.getCurProgress() + 1;
        return this.m_progress;
    };
    /*
     * 获取当前长度。
     */
    CEyelen3EPraEasyPresenter.prototype.getLen = function () {
        return this.m_len;
    };
    /*
     * 获取最近一次目测准确度评定。
     */
    CEyelen3EPraEasyPresenter.prototype.getCurRank = function () {
        return this.m_curRank;
    };
    /*
     * 设置窗口宽度。
     */
    CEyelen3EPraEasyPresenter.prototype.setWinWidth = function (ww) {
        this.m_winWidth = ww;
        this.m_imgSelRect.m_width = ww;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    CEyelen3EPraEasyPresenter.prototype.setWinHeight = function (wh) {
        this.m_winHeight = wh;
    };
    /*
     * 设置图片宽度。参数填原始宽度。
     */
    CEyelen3EPraEasyPresenter.prototype.setImgWidth = function (w) {
        this.m_imgWidth = w;
        this.m_imgDispWidth = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgWidth(this.m_imgDispWidth);
    };
    /*
     * 获取图片原始宽度。
     */
    CEyelen3EPraEasyPresenter.prototype.getImgWidth = function () {
        return this.m_imgWidth;
    };
    CEyelen3EPraEasyPresenter.prototype.setImgHeight = function (h) {
        this.m_imgHeight = h;
        this.m_itm.setImgHeight(h);
    };
    CEyelen3EPraEasyPresenter.prototype.getImgHeight = function () {
        return this.m_imgHeight;
    };
    /*
     * 设置图片选区位置。（填校准后坐标）
     */
    CEyelen3EPraEasyPresenter.prototype.inpImgSelPt = function (imgSelPt) {
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
    CEyelen3EPraEasyPresenter.prototype.inpThSelPt = function (thSelPt) {
        var imgSelPt;
        imgSelPt = this.m_itm.tp2Ip(thSelPt);
        this.inpImgSelPt(imgSelPt);
    };
    /*
     * 设置图片选区宽度（参数填原始宽度）。
     */
    CEyelen3EPraEasyPresenter.prototype.inpImgSelWidth = function (w) {
        this.m_imgSelRect.m_width = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    CEyelen3EPraEasyPresenter.prototype.inpImgSelHeight = function (h) {
        this.m_imgSelRect.m_height = h;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    /*
     * 填入用户输入的角度值。（填反横竖校准后的长度）
     */
    CEyelen3EPraEasyPresenter.prototype.setUserGridCnt = function (gcnt) {
        /*        var tmp:number;
                if(this.m_pm.getCurLen().m_isHor) {
                    tmp = this.getRenderFilter().xIConv(l);
                }
                else {
                    tmp = l;
                }
        
                this.m_userLen = tmp;*/
        this.m_userGCnt = gcnt;
    };
    /*
     * 提交用户输入的角度给练习机器。
     */
    CEyelen3EPraEasyPresenter.prototype.submitLen = function () {
        //        this.m_pm.inpLen(this.m_userLen);
        this.m_pm.inpGridCnt(this.m_userGCnt);
        var lenChecker = (this.m_pm.getLenChecker());
        lenChecker.setCorreOriLen(this.m_len.m_length);
        //        lenChecker.setCorreHor(this.m_len.m_isHor);
        //        lenChecker.setInputDispLen(this.m_userLen);
        lenChecker.setInputGridCnt(this.m_userGCnt);
        this.m_curRank = lenChecker.checkLen();
        this.fillProgress(this.m_pm.getCmplProgress());
    };
    CEyelen3EPraEasyPresenter.prototype.syncFromRenderFilter = function () {
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
    CEyelen3EPraEasyPresenter.prototype.setCaRat = function (caRat) {
        this.m_renderFilter.setCaRat(caRat);
        this.syncFromRenderFilter();
    };
    /*
     * 临时显示一个角度，不影响练习机器里的数据。
     */
    CEyelen3EPraEasyPresenter.prototype.showLen = function (len) {
        this.m_len = len;
        this.refreshLenPtsRects();
        //        Update itm
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    };
    /*
     * 设置练习所用到的长度集合。
     */
    CEyelen3EPraEasyPresenter.prototype.setLenArr = function (lens) {
        this.m_pm.setLenArr(lens);
    };
    /*
     * 设置当前状态。
     */
    CEyelen3EPraEasyPresenter.prototype.setState = function (s) {
        //0:To input 1:checking 2:final
        this.m_state = s;
    };
    /*
     * 重新开始练习。
     */
    CEyelen3EPraEasyPresenter.prototype.rePra = function () {
        // Start a new pra.
        this.m_curRank = 0;
        this.m_pm.rePra();
    };
    CEyelen3EPraEasyPresenter.prototype.clearPra = function () {
        // Clear angles,progress and score.
        this.m_pm.clearPra();
        this.rePra();
    };
    /*
     * 获取经渲染过滤器输出后的图片区域。
     */
    CEyelen3EPraEasyPresenter.prototype.getImgRect = function () {
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
    CEyelen3EPraEasyPresenter.prototype.getThumbRect = function () {
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
    CEyelen3EPraEasyPresenter.prototype.getThumbSelRect = function () {
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
     * 获得经渲染过滤器输出的角度顶点坐标。
     */
    /*    public rfgetScrAngleVertexPt(): CPoint {
            var ret:CPoint;
            ret = this.m_angleVertexDispPt;
            return ret;
        }*/
    /*
     * 获得经渲染过滤器输出的第一条边样点坐标。
     */
    /*    public rfgetScrAngleEdge1Pt(): CPoint {
            var ret:CPoint;
            ret = this.m_angleEdge1DispPt;
            return ret;
        }*/
    /*
     * 获得经渲染过滤器输出的第二条边样点坐标。
     */
    /*    public rfgetScrAngleEdge2Pt(): CPoint {
            var ret:CPoint;
            ret = this.m_angleEdge2DispPt;
            return ret;
        }
    */
    /*
     * 获得经渲染过滤器输出的缩略图问号坐标。
     */
    CEyelen3EPraEasyPresenter.prototype.getThumbQuestionerDispPt = function () {
        var thRect;
        thRect = this.getThumbRect();
        var ret;
        var lenPt;
        //        lenPt = this.m_itm.ip2Tp(this.m_renderFilter.ptOConv(this.m_lenQuestionerDispPt));
        lenPt = this.m_itm.ip2Tp(this.m_lenQuestionerDispPt);
        ret = new gdeint.CPoint();
        ret.m_x = lenPt.m_x - 8;
        ret.m_y = lenPt.m_y - 12;
        return ret;
    };
    CEyelen3EPraEasyPresenter.prototype.getLenEdge1DispRect = function () {
        return this.m_lenEdge1DispRect;
    };
    CEyelen3EPraEasyPresenter.prototype.getLenQuestionerDispPt = function () {
        return this.m_lenQuestionerDispPt;
    };
    CEyelen3EPraEasyPresenter.prototype.getLenQuestionerFontSize = function () {
        return this.m_lenQuestionerFontSize;
    };
    CEyelen3EPraEasyPresenter.prototype.getLenEdge2DispRect = function () {
        return this.m_lenEdge2DispRect;
    };
    return CEyelen3EPraEasyPresenter;
}());
__reflect(CEyelen3EPraEasyPresenter.prototype, "CEyelen3EPraEasyPresenter", ["IEyelen3EPraEasyPresenter", "IPraPresenter", "IBindableWithPM", "IPresenterWithThumb", "IPresenterWithCa"]);
