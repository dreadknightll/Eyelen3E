// UI/scenes/Eyelen/CPraDifficultScene.ts
/**
 * 
 * 困难难度练习画面场景。
 * 分为顶部、中部、底部三大区域。
 *  顶部区域可收缩和展开，显示缩略图，得分和进度。
 *  中部区域显示背景图片和待测角度。
 *  底部区域显示用户长度输入控件和菜单。
 * 
 * 拖动中部区域的图片或点击顶部区域的缩略图均可变换屏幕选择区域。
 * 
 */

var MSG_PICS_PRELOAD_FINISHED: number = 1; // 事件ID。练习图片json加载完成。
var MSG_IMGS_PRELOAD_FINISHED: number = 2; // 事件ID。练习图片加载完成。

var s_topRightWidth = 250; 
var s_topRightHeight1 = 70;
var s_cellWidth = 20;

/*
 * 画面初始化方法：
 *  1、创建对象。
 *  2、setWinWidth/setWinHeight。
 *  3、startNewPra。
 */
namespace eyelen3E {
    export class CPraDifficultScene extends CCommonEyelenPraScene{
        public topAreaGroup:eui.Group;
        private bgUnderTopGrp:eui.Group;
        public topArea:eyelen3E.CTopArea_Eyelen;
        public midAreaGroup:eui.Group;
        public midArea:eyelen3E.CMidAreaDifficult;
        public bottomAreaGroup:eui.Group;
        public bottomArea:CBottomAreaDifficult;

        public m_pm: IPlainLenPraMachine; // 练习机器。处理长度切换、计分等事务。可单元测试。

        public m_tipBalloon1:CBalloonTip;
        public m_tipBalloon2:CBalloonTip;

        public m_UIPresenter:CEyelen3EPraDifficultPresenter;
        public m_wm:IEyelen3EWinModelV2; // 画面布局模型。用于计算画面各元素的坐标位置。可单元测试。

        public m_curPicTag: number; // 当前图片在图片缓冲区的下标。
        private m_curRoundTag: number; // 当前练习的轮号。
        private m2_isFirstPra: boolean; // 标记当前练习是否第一轮。

        public m_topSpace: CTopSpace_Eyelen; // 顶部空白带。仅于 iOS 下显示。

        private m_topOpen; // 顶部区域是否已展开。
    //    private m_topBgX; // 顶部区域上面的背景X坐标。
    //    private m_topBgY;
    //    private m_topBgWidth;
    //    private m_topBgHeight;
        private m_bgUnderTop:egret.Shape;

        private m_imgOriWidth: number; // 当前图片原宽。每次读取完新图片都要更新。
        private m_lenEdge1: egret.Shape; // 画板，画图上长度的起始边。
        private m_lenEdge2: egret.Shape; // 画板，画图上长度的结束边。
        private m_lenQuestioner: egret.TextField; // 图上长度中部的问号。
        private m_lenView: egret.DisplayObjectContainer; // 长度容器，包含长度的几个部件。

        private m_imgHorSpace: number; // 图片左右最大空白宽度。控制图片可拖动范围。
        private m_imgVerSpace: number; // 图片上下最大空白高度。控制图片可拖动范围。
        private m2_imgTchStartPoint; // 类型：CPoint 。图片拖动的起始位置。
        private m2_isImgMoving: boolean; // 图片是否处在拖动状态。

        private m_cmpLenDlg: CCmpLenDlg; // 长度比较对话框。
        private finalScoreDlg:CFinalScoreDlg; // 最终得分显示框。

        private m2_cc:boolean = false;

        /////////////////////////////////////////////////////////////////////////////

        public constructor() {
            super();

            this.x = 0;
            this.y = 0;

            this.m_topOpen = true;

            this.m_wm = new CEyelen3EWinModelV2();

            this.m_wm.setTopSpaceHeight(s_topSpaceHeight);
            this.m_wm.setTopHeight1(30);
            this.m_wm.setTopHeight2(170);
            this.m_wm.showTop();
            this.m_wm.setBottomHeight(300);

            this.m_pm = new CEyelen3EPraMachineDifficult();

            this.m_UIPresenter = new CEyelen3EPraDifficultPresenter();
            this.m_UIPresenter.bindPM(this.m_pm);

            this.m_tipBalloon1 = new CBalloonTip();
            this.m_tipBalloon1.visible = false;
            this.m_tipBalloon2 = new CBalloonTip();
            this.m_tipBalloon2.visible = false;

            this.m_imgOriWidth = 0;

            this.m_imgHorSpace = 100;
            this.m_imgVerSpace = 80;
            
            this.m2_imgTchStartPoint = new gdeint.CPoint();
            this.m2_isImgMoving = false;

            this.m_topSpace = new CTopSpace_Eyelen();

            this.m_curPicTag = -1; //Refresh when showImg.
            this.m_curRoundTag = -1;

            this.m2_isFirstPra = true;

        }

