/**************************************************
 * UI/scenes/CWelcomeScene_Eyelen3E.ts
 * 
 * 欢迎场景界面。
 *
**************************************************/

var g_localVer: string; // 本地版本号。
var g_latestVer: string; // 最新版本号。

namespace eyelen3E {
    export class CWelcomeScene_Eyelen3E extends eui.Component {
        public constructor() {
            super();
        }
        
        private scrBgGrp:eui.Group;
        private updateGroup:eui.Group;
        private urlText:eui.EditableText;
        private showCRBtn:eui.Image;
        private showPriBtn:eui.Panel;
        private crPanel:eui.Panel;
        private priPanel:eui.Panel;
        public startBtn:eui.Button;
        public caliSquare:eui.Image;
        public localVer: eui.Label;
        public latestVer: eui.Label;
        public m_rippleCircle:egret.Bitmap;
        
        public m_squareTag:number=1;
        public m_squareChCntTotal:number=1; // 表示换图所需敲击次数。敲击多了该值会逐渐增大，换图逐渐变慢。
        public m_squareChCntLeft:number=1; // 剩余换图敲击次数。敲击一次该值减小1。减到 0 则换图并把该值置为换图最大次数。

        public m_latestVerLoader:egret.URLLoader;

        public childrenCreated():void
        {
            //Draw bg color
            var tmp: egret.Shape;
            tmp = new egret.Shape();
            tmp.graphics.beginFill(0xFFFFFF);
            tmp.graphics.drawRect(0,0,this.width,this.height);
            tmp.graphics.endFill();

            if(S_BUILD_FOR == S_NATIVE_IOS || !S_CHECK_UPDATE_ANDROID) {
                this.updateGroup.visible = false;
            }

            //Start ripple:
            this.m_rippleCircle = new egret.Bitmap();
            this.m_rippleCircle.x = 329;
            this.m_rippleCircle.y = 569;
            this.m_rippleCircle.width = 20;
            this.m_rippleCircle.height = 20;
            //Middle:339,579 Max width:150
            this.m_rippleCircle.texture = RES.getRes("rippleCircle_png");
            this.addChild(this.m_rippleCircle);
            //Start animation:
            var tw = egret.Tween.get(this.m_rippleCircle , {loop:true});
            tw.to({x:264 , y:504 , width:150 , height:150 , alpha:0.4},200).to({alpha:0},100).wait(1500).to({x:329 , y:569 , width:20 , height:20});

            //Load local version and remote version:
            var tmpJson = RES.getRes("localVer_json");
            g_localVer = tmpJson.curVer; //OK
            this.localVer.text = g_localVer;

            this.m_latestVerLoader = new egret.URLLoader();
            this.m_latestVerLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            this.m_latestVerLoader.addEventListener(egret.Event.COMPLETE,this.onLatestVerLoaded,this);

            var latestVerURL: string = "https://www.gdeint.cn/download/eyelen/latestVer.json";

            if(S_BUILD_FOR != S_NATIVE_IOS && S_CHECK_UPDATE_ANDROID) {
                RES.getResByUrl(latestVerURL,this.onLatestVerLoaded,this,RES.ResourceItem.TYPE_JSON);
            }

            if(S_BUILD_FOR == S_NATIVE_IOS) {
                //针对iOS调整按钮位置。
                this.showCRBtn.x+=20;
                this.showCRBtn.y+=15;
            }

            this.showCRBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onShowCR , this);
            this.showPriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onShowPri , this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onStartPra , this);
            this.caliSquare.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSquareTap , this);

        }
        
        private onLatestVerLoaded(e: any): void {
            var jsnTxt = e;
            this.latestVer.text = jsnTxt.curVer;
        }
        
        private onShowCR():void {
            this.crPanel.visible = true;
        }

        private onShowPri():void {
            this.priPanel.visible = true;
        }

        public onStartPra(evt:egret.TouchEvent):void {
            g_pageJumper.gotoPage("MainMenu",null);
            g_mainMenu.run();
        }
        
        public onSquareTap(evt:egret.TouchEvent):void {

            --this.m_squareChCntLeft;
            if(this.m_squareChCntLeft <= 0) //满足换图条件
            {
                this.m_squareTag = this.m_squareTag%3 + 1;
                var squNameStr:string;
                squNameStr = "square" + this.m_squareTag + "_png";
                this.caliSquare.source = squNameStr;

                if(this.m_squareTag <= 1 ) //图换了一圈
                {
                    ++this.m_squareChCntTotal;
                }
                this.m_squareChCntLeft = this.m_squareChCntTotal;
            }
        }
    }
}