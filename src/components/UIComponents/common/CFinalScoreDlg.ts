/**
 *
 * 最终得分显示对话框。 
 *
 */
namespace eyelen3E {
    export class CFinalScoreDlg extends eui.Component{
        public constructor() {
            super();
            this.m_bg = new egret.Shape();
            this.m_starsArr = new Array<egret.Bitmap>();
            this.m_starsContainer = new egret.DisplayObjectContainer();
            var i;
            for(i=0;i<3;++i)
            {
                this.m_starsArr[i] = new egret.Bitmap();
                this.m_starsArr[i].texture = RES.getRes("star_empty_png");
                this.m_starsArr[i].width = 60;
                this.m_starsArr[i].height = 60;
                this.m_starsArr[i].x = 64*i;
                this.m_starsContainer.addChild(this.m_starsArr[i]);
            }
            this.m_replayEvt = new CFinalScoreDlgEvent(CFinalScoreDlgEvent.EVT_REPLAY_BTN_TAP);
        }

        private bgGrp:eui.Group;
        private score:eui.Label;
        private stars: eui.Group;
        private replayBtn: eui.Button;
        private m_bg:egret.Shape;
        private m_starsArr:Array<egret.Bitmap>;
        private m_starsContainer:egret.DisplayObjectContainer;
        private m_replayEvt:CFinalScoreDlgEvent;

        public childrenCreated():void {
            this.m_bg.graphics.beginFill(0x00FF00);
            this.m_bg.graphics.drawRect(0,0,this.width,this.height);
            this.m_bg.graphics.endFill();

            this.bgGrp.addChild(this.m_bg);
            this.stars.addChild(this.m_starsContainer);
            
            this.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onReplay , this);
        }
        
        public setScore(s:number)
        {
            this.score.text = s.toString();
        }
        
        public setStars(scnt:number)
        {
            var i;
            for(i=0;i<scnt;++i)
            {
                this.m_starsArr[i].texture = RES.getRes("star_full_png");
            }
            for(;i<3;++i) {
                this.m_starsArr[i].texture = RES.getRes("star_empty_png");
            }
        }
        
        private onReplay(evt:egret.TouchEvent)
        {
            this.dispatchEvent(this.m_replayEvt);	    
        }
    }
}