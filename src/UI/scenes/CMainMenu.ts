/**************************************************
 * UI/scenes/CMainMenu.ts
 * 
 * 主菜单画面。
 *
**************************************************/

namespace eyelen3E {
        export class CMainMenu extends eui.Panel {
        //    public scrBg: eui.Image; // 背景色。
        public startDifficultBtn1: eui.Button;
        public startDifficultBtn2: eui.Button; // 开始困难练习按钮。
        public startEasyBtn1: eui.Button;
        public startEasyBtn2: eui.Button; // 开始简单练习按钮。
        private menuGrp:eui.Group;

        public m_startTimer: egret.Timer; // 自动开始定时器。

        private m_trueWidth:number = 480;
        private m_trueHeight:number = 744;
        private m2_cc:boolean = false;

        public constructor() {
                super();

                this.m_startTimer = new egret.Timer(5000,1);
                this.m_startTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.startDifficult,this);
        }

        public childrenCreated() {
                this.startEasyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startEasy,this);
                this.startEasyBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startEasy,this);

                this.startDifficultBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startDifficult,this);
                this.startDifficultBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startDifficult,this);

                this.m2_cc = true;
                this.rearrangeUI();
        }

        public setTrueWidth(w:number) {
                this.m_trueWidth = w;
                if(this.m2_cc) {
                        this.rearrangeUI();
                }
        }

        public setTrueHeight(h:number) {
                this.m_trueHeight = h;
                if(this.m2_cc) {
                        this.rearrangeUI();
                }
        }

        private rearrangeUI():void {
                var scale:number , scale1:number , scale2:number;
                var leftGap:number = 0;
                scale1 = this.m_trueWidth / 400;
                scale2 = this.m_trueHeight / 744;
                if(scale1<scale2) {
                        scale = scale1;
                        leftGap = 0;
                }
                else {
                        scale = scale2;
                        leftGap = (this.m_trueWidth/scale - 400)/2;
                }

                this.menuGrp.left = 50.0 / 400 * this.m_trueWidth + leftGap;

                this.menuGrp.scaleX = scale;
                this.menuGrp.scaleY = scale;
        }

        public run():void {
                this.m_startTimer.start();
        }

        /*
        * 开始简单练习。
        */ 
                public startEasy():void {
                g_level = 1;
        /*        g_welcomeScene.visible = false;
                this.visible = false;

                g_praEasyScene.startNewPra();
                g_praEasyScene.visible = true;
                this.m_startTimer.stop();*/
                g_praEasyContainer.startNewPra();
                g_praEasyContainer.saveVisibleStates();
                g_pageJumper.gotoPage("PraEasyScene",null);
                this.m_startTimer.stop();
                }

                public startNormal():void {
                g_level = 2;
                }

                /*
                * 开始困难练习。
                */ 
                public startDifficult():void {
                g_level = 3;

                g_praDifficultContainer.startNewPra();

        //        先显示翻页动画 （未完成）
                g_praDifficultContainer.saveVisibleStates();
                g_pageJumper.gotoPage("PraDifficultScene",null);

                this.m_startTimer.stop();
                }

                /*
                * 回到欢迎屏幕。
                */ 
                public goBack():void {
                }
        }
}