        public childrenCreated(): void {
            this.m_bgUnderTop = new egret.Shape();
            this.bgUnderTopGrp.addChild(this.m_bgUnderTop);

            this.midArea.m_UIPresenter = this.m_UIPresenter;
            this.midArea.setVisibleStartY(this.m_wm.getTopHeight2()-this.m_wm.getTopHeight1());

            this.bottomArea.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.backBtnTap , this);
            this.bottomArea.caliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCaliBtn , this);
            this.bottomArea.lenInputer.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onOKButtonTap , this);

            this.m2_cc = true;
        }

        public _setParentContainer(c:IEyelenPraContainer):void {
            super._setParentContainer(c);
            this.m_UIPresenter.setRenderFilter(this.getParentContainer()._getRenderFilter());
        }

        public getPM(): IPlainLenPraMachine {
            return this.m_pm;
        }

        public setLenArr(la:Array<CLen>):void {
            this.m_pm.setLenArr(la);
        }

        public getCurPicTag():number {
            return this.m_curPicTag;
        }

        /*
        * 初始化长度比较对话框。
        */
        private initCmpLenDlg(): void {
            this.m_cmpLenDlg = new CCmpLenDlg();
            this.m_cmpLenDlg.x = (this.m_winWidth-400)/2; //40.0 / 480 * this.m_winWidth;
            this.m_cmpLenDlg.y = 200;
            this.m_cmpLenDlg.visible = false;

            this.m_cmpLenDlg.onNextBtnEvent(egret.TouchEvent.TOUCH_TAP,this.onNextButtonTap,this);
            this.addChild(this.m_cmpLenDlg);
        }
        
        /*
        * 触摸“下一长度”按钮后触发。
        */ 
        private onNextButtonTap(evt: egret.TouchEvent) {
            playBtnSnd();

            this.hideCmpLenDlg();

            var p:number;
            p = this.m_pm.getCmplProgress();
            if(p >= 10) // Practice finished
            {
                this.bottomArea.lenInputer.lock();
                var score:number = this.m_pm.getCurScore();
                this.finalScoreDlg.setScore(score);
                this.finalScoreDlg.visible = true;

                if(score >= 270) {
                    this.finalScoreDlg.setStars(3);
                }
                else if(score >= 240) {
                    this.finalScoreDlg.setStars(2);
                }
                else if(score >= 180) {
                    this.finalScoreDlg.setStars(1);
                }
                else {
                    this.finalScoreDlg.setStars(0);
                    this._getParentContainer().showAlert("成绩很差哟！\n别灰心，继续努力！！" , this.onFailurePanelClose);
                }
            }
            else {
                console.log("OK1");
                this.m_UIPresenter.nextLen();
                this.m_UIPresenter.setUserLen(0);
                this.bottomArea.lenInputer.clearLen();
                console.log("Len cleared!");
                this.bottomArea.lenInputer.unlock();

                this.showLen(this.m_pm.getCurLen());

            }
        }

        private onFailurePanelClose(evt:egret.Event) {
            //Nothing to do here.
        }

        /*
        * 显示长度比较对话框。
        */ 
        private showCmpLenDlg(): void {
            var r = this.m_UIPresenter.m_curRank;
            this.m_cmpLenDlg.setScore(10 * r);

            var correOriLen:CLen = this.m_pm.getCurLen();
            this.m_cmpLenDlg.setCorreLen(this.m_pm.getCurLen().m_length * this.m_UIPresenter.getRenderFilter()._getCaRat());
            this.m_cmpLenDlg.setUserLen(this.m_UIPresenter.m_userLen);

            this.m_cmpLenDlg.visible = true;

            var curLen = this.m_pm.getCurLen();

        }

        private hideCmpLenDlg(): void {
            this.m_cmpLenDlg.visible = false;
        }

        /*
        * “确定”按钮点击后触发。提交用户输入的长度。
        */ 
        private onOKButtonTap(evt: egret.TouchEvent) {

            playBtnSnd();

            this.m_UIPresenter.setUserLen(this.bottomArea.lenInputer.getLen());
            this.m_UIPresenter.submitLen();
                
            this.showCmpLenDlg();
            this.bottomArea.lenInputer.lock();

            var r = this.m_pm.getLastLenRank();

            var curScore:number = this.m_pm.getCurScore();
            var curPro:number = this.m_pm.getCmplProgress();
            this.topArea.scoreView.setScoreWithPro(curScore , curPro);
            this.topArea.progressView.setProgress(curPro);
        }

        private replayBtnTouched():void {
            //        start next pra      
            this.finalScoreDlg.visible = false;
            this.bottomArea.lenInputer.unlock();
            this.bottomArea.lenInputer.clearLen();

            this.getParentContainer().startNewPra();
        }

        public startNewPra(): void {
            this.m_pm.startPra();
            if(this.m2_isFirstPra) {
                this.m2_isFirstPra = false;

                this.createScene();
            }
            else {
                this.refreshScene();
            }
        }

        /*
        * 重新调整缩略图。
        * 修改 m_itm 后应运行本函数。
        */ 
        private readjustThumb(): void
        {
            //Affect:thumb
            //Do not affect:thumbSel,thumbQuestioner

            console.log("Readjusting thumb!");

            var thRect:gdeint.CRect = this.m_UIPresenter.getThumbRect();

            if(this.m_NoImgMode) {
                this.topArea.thumbUI.setShape(this.midArea.m_randomGraphShape);
                console.log("Shape set!");
            }
            else {
                this.topArea.thumbUI.setImgSrc(this.m_curImgResName);
            }

            console.log("Rect height:"+thRect.m_height);

            this.topArea.thumbUI.x = thRect.m_left / 480 * this.m_winWidth;
            this.topArea.thumbUI.y = thRect.m_top;
            console.log("ThumbY:"+thRect.m_top);

            this.topArea.thumbUI.setThumbWidth(thRect.m_width);
            this.topArea.thumbUI.setThumbHeight(thRect.m_height);

        }

        /*
        * 重新调整缩略图选框。
        * 修改 m_itm 或图片选区变化后应调用本函数。
        */ 
        private readjustThumbSel(): void
        {
            var tsr:gdeint.CRect = this.m_UIPresenter.getThumbSelRect();
            this.topArea.thumbUI.setSelRect(tsr);

        }

        /*
        * 根据某一长度对象在缩略图显示问号。
        * 修改 m_itm 或进入新的长度时应调用本函数。此时参数应传入当前长度。
        */ 
        private showThumbQuestioner(len:CLen): void
        {
            var tmpLen: CLen = this.m_pm.getCurLen();
            var tmpPoint = new gdeint.CPoint();
            var tmpPoint2 = new gdeint.CPoint();

            tmpPoint.m_x = tmpLen.m_x + tmpLen.m_length / 2;
            tmpPoint.m_y = tmpLen.m_y;

            var qdp:gdeint.CPoint = this.m_UIPresenter.getThumbQuestionerDispPt();
            this.topArea.thumbUI.thumbQuestioner.x = qdp.m_x;
            this.topArea.thumbUI.thumbQuestioner.y = qdp.m_y;
        }

        /*
        * 在屏幕显示图片。
        */ 
        private showImg(imgResName:string):void
        {
            if(this.m_NoImgMode) {
                console.log("Warning! showImg not supported in no img mode!");
                return;
            }
            var oldImgResName = this.m_curImgResName;// getCurImgResName();

            var tmpImg: egret.Bitmap = new egret.Bitmap();

            tmpImg.texture = this.m_parentContainer._getResLoader().getRes(imgResName);
            this.m_imgOriWidth = tmpImg.width;
            this.midArea.imgFromFile.texture = this.m_parentContainer._getResLoader().getRes(imgResName);

            this.midArea.imgFromFile.width = this.m_UIPresenter.getImgRect().m_width;
            this.midArea.imgFromFile.height = tmpImg.height;

            this.m_curImgResName = imgResName;
            this.topArea.thumbUI.setImgSrc(imgResName);

            this.m_UIPresenter.setImgWidth(this.m_imgOriWidth);
            this.m_UIPresenter.setImgHeight(this.midArea.imgFromFile.height);

             this.midArea.imgFromFile.width = this.m_imgOriWidth * this.m_UIPresenter.getRenderFilter()._getCaRat();
        /*
            换了图片：框移到右上角；
            没换图片：框回到原来的位置：
        */
            if(oldImgResName == this.m_curImgResName) {

            }
            else {
                var selPt:gdeint.CPoint = new gdeint.CPoint();
                selPt.m_x = 0;
                selPt.m_y = 0;
                this.m_UIPresenter.inpImgSelPt(selPt);
                this.m_UIPresenter.inpImgSelWidth(this.m_wm.getWinWidth()/this.m_UIPresenter.getRenderFilter()._getCaRat());
                this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());

                var imgRect:gdeint.CRect;
                imgRect = this.m_UIPresenter.getImgRect();
                this.midArea.midContentGroup.x = imgRect.m_left;
                this.midArea.midContentGroup.y = imgRect.m_top;

            }

            this.readjustThumb();
            this.readjustThumbSel();
        }
        
        private showRandomGraph() {
            //每次均重新产生随机图。
            this.midArea.randomGraph.visible = true;
            this.midArea.imgFromFile.visible = false;
            this.midArea.m_randomGraphShape.genGraph(1024,720);
            this.m_imgOriWidth = 1024;
            this.m_UIPresenter.setImgWidth(this.m_imgOriWidth);
            this.m_UIPresenter.setImgHeight(720);
            this.midArea.m_randomGraphShape.resize(this.m_imgOriWidth * this.m_UIPresenter.getRenderFilter()._getCaRat(),720);

            var selPt:gdeint.CPoint = new gdeint.CPoint();
            selPt.m_x = 0;
            selPt.m_y = 0;
            this.m_UIPresenter.inpImgSelPt(selPt);
            this.m_UIPresenter.inpImgSelWidth(this.m_wm.getWinWidth()/this.m_UIPresenter.getRenderFilter()._getCaRat());
            this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());

            var imgRect:gdeint.CRect;
            imgRect = this.m_UIPresenter.getImgRect();
            this.midArea.midContentGroup.x = imgRect.m_left;
            this.midArea.midContentGroup.y = imgRect.m_top;

            this.readjustThumb();
            this.readjustThumbSel();
        }

        /*
        * 在屏幕显示一个长度。不显示图片，不更新presenter。
        */ 
        private _showLen(len:CLen) {
            this.m_lenEdge1.graphics.clear();
            this.m_lenEdge2.graphics.clear();

            if(len.m_isHor) {
                //Draw edge1:
                this.m_lenEdge1.graphics.beginFill(0x00FFFF);
                this.m_lenEdge1.graphics.drawRect(len.m_x*this.m_UIPresenter.getRenderFilter()._getCaRat()-5,len.m_y - 30,5,60);
                this.m_lenEdge1.graphics.endFill();
                
                //Draw questioner:
                this.m_lenQuestioner.x = len.m_x*this.m_UIPresenter.getRenderFilter()._getCaRat() + len.m_length*this.m_UIPresenter.getRenderFilter()._getCaRat()/2 - 10;
                this.m_lenQuestioner.y = len.m_y - 20;
                
                //Draw edge2:
                this.m_lenEdge2.graphics.beginFill(0x00FFFF);
                this.m_lenEdge2.graphics.drawRect(len.m_x*this.m_UIPresenter.getRenderFilter()._getCaRat()+len.m_length*this.m_UIPresenter.getRenderFilter()._getCaRat(),len.m_y - 30,5,60);
                this.m_lenEdge2.graphics.endFill();

            }
            else
            {
//                var tmpRect:gdeint.CRect , tmpPt:gdeint.CPoint;
                var lenDispPtsRect:CLenPtsRects;
                lenDispPtsRect = this.m_UIPresenter.calcuLenPtsRects(len);
                //Draw edge1:
                this.m_lenEdge1.graphics.beginFill(0x00FFFF);
//                tmpRect = this.m_UIPresenter.getLenEdge1DispRect();
                this.m_lenEdge1.graphics.drawRect(lenDispPtsRect.m_lenEdge1DispRect.m_left,lenDispPtsRect.m_lenEdge1DispRect.m_top,lenDispPtsRect.m_lenEdge1DispRect.m_width,lenDispPtsRect.m_lenEdge1DispRect.m_height);
                this.m_lenEdge1.graphics.endFill();

                //Draw questioner:
//                tmpPt = this.m_UIPresenter.getLenQuestionerDispPt();
                var tmpFontSize = this.m_UIPresenter.getLenQuestionerFontSize();
                this.m_lenQuestioner.x = lenDispPtsRect.m_lenQuestionerDispPt.m_x;
                this.m_lenQuestioner.y = lenDispPtsRect.m_lenQuestionerDispPt.m_y;
                this.m_lenQuestioner.size = tmpFontSize;

                //Draw edge2:
                this.m_lenEdge2.graphics.beginFill(0x00FFDD);
//                tmpRect = this.m_UIPresenter.getLenEdge2DispRect();
                this.m_lenEdge2.graphics.drawRect(lenDispPtsRect.m_lenEdge2DispRect.m_left , lenDispPtsRect.m_lenEdge2DispRect.m_top , lenDispPtsRect.m_lenEdge2DispRect.m_width , lenDispPtsRect.m_lenEdge2DispRect.m_height);
                this.m_lenEdge2.graphics.endFill();
            }
        }
        /*
        * 在屏幕显示一个长度。图片也会一起显示。
        */ 
        private showLen(len:CLen):void
        {
            this.m_UIPresenter.showLen(len);
            if(this.m_NoImgMode) {
                this.showRandomGraph();
            }
            else {
                //Change img if needed:
                this.showImg(len.m2_imgResName);
            }

            this._showLen(len);
            this.showThumbQuestioner(len);
        }

        /*
        * 缩略图点击时触发。
        */ 
        private onThumbTap(evt: CThumbUIEvent):void
        {
            var tmpSelTp = new gdeint.CPoint();
            tmpSelTp.m_x = evt.m_tchX - this.m_UIPresenter.getThumbSelRect().m_width / 2;
            tmpSelTp.m_y = evt.m_tchY - this.m_UIPresenter.getThumbSelRect().m_height / 2;

            this.m_UIPresenter.inpThSelPt(tmpSelTp);
            this.syncWithUIPresenter();
        }

        /*
        * 创建顶部区域。
        */ 
        private createTop():void {
            this.topAreaGroup.y = this.m_wm.getTopY();

            this.m_bgUnderTop.x = 0;
            this.m_bgUnderTop.y = 0;
            this.m_bgUnderTop.width = this.m_wm.getWinWidth();
            this.m_bgUnderTop.height = this.m_wm.getTopHeight();
    //        this.m_bgUnderTop.graphics.beginFill(0x888888);
            this.m_bgUnderTop.graphics.beginFill(0x00FF00);
            this.m_bgUnderTop.graphics.drawRect(0,0,this.m_bgUnderTop.width,this.m_bgUnderTop.height);
            this.m_bgUnderTop.graphics.endFill();

            this.topArea.scoreView.x = this.m_bgUnderTop.x + this.m_bgUnderTop.width - s_topRightWidth + 5;
            this.topArea.scoreView.y = this.m_bgUnderTop.y + s_topRightHeight1 + 3;

            this.topArea.progressView.x = this.m_bgUnderTop.x + this.m_bgUnderTop.width - s_topRightWidth + 5;//35;
            this.topArea.progressView.y = s_topRightHeight1 / 2 - 35;//10;

            this.topArea.setTrueWidth(this.m_winWidth);
            this.topArea.setTrueHeight(this.m_wm.getTopHeight2());

            this.m_UIPresenter.setImgWidth(160);
            this.m_UIPresenter.setImgHeight(160);

            this.m_imgOriWidth = 160;

            this.m_lenView = new egret.DisplayObjectContainer();
            this.m_lenEdge1 = new egret.Shape();
            this.m_lenEdge2 = new egret.Shape();
            this.m_lenQuestioner = new egret.TextField();
            this.m_lenQuestioner.textColor = 0xFF0000;
            this.m_lenQuestioner.size = 36;
            this.m_lenQuestioner.text = "?";

            this.midArea.midCanvasGrp.addChild(this.m_lenEdge1);
            this.midArea.midCanvasGrp.addChild(this.m_lenEdge2);
            this.midArea.midCanvasGrp.addChild(this.m_lenQuestioner);

            //Add thumb and thumbSel:

            var selPt:gdeint.CPoint = new gdeint.CPoint();
            selPt.m_x = 0;
            selPt.m_y = 0;
            this.m_UIPresenter.inpImgSelPt(selPt);
            this.m_UIPresenter.inpImgSelWidth(this.m_wm.getWinWidth() / this.m_UIPresenter.getRenderFilter()._getCaRat());
            this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());

            //Add components to scene:
            this.topArea.thumbUI.addEventListener(CThumbUIEvent.EVT_THUMB_TAP , this.onThumbTap , this);
            this.topArea.visible = true;

            this.topArea.addEventListener(CTopAreaEvent_Eyelen.EVT_SWITCHBTN_TAP,this.onTopBtnTab,this);
            this.topAreaGroup.y = this.m_wm.getTopY();

        }

        /*
        * 创建中间区域。
        */ 
        private createMid():void {

            this.midAreaGroup.y = this.m_wm.getMidY();
            this.midArea.setTrueWidth(this.m_winWidth);
            this.midArea.setTrueHeight(this.m_wm.getMidHeight());
            console.log("midTrueWidth:"+this.m_winWidth+",midTrueHeight:"+this.m_wm.getMidHeight());
        }

        /*
        * 创建底部区域。
        */ 
        private createBottom():void {
            var bottomY:number , bottomHeight:number;

            bottomY = this.m_wm.getBottomY();
            this.bottomAreaGroup.y = bottomY;
            bottomHeight = this.m_wm.getBottomHeight();
            this.bottomArea.setTrueWidth(this.m_winWidth);
            this.bottomArea.setTrueHeight(bottomHeight);

    //Draw bottom

        }

        /*
        * 资源加载完成后，运行此函数创建场景。
        */ 
        public createScene():void {

            super.createScene();

            this.m_wm.setWinWidth(this.m_winWidth);
            this.m_wm.setWinHeight(this.m_winHeight);

            this.m_topSpace.setColor(0xFFFFFF);
            this.m_topSpace.x = 0;
            this.m_topSpace.y = 0;
            this.m_topSpace.width = this.m_wm.getWinWidth();
            this.m_topSpace.height = this.m_wm.getTopSpaceHeight();
            this.m_topSpace.draw();

            this.midArea.imgFromFile.fillMode = egret.BitmapFillMode.SCALE;
            this.midArea.imgGrp.x = 0;
//            this.midArea.imgGrp.y = midVisibleY();
/*            this.midArea.imgGrp.width = 160;
            this.midArea.imgGrp.height = 160;*/

            this.createTop();
            this.createMid();
            this.createBottom();

            this.midArea.addEventListener(CMidAreaEvent_Eyelen.EVT_IMG_DRAGMOVE,this.onImgDragMove,this);
            this.midArea.addEventListener(CMidAreaEvent_Eyelen.EVT_IMG_DRAGEND,this.onImgDragEnd,this);

            this.addChild(this.m_topSpace);

            this.finalScoreDlg.left = (this.m_winWidth - this.finalScoreDlg.width)/2;
            this.finalScoreDlg.visible = false;
            this.finalScoreDlg.addEventListener(CFinalScoreDlgEvent.EVT_REPLAY_BTN_TAP,this.replayBtnTouched,this);

    //Add touch events:

            this.initCmpLenDlg();

    //OK to start and show first len.
            var firstLen:CLen = this.m_pm.getCurLen();
            this.showLen(firstLen);

            this.readjustThumb();
            this.readjustThumbSel();
            this.showInitInstrus();


        }


        /*
        * 显示开始练习时的提示说明。
        */ 
        public showInitInstrus():void
        {
            this.prepareTipBalloons();

            var balloonX:number = g_scenePos.m_x + 65*g_scale;
            var balloonY:number = g_scenePos.m_y + /*190**/230*g_scale; 

            this.m_tipBalloon1.x = balloonX * 0.9;
            this.m_tipBalloon1.y = balloonY;
            this.m_tipBalloon1.scaleX = g_scale;
            this.m_tipBalloon1.scaleY = g_scale;
            this.m_tipBalloon1.title = "提示";
            this.m_tipBalloon1.setContent("请目测图上“？”处显示的长度，并拖动拉尺输入您目测的结果。");
            this.m_tipBalloon1.visible = true;

            this.disableScene();

            this.m_tipBalloon2.x = balloonX * 1.1;
            this.m_tipBalloon2.y = balloonY;
            this.m_tipBalloon2.scaleX = g_scale;
            this.m_tipBalloon2.scaleY = g_scale;
            this.m_tipBalloon2.title = "提示";
            this.m_tipBalloon2.setContent("请目测图上“？”处显示的\n长度并拖动拉尺输入您目测的结果。");
            this.m_tipBalloon2.visible = false; //隐藏2以防两个重叠显示。

            this.m_tipBalloon1.addEventListener(CBalloonTipEvent.EVT_CLOSE , this.onTipBalloon1Close , this);

    //        make rulerUser bright
            var r:gdeint.CRect = new gdeint.CRect();
            r.m_left = 5;
            r.m_top = this.m_wm.getBottomY() + 25;
            r.m_width = 440.0 / 480 * this.m_winWidth;
            r.m_height = 140;
            this.brightenNotiLayerBgRect(r);
        }

        private prepareTipBalloons():void {
            this.m_notiLayer.addChild(this.m_tipBalloon1);
            this.m_notiLayer.addChild(this.m_tipBalloon2);
        }

        /*
        * 关闭操作提示后触发。
        */ 
        private onTipBalloon1Close(evt:egret.Event) {
            this.m_tipBalloon2.visible = true;
            this.m_tipBalloon2.addEventListener(CBalloonTipEvent.EVT_CLOSE , this.onTipBalloon2Close , this);
        }

        /*
        * 关闭操作提示后触发。
        */ 
        private onTipBalloon2Close(evt:egret.Event) {
            this.enabled = true;
            this.recoverNotiLayerBg();//make ruler dark again for other disable scene actions.
            this.m_notiLayer.visible = false;
        }

        /*
        * 顶部按钮触摸后触发。
        */ 
        private onTopBtnTab(evt: egret.Event) {
            playBtnSnd();

            if(this.m_topOpen) //Already open,close it.
            {
                this.m_topOpen = false;
                this.m_wm.hideTop();

                this.midArea.setTrueHeight(this.m_wm.getMidHeight());

                var tw = egret.Tween.get(this.topArea);
                var tw_bgUnderTop = egret.Tween.get(this.bgUnderTopGrp);
                var targetTopY:number = - (this.m_wm.getTopHeight2() - this.m_wm.getTopHeight1());
                tw.to({ y:targetTopY },300);
                tw_bgUnderTop.to({ y:targetTopY },300);

                var tw2 = egret.Tween.get(this.midAreaGroup);
                tw2.to({ y: this.m_wm.getMidY() },300);
                tw2.to({ height: this.m_wm.getMidHeight() },300);

                var timer: egret.Timer = new egret.Timer(305,1);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerTSClosed,this);
                timer.start();
            }
            else //Already closed,open it.
            {
                this.m_topOpen = true;
                this.m_wm.showTop();

                var tw = egret.Tween.get(this.topArea);
                var tw_bgUnderTop = egret.Tween.get(this.bgUnderTopGrp);
                tw.to({ y: 0 },300);
                tw_bgUnderTop.to({ y: 0 },300);

                var tw2: egret.Tween = egret.Tween.get(this.midAreaGroup);
                tw2.to({ y: this.m_wm.getMidY() },300);
                tw2.to({ height: this.m_wm.getMidHeight() },300);

                var timer: egret.Timer = new egret.Timer(305,1);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerTSOpen,this);
                timer.start();
            }
        }

        /*
        * 顶部区域展开完成时触发。
        */
        private timerTSOpen(event:egret.TimerEvent)
        {
            this.midArea.setTrueHeight(this.m_wm.getMidHeight());
            this.midAreaGroup.y = this.m_wm.getMidY();

            this.topArea.switchBtn.source = RES.getRes("top_screen_button_up_png");

            this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());
            this.readjustThumbSel();
        }

        /*
        * 顶部区域关闭完成时触发。
        */ 
        private timerTSClosed(event:egret.TimerEvent): void
        {
            this.midArea.setTrueHeight(this.m_wm.getMidHeight());
            this.midAreaGroup.y = this.m_wm.getMidY();

            this.topArea.switchBtn.source = RES.getRes("top_screen_button_down_png");

            this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());
            this.readjustThumbSel();
        }

        private onImgDragMove(evt: CMidAreaEvent_Eyelen) {
            this.readjustThumbSel();
        }

        private onImgDragEnd(evt:CMidAreaEvent_Eyelen) {
            this.readjustThumbSel();
        }

        /*
        * 横竖校准对话框确定退出时调用。
        */ 
        private onCaliDlgClose(dlgResult:boolean):void
        {
            if(dlgResult) { // OK btn tap.
                this.m_UIPresenter.setCaRat(this._getParentContainer().getCaRat());
                this.m_UIPresenter.updateFromPM();
                this.syncWithUIPresenter();
            }
        }

        /*
        * 显示横竖校准对话框。
        */ 
        private onCaliBtn(evt: egret.TouchEvent):void {
            this.m_parentContainer.showCaliDlg(this.onCaliDlgClose);
        }

        /*
            获取父 container。
        */
        public getParentContainer():IEyelenPraContainer {
            return this.m_parentContainer;
        }

        /*
        * 点击“返回”按钮时触发。
        */ 
        private backBtnTap(): void
        {
            this.m_parentContainer.showConfirm("该操作将放弃当前练习的进度和数据。\n您确定继续吗？" , this.onBack2MainMenuConfirm);
        }

        private onBack2MainMenuConfirm(param:any): void {
            var ret:boolean = <boolean>param;
            if(ret) {
                this.finalScoreDlg.visible = false;
                g_pageJumper.gotoPage("WelcomeScene" , null);
            }
            else {
            }
        }

        /*
        * 创建底部菜单。
        */ 
        private createBottomMenu(): void {
        }

        /*
        * 刷新场景。通常新练习开始时，资源加载完成后调用。 
        */ 
        public refreshScene():void {

            //        1、Reset Img content & location
            this.showLen(this.m_pm.getCurLen());

            if(this.m_NoImgMode) {
                this.m_UIPresenter.setImgWidth(this.m_imgOriWidth);
                this.m_UIPresenter.setImgHeight(720);
            }
            else {
                this.m_UIPresenter.setImgWidth(this.m_imgOriWidth);
                this.m_UIPresenter.setImgHeight(this.midArea.imgFromFile.height);                
            }

            var tmpSelRect = new gdeint.CRect();

            tmpSelRect.m_left = 0;
            tmpSelRect.m_top = 0;
            tmpSelRect.m_width = this.m_wm.getWinWidth() /this.m_UIPresenter.getRenderFilter()._getCaRat();
            tmpSelRect.m_height = this.m_wm.getMidHeight();

            var selPt:gdeint.CPoint = new gdeint.CPoint();
            selPt.m_x = 0;
            selPt.m_y = 0;
            this.m_UIPresenter.inpImgSelPt(selPt);
            this.m_UIPresenter.inpImgSelWidth(this.m_wm.getWinWidth() /this.m_UIPresenter.getRenderFilter()._getCaRat());
            this.m_UIPresenter.inpImgSelHeight(this.m_wm.getMidVisibleHeight());

            //reset thumb & thumbSel
            this.readjustThumb();
            this.readjustThumbSel();

            //        2、Progress bar and score to 0
            this.topArea.progressView.setProgress(0);
            this.topArea.scoreView.clearScore();

            //        3、Ruler user and OK button
            this.m_UIPresenter.m_userLen = 0;
            this.bottomArea.lenInputer.clearLen();

            this.showInitInstrus();
            this.bottomArea.lenInputer.unlock();
        }


        /*
        * 与presenter进行同步，把presenter里最新数据应用到场景。不应更改presenter的内容，目前问题严重。
        */ 
        public syncWithUIPresenter() : void {

            // Img
            var imgRect: gdeint.CRect;
            imgRect = this.m_UIPresenter.getImgRect();
            if(this.m_NoImgMode) {
                this.midArea.m_randomGraphShape.resize(imgRect.m_width , imgRect.m_height);
            }
            else {
                this.midArea.imgFromFile.width = imgRect.m_width;
                this.midArea.imgFromFile.height = imgRect.m_height;
            }

            var tmpLen:CLen;
            tmpLen = this.m_UIPresenter.getLen();
            if(tmpLen && null != tmpLen) {
                if(this.m_NoImgMode) {
                    // 要加上这三行缩略图才显示正常。原因未知。
                    this.m_imgOriWidth = 1024;
                    this.m_UIPresenter.setImgWidth(this.m_imgOriWidth);
                    this.m_UIPresenter.setImgHeight(720);

                }
                else {
                    this.showImg(tmpLen.m2_imgResName);
                }
            }

            this.midArea.midContentGroup.x = this.m_UIPresenter.getImgRect().m_left;
            this.midArea.midContentGroup.y = this.m_UIPresenter.getImgRect().m_top;

            // Len
            this._showLen(tmpLen);

            // Thumb
            this.readjustThumb();

            // ThumbQuestioner
            var questionerPt: gdeint.CPoint;
            questionerPt = this.m_UIPresenter.getThumbQuestionerDispPt();
            this.topArea.thumbUI.thumbQuestioner.x = questionerPt.m_x;
            this.topArea.thumbUI.thumbQuestioner.y = questionerPt.m_y;

            // ThumbSel
            this.readjustThumbSel();

        }
    }
}