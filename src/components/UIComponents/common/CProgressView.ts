/**
 *
 * 练习进度条。
 *
 */
namespace eyelen3E {
    export class CProgressView extends eui.Component {

        public constructor() {
            super();
            var i;
            this.m_progressCellsArr = new Array<egret.Bitmap>();
            this.m_progressCellContainer = new egret.DisplayObjectContainer();
            this.m_progress = 0;
            for(i=0;i<10;++i)
            {
                this.m_progressCellsArr[i] = new egret.Bitmap();
                this.m_progressCellsArr[i].x = i * this.s_cellWidth;
                this.m_progressCellsArr[i].y = 0;
                this.m_progressCellsArr[i].width = this.s_cellWidth;
                this.m_progressCellsArr[i].height = this.s_cellHeight;
                
                this.m_progressCellsArr[i].texture = RES.getRes("progress_cell_empty_png");

                this.m_progressCellContainer.addChild(this.m_progressCellsArr[i]);
            }
        }

        private progressCells: eui.Group;
        private m_progressCellsArr: Array<egret.Bitmap>;
        private m_progressCellContainer: egret.DisplayObjectContainer;
        private s_cellWidth: number = 20;
        private s_cellHeight: number = 18;
        private m_progress:number;

        public childrenCreated(): void {
            this.progressCells.addChild(this.m_progressCellContainer);
        }

        public setProgress(progress:number)
        {
            //progress range:0~10
            
            this.m_progress = progress;
            var i;
            for(i=1;i<=this.m_progress;++i)
            {
                this.m_progressCellsArr[i-1].texture = RES.getRes("progress_cell_png");            
            }
            for(;i<=10;++i)
            {
                this.m_progressCellsArr[i-1].texture = RES.getRes("progress_cell_empty_png");
            }
        }
        
        public clear():void {
            this.setProgress(0);
        }
    }
}