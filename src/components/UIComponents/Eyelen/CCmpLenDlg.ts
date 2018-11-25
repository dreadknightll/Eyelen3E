/**
 *
 * 长度比较对话框控件。困难难度用。
 * 本控件只直接显示用户填入的数据。不进行横竖校准等计算。
 *
 */

function anyObj() {
}

namespace eyelen3E {
    export class CCmpLenDlg extends eui.Component {

        //以下变量与 exml皮肤里的元素相对应。
        private bg:eui.Image;
        public nextBtn: eui.Button;
        private scoreValue: eui.Label;
        private correLenIcon: eui.Image;
        private correLen: eui.Group;
        private userLenIcon: eui.Image;
        private userLen: eui.Group;
        private scoreFlags: eui.Group;

        ///////////////////////////////////////////////////////
        
        private m_nextBtnEventCache; // 事件对象。点击“下一长度”按钮时触发相应事件。对象里的数据包括：<type , listener , thisObject>。

        private m_childrenCreated: boolean; // 界面子元素是否已经创建完成。 

        private m2_tmpCorreLen: number; // 临时保存正确长度。
        private m2_tmpUserLen: number; // 临时保存用户长度。
        private m2_tmpScore: number; // 临时保存成绩。

        private m_flagsArr: Array<egret.Bitmap>; // 旗子对象数组。
        private m_flagsContainer: egret.DisplayObjectContainer; // 旗子容器。

        private m_correLenShape: egret.Shape; // 正确长度画板。
        private m_userLenShape: egret.Shape; // 用户长度画板。

        private m2_cc:boolean = false;
        private m_trueWidth:number = 0;
        private m_trueHeight:number = 0;

        public constructor() {
            super();
            this.m_childrenCreated = false;
            this.m_nextBtnEventCache = new anyObj();

            this.m_flagsArr = new Array<egret.Bitmap>();
            var i;
            for(i = 0;i < 3;++i)
            {
                this.m_flagsArr[i] = new egret.Bitmap();
            }

            this.m_flagsArr[0].texture = RES.getRes("score_flag_png");
            this.m_flagsArr[1].texture = RES.getRes("score_dot_png");
            this.m_flagsArr[2].texture = RES.getRes("score_flag_png");

            this.m_flagsContainer = new egret.DisplayObjectContainer();
            var i;
            for(i = 0;i < 3;++i)
            {
                this.m_flagsArr[i].width = 35;
                this.m_flagsArr[i].height = 45;
                this.m_flagsArr[i].x = i * 45;
                this.m_flagsArr[i].y = 0;
                this.m_flagsContainer.addChild(this.m_flagsArr[i]);
            }
            
            this.m_correLenShape = new egret.Shape();
            this.m_userLenShape = new egret.Shape();
            this.m2_cc = true;
            if(this.m_trueWidth > 0) {
                this.width = this.m_trueWidth;
            }
            if(this.m_trueHeight > 0) {
                this.height = this.m_trueHeight;
            }
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

                this.correLen.y = this.m_trueHeight * 139/350;

                this.userLenIcon.y = this.m_trueHeight * 190/350;

                this.userLen.y = this.m_trueHeight * 195/350;
                this.scoreFlags.y = this.m_trueHeight * 70/350;

                this.scoreValue.x = this.m_trueWidth/2 - this.scoreValue.width/2;
                this.scoreFlags.x = this.m_trueWidth * 0.5 - 50;
            }
        }

        public childrenCreated() {
            this.m_childrenCreated = true;

            // Do the actions planed to do after children created.
            if(this.m_nextBtnEventCache.type) {
                this._onNextBtnEvent(this.m_nextBtnEventCache.type,this.m_nextBtnEventCache.listener,this.m_nextBtnEventCache.thisObject);
            }

            this._setScore(this.m2_tmpScore);
            this._setCorreLen(this.m2_tmpCorreLen);
            this._setUserLen(this.m2_tmpUserLen);

            this.scoreFlags.addChild(this.m_flagsContainer);
            this.userLen.addChild(this.m_userLenShape);
            this.correLen.addChild(this.m_correLenShape);

        }

        public setTrueWidth(w:number):void {
            this.m_trueWidth = w;
            if(this.m2_cc) {
                this.width = w;
            }
        }

        public setTrueHeight(h:number):void {
            this.m_trueHeight = h;
            if(this.m2_cc) {
                this.height = h;
            }
        }

        /*
        * 设置界面上的得分。请勿直接调用本函数，应当调用 setScore函数 。
        */ 
        private _setScore(v: number): void {
            var i;
            this.scoreValue.text = "+" + v;

            for(i = 0;i*10 < v;i++)
            {
                this.m_flagsArr[i].texture = RES.getRes("score_flag_png");
            }
            for(;i < 3;i++)
            {
                this.m_flagsArr[i].texture = RES.getRes("score_cross_png");
            }
            
        }

        /*
        * 设置界面上的正确长度。请勿直接调用本函数，应当调用 setCorreLen函数。
        */ 
        private _setCorreLen(v: number): void
        {
            if(!isNaN(v)) {
                this.m_correLenShape.graphics.clear();
                this.m_correLenShape.graphics.beginFill(0x55CCAA);
                this.m_correLenShape.graphics.drawRect(0,0,v,this.correLen.height);
                this.m_correLenShape.graphics.endFill();
            }
        }

        /*
        * 设置界面上的用户长度。请勿直接调用本函数，应当调用 setUserLen函数。
        */ 
        private _setUserLen(v: number): void
        {
            if(!isNaN(v)) {
                this.m_userLenShape.graphics.clear();
                this.m_userLenShape.graphics.beginFill(0x55CCAA);
                this.m_userLenShape.graphics.drawRect(0,0,v,this.userLen.height);
                this.m_userLenShape.graphics.endFill();
            }
        }

        private _onNextBtnEvent(type: string,listener: Function,thisObject: any): void
        {
            this.nextBtn.addEventListener(type,listener,thisObject);
        }

        public setScore(v:number):void
        {
            this.m2_tmpScore = v; //Save to temp and show it after children created.
            
            if(this.m_childrenCreated) {
                this._setScore(v);
            }
            else {
                //If children not created yet, left to childrenCreated() to continue the remaining job.
            }
        }

        public setCorreLen(v: number): void // 参数传入校准后的v。本处不作校准计算。
        {
            this.m2_tmpCorreLen = v;
            if(this.m_childrenCreated) {
                this._setCorreLen(v);
            }
            else {
            }
        }

        public setUserLen(v: number): void // 参数传入校准后的v。本处不作校准计算。
        {
            this.m2_tmpUserLen = v;
            if(this.m_childrenCreated) {
                this._setUserLen(v);
            }
            else {
            }
        }

        public onNextBtnEvent(type:string , listener:Function , thisObject: any):void
        {
            if(this.m_childrenCreated) {
                this._onNextBtnEvent(type,listener,thisObject);
            }
            else
            {
                // Save the parms into cache and plan to do it when ready.
                this.m_nextBtnEventCache.type = type;
                this.m_nextBtnEventCache.listener = listener;
                this.m_nextBtnEventCache.thisObject = thisObject;
            }
        }
    }
}