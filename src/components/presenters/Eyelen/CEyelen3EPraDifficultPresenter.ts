/**
 *
 * /src/components/presenters/CAnglePresenter.ts
 * 
 * 练习界面的Presenter。包含待显示元素的坐标计算等。可单元测试。
 *
 */
class CEyelen3EPraDifficultPresenter implements IEyelen3EPraDifficultPresenter {
	public constructor() {
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

	//顶部区域相关常量：
    public s_thumbAreax: number = 25; //缩略图区域X坐标。
    public s_thumbAreay: number = 0; //缩略图区域Y坐标。
    public s_thumbAreaWidth: number = 428 - 250; //缩略图区域宽度。
    public s_thumbAreaHeight: number = 160; //缩略图区域高度。
    public s_thMaxWidth:number = 150; // 缩略图最大宽度。
    public s_thMaxHeight:number = 120; // 缩略图最大高度。
    
	//状态和数据处理子对象：
    public m_state: number; // 当前状态。0:等待输入 1:比较 2:结果 。
    private m_lenChecker: ILenCheckerWithCa; // 长度比较器。
    private m_pm: IPlainLenPraMachine; // 练习机器。
    public m_renderFilter: IEyelen3ERenderFilter; // 渲染过滤器。用于应用校准系数。
    
    // 第一层：需要填入并参与计算的基本变量。
    public m_winWidth:number; // 窗口宽度。
    public m_winHeight:number; // 窗口高度。
    public m_visibleStartY:number = 0; // 中部区域的可视区域起始Y坐标（相对于中部区域）。
    private m_imgWidth:number; // 图片的原始（即横竖校准前）宽度。
    private m_imgHeight:number; // 图片的原始高度。
    public m_imgSelRect:gdeint.CRect; // 图片选区(校准后)。
    public m_imgSelPtOri:gdeint.CPoint; // 记录图片选区的起点（使用校准前尺寸规格）坐标以便进行计算。
    public m_thAreaWidth: number; // 缩略图区域宽度。
    public m_thAreaHeight: number; // 缩略图区域高度。
    public m_score:number; // 得分。
    public m_progress:number; // 进度。
    public m_len:CLen; // 待显示长度。用 showAngle() 临时填入，用 syncWithPM() 根据练习机器的内容刷新。

    private m_lenDispPtsRects:CLenPtsRects; // 带Disp的变量均已经过校准，无需再做OConv或*caRat处理。
/*    private m_lenEdge1DispRect:gdeint.CRect; 
    private m_lenQuestionerDispPt:gdeint.CPoint;
    private m_lenQuestionerFontSize:number;
    private m_lenEdge2DispRect:gdeint.CRect;*/

    public m_userLen: number = 0; // 用户输入的长度值。(校准后)

    //第二层：供上层读取的更多变量。
    private m_imgDispWidth:number; // 图片显示宽度。
    public m_thMaxWidth:number; // 缩略图最大宽度。
    public m_thMaxHeight:number; // 缩略图最大高度。
    public m_thRect:gdeint.CRect; // 缩略图区域。
    public m_thSelRect:gdeint.CRect; // 缩略图选区。
    public m_curRank:number; // 上次输入的准确度评定。

    private m_itm: gdeint.ImgThumbModelV2; // 图片与缩略图转换器。传给 itm的均为 DispWidth。

    public bindPM(pm:IPlainLenPraMachine) {
        this.m_pm = pm;
    }

    public unbindPM() {
        this.m_pm = null;
    }

    /*
     * 检验是否所有待填变量都已填好。并不完善，慎用。
     */ 
    public allFieldsFilled():boolean {
        if(isNaN(this.m_winWidth))
        {
            return false;
        }

        if(isNaN(this.m_winHeight)) {
            return false;
        }

        if(isNaN(this.m_imgWidth)) {
            return false;
        }

        if(isNaN(this.m_imgHeight)) {
            return false;
        }

        if(null == this.m_imgSelRect) {
            return false;
        }
        else {
            if(isNaN(this.m_imgSelRect.m_left)) {
                return false;
            }
            if(isNaN(this.m_imgSelRect.m_top)) {
                return false;
            }
            if(isNaN(this.m_imgSelRect.m_width)) {
                return false;
            }
            if(isNaN(this.m_imgSelRect.m_height)) {
                return false;
            }
        }

        if(isNaN(this.m_thAreaWidth)) {
            return false;
        }

        if(isNaN(this.m_thAreaHeight)) {
            return false;
        }

        if(isNaN(this.m_score)) {
            return false;
        }

        if(isNaN(this.m_progress)) {
            return false;
        }

        if(null == this.m_len) {
            return false;
        }
        else {

            if(isNaN(this.m_len.m_length)) {
                return false;
            }

            if(isNaN(this.m_len.m_x)) {
                return false;
            }

            if(isNaN(this.m_len.m_y)) {
                return false;
            }

            if(null == this.m_len.m_imgPath) {
                return false;
            }

            if(null == this.m_len.m2_imgResName) {
                return false;
            }
        }

        if(isNaN(this.m_userLen)) {
            return false;
        }

        return true;
    }

    setITM(itm:gdeint.ImgThumbModelV2):void {
        this.m_itm = itm;
    }

    /*
     * 强行修改缩略图区域X坐标。
     */ 
    public s_setThumbAreaX(x: number): void {
        this.s_thumbAreax = x;
    }

    /*
     * 强行修改缩略图区域Y坐标。
     */ 
    public s_setThumbAreaY(y: number): void {
        this.s_thumbAreay = y;
    }

    /*
     * 强行修改缩略图区域宽度。
     */ 
    public s_setThumbAreaWidth(wid:number):void {
        this.s_thumbAreaWidth = wid;
    }

    /*
     * 强行修改缩略图区域高度。
     */ 
    public s_setThumbAreaHeight(hei: number): void {
        this.s_thumbAreaHeight = hei;
    }

    /*
     * 强行修改缩略图最大宽度。
     */ 
    public s_setThMaxWidth(wid: number): void {
        this.s_thMaxWidth = wid;
        this.m_itm.setThMaxWidth(this.s_thMaxWidth);
    }

    /*
     * 强行修改缩略图最大高度。
     */ 
    public s_setThMaxHeight(hei: number): void {
        this.s_thMaxHeight = hei;
        this.m_itm.setThMaxHeight(this.s_thMaxHeight);
    }

    /*
     * 设置所使用的渲染过滤器。
     */ 
    public setRenderFilter(rf: IEyelen3ERenderFilter): void {
        this.m_renderFilter = rf;
        (<ILenCheckerWithCa>this.m_pm.getLenChecker()).setRenderFilter(rf);
    }

    public getRenderFilter():IEyelen3ERenderFilter {
        return this.m_renderFilter;
    }

    public calcuLenPtsRects(l:CLen):CLenPtsRects {

        var ret:CLenPtsRects;
        ret = new CLenPtsRects();

        //Edge1:
        if(l.m_isHor) {
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
        if(l.m_isHor) {
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
        if(l.m_isHor) {
            ret.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(l.m_x) + this.m_renderFilter.xOConv(l.m_length / 2) - 10;
            ret.m_lenQuestionerDispPt.m_y = l.m_y - 20;
        }
        else {
            ret.m_lenQuestionerDispPt.m_x = this.m_renderFilter.xOConv(l.m_x) - 10;
            ret.m_lenQuestionerDispPt.m_y = l.m_y + l.m_length / 2 - 20;
        }
        ret.m_lenQuestionerFontSize = 36;

        return ret;
    }
    /*
     * 根据 m_len 刷新当前长度相关的几个区域和坐标变量等。
     */ 
    private refreshLenPtsRects():void {
/*            private m_lenEdge1DispRect:CRect;
    private m_lenQuestionerDispPt:CPoint;
    private m_lenQuestionerFontSize:number;
    private m_lenEdge2DispRect:CRect;*/
        if(!this.m_len) {
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

    }

    /*
     * 与练习机器同步，获取最新数据。
     */
    public updateFromPM():void {
        this.m_score = this.m_pm.getCurScore();
        this.m_len = this.m_pm.getCurLen();
        this.refreshLenPtsRects();
    }

    public submitToPM():void {
        
    }

    public  clearTempData():void {
    }

	/*
	 * 进入下一长度。
	 */ 
	public nextLen(): void {
        this.m_pm.nextLen();
        if(this.getProgress()>=10)
        {
            //练习已完成。
            this.setState(2);
        }
        else {
            //练习未完成。
            this.setState(0);
        }
	}
	
    public fillScore(s:number) {
        this.m_score = s;
    }

	/*
	 * 获取当前得分。
	 */ 
	public getScore():number {
        return this.m_score;
	}
	
    public fillProgress(p:number):void {
        this.m_progress = p;
    }

	/*
	 * 获取当前进度。
	 */ 
	public getProgress():number {
//        return this.m_pm.getCurProgress() + 1;
        return this.m_progress;
	}

	/*
	 * 获取当前长度。
	 */ 
    public getLen(): CLen {
        return this.m_len;
    }

	/*
	 * 获取最近一次目测准确度评定。
	 */ 
	public getCurRank():number {
	    return this.m_curRank;
	}

	/*
	 * 设置窗口宽度。
	 */ 
	public setWinWidth(ww: number): void {
	    this.m_winWidth = ww;
	    this.m_imgSelRect.m_width = ww;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
	}

	public setWinHeight(wh: number): void {
	    this.m_winHeight = wh;
	}

	/*
	 * 设置图片宽度。参数填原始宽度。
	 */ 
    public setImgWidth(w: number): void {
        this.m_imgWidth = w;
        this.m_imgDispWidth = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgWidth(this.m_imgDispWidth);
    }

    /*
     * 获取图片原始宽度。
     */ 
    public getImgWidth():number {
        return this.m_imgWidth;
    }

    public setImgHeight(h: number): void {
        this.m_imgHeight = h;
        this.m_itm.setImgHeight(h);
    }

    public getImgHeight():number {
        return this.m_imgHeight;
    }

    /*
     * 设置图片选区位置。（填校准后坐标）
     */ 
    public inpImgSelPt(imgSelPt: gdeint.CPoint): void {

        var rect:gdeint.CRect = new gdeint.CRect();
        rect.m_left = imgSelPt.m_x;
        rect.m_top = imgSelPt.m_y;
        rect.m_width = this.m_imgSelRect.m_width;
        rect.m_height = this.m_imgSelRect.m_height;
        this.m_imgSelRect = rect;
        this.m_itm.setImgSelRect(this.m_imgSelRect);
        //记录起点坐标（校准前尺寸规格）
        this.m_imgSelPtOri.m_x = imgSelPt.m_x/this.m_renderFilter._getCaRat();
        this.m_imgSelPtOri.m_y = imgSelPt.m_y;
    }

    /*
     * 设置缩略图选区位置。同时影响图片选区位置。
     */ 
    public inpThSelPt(thSelPt:gdeint.CPoint): void {
        var imgSelPt:gdeint.CPoint;
        imgSelPt = this.m_itm.tp2Ip(thSelPt);
        this.inpImgSelPt(imgSelPt);
    }

    /*
     * 设置图片选区宽度（参数填原始宽度）。
     */ 
    public inpImgSelWidth(w: number): void {
        this.m_imgSelRect.m_width = this.m_renderFilter.xOConv(w);
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    }

    public inpImgSelHeight(h: number): void {
        this.m_imgSelRect.m_height = h;
        this.m_itm.setImgSelRect(this.m_imgSelRect);

    }

    /*
     * 填入用户输入的长度值。（填反横竖校准后的长度）
     */ 
    public setUserLen(l: number): void {
/*        var tmp:number;
        if(this.m_pm.getCurLen().m_isHor) {
            tmp = this.getRenderFilter().xIConv(l);
        }
        else {
            tmp = l;
        }

        this.m_userLen = tmp;*/
        this.m_userLen = l;
    }

    /*
     * 提交用户输入的长度给练习机器。
     */ 
    public submitLen(): void {
        this.m_pm.inpLen(this.m_userLen);
        var lenChecker:ILenCheckerDifficult = <ILenCheckerDifficult>(this.m_pm.getLenChecker());
        lenChecker.setCorreOriLen(this.m_len.m_length);
//        lenChecker.setCorreHor(this.m_len.m_isHor);
        lenChecker.setInputDispLen(this.m_userLen);
        this.m_curRank = lenChecker.checkLen();
        this.fillProgress(this.m_pm.getCmplProgress());
    }


    public syncFromRenderFilter() {
        //renderFilter有改动后（例如caRat变更）调用本函数进行同步。
        var caRat = this.m_renderFilter._getCaRat();
        this.m_imgDispWidth = this.m_renderFilter.xOConv(this.m_imgWidth);
        //Update imgThumbModel:
        this.m_itm.setImgWidth(this.m_imgDispWidth);
        //Update selPt:
        var selPt:gdeint.CPoint = new gdeint.CPoint();
        selPt.m_x = this.m_imgSelPtOri.m_x * caRat;
        selPt.m_y = this.m_imgSelRect.m_top;
        this.inpImgSelPt(selPt);
        //imgSelWith 不变。
        this.refreshLenPtsRects();

    }

    /*
     * 设置横竖校准系数。
     */
    public setCaRat(caRat: number): void {

        this.m_renderFilter.setCaRat(caRat);
        this.syncFromRenderFilter();
    }

    /*
     * 临时显示一个长度，不影响练习机器里的数据。
     */
    public showLen(len: CLen): void {
        this.m_len = len;

        this.refreshLenPtsRects();

//        Update itm
        this.m_itm.setImgSelRect(this.m_imgSelRect);
    }

    /*
     * 设置练习所用到的长度集合。
     */ 
    public setLenArr(len: Array<CLen>) :void {
        this.m_pm.setLenArr(len);
    }

    /*
     * 设置当前状态。
     */ 
    public setState(s:number) {
        //0:To input 1:checking 2:final

        this.m_state = s;
    }

    /*
     * 重新开始练习。
     */ 
    public rePra(): void {
        // Start a new pra.
        this.m_curRank = 0;
        this.m_pm.rePra();
    }

    public clearPra():void {
        // Clear angles,progress and score.
        this.m_pm.clearPra(); 
        this.rePra();
    } 


    /*
     * 获取经渲染过滤器输出后的图片区域。
     */ 
    public getImgRect(): gdeint.CRect {
        var oriRect:gdeint.CRect , ret:gdeint.CRect;
        oriRect = new gdeint.CRect();
        oriRect.m_left = -this.m_imgSelRect.m_left / this.m_renderFilter._getCaRat();
        oriRect.m_top = -this.m_imgSelRect.m_top+this.m_visibleStartY;
        oriRect.m_width = this.m_imgWidth;
        oriRect.m_height = this.m_imgHeight;

        ret = this.m_renderFilter.rectOConv(oriRect);

        return ret;
    }

    /*
     * 获取经渲染过滤器输出后的缩略图区域。
     */ 
    public getThumbRect(): gdeint.CRect {
        console.log("Getting thRect,thWidth:"+this.m_itm.getThWidth());
        this.m_itm.setImgWidth(this.m_renderFilter.xOConv(this.m_imgWidth));
        var ret:gdeint.CRect;
        ret = new gdeint.CRect();
        ret.m_width = this.m_itm.getThWidth();
        ret.m_height = this.m_itm.getThHeight();
        ret.m_left = this.s_thumbAreax + (this.s_thumbAreaWidth - ret.m_width) / 2;
        ret.m_top = this.s_thumbAreay + (this.s_thumbAreaHeight - ret.m_height) / 2;
        return ret;
    }

    /*
     * 获得经渲染过滤器输出后的缩略图选区。
     */ 
    public getThumbSelRect(): gdeint.CRect {
        var ret:gdeint.CRect;
        this.m_itm.setImgWidth(this.m_renderFilter.xOConv(this.m_imgWidth));

//        var thRect:CRect;
//        thRect = this.getThumbRect();

        var tsr = this.m_itm.getThSelRect();

        ret = new gdeint.CRect();
        ret.m_left = /*thRect.m_left +*/ tsr.m_left;
        ret.m_top = /*thRect.m_top +*/ tsr.m_top;
        ret.m_width = tsr.m_width;
        ret.m_height = tsr.m_height;

        return ret;
    }

    /*
     * 获得经渲染过滤器输出的缩略图问号坐标。
     */ 
    public getThumbQuestionerDispPt():gdeint.CPoint {

        var thRect:gdeint.CRect;
        thRect = this.getThumbRect();

        var ret:gdeint.CPoint;
        var lenPt: gdeint.CPoint;
//        lenPt = this.m_itm.ip2Tp(this.m_renderFilter.ptOConv(this.m_lenQuestionerDispPt));
        lenPt = this.m_itm.ip2Tp(this.m_lenDispPtsRects.m_lenQuestionerDispPt);

        ret = new gdeint.CPoint();
        ret.m_x = /*thRect.m_left + */lenPt.m_x - 8;
        ret.m_y = /*thRect.m_top + */lenPt.m_y - 12;

        return ret;
    }

    public getLenEdge1DispRect():gdeint.CRect {
        return this.m_lenDispPtsRects.m_lenEdge1DispRect;
    }

    public getLenQuestionerDispPt():gdeint.CPoint {
        return this.m_lenDispPtsRects.m_lenQuestionerDispPt;
    }

    public getLenQuestionerFontSize():number {
        return this.m_lenDispPtsRects.m_lenQuestionerFontSize;
    }

    public getLenEdge2DispRect():gdeint.CRect {
        return this.m_lenDispPtsRects.m_lenEdge2DispRect;
    }

}
