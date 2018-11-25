/**
 *
 * 简单难度的长度输入控件。用户通过选择格子数量来确定要输入的长度。
 * 
 */

//var g_caRat:number = 1; //To del later
namespace eyelen3E {
    export class CLenInputerEasy extends CLenInputerBase {
        // 注：横竖校准计算不在本类里进行。

        // 以下变量与 exml皮肤里的界面元素对应。
        public okBtn: CPraOKBtn;
        private ruler_head: eui.Image;
        private ruler_body_grp:eui.Group;
        private ruler_body_cells:eui.Group;
        private ruler_body_rect:eui.Rect;

        private m_rulerBodyCellContainer: egret.DisplayObjectContainer;
        private m_gridWidth:number = 30;
        private m_dragerBaseX: number;

        private m_isDraging: boolean;
        private m_isLocked: boolean;

        private m_firstDraged: boolean;

        private m_tchPosX: number;

        private m_cells: Array<CRulerEasyBodyCell>;
        private m_loadedCellCnt:number = 0; //已加载的格子个数。

        private m_totalGridCnt:number = 12;
        private m_userGridCnt:number;

        public constructor() {
            super();
            this.m_rulerBodyCellContainer = new egret.DisplayObjectContainer();
            this.m_cells = new Array<CRulerEasyBodyCell>();
            this.drawEmptyCells(this.m_totalGridCnt);
        }

        private drawEmptyCells(cellCnt:number) {

            var i;

        //1、加载未加载的格子：
            if(this.m_loadedCellCnt < cellCnt) {
                for(i=this.m_loadedCellCnt;i<cellCnt;++i)
                {
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
            for(i=0;i<cellCnt;++i) {
                this.m_cells[i].x = i * this.m_gridWidth;
                this.m_cells[i].width = this.m_gridWidth;
                this.m_cells[i].visible = true;
            }

        //3、隐藏不显示的格子：
            for(;i<cellCnt;this.m_loadedCellCnt) {
                this.m_cells[i].visible = false;
            }
        }

        public childrenCreated(): void {
            this.m_isDraging = false;
            this.m_firstDraged = false;

            this.okBtn.enabled = false;

            this.m_dragerBaseX = this.ruler_head.x + this.ruler_head.width;

            this.ruler_body_rect.width = 0;
            this.ruler_body_rect.height = 60;

            this.ruler_body_cells.addChild(this.m_rulerBodyCellContainer);

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

            this.m_rulerBodyCellContainer.touchEnabled = true;
            this.m_rulerBodyCellContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onRulerTouch,this);

            this.ruler_body_rect.touchEnabled = true;
            this.ruler_body_rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onRulerTouch,this);
        }

        /*
        * 用户触摸格子时触发。选定从尺盒出口到用户触摸处的所有格子。
        */ 
        private onRulerTouch(evt: egret.TouchEvent): void {

            if(this.m_isLocked) {
                return;
            }
            var cellEndTag = Math.floor(evt.localX/(this.m_gridWidth));
            if(cellEndTag >= this.m_totalGridCnt) {
                return;
            }

            playBtnSnd();

            this.m_userGridCnt = cellEndTag+1;
            var i;
            for(i = 0;i < cellEndTag;++i)
            {
                this.m_cells[i].check();
            }
            for(;i<this.m_totalGridCnt;++i)
            {
                this.m_cells[i].uncheck();
            }

            var tmpWid:number = (Math.floor(cellEndTag)+1) * this.m_gridWidth;
            this.ruler_body_rect.width = tmpWid;

            this.m_firstDraged = true;
            this.okBtn.enabled = true;

        }

        /*
        * 设置控件的宽度。参数wid为新宽度。通常根据屏幕宽度来设置。
        * 格子总数也需随着改变。
        */ 
        public setWidth(wid: number): void {
            this.width = wid;
            this.okBtn.x = wid - this.okBtn.width - 20;
            this.m_totalGridCnt = Math.floor((wid-112)/this.m_gridWidth) - 2;
            this.drawEmptyCells(this.m_totalGridCnt);
        }

        public getGridWidth():number {
            return this.m_gridWidth;
        }

        public getTotalGridCnt():number {
            return this.m_totalGridCnt;
        }
        /*
        * 获取用户输入的格子数。
        */
        public getUserGridCnt():number {
            return this.m_userGridCnt;
        }

        /*
        * 清空用户输入。
        */ 
        public clearLen(): void {
            this.ruler_body_rect.width = 0;
            this.m_firstDraged = false;
            this.okBtn.enabled = false;
        }

        public lock(): void {
            this.m_isLocked = true;
            this.okBtn.enabled = false;
        }

        public unlock(): void {
            this.m_isLocked = false;
            if(this.m_firstDraged) {
                this.okBtn.enabled = true;
            }
        }
        
        /*
        * 设置单个各自的宽度。格子越小难度越高。
        */ 
        public setGridWidth(wid:number)
        {
            this.m_gridWidth = wid;
            var i;
            for(i = 0;i < this.m_totalGridCnt;++i) {
                this.m_cells[i].m_tag = i;
                this.m_cells[i].texture = RES.getRes("rulerBodyCell_gif");
                this.m_cells[i].x = i * this.m_gridWidth;
                this.m_cells[i].width = this.m_gridWidth;
                this.m_cells[i].height = 60;
            }
        }
    }
}