/**************************************************
 * UI/scenes/CWelcomeScene_Eyelen3E.ts
 *
 * 欢迎场景界面。
 *
**************************************************/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var g_localVer; // 本地版本号。
var g_latestVer; // 最新版本号。
var eyelen3E;
(function (eyelen3E) {
    var CWelcomeScene_Eyelen3E = (function (_super) {
        __extends(CWelcomeScene_Eyelen3E, _super);
        function CWelcomeScene_Eyelen3E() {
            var _this = _super.call(this) || this;
            _this.m_squareTag = 1;
            _this.m_squareChCntTotal = 1; // 表示换图所需敲击次数。敲击多了该值会逐渐增大，换图逐渐变慢。
            _this.m_squareChCntLeft = 1; // 剩余换图敲击次数。敲击一次该值减小1。减到 0 则换图并把该值置为换图最大次数。
            return _this;
        }
        CWelcomeScene_Eyelen3E.prototype.childrenCreated = function () {
            //Draw bg color
            var tmp;
            tmp = new egret.Shape();
            tmp.graphics.beginFill(0xFFFFFF);
            tmp.graphics.drawRect(0, 0, this.width, this.height);
            tmp.graphics.endFill();
            if (S_BUILD_FOR == S_NATIVE_IOS || !S_CHECK_UPDATE_ANDROID) {
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
            var tw = egret.Tween.get(this.m_rippleCircle, { loop: true });
            tw.to({ x: 264, y: 504, width: 150, height: 150, alpha: 0.4 }, 200).to({ alpha: 0 }, 100).wait(1500).to({ x: 329, y: 569, width: 20, height: 20 });
            //Load local version and remote version:
            var tmpJson = RES.getRes("localVer_json");
            g_localVer = tmpJson.curVer; //OK
            this.localVer.text = g_localVer;
            this.m_latestVerLoader = new egret.URLLoader();
            this.m_latestVerLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            this.m_latestVerLoader.addEventListener(egret.Event.COMPLETE, this.onLatestVerLoaded, this);
            var latestVerURL = "https://www.gdeint.cn/download/eyelen/latestVer.json";
            if (S_BUILD_FOR != S_NATIVE_IOS && S_CHECK_UPDATE_ANDROID) {
                RES.getResByUrl(latestVerURL, this.onLatestVerLoaded, this, RES.ResourceItem.TYPE_JSON);
            }
            if (S_BUILD_FOR == S_NATIVE_IOS) {
                //针对iOS调整按钮位置。
                this.showCRBtn.x += 20;
                this.showCRBtn.y += 15;
            }
            this.showCRBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowCR, this);
            this.showPriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowPri, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartPra, this);
            this.caliSquare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSquareTap, this);
        };
        CWelcomeScene_Eyelen3E.prototype.onLatestVerLoaded = function (e) {
            var jsnTxt = e;
            this.latestVer.text = jsnTxt.curVer;
        };
        CWelcomeScene_Eyelen3E.prototype.onShowCR = function () {
            this.crPanel.visible = true;
        };
        CWelcomeScene_Eyelen3E.prototype.onShowPri = function () {
            this.priPanel.visible = true;
        };
        CWelcomeScene_Eyelen3E.prototype.onStartPra = function (evt) {
            g_pageJumper.gotoPage("MainMenu", null);
            g_mainMenu.run();
        };
        CWelcomeScene_Eyelen3E.prototype.onSquareTap = function (evt) {
            --this.m_squareChCntLeft;
            if (this.m_squareChCntLeft <= 0) {
                this.m_squareTag = this.m_squareTag % 3 + 1;
                var squNameStr;
                squNameStr = "square" + this.m_squareTag + "_png";
                this.caliSquare.source = squNameStr;
                if (this.m_squareTag <= 1) {
                    ++this.m_squareChCntTotal;
                }
                this.m_squareChCntLeft = this.m_squareChCntTotal;
            }
        };
        return CWelcomeScene_Eyelen3E;
    }(eui.Component));
    eyelen3E.CWelcomeScene_Eyelen3E = CWelcomeScene_Eyelen3E;
    __reflect(CWelcomeScene_Eyelen3E.prototype, "eyelen3E.CWelcomeScene_Eyelen3E");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CWelcomeScene_Eyelen3E.js.map