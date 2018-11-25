/**
 *
 * 长度比较对话框格子版。简单难度用。
 * 本控件只直接显示用户填入的数据。不进行横竖校准等计算。
 * 
 */
namespace eyelen3E {
    export class CGridCmpLenDlg extends eui.Component {

        //以下变量与 exml皮肤里的元素对应。////////////////////////////////////////
        private bg: eui.Image;
        public nextBtn: eui.Button;
        private scoreValue: eui.Label;
        private correLenIcon: eui.Image;
        private correLenRect: eui.Rect;
        private userLenIcon: eui.Image;
        private userLenGrp:eui.Group;
    //    private userLen: egret.DisplayObjectContainer;
        private scoreFlags: eui.Group;

        ////////////////////////////////////////////////////////////////////////
        
        private m_nextBtnEventCache; // 事件对象，用于保存事件相关数据。事件为下一长度按钮点击，对象里的内容有：<type , listener , thisObject>

        private m2_tmpCorreLen: number; // 临时保存正确长度。
        private m2_tmpUserGridCnt:number; // 临时保存用户输入的格子数。
        private m2_tmpScore: number; // 临时保存得分。

        private m_flagsArr: Array<egret.Bitmap>; // 旗子列表。
        private m_flagsContainer: egret.DisplayObjectContainer; // 旗子容器。

    //    private m_correLenShape: egret.Shape; // 正确长度画板。
        private m_userGridWidth:number = 30;
        private m_userLenGridsArr: Array<egret.Bitmap>; // // 用户输入长度的格子集合。
        private m_userLenGroup: egret.DisplayObjectContainer; // 用户输入长度的组合。

        private m_loadedGridCnt:number = 0; // 已加载的格子个数。若需要显示更多格子，则加载后增加此变量的值。

        private m2_cc:boolean = false; // 子界面元素是否已创建。
        private m_trueWidth:number = 0;
        private m_trueHeight:number = 0;

        public constructor() {
            super();
            this.m_nextBtnEventCache = new anyObj();

            this.m_flagsArr = new Array<egret.Bitmap>();
            var i;
            for(i = 0;i < 3;++i) {
                this.m_flagsArr[i] = new egret.Bitmap();
            }

            this.m_flagsArr[0].texture = RES.getRes("score_flag_png");
            this.m_flagsArr[1].texture = RES.getRes("score_dot_png");
            this.m_flagsArr[2].texture = RES.getRes("score_flag_png");

            this.m_flagsContainer = new egret.DisplayObjectContainer();
            var i;
            for(i = 0;i < 3;++i) {
                this.m_flagsArr[i].width = 35;
                this.m_flagsArr[i].height = 45;
                this.m_flagsArr[i].x = i * 45;
                this.m_flagsArr[i].y = 0;
                this.m_flagsContainer.addChild(this.m_flagsArr[i]);
            }

            this.m_userLenGroup = new egret.DisplayObjectContainer();
            this.m_userLenGridsArr = new Array<egret.Bitmap>();

            this.loadGrids(12); //预加载12个格子，优化性能。

        }

        public readjustUI():void {
            if(this.m_trueHeight < 350) {
                // 高度小于350时，子元素保持原有大小和坐标。
            }
            else {
                this.nextBtn.x = this.m_trueWidth / 2 - 32;
                this.nextBtn.y = this.m_trueHeight * 240/350;

                this.scoreValue.y = this.m_trueHeight * 20/350;
                this.correLenIcon.y = this.m_trueHeight * 135/350;

                this.correLenRect.y = this.m_trueHeight * 139/350;

                this.userLenIcon.y = this.m_trueHeight * 190/350;

                this.userLenGrp.y = this.m_trueHeight * 195/350;
                this.scoreFlags.y = this.m_trueHeight * 70/350;

                this.scoreValue.x = this.m_trueWidth/2 - this.scoreValue.width/2;
                this.scoreFlags.x = this.m_trueWidth * 0.5 - 50;
            }
        }

        public setTrueWidth(w:number):void {
            this.m_trueWidth = w;
            if(this.m2_cc) {
                if(this.width < w) {
                    this.width = w;
                }
                this.readjustUI();
            }
        }

        public setTrueHeight(h:number):void {
            this.m_trueHeight = h;
            if(this.m2_cc) {
                if(this.height < h) {
                    this.height = h;
                }
                this.readjustUI();
            }
        }

        private loadGrids(gridCnt:number) {
            var i;
            for(i = this.m_loadedGridCnt;i < gridCnt;++i) {
                this.m_userLenGridsArr[i] = new CRulerEasyBodyCell();
                this.m_userLenGridsArr[i].texture = RES.getRes("rulerBodyCell2_gif");
                this.m_userLenGridsArr[i].x = i * this.m_userGridWidth/*30 * g_caRat*/;
                this.m_userLenGridsArr[i].width = this.m_userGridWidth/*30 * g_caRat*/;
                this.m_userLenGridsArr[i].height = 45;
                this.m_userLenGridsArr[i].visible = false;
                this.m_userLenGroup.addChild(this.m_userLenGridsArr[i]);
            }
            this.m_loadedGridCnt = gridCnt;
        }

