/**********************************************************
 * /src/components/calibrate/CCaliDlg.ts
 * 横竖校准对话框。（2016-09-29版）
 * 若屏幕输出的宽高比不是 1:1 ，则需要用户进行横竖校准，否则会严重影响练习效果。
 *
 **********************************************************/

var g2_pcnt:number = 0;
var g2_mcnt: number = 0;

namespace eyelen3E {
    export class CCaliDlg extends eui.Component implements ICaliDlgPlugin {
        public constructor() {
            super();

            this.m_caRate = 1.0; //校准系数初始为1.0。

            this.m_autoUpdateFromCaliField = true;

            this.m_caliPresenter = new CCaliPresenterAdapter();
            this.m_caliPresenter.setInitA1(this.m_caRate);

        }

        ///////////////以下变量与exml界面元素对应：///////////
        public closeBtn: CCloseBtn;//skins.myskins.caliCloseBtnSkin;
        public cancelBtn: eui.Button;
        public OKBtn: eui.Button;
        public plusBtn: eui.Button;
        public minusBtn: eui.Button;
        public undoBtn: eui.Button;
        public redoBtn: eui.Button;
        public lockCB: eui.CheckBox;
        public bg: eui.Rect;

        public caliRateField: eui.TextInput;
        public caliSquare: eui.Rect;
        public caliImg: eui.Image;
        public chCaliImgBtn: eui.Image;
        public caliSquareCover: eui.Rect;
        ///////////////////////////////////////////////////
        
        private m_parentContainer:IUIContainer;
        private m_closeListener:(boolean)=>void;

        public _setParentContainer(c:IUIContainer):void {
            this.m_parentContainer = c;
            this._getParentContainer().getDlgLayer().addChild(CDispObj2EgretDOAdapter.from(this));
        }

        public _getParentContainer(): IUIContainer {
            return this.m_parentContainer;
        }

        public _setCloseListener(closeListener:(boolean)=>void) {
            this.m_closeListener = closeListener;
        }

        public _closeDlg(): void {
            this.visible = false;
            if(this.m_closeListener) {
                this.m_closeListener(false); // 从外部关闭，认为是取消。
            }
        }

        public setSceneRect(x:number , y:number , wid:number , hei:number)
        {
        //设置父场景大小和坐标偏移量，以便确定确认框的显示位置。
            this.x = x + (wid-400) / 2;
            this.y = y + (hei-580) / 5 * 2;
        }

        private m_squareWidth:number;
        private m_caliImgTag:number = 1;
        private m_caRate: number; // 当前本对象内存里的校准系数。
        private m_plusTimer: egret.Timer; // 定时器，长按增大按钮时触发。
        private m_minusTimer: egret.Timer; // 定时器，长按减小按钮时触发。
        private m_locked: boolean; // 锁定开关。为 true 表示对话框已锁定，不允许用户输入。
        private m_caliPresenter: ICaliPresenter; // 与对话框对应的 presenter 。
        private m_autoUpdateFromCaliField: boolean; // 校准系数文本框的实时更新开关。通过代码修改文本框时需要关闭此开关避免数据混乱，修改完后重新打开。

