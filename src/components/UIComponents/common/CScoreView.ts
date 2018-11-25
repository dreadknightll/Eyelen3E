/**
 *
 * /src/components/CScoreView.ts
 * 练习得分显示（含数字和图示）。
 *
 */
namespace eyelen3E {
    export class CScoreView extends eui.Component {
        public constructor() {
            super();

            this.m_scoreFlagsArr = new Array<Array<egret.Bitmap>>();
            this.m_scoreFlagsContainer = new egret.DisplayObjectContainer();
        }

        private s_flagWidth = 13; //旗子宽度。
        private s_flagHeight = 22; //旗子高度。
        private scoreTxt:eui.Label; // 成绩文本控件。
        private scoreFlags:eui.Group; // 成绩旗子组合。
        private m_scoreFlagsArr:Array<Array<egret.Bitmap>>; // 成绩旗子数组。
        private m_scoreFlagsContainer:egret.DisplayObjectContainer; // 成绩旗子显示容器。

        private m_score:number = 0; // 当前成绩。不填写则为0。
        private m_progress:number = 0; // 当前进度。不填写则为0。
        
        private m_created:boolean = false; // 界面子元素是否已创建完成。

        public childrenCreated(): void {
            
            this.m_created = true;

            this.m_scoreFlagsArr = new Array<Array<egret.Bitmap>>();
            this.m_scoreFlagsContainer = new egret.DisplayObjectContainer();

            var i,j;
            for(i=0;i<3;++i)
            {
                this.m_scoreFlagsArr[i] = new Array<egret.Bitmap>();
                for(j=0;j<10;++j)
                {
                    this.m_scoreFlagsArr[i][j] = new egret.Bitmap();
                    this.m_scoreFlagsArr[i][j].x = (this.s_flagWidth + 3) * j + 5;
                    this.m_scoreFlagsArr[i][j].y = (this.s_flagHeight + 2) * i;
                    this.m_scoreFlagsArr[i][j].width = this.s_flagWidth;
                    this.m_scoreFlagsArr[i][j].height = this.s_flagHeight;
                    this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_dot_png");
                    this.m_scoreFlagsContainer.addChild(this.m_scoreFlagsArr[i][j]);

                }
            }

            this.scoreFlags.addChild(this.m_scoreFlagsContainer);
            
            this.updateScoreFlags();
        }

        /*
        * 根据 m_score 刷新旗子矩阵。
        */ 
        private updateScoreFlags():void {
            if(!this.m_created)
            {
                return;
            }

            this.scoreTxt.text = this.m_score.toString();

            var fra: IScoreFlagRect = new CScoreFlagRect();
            var flagCnt: number = this.m_score / 10;
            var dotCnt: number = 30 - (this.m_progress) * 3;
            var crossCnt: number = 30 - flagCnt - dotCnt;

            fra.setCnts(flagCnt,crossCnt);
            var flagArrInt: Array<Array<number>> = fra.getFlagArr();

            var i,j;
            for(i = 0;i < 3;++i) {
                for(j = 0;j < 10;++j) {
                    switch(flagArrInt[i][j]) {
                        case 0:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_dot_png");
                            break;

                        case 1:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_flag_png");
                            break;

                        case 2:
                            this.m_scoreFlagsArr[i][j].texture = RES.getRes("score_cross_png");
                            break;
                    }
                }
            }
        }

        /*
        * 设置成绩（连同进度）。
        */ 
        public setScoreWithPro(score:number,progress:number):void {
            //progress:0-10
            this.m_score = score;
            this.m_progress = progress;
            this.updateScoreFlags();

        }
        
        /*
        * 清空数据。
        */ 
        public clearScore():void
        {
            this.setScoreWithPro(0,-1);
        }
    }
}
