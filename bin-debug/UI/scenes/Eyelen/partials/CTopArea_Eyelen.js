/**
 *
 * 练习场景顶部区域。
 *
 * 请勿修改 scale/x/y，而要通过 setTrueWidth/setTrueHeight 。
 *
 */
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
var eyelen3E;
(function (eyelen3E) {
    var CTopArea_Eyelen = (function (_super) {
        __extends(CTopArea_Eyelen, _super);
        function CTopArea_Eyelen() {
            var _this = _super.call(this) || this;
            // Under 480 horizontal resolution.
            _this.s_bgFrontWidth = 428;
            _this.s_bgFrontHeight = 160;
            _this.s_topRightWidth = 250;
            _this.s_topRightHeight1 = 65;
            _this.s_thumbAreax = 25;
            _this.s_thumbAreay = 0;
            _this.s_thumbAreaWidth = 428 - 250;
            _this.s_thumbAreaHeight = 160;
            _this.m_trueWidth = 480;
            _this.m_trueHeight = 180;
            _this.m2_cc = false;
            //        this.m_bgBack = new egret.Shape();
            _this.m_bgFront = new egret.Shape();
            _this.m_topButtonBg = new egret.Shape();
            _this.m_evtSwitchBtnTap = new CTopAreaEvent_Eyelen(CTopAreaEvent_Eyelen.EVT_SWITCHBTN_TAP);
            return _this;
        }
        CTopArea_Eyelen.prototype.readjustUI = function () {
            if (this.width < this.m_trueWidth) {
                this.width = this.m_trueWidth;
            }
            if (this.height < this.m_trueHeight) {
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
            var bgFrontRectBg, bgFrontRectLeft, bgFrontRectBottomRight;
            bgFrontRectBg = new eui.Rect();
            bgFrontRectBg.fillColor = 0x00FF00;
            bgFrontRectBg.width = this.m_bgFront.width;
            bgFrontRectBg.height = this.m_bgFront.height;
            bgFrontRectLeft = new eui.Rect();
            bgFrontRectLeft.fillColor = 0xAAFFEE;
            bgFrontRectLeft.width = this.m_bgFront.width - this.s_topRightWidth / 480 * this.m_trueWidth;
            bgFrontRectLeft.height = this.m_bgFront.height;
            bgFrontRectBottomRight = new eui.Rect();
            bgFrontRectBottomRight.fillColor = 0xEE8855;
            bgFrontRectBottomRight.x = this.m_bgFront.width - this.s_topRightWidth / 480 * this.m_trueWidth;
            bgFrontRectBottomRight.y = this.s_topRightHeight1;
            bgFrontRectBottomRight.width = this.s_topRightWidth / 480 * this.m_trueWidth;
            bgFrontRectBottomRight.height = this.m_bgFront.height - this.s_topRightHeight1;
            this.m_bgFront.graphics.beginFill(0xAAFFEE); //Middle.
            this.m_bgFront.graphics.drawRect(0, 0, this.m_bgFront.width - this.s_topRightWidth / 480 * this.m_trueWidth, this.m_bgFront.height);
            this.m_bgFront.graphics.endFill();
            this.m_bgFront.graphics.beginFill(0xEE8855); //Right bottom.
            this.m_bgFront.graphics.drawRect(this.m_bgFront.width - this.s_topRightWidth / 480 * this.m_trueWidth, this.s_topRightHeight1, this.s_topRightWidth / 480 * this.m_trueWidth, this.m_bgFront.height - this.s_topRightHeight1);
            this.m_bgFront.graphics.endFill();
            this.m_topButtonBg.width = this.switchBtn.width;
            this.m_topButtonBg.height = this.switchBtn.height;
            this.m_topButtonBg.graphics.beginFill(0xFFFFFF);
            this.m_topButtonBg.graphics.drawRect(0, 0, this.m_topButtonBg.width, this.m_topButtonBg.height);
            this.m_topButtonBg.graphics.endFill();
            this.bgFrontGrp.left = 25 / 480 * this.m_trueWidth;
            //        this.bgBackGrp.addChild(this.m_bgBack);
            this.bgFrontGrp.addChild(bgFrontRectBg);
            this.bgFrontGrp.addChild(bgFrontRectLeft);
            this.bgFrontGrp.addChild(bgFrontRectBottomRight);
            //Progress view:
            this.progressView.left = bgFrontRectBottomRight.x + 30 / 480 * this.m_trueWidth; // 没有 TopRight.x 只能用 BottomRight.x 代替。
            //Score view:
            this.scoreView.left = bgFrontRectBottomRight.x + 30 / 480 * this.m_trueWidth;
            //Switch button:
            this.switchBtn.left = 209 / 480 * this.m_trueWidth;
            this.switchBtn.top = 154 / 180 * this.m_trueHeight;
            this.switchBtnBgGrp.left = this.switchBtn.left;
            this.switchBtnBgGrp.top = this.switchBtn.top;
            //Thumb area:
            //        this.thumbUI.left = 400;
            //      No action here! decided in CPraEasyScene because renderFilter required!
        };
        CTopArea_Eyelen.prototype.setTrueWidth = function (w) {
            this.m_trueWidth = w;
            if (this.m2_cc) {
                this.readjustUI();
            }
        };
        CTopArea_Eyelen.prototype.setTrueHeight = function (h) {
            this.m_trueHeight = h;
            if (this.m2_cc) {
                this.readjustUI();
            }
        };
        CTopArea_Eyelen.prototype.childrenCreated = function () {
            this.readjustUI();
            this.switchBtnBgGrp.addChild(this.m_topButtonBg);
            this.switchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchBtnTap, this);
            this.m2_cc = true;
        };
        CTopArea_Eyelen.prototype.onSwitchBtnTap = function (evt) {
            this.dispatchEvent(this.m_evtSwitchBtnTap);
        };
        return CTopArea_Eyelen;
    }(eui.Component));
    eyelen3E.CTopArea_Eyelen = CTopArea_Eyelen;
    __reflect(CTopArea_Eyelen.prototype, "eyelen3E.CTopArea_Eyelen");
})(eyelen3E || (eyelen3E = {}));
//# sourceMappingURL=CTopArea_Eyelen.js.map