        public childrenCreated() {

            this.OKBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOK,this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);        
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onPlusTchBegin,this);
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onPlusTchEnd,this);
            this.plusBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onPlusTchEnd,this); //避免释放后继续自动增大。

            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMinusTchBegin,this);
            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onMinusTchEnd,this);
            this.minusBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onMinusTchEnd,this); //避免释放后继续自动减小。

            this.undoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUndo,this);
            this.redoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRedo,this);
            this.caliRateField.addEventListener(egret.Event.CHANGE,this.onCaliRateFieldChange,this);
            this.caliSquareCover.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCaliSquareCoverTap,this);
            this.chCaliImgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCaliImgBtnTap , this);

            this.lockCB.addEventListener(egret.Event.CHANGE,this.onlockCBChanged,this);

            this.refreshCaRateField();

            this.m_plusTimer = new egret.Timer(200,0);
            this.m_minusTimer = new egret.Timer(200,0);
        }

        /*
        * 获取对话框设定的横竖校准系数值。
        */ 
        public getCaliRat():number
        {
            return this.m_caRate;
        }

        public getSquareWidth():number
        {
            return this.m_squareWidth;
        }
        
        public setSquareWidth(w:number):void
        {
            //Set the width of caliSquare and other relevant components.
            this.m_squareWidth = w;
            this.caliSquare.width = w;
            this.caliImg.width = w;
        }

        /*
        * 根据内存里的系数值刷新界面。
        */ 
        public refreshCaRateField():void
        {
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = this.m_caRate.toString();
            this.m_autoUpdateFromCaliField = true;

            this.setSquareWidth(this.caliSquare.height * this.m_caRate);
        }

        /*
        * 以触摸方式输入校准系数时触发。
        */ 
        private onCaliSquareCoverTap(evt: egret.TouchEvent): void
        {
            if(this.m_locked)
            {
                return;
            }

            this.setSquareWidth(evt.stageX - (this.caliSquareCover.x + this.x)); //Be careful if a parent added!
            this.m_caRate = this.caliSquare.width / this.caliSquare.height;
            this.caliRateField.text = this.m_caRate.toString();

            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();
        }

        /*
        * 在文本框里输入校准系数时触发。
        */ 
        private onCaliRateFieldChange(evt:egret.Event):void
        {
            if(this.m_autoUpdateFromCaliField) {
                if(gdeint.EintValidators.CaRatValidator.validate(evt.target.text))
                {
                    var tmpCaRate:number = gdeint.EintParsers.CaRatParser.parseFloat(evt.target.text);
                    if(tmpCaRate > 1.8)
                    {
                        tmpCaRate = 1.8;
                    }

                    this.m_caliPresenter.inputA1(tmpCaRate);
                    if(Math.abs(this.m_caRate - this.m_caliPresenter.getA1()) > 0.000001) {
                        this.m_caliPresenter.recA1();
                    }
                    this.m_caRate = tmpCaRate;
                    this.setSquareWidth(this.caliSquare.height * tmpCaRate);
                }
                else
                {
                }
            }
        }

        /*
        * 锁定复选框触摸时触发。锁定输入以便用户进行尺寸测量。
        */ 
        private onlockCBChanged(evt:egret.Event):void
        {
            if(evt.target.selected)
            {
                this.m_locked = true;
                this.caliRateField.enabled = false;
            }
            else
            {
                this.m_locked = false;
                this.caliRateField.enabled = true;
            }
        }

        private onCaliImgBtnTap(evt: egret.Event): void
        {
            this.m_caliImgTag = this.m_caliImgTag%3 + 1;
            this.caliImg.source = "square" + this.m_caliImgTag + "_png";
            playBtnSnd();
        }

        /*
        * 点击确定按钮时触发。
        */
        public onOK(): void {

            this.visible = false;

            this._getParentContainer().setCaRat(this.getCaliRat());

            var argArr = new Array(); // apply是javascript方法所以要用javascript对象。
            argArr[0] = true;
            this._getParentContainer().applyFunc(this.m_closeListener , argArr);
        }

        /*
        * 右上角关闭按钮触摸时触发。
        */ 
        public onClose():void
        {
            this.visible = false;
            var argArr = new Array(); // apply是javascript方法所以要用javascript对象。
            argArr[0] = false;
            this._getParentContainer().applyFunc(this.m_closeListener,argArr);
        }

        /*
        * 增大按钮长按时触发。
        */ 
        public onPlusTimer():void
        {
            if(this.m_caRate >= 1.8)
            {
                return;
            }

            this.m_caRate += 0.01; //Global var should be used!!

            g2_pcnt++;
            if(g2_pcnt > 10)
            {
                this.m_caRate += 0.09; //Totally 0.1
            }
            this.refreshCaRateField();

            if(3 == g2_pcnt%5)
            {
                this.m_caliPresenter.inputA1(this.m_caRate);
                this.m_caliPresenter.recA1();
            }
        }

        /*
        * 增大按钮释放时（包括单击和长按）触发。
        */ 
        public onPlusTchEnd(): void
        {
            g2_pcnt = 0;
            this.m_plusTimer.stop();
            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();

        }

        /*
        * 增大按钮开始触摸（包括单击和长按）时触发。
        */ 
        public onPlusTchBegin():void
        {
            if(this.m_locked)
            {
                return;
            }

            if(this.m_caRate >= 1.8) {
                return;
            }

            this.m_caRate += 0.01; //Global var should be used!!

            g2_pcnt++;

            this.refreshCaRateField();

            this.m_plusTimer.stop();
            this.m_plusTimer.addEventListener(egret.TimerEvent.TIMER,this.onPlusTimer,this);
            this.m_plusTimer.start();
        }

        /*
        * 减小按钮长按时触发。
        */ 
        public onMinusTimer(): void {
            this.m_caRate -= 0.01; //Global var should be used!!

            g2_mcnt++;
            if(g2_mcnt > 10) {
                this.m_caRate -= 0.09; //Totally 0.1
            }

            if(this.m_caRate < 0)
            {
                this.m_caRate = 0.00001;
            }
            this.refreshCaRateField();

            if(3 == g2_pcnt % 5) {
                this.m_caliPresenter.inputA1(this.m_caRate);
                this.m_caliPresenter.recA1();
            }
        }

        /*
        * 减小按钮开始触摸（包括单击和长按）时触发。
        */ 
        public onMinusTchBegin(): void {
            if(this.m_locked) {
                return;
            }

            this.m_caRate -= 0.01; //Global var should be used!!
            g2_mcnt++;

            if(this.m_caRate < 0) {
                this.m_caRate = 0.00001;
            }
            this.refreshCaRateField();

            this.m_minusTimer.stop();
            this.m_minusTimer.addEventListener(egret.TimerEvent.TIMER,this.onMinusTimer,this);
            this.m_minusTimer.start();
        }

        /*
        * 减小按钮释放（包括单击和长按）时触发。
        */ 
        public onMinusTchEnd(): void {
            g2_mcnt = 0;
            this.m_minusTimer.stop();
            this.m_caliPresenter.inputA1(this.m_caRate);
            this.m_caliPresenter.recA1();
        }

        /*
        * 撤销按钮点击时触发。
        */ 
        public onUndo(): void
        {
            this.m_caliPresenter.undoA1();
            var newA1:number = this.m_caliPresenter.getA1();
            this.m_caRate = newA1;
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = newA1.toString();
            this.m_autoUpdateFromCaliField = true;
            this.setSquareWidth(this.caliSquare.height * newA1);
        }

        /*
        * 重做按钮点击时触发。
        */ 
        public onRedo(): void
        {
            this.m_caliPresenter.redoA1();
            var newA1: number = this.m_caliPresenter.getA1();
            this.m_caRate = newA1;
            this.m_autoUpdateFromCaliField = false;
            this.caliRateField.text = newA1.toString();
            this.m_autoUpdateFromCaliField = true;
            this.setSquareWidth(this.caliSquare.height * newA1);
        }

        public show():void {
            this.visible = true;
        }

        public hide():void {
            this.visible = false;
        }

        public isVisible():boolean {
            return this.visible;
        }
    }
}