        public childrenCreated() {
            this.m2_cc = true;
            if(this.m_trueWidth > 0) {
                this.width = this.m_trueWidth;
            }
            else {
                this.m_trueWidth = this.width;
            }
            if(this.m_trueHeight > 0) {
                this.height = this.m_trueHeight;
            }
            else {
                this.m_trueWidth = this.width;
            }

            this.readjustUI();

            // Do the actions planed to do after children created.
            if(this.m_nextBtnEventCache.type) {
                this._onNextBtnEvent(this.m_nextBtnEventCache.type,this.m_nextBtnEventCache.listener,this.m_nextBtnEventCache.thisObject);
            }

            this._setScore(this.m2_tmpScore);
            this._setCorreLen(this.m2_tmpCorreLen);
            this._setUserGridCnt(this.m2_tmpUserGridCnt);

            this.scoreFlags.addChild(this.m_flagsContainer);
    //        this.userLen = this.m_userLenGroup;
            this.userLenGrp.addChild(this.m_userLenGroup);
    //        this.correLen = this.m_correLenShape;
        }

        /*
        * 设置得分。请勿直接调用本函数。应当调用 setScore函数。
        */ 
        private _setScore(v: number): void {
            var i;
            this.scoreValue.text = "+" + v;

            for(i = 0;i * 10 < v;i++) {
                this.m_flagsArr[i].texture = RES.getRes("score_flag_png");
            }
            for(;i < 3;i++) {
                this.m_flagsArr[i].texture = RES.getRes("score_cross_png");
            }
        }

        /*
        * 设置正确长度。请勿直接调用本函数。应当调用 setCorreLen函数。
        */ 
        private _setCorreLen(v: number): void {
            if(!isNaN(v)) {
    /*            this.m_correLenShape.graphics.clear();
                this.m_correLenShape.graphics.beginFill(0x55CCAA);
                this.m_correLenShape.graphics.drawRect(0,0,v,this.correLen.height);
                this.m_correLenShape.graphics.endFill();*/
                this.correLenRect.width = v;
            }
        }

        private _onNextBtnEvent(type: string,listener: Function,thisObject: any): void {
            this.nextBtn.addEventListener(type,listener,thisObject);
        }

        public setScore(v: number): void // 参数v 传入计算好的得分。此函数里不作计算。
        {
            this.m2_tmpScore = v; //Save to temp and show it after children created.
            
            if(this.m2_cc) {
                this._setScore(v);
            }
            else {
                //If children not created yet, left to childrenCreated() to continue the remaining job.
            }

        }

        public setCorreLen(v: number): void // 参数v 传入校准后的结果。本函数里不作校准计算。
        {
            this.m2_tmpCorreLen = v;
            if(this.m2_cc) {
                this._setCorreLen(v);
            }
            else {
            }

        }

        /*
        * 设置用户输入的格子数。请勿直接调用本函数，应当调用 setUserGridCnt函数。
        */ 
        public _setUserGridCnt(cnt:number): void {
            if(!isNaN(cnt)) {
                
                if(this.m_loadedGridCnt < cnt) {
                    this.loadGrids(cnt);
                }

                for(i = 0;i < this.m_userLenGridsArr.length/*12*/;++i) {
                    this.m_userLenGridsArr[i].x = i * this.m_userGridWidth/*30 * g_caRat*/;
                    this.m_userLenGridsArr[i].width = this.m_userGridWidth/*30 * g_caRat*/;
                }

                var i;
                for(i=0;i<cnt;++i)
                {
                    this.m_userLenGridsArr[i].visible = true;
                }
                for(;i<this.m_loadedGridCnt;++i)
                {
                    this.m_userLenGridsArr[i].visible = false;
                }
            }
        }

        public setUserGridWidth(gWidth:number):void {
            this.m_userGridWidth = gWidth;
        }

        public setUserGridCnt(cnt:number): void {
            this.m2_tmpUserGridCnt = cnt;
            if(this.m2_cc) {
                this._setUserGridCnt(cnt);
            }
            else {
            }
        }

        /*
        * 下一长度按钮点击时触发。
        */ 
        public onNextBtnEvent(type: string,listener: Function,thisObject: any): void {
            if(this.m2_cc) {
                this._onNextBtnEvent(type,listener,thisObject);
            }
            else {
                // Save the parms into cache and plan to do it when ready.
                this.m_nextBtnEventCache.type = type;
                this.m_nextBtnEventCache.listener = listener;
                this.m_nextBtnEventCache.thisObject = thisObject;
            }
        }
    }
}
