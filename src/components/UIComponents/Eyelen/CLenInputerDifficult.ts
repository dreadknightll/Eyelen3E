/**
 *
 * 困难难度下的长度输入控件。让用户拉动卷尺输入长度。
 * 本卷尺控件由尺盒、尺带、拉环三部分组成。用户拉动拉环进行目测结果输入。
 *
 */
namespace eyelen3E {
    export class CLenInputerDifficult extends CLenInputerBase{
        //横竖校准计算不在本类里进行。
        
        //以下变量与 exml皮肤中的元素相对应。//////////////////////////////
        public okBtn:eyelen3E.CPraOKBtn;
        private drager: egret.DisplayObjectContainer;
        private bg: eui.Image;
        private ruler_head: eui.Group;
        private ruler_body: eui.Group;

        ////////////////////////////////////////////////////////////////

        private m_rulerBodyShape: egret.Shape; // 卷尺尺盒。
        private m_dragerBaseX: number; // 拉尺横坐标。可通过拉尺右端拉环的横坐标减去本值计算用户输入的长度。

        private m_isDraging: boolean; // 标记。拉环是否正在拖动中。
        private m_isLocked: boolean; // 锁定标记。为 true 则表示不允许用户拉动卷尺。

        private m_firstDraged: boolean; // 标记。卷尺是否已经拉过。若卷尺未拉过，则不允许确定提交目测结果。
        
        private m_tchPosX: number; // 触摸点X坐标。

        public constructor() {
            super();
        }

        public childrenCreated(): void {
            this.m_isDraging = false;
            this.m_firstDraged = false;

            this.okBtn.enabled = false;

            this.m_dragerBaseX = this.ruler_head.x + this.ruler_head.width;        

    /*        var bgObj: egret.Shape;
            bgObj = new egret.Shape();
            this.bg.source = bgObj;
            bgObj.graphics.beginFill(0x77BBFF);
            bgObj.graphics.drawRect(0,0,this.bg.width,this.bg.height);
            bgObj.graphics.endFill();*/

            this.m_rulerBodyShape = new egret.Shape();
            this.ruler_body.addChild(this.m_rulerBodyShape);
            
    //        headShape

    /*
            var dragerShape: egret.DisplayObjectContainer;
            var innerBmp: egret.Bitmap;
            var innerBg: egret.Shape; // The size of it determines the dragable area.

            dragerShape = new egret.DisplayObjectContainer();
            innerBmp = new egret.Bitmap();
            innerBg = new egret.Shape();

            innerBmp.texture = RES.getRes("ruler_drager_png");
            innerBmp.width = 60;
            innerBmp.height = 80;

            innerBg.graphics.beginFill(0x000000,0);
            innerBg.graphics.drawRect(0,0,90,80);
            innerBg.graphics.endFill();

            dragerShape.addChild(innerBg);
            dragerShape.addChild(innerBmp);
            dragerShape.width = 200;

            this.drager = dragerShape;

            this.drager.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStartDrag,this);
            */

            this.drager.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onStartDrag,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveOnStage,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTchEndOnStage,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTchRelOutOfStage,this);
        }

        /*
        * 开始拖动时触发。
        */ 
        private onStartDrag(evt:egret.TouchEvent):void
        {
            if(this.m_isLocked)
            {
                return;
            }

            this.m_isDraging = true;
            this.m_firstDraged = true;
            this.okBtn.enabled = true;
            this.m_tchPosX = evt.localX;

            playBtnSnd();
        }

        /*
        * 画尺带。
        */ 
        private drawLen():void
        {
            this.m_rulerBodyShape.graphics.clear();
            this.m_rulerBodyShape.graphics.beginFill(0x888888);
            this.m_rulerBodyShape.graphics.drawRect(0,0,this.drager.x-this.m_dragerBaseX,60);
            this.m_rulerBodyShape.graphics.endFill();
        }

        /*
        * 拖动时触发。
        */ 
        private onMoveOnStage(evt: egret.TouchEvent): void
        {
            if(this.m_isLocked)
            {
                return;
            }

            if(this.m_isDraging) {
                var newX = evt.stageX - this.m_tchPosX;

                if(newX < this.m_dragerBaseX)
                {
                    newX = this.m_dragerBaseX;
                }

                this.drager.x = newX;
                this.drawLen();
            }
        }

        /*
        * 触摸结束时触发（在卷尺控件内释放）
        */ 
        private onTchEndOnStage(evt: egret.TouchEvent): void
        {
            if(this.m_isDraging)
            {
                playBtnSnd();            
            }
            this.m_isDraging = false;

        }

        /*
        * 触摸结束时触发（在卷尺控件外释放）
        */ 
        private onTchRelOutOfStage(evt: egret.TouchEvent): void
        {
            this.m_isDraging = false;
        }

        public setWidth(wid:number): void {
            this.width = wid;
            this.okBtn.x = wid - this.okBtn.width - 20;
        }

        /*
        * 获取当前卷尺代表的长度。
        */ 
        public getLen(): number {
            return this.drager.x - this.m_dragerBaseX;
        }
        
        /*
        * 清空卷尺长度。
        */ 
        public clearLen(): void {
            this.drager.x = this.m_dragerBaseX;
            this.m_rulerBodyShape.graphics.clear();
            this.m_rulerBodyShape.graphics.beginFill(0x000000);
            this.m_rulerBodyShape.graphics.endFill(); // 要加上这两行否则安卓真机下可能清除失败。
            this.m_firstDraged = false;
            this.okBtn.enabled = false;
        }
        
        /*
        * 锁定不允许操作卷尺。
        */ 
        public lock(): void {
            this.m_isLocked = true;
            this.okBtn.enabled = false;
        }
        
        /*
        * 解除锁定，重新允许操作卷尺。
        */ 
        public unlock(): void {
            this.m_isLocked = false;
            if(this.m_firstDraged) {
                this.okBtn.enabled = true;
            }
        }
    }
}