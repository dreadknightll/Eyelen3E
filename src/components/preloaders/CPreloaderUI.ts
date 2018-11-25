/**
 *
 * @author 
 *
 */
namespace eyelen3E {
    export class CPreloaderUI extends eui.Component implements IPreloaderUI {
        public constructor() {
            super();

            this.m_noUIPreloaderUI = new CNoUIPreloaderUI();
            this.m_noUIPreloaderUI.setProgressListener(this.onProgressListener,this);

            this.x = 0;
            this.y = 0;

            this.m_nextActTimer = new egret.Timer(2000, 1);
        }

        public setPreloader(preloader: IPreloader):void {
            this.m_noUIPreloaderUI.setPreloader(preloader);
        }

        public setCompleteListener(listener: (taskName: string) => void,thisObj: any): void // Called when total proportion reaches 100 or all tasks are added and completed.
        {
            this.m_cmplListener = listener;
            this.m_cmplThisObj = thisObj;

            this.m_noUIPreloaderUI.setCompleteListener(this.onPreloadComplete,this);
        }

        private onPreloadComplete():void {
            if(this.m_noUIPreloaderUI.m_proporFinished >= 100) {
                this.readyLabel.visible = true;
                this.m_nextActTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onNextActTimer, this);
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN , this.onScrTch , this);
                this.m_nextActTimer.start();
            }
            else {
                //No task left case. No action here.
            }

            this.m_cmplListener.apply(this.m_cmplThisObj);
        }

        private takeNextAct():void {
            this.m_nextActListener.apply(this.m_nextActThisObj);
            this.m_nextActTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onNextActTimer, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN , this.onScrTch , this);
        }
        private onNextActTimer(evt:egret.TimerEvent) {
            this.takeNextAct();
        }
        private onScrTch(evt:egret.TouchEvent) {
            this.takeNextAct();
        }

        public setNextActListener(listener:Function , thisObj:any) {
            this.m_nextActListener = listener;
            this.m_nextActThisObj = thisObj;
        }

        public _setParentContainer(c:IUIContainer) {
            this.m_noUIPreloaderUI._setParentContainer(c);
        }

        public _getParentContainer():IUIContainer {
            return this.m_noUIPreloaderUI._getParentContainer();
        }

        public addTask(task: gdeint.CPreloadTask): void {
            this.m_noUIPreloaderUI.addTask(task);
        }

        public setNoTaskLeft(ntl: boolean): void // Set whether all tasks are added.
        {
            this.m_noUIPreloaderUI.setNoTaskLeft(ntl);
        }
        
        public setSceneRect(x:number , y:number , wid:number , hei:number):void {
            this.x = x + (wid-400)/2;
            this.y = y + (hei-300)/5*2;
        }

        public startPreload():void {
            this.m_noUIPreloaderUI.startPreload();
        }
        
        public clearProgress():void {
            this.m_noUIPreloaderUI.clearProgress();
            this.readyLabel.visible = false;
            this.cmplPropor.text = "0.0%";
        }

        private onProgressListener(): void // 因为由大多数数据由父类处理所以参数简单。
        {
            this.cmplPropor.text = this.m_noUIPreloaderUI.m_proporFinished + "%";
        }

        private cmplPropor:eui.Label;
        private readyLabel:eui.Label;
        private m_noUIPreloaderUI:CNoUIPreloaderUI; //Parent class.
        private m_nextActListener:Function;
        private m_nextActThisObj:any;
        private m_nextActTimer:egret.Timer;
        private m_cmplListener:Function;
        private m_cmplThisObj:any;

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