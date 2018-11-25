/**
 *
 * 练习场景顶部区域。
 * 
 * 请勿修改 scale/x/y，而要通过 setTrueWidth/setTrueHeight 。
 *
 */

namespace eyelen3E {

    export class CTopArea_Eyelen extends eui.Component {
        public constructor() {
            super();

    //        this.m_bgBack = new egret.Shape();
            this.m_bgFront = new egret.Shape();
            this.m_topButtonBg = new egret.Shape();

            this.m_evtSwitchBtnTap = new CTopAreaEvent_Eyelen(CTopAreaEvent_Eyelen.EVT_SWITCHBTN_TAP);
        }

        private topScreen: eui.Image;
        public progressView: CProgressView;
        public scoreView: CScoreView;
    //    public bgBackGrp: eui.Group;
        public bgFrontGrp: eui.Group;
        public switchBtnBgGrp: eui.Group;
        public switchBtn: eui.Image;
        public thumbUI:CThumbUI;
    /*    public thumb:eui.Image;
        public thumbQuestioner:eui.Label;
        public thumbSel: eui.Image;
        public thumbCover: eui.Rect;*/
        
        public m_evtSwitchBtnTap:CTopAreaEvent_Eyelen;

    //    public m_bgBack: egret.Shape;
        public m_bgFront: egret.Shape;

        // Under 480 horizontal resolution.
        private s_bgFrontWidth:number = 428;
        private s_bgFrontHeight:number = 160;
        private s_topRightWidth = 250;
        private s_topRightHeight1 = 65;
        public s_thumbAreax: number = 25; 
        public s_thumbAreay: number = 0;
        public s_thumbAreaWidth: number = 428 - 250;
        public s_thumbAreaHeight: number = 160;
        public m_topButtonBg: egret.Shape;

        private m_trueWidth:number = 480;
        private m_trueHeight:number = 180;
        private m2_cc:boolean = false;

        private readjustUI() {
            if(this.width < this.m_trueWidth) {
                this.width = this.m_trueWidth;
            }
            if(this.height < this.m_trueHeight) {
                this.height = this.m_trueHeight;
            }

    //Bg color:
    /*        this.m_bgBack.width = this.m_trueWidth;
            this.m_bgBack.height = this.m_trueHeight;
            this.m_bgBack.graphics.beginFill(0x33EE99);

            this.m_bgBack.graphics.drawRect(0,0,this.m_bgBack.width,this.m_bgBack.height);
            this.m_bgBack.graphics.endFill();*/

            this.m_bgFront.width = this.s_bgFrontWidth / 480 * this.m_trueWidth;
            this.m_bgFront.height = this.s_bgFrontHeight / 180 * this.m_trueHeight;

            var bgFrontRectBg:eui.Rect , bgFrontRectLeft:eui.Rect , bgFrontRectBottomRight;
            
            bgFrontRectBg = new eui.Rect();
            bgFrontRectBg.fillColor = 0x00FF00;
            bgFrontRectBg.width = this.m_bgFront.width;
            bgFrontRectBg.height = this.m_bgFront.height;

            bgFrontRectLeft = new eui.Rect();
            bgFrontRectLeft.fillColor = 0xAAFFEE;
            bgFrontRectLeft.width = this.m_bgFront.width - this.s_topRightWidth/480*this.m_trueWidth;
            bgFrontRectLeft.height = this.m_bgFront.height;

            bgFrontRectBottomRight = new eui.Rect();
            bgFrontRectBottomRight.fillColor = 0xEE8855;
            bgFrontRectBottomRight.x = this.m_bgFront.width - this.s_topRightWidth/480*this.m_trueWidth;
            bgFrontRectBottomRight.y = this.s_topRightHeight1;
            bgFrontRectBottomRight.width = this.s_topRightWidth/480*this.m_trueWidth;
            bgFrontRectBottomRight.height = this.m_bgFront.height - this.s_topRightHeight1;

            this.m_bgFront.graphics.beginFill(0xAAFFEE); //Middle.
            this.m_bgFront.graphics.drawRect(0,0,this.m_bgFront.width - this.s_topRightWidth/480*this.m_trueWidth,this.m_bgFront.height);
            this.m_bgFront.graphics.endFill();

            this.m_bgFront.graphics.beginFill(0xEE8855); //Right bottom.
            this.m_bgFront.graphics.drawRect(this.m_bgFront.width - this.s_topRightWidth/480*this.m_trueWidth,this.s_topRightHeight1,this.s_topRightWidth/480*this.m_trueWidth,this.m_bgFront.height - this.s_topRightHeight1);
            this.m_bgFront.graphics.endFill();

            this.m_topButtonBg.width = this.switchBtn.width;
            this.m_topButtonBg.height = this.switchBtn.height;
            this.m_topButtonBg.graphics.beginFill(0xFFFFFF);
            this.m_topButtonBg.graphics.drawRect(0,0,this.m_topButtonBg.width,this.m_topButtonBg.height);
            this.m_topButtonBg.graphics.endFill();


            this.bgFrontGrp.left = 25 / 480*this.m_trueWidth;

    //        this.bgBackGrp.addChild(this.m_bgBack);
            this.bgFrontGrp.addChild(bgFrontRectBg);
            this.bgFrontGrp.addChild(bgFrontRectLeft);
            this.bgFrontGrp.addChild(bgFrontRectBottomRight);

    //Progress view:
            this.progressView.left = bgFrontRectBottomRight.x+30/480*this.m_trueWidth; // 没有 TopRight.x 只能用 BottomRight.x 代替。
    //Score view:
            this.scoreView.left = bgFrontRectBottomRight.x+30/480*this.m_trueWidth;
    //Switch button:
            this.switchBtn.left = 209 / 480*this.m_trueWidth;
            this.switchBtn.top = 154 / 180*this.m_trueHeight;
            this.switchBtnBgGrp.left = this.switchBtn.left;
            this.switchBtnBgGrp.top = this.switchBtn.top;
    //Thumb area:
    //        this.thumbUI.left = 400;
    //      No action here! decided in CPraEasyScene because renderFilter required!

        }

        public setTrueWidth(w:number) {
            this.m_trueWidth = w;
            if(this.m2_cc) {
                this.readjustUI();
            }
        }

        public setTrueHeight(h:number) {
            this.m_trueHeight = h;
            if(this.m2_cc) {
                this.readjustUI();
            }
        }

        public childrenCreated() :void {

            this.readjustUI();


            this.switchBtnBgGrp.addChild(this.m_topButtonBg);

            this.switchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSwitchBtnTap,this);

            this.m2_cc = true;
        }

        private onSwitchBtnTap(evt:egret.TouchEvent)
        {
            this.dispatchEvent(this.m_evtSwitchBtnTap);
        }
    }